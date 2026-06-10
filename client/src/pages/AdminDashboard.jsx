import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import useTitle from '../hooks/useTitle';
import LoadingSpinner from '../components/LoadingSpinner';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from 'recharts';
import { Users, Box, Mail, Shield, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [page, setPage] = useState(1);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  useTitle('Admin Dashboard');

  useEffect(() => {
    api.get('/api/users/stats')
      .then(res => { setStats(res.data); setLoadingStats(false); })
      .catch(() => setLoadingStats(false));
  }, []);

  useEffect(() => {
    setLoadingUsers(true);
    api.get(`/api/users?page=${page}&limit=8`)
      .then(res => {
        setUsers(res.data.users);
        setTotalUsers(res.data.total);
        setLoadingUsers(false);
      })
      .catch(() => setLoadingUsers(false));
  }, [page]);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await api.put(`/api/users/${userId}/role`, { role: newRole });
      setUsers(users.map(u => u._id === userId ? { ...u, role: newRole } : u));
      toast.success('Role updated');
    } catch {
      toast.error('Failed to update role');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await api.delete(`/api/users/${userId}`);
      setUsers(users.filter(u => u._id !== userId));
      toast.success('User deleted');
    } catch {
      toast.error('Failed to delete user');
    }
  };

  // Format chart data
  const monthlyData = stats?.modelsByMonth?.map(d => ({
    name: MONTHS[d._id.month - 1],
    models: d.count
  })) || [];

  const categoryData = stats?.modelsByCategory?.map(d => ({
    name: d._id || 'Other',
    value: d.count
  })) || [];

  const totalPages = Math.ceil(totalUsers / 8);

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: <Box size={16} /> },
    { id: 'users', label: 'Manage Users', icon: <Users size={16} /> },
    { id: 'models', label: 'Manage Models', icon: <Box size={16} /> },
    { id: 'contacts', label: 'Messages', icon: <Mail size={16} /> },
    { id: 'roles', label: 'Roles', icon: <Shield size={16} /> },
    { id: 'settings', label: 'Settings', icon: <Shield size={16} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">

        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Full control over the platform</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4 space-y-1">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-3 mb-3">Admin Menu</p>
              {sidebarItems.map(({ id, label, icon }) => (
                <button key={id} onClick={() => setActiveTab(id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                    activeTab === id
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}>
                  {icon} {label}
                </button>
              ))}
            </div>
          </aside>

          {/* Main */}
          <main className="flex-1 space-y-6">

            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <>
                {loadingStats ? <LoadingSpinner /> : (
                  <>
                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        { label: 'Total Users', value: stats?.totalUsers || 0, color: 'blue', icon: <Users size={18} /> },
                        { label: 'Total Models', value: stats?.totalModels || 0, color: 'purple', icon: <Box size={18} /> },
                        { label: 'Unread Messages', value: stats?.unreadContacts || 0, color: 'amber', icon: <Mail size={18} /> },
                        { label: 'Top Model Downloads', value: stats?.topModels?.[0]?.purchased || 0, color: 'green', icon: <Box size={18} /> },
                      ].map(({ label, value, color, icon }) => (
                        <div key={label} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4">
                          <div className={`w-9 h-9 bg-${color}-100 dark:bg-${color}-900/30 text-${color}-600 rounded-xl flex items-center justify-center mb-3`}>
                            {icon}
                          </div>
                          <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{value}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Charts Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-4">Models Added (Last 6 Months)</h3>
                        <ResponsiveContainer width="100%" height={200}>
                          <LineChart data={monthlyData}>
                            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                            <YAxis tick={{ fontSize: 11 }} />
                            <Tooltip />
                            <Line type="monotone" dataKey="models" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-4">Models by Category</h3>
                        <ResponsiveContainer width="100%" height={200}>
                          <PieChart>
                            <Pie data={categoryData} cx="50%" cy="50%" outerRadius={75} dataKey="value">
                              {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                            </Pie>
                            <Legend />
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Top Models Bar Chart */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-4">Top 5 Most Purchased Models</h3>
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={stats?.topModels || []}>
                          <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                          <YAxis tick={{ fontSize: 11 }} />
                          <Tooltip />
                          <Bar dataKey="purchased" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </>
                )}
              </>
            )}

            {/* Users Tab */}
            {activeTab === 'users' && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">All Users ({totalUsers})</h3>
                {loadingUsers ? <LoadingSpinner /> : (
                  <>
                    <div className="overflow-x-auto">
                      <table className="table table-sm w-full">
                        <thead>
                          <tr className="text-xs text-gray-500 dark:text-gray-400">
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Joined</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map(u => (
                            <tr key={u._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 text-sm">
                              <td className="font-medium">{u.name}</td>
                              <td className="text-gray-500 text-xs">{u.email}</td>
                              <td>
                                <select value={u.role} onChange={(e) => handleRoleChange(u._id, e.target.value)}
                                  className="select select-xs rounded-lg border-gray-200 dark:border-gray-600">
                                  <option value="user">User</option>
                                  <option value="admin">Admin</option>
                                </select>
                              </td>
                              <td className="text-xs text-gray-400">{new Date(u.createdAt).toLocaleDateString()}</td>
                              <td>
                                <button onClick={() => handleDeleteUser(u._id)} className="btn btn-ghost btn-xs text-red-500 hover:bg-red-50 rounded-lg">
                                  <Trash2 size={13} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between mt-4">
                      <p className="text-xs text-gray-500">Page {page} of {totalPages}</p>
                      <div className="flex gap-2">
                        <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                          className="btn btn-ghost btn-xs rounded-lg">
                          <ChevronLeft size={14} />
                        </button>
                        <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                          className="btn btn-ghost btn-xs rounded-lg">
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Other tabs placeholder */}
            {!['overview', 'users'].includes(activeTab) && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-10 text-center">
                <p className="text-gray-400 text-sm">This section is coming soon.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;