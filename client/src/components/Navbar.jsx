import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { auth } from '../firebase.config';
import { signOut } from 'firebase/auth';
import { Sun, Moon, LogOut, Plus, Menu, X, LayoutDashboard, Shield } from 'lucide-react';
import toast from 'react-hot-toast';
import Profile from '../assets/Profile.png';

const Navbar = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isDark, setIsDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleTheme = () => {
    const html = document.documentElement;
    html.classList.toggle('dark');
    html.setAttribute('data-theme', html.classList.contains('dark') ? 'dark' : 'light');
    setIsDark(!isDark);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully');
      navigate('/');
    } catch {
      toast.error('Logout failed');
    }
    setMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `text-sm font-medium px-3 py-2 rounded-xl transition-all ${
      isActive(path)
        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
    }`;

  return (
    <nav className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <span className="text-white font-extrabold text-sm">AI</span>
          </div>
          <span className="text-xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
            ModelHub
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          <Link to="/" className={linkClass('/')}>Home</Link>
          <Link to="/models" className={linkClass('/models')}>Explore</Link>
          <Link to="/about" className={linkClass('/about')}>About</Link>
          <Link to="/blog" className={linkClass('/blog')}>Blog</Link>
          {user && <Link to="/add-model" className={linkClass('/add-model')}>Add Model</Link>}
          {user && <Link to="/dashboard" className={linkClass('/dashboard')}>Dashboard</Link>}
          {isAdmin && (
            <Link to="/admin" className={`${linkClass('/admin')} text-purple-600 dark:text-purple-400`}>
              <Shield size={14} className="inline mr-1" />Admin
            </Link>
          )}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle btn-sm rounded-xl text-gray-700 dark:text-gray-300"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* User Menu (Desktop) */}
          {user ? (
            <div className="hidden md:block dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle p-0 w-9 h-9 rounded-xl overflow-hidden ring-2 ring-blue-500/40 hover:ring-blue-500 cursor-pointer">
                <img
                  src={user?.photoURL && !user.photoURL.includes('placeholder') ? user.photoURL : Profile}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-3 shadow-2xl bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 w-64 gap-1 z-50">
                <div className="px-3 py-2 mb-2 border-b border-gray-100 dark:border-gray-700">
                  <p className="font-bold text-gray-900 dark:text-white text-sm truncate">{user.displayName || 'Developer'}</p>
                  <p className="text-xs text-gray-400 truncate">{user.email}</p>
                  {isAdmin && <span className="text-xs bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 px-2 py-0.5 rounded-full font-medium">Admin</span>}
                </div>
                <li><Link to="/dashboard" className="rounded-xl py-2 px-3 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700"><LayoutDashboard size={15} /> Dashboard</Link></li>
                <li><Link to="/my-models" className="rounded-xl py-2 px-3 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700">My Models</Link></li>
                <li><Link to="/my-purchases" className="rounded-xl py-2 px-3 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700">My Purchases</Link></li>
                <li><Link to="/profile" className="rounded-xl py-2 px-3 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700">Profile Settings</Link></li>
                {isAdmin && <li><Link to="/admin" className="rounded-xl py-2 px-3 text-sm font-medium text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20"><Shield size={15} /> Admin Panel</Link></li>}
                <div className="divider my-1 opacity-20"></div>
                <li>
                  <button onClick={handleLogout} className="rounded-xl py-2 px-3 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center gap-2 w-full">
                    <LogOut size={15} /> Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login" className="hidden md:flex btn btn-primary btn-sm bg-gradient-to-r from-blue-600 to-indigo-600 border-none text-white px-5 rounded-xl font-semibold shadow-md shadow-blue-600/20 hover:brightness-110">
              Login
            </Link>
          )}

          {/* Hamburger (Mobile) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden btn btn-ghost btn-circle btn-sm rounded-xl"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-4 py-4 space-y-1">
          {user && (
            <div className="flex items-center gap-3 px-3 py-3 mb-3 bg-gray-50 dark:bg-gray-800 rounded-2xl">
              <img src={user?.photoURL && !user.photoURL.includes('placeholder') ? user.photoURL : Profile} alt="avatar" className="w-10 h-10 rounded-xl object-cover" />
              <div>
                <p className="font-bold text-sm">{user.displayName || 'Developer'}</p>
                <p className="text-xs text-gray-400 truncate">{user.email}</p>
              </div>
            </div>
          )}
          {[
            { to: '/', label: 'Home' },
            { to: '/models', label: 'Explore' },
            { to: '/about', label: 'About' },
            { to: '/blog', label: 'Blog' },
          ].map(({ to, label }) => (
            <Link key={to} to={to} onClick={() => setMenuOpen(false)}
              className={`block px-4 py-3 rounded-xl text-sm font-medium ${isActive(to) ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
              {label}
            </Link>
          ))}
          {user && (
            <>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800">Dashboard</Link>
              <Link to="/add-model" onClick={() => setMenuOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800">Add Model</Link>
              <Link to="/my-models" onClick={() => setMenuOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800">My Models</Link>
              <Link to="/my-purchases" onClick={() => setMenuOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800">My Purchases</Link>
              <Link to="/profile" onClick={() => setMenuOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800">Profile Settings</Link>
              {isAdmin && <Link to="/admin" onClick={() => setMenuOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-medium text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20">Admin Panel</Link>}
              <button onClick={handleLogout} className="block w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30">
                Logout
              </button>
            </>
          )}
          {!user && (
            <Link to="/login" onClick={() => setMenuOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-semibold text-blue-600 hover:bg-blue-50">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;