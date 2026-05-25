import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { auth } from '../firebase.config';
import { signOut } from 'firebase/auth';
import { Sun, Moon, LogOut, Plus } from 'lucide-react'; 
import toast from 'react-hot-toast';
import Profile from '../assets/Profile.png';

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    const html = document.documentElement;
    html.classList.toggle('dark');
    if (html.classList.contains('dark')) {
      html.setAttribute('data-theme', 'dark');
      setIsDark(true);
    } else {
      html.setAttribute('data-theme', 'light');
      setIsDark(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      console.error(error); 
      toast.error('Logout failed');
    }
  };

  const navBtnClasses = "btn btn-outline btn-sm rounded-xl normal-case text-base font-medium border-gray-300 dark:border-gray-600 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200";

  return (
    <nav className="navbar bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 px-6 md:px-12 transition-all">
      <div className="flex-1">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
            <span className="text-white font-extrabold text-xl">AI</span>
          </div>
          <span className="text-2xl font-extrabold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
            ModelHub
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-3">
          <Link to="/" className={navBtnClasses}>Home</Link>
          <Link to="/models" className={navBtnClasses}>All Models</Link>
          {user && (
            <Link to="/add-model" className={`${navBtnClasses} gap-1`}>
              <Plus size={18} /> Add Model
            </Link>
          )}
        </div>

        <button 
          onClick={toggleTheme} 
          className="btn btn-ghost btn-circle rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {isDark ? <Sun size={22} /> : <Moon size={22} />}
        </button>

        {user ? (
          <div className="dropdown dropdown-end">
            <label 
              tabIndex={0} 
              className="btn btn-ghost btn-circle avatar online ring-2 ring-blue-500/50 hover:ring-blue-500 rounded-xl p-0 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl overflow-hidden">
                <img
                  src={
                    user?.photoURL && !user.photoURL.includes('placeholder.com') 
                      ? user.photoURL 
                      : Profile
                  }
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </label>

            <ul 
              tabIndex={0} 
              className="menu menu-sm dropdown-content mt-3 p-3 shadow-2xl bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 w-64 gap-1 z-50"
            >
              <div className="px-3 py-2 mb-2 border-b border-gray-100 dark:border-gray-700">
                <p className="font-bold text-gray-900 dark:text-white text-base truncate">{user.displayName || 'Developer'}</p>
                <p className="text-xs text-gray-400 truncate">{user.email}</p>
              </div>
              <li>
                <Link to="/my-models" className="rounded-xl py-2.5 px-3 font-medium hover:bg-gray-100 dark:hover:bg-gray-700">
                  My Models
                </Link>
              </li>
              <li>
                <Link to="/my-purchases" className="rounded-xl py-2.5 px-3 font-medium hover:bg-gray-100 dark:hover:bg-gray-700">
                  My Purchases
                </Link>
              </li>
              <div className="divider my-1 opacity-20"></div>
              <li>
                <button
                  onClick={handleLogout}
                  className="rounded-xl py-2.5 px-3 font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center gap-2"
                >
                  <LogOut size={16} /> Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link 
            to="/login" 
            className="btn btn-primary bg-linear-to-r from-blue-600 to-indigo-600 border-none text-white px-6 rounded-xl font-semibold shadow-md shadow-blue-600/20 hover:brightness-110 transition-all text-sm tracking-wide"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;