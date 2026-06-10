import { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase.config';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Mail, Lock, LogIn } from 'lucide-react';
import useTitle from '../hooks/useTitle';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';
  useTitle('Login');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Login successful!');
      navigate(from);
    } catch {
      toast.error('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success('Google login successful!');
      navigate(from);
    } catch {
      toast.error('Google login failed');
    }
  };

  // Auto-fill demo credentials
  const fillDemo = (role) => {
    if (role === 'user') {
      setEmail('demo@modelhub.ai');
      setPassword('Demo@1234');
    } else {
      setEmail('admin@modelhub.ai');
      setPassword('Admin@1234');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-6">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700/50">

        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Welcome Back</h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Log in to manage your AI models</p>
        </div>

        {/* Demo Login Buttons */}
        <div className="flex gap-2 mb-6">
          <button onClick={() => fillDemo('user')} className="flex-1 py-2 text-xs font-bold rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 transition">
            Demo User
          </button>
          <button onClick={() => fillDemo('admin')} className="flex-1 py-2 text-xs font-bold rounded-xl bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800 hover:bg-purple-100 transition">
            Demo Admin
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="form-control">
            <label className="label" htmlFor="email"><span className="label-text font-bold">Email Address</span></label>
            <div className="relative">
              <Mail className="absolute left-4 top-4 text-gray-400" size={18} />
              <input id="email" type="email" placeholder="developer@example.com" value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full h-12 pl-11 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-xl text-sm"
                required />
            </div>
          </div>

          <div className="form-control">
            <label className="label" htmlFor="password"><span className="label-text font-bold">Password</span></label>
            <div className="relative">
              <Lock className="absolute left-4 top-4 text-gray-400" size={18} />
              <input id="password" type="password" placeholder="••••••••" value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full h-12 pl-11 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-xl text-sm"
                required />
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="btn w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white border-none font-bold text-base shadow-lg shadow-blue-600/20">
            {loading ? <span className="loading loading-spinner loading-sm"></span> : <><LogIn size={18} /> Login</>}
          </button>
        </form>

        <div className="divider my-6 text-gray-400 text-xs">OR CONTINUE WITH</div>

        <button onClick={handleGoogleLogin}
          className="btn btn-outline w-full h-12 rounded-xl border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 font-semibold text-sm">
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" /> Google
        </button>

        <p className="text-center mt-6 text-gray-600 dark:text-gray-400 text-sm font-medium">
          Don't have an account? <Link to="/register" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;