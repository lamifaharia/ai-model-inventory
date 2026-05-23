import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { auth } from '../firebase.config';
import { signOut } from 'firebase/auth';
import { Sun, Moon, LogOut } from 'lucide-react';
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
      console.error(error); // Logs the error details and clears the ESLint squiggle
      toast.error('Logout failed');
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          AI Model Hub
        </Link>

        <div className="flex items-center gap-8">
          <div className="flex gap-6 text-lg">
            <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
            <Link to="/models" className="hover:text-blue-600 dark:hover:text-blue-400">All Models</Link>
            {user && <Link to="/add-model" className="hover:text-blue-600 dark:hover:text-blue-400">Add Model</Link>}
          </div>

          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            {isDark ? <Sun size={22} /> : <Moon size={22} />}
          </button>

          {user ? (
            <div className="relative">
              <img
                src={user.photoURL || 'https://via.placeholder.com/40'}
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-blue-500"
                onClick={() => setShowDropdown(!showDropdown)}
              />
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl py-4 z-50">
                  <div className="px-6 py-3 border-b dark:border-gray-700">
                    <p className="font-semibold">{user.displayName}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                  </div>
                  <div className="py-2">
                    <Link to="/my-models" className="block px-6 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">My Models</Link>
                    <Link to="/my-purchases" className="block px-6 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">My Purchases</Link>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-6 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;