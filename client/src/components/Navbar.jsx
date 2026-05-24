import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { auth } from '../firebase.config';
import { signOut } from 'firebase/auth';
import { Sun, Moon, LogOut, Plus } from 'lucide-react'; 
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark(!isDark);
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

  return (
    <nav className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-liner-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
            <span className="text-white font-bold text-2xl">AI</span>
          </div>
          <span className="text-3xl font-bold bg-liner-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ModelHub
          </span>
        </Link>

        <div className="flex items-center gap-10">
          <div className="hidden md:flex gap-8 text-lg font-medium">
            <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Home</Link>
            <Link to="/models" className="hover:text-blue-600 dark:hover:text-blue-400 transition">All Models</Link>
            {user && (
              <Link to="/add-model" className="hover:text-blue-600 dark:hover:text-blue-400 transition flex items-center gap-1">
                <Plus size={20} /> Add Model
              </Link>
            )}
          </div>

          <button 
            onClick={toggleTheme} 
            className="p-3 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {isDark ? <Sun size={24} /> : <Moon size={24} />}
          </button>

          {user ? (
            <div className="relative">
              <img
                src={user.photoURL || 'https://via.placeholder.com/45'}
                alt="Profile"
                className="w-11 h-11 rounded-2xl cursor-pointer ring-2 ring-blue-500 hover:ring-blue-600 transition"
                onClick={() => setShowDropdown(!showDropdown)}
              />
              
              {showDropdown && (
                <div className="absolute right-0 mt-3 w-72 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl py-5 border border-gray-100 dark:border-gray-700 z-50">
                  <div className="px-6 pb-4 border-b dark:border-gray-700">
                    <p className="font-semibold text-lg">{user.displayName}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                  </div>
                  <div className="py-2">
                    <Link to="/my-models" className="block px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-700">My Models</Link>
                    <Link to="/my-purchases" className="block px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-700">My Purchases</Link>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-6 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 flex items-center gap-3"
                  >
                    <LogOut size={20} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link 
              to="/login" 
              className="bg-liner-to-r from-blue-600 to-indigo-600 text-white px-8 py-3.5 rounded-2xl font-semibold hover:brightness-110 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;