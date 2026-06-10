import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import useTitle from '../hooks/useTitle';
import LoadingSpinner from '../components/LoadingSpinner';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Box, ShoppingCart, Plus, User, Settings } from 'lucide-react';

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4'];

const Dashboard = () => {
  const { user, dbUser } = useAuth();
  const [myModels, setMyModels] = useState([]);
  const [myPurchases, setMyPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  useTitle('Dashboard');

  useEffect(() => {
    if (!user) return;
    Promise.all([
      api.get('/api/models/my-models'),
      api.get('/api/models/my-purchases')
    ]).then(([modelsRes, purchasesRes]) => {
      setMyModels(modelsRes.data);
      setMyPurchases(purchasesRes.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [user]);

  // Chart data: models by framework
  const frameworkData = myModels.reduce((acc, m) => {
    const found = acc.find(a => a.name === m.framework);
    if (found) found.count++;
    else acc.push({ name: m.framework, count: 1 });
    return acc;
  }, []);

  // Chart data: purchases by useCase
  const useCaseData = myPurchases.reduce((acc, m) => {
    const found = acc.find(a => a.name === m.useCase);
    if (found) found.value++;
    else acc.push({ name: m.useCase, value: 1 });
    return acc;
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Welcome back, {dbUser?.name || user?.displayName || 'Developer'} 👋
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Here's what's happening with your models</p>
        </div>

        {/* Sidebar + Content Layout */}
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4 space-y-1">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-3 mb-3">Menu</p>
              {[
                { to: '/dashboard', icon: <Box size={16} />, label: 'Overview' },
                { to: '/my-models', icon: <Box size={16} />, label: 'My Models' },
                { to: '/my-purchases', icon: <ShoppingCart size={16} />, label: 'My Purchases' },
                { to: '/profile', icon: <User size={16} />, label: 'Profile' },
                { to: '/add-model', icon: <Plus size={16} />, label: 'Add Model' },
              ].map(({ to, icon, label }) => (
                <Link key={to} to={to}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                  {icon} {label}
                </Link>
              ))}
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 space-y-6">

            {/* Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { label: 'Models Added', value: myModels.length, color: 'blue', icon: <Box size={20} /> },
                { label: 'Purchases Made', value: myPurchases.length, color: 'purple', icon: <ShoppingCart size={20} /> },
                { label: 'Total Downloads', value: myModels.reduce((s, m) => s + (m.purchased || 0), 0), color: 'green', icon: <Box size={20} /> },
              ].map(({ label, value, color, icon }) => (
                <div key={label} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
                  <div className={`w-10 h-10 bg-${color}-100 dark:bg-${color}-900/30 text-${color}-600 dark:text-${color}-400 rounded-xl flex items-center justify-center mb-3`}>
                    {icon}
                  </div>
                  <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{value}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Bar Chart */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">My Models by Framework</h3>
                {frameworkData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={frameworkData}>
                      <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-48 flex items-center justify-center text-gray-400 text-sm">No models added yet</div>
                )}
              </div>

              {/* Pie Chart */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Purchased by Use Case</h3>
                {useCaseData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie data={useCaseData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label>
                        {useCaseData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                      </Pie>
                      <Legend />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-48 flex items-center justify-center text-gray-400 text-sm">No purchases yet</div>
                )}
              </div>
            </div>

            {/* My Models Table */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900 dark:text-white">My Models</h3>
                <Link to="/add-model" className="btn btn-primary btn-sm rounded-xl text-xs">+ Add New</Link>
              </div>
              {myModels.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="table table-sm w-full">
                    <thead>
                      <tr className="text-xs text-gray-500 dark:text-gray-400">
                        <th>Name</th>
                        <th>Framework</th>
                        <th>Use Case</th>
                        <th>Purchased</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {myModels.map(m => (
                        <tr key={m._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 text-sm">
                          <td className="font-medium">{m.name}</td>
                          <td><span className="badge badge-sm">{m.framework}</span></td>
                          <td>{m.useCase}</td>
                          <td>{m.purchased || 0}</td>
                          <td>
                            <div className="flex gap-2">
                              <Link to={`/models/${m._id}`} className="btn btn-ghost btn-xs rounded-lg">View</Link>
                              <Link to={`/update-model/${m._id}`} className="btn btn-ghost btn-xs rounded-lg text-blue-600">Edit</Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-10 text-gray-400 text-sm">
                  No models yet. <Link to="/add-model" className="text-blue-500 hover:underline">Add your first one!</Link>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;