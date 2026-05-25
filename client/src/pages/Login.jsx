import { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase.config'; 
import { useNavigate, Link, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Mail, Lock, LogIn } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Login successful!');
      navigate(from);
    } catch (error) {
      console.error(error); 
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
    } catch (error) {
      console.error(error); 
      toast.error('Google login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-6">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700/50">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Welcome Back</h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Log in to manage your AI models</p>
        </div>
        
        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="form-control">
            <label className="label"><span className="label-text font-bold">Email Address</span></label>
            <div className="relative">
              <Mail className="absolute left-4 top-4 text-gray-400" size={20} />
              <input
                type="email"
                placeholder="developer@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full h-13 pl-12 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-xl focus:input-primary text-base"
                required
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text font-bold">Password</span></label>
            <div className="relative">
              <Lock className="absolute left-4 top-4 text-gray-400" size={20} />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full h-13 pl-12 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-xl focus:input-primary text-base"
                required
              />
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="btn w-full h-13 mt-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white border-none font-bold text-lg shadow-lg shadow-blue-600/20"
          >
            {loading ? <span className="loading loading-spinner loading-sm"></span> : <><LogIn size={20} /> Login</>}
          </button>
        </form>

        <div className="divider my-8 text-gray-400 text-sm">OR CONTINUE WITH</div>
        
        <button
          onClick={handleGoogleLogin}
          className="btn btn-outline w-full h-13 rounded-xl border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all font-semibold"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
          Google
        </button>

        <p className="text-center mt-8 text-gray-600 dark:text-gray-400 font-medium">
          Don't have an account? <Link to="/register" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;