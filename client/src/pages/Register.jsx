import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase.config';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { User, Mail, Lock, Image as ImageIcon, UserPlus } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (pass) => {
    return pass.length >= 6 && 
           /[A-Z]/.test(pass) && 
           /[a-z]/.test(pass);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validatePassword(password)) {
      toast.error('Password must be 6+ chars with uppercase & lowercase');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: photoURL || 'https://via.placeholder.com/150'
      });
      toast.success('Registration successful!');
      navigate('/');
    } catch (error) {
      console.error(error); 
      toast.error(error.message.includes('email-already-in-use') ? 'Email already in use' : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success('Google registration successful!');
      navigate('/');
    } catch (error) {
      console.error(error); 
      toast.error('Google sign up failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-6">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700/50">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Create Account</h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium">Join the AI Model community today</p>
        </div>
        
        <form onSubmit={handleRegister} className="space-y-5">
          {/* Full Name */}
          <div className="form-control">
            <div className="relative">
              <User className="absolute left-4 top-4 text-gray-400" size={20} />
              <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required className="input input-bordered w-full h-13 pl-12 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-xl focus:input-primary text-base" />
            </div>
          </div>

          {/* Email */}
          <div className="form-control">
            <div className="relative">
              <Mail className="absolute left-4 top-4 text-gray-400" size={20} />
              <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required className="input input-bordered w-full h-13 pl-12 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-xl focus:input-primary text-base" />
            </div>
          </div>

          {/* Photo URL */}
          <div className="form-control">
            <div className="relative">
              <ImageIcon className="absolute left-4 top-4 text-gray-400" size={20} />
              <input type="text" placeholder="Photo URL (optional)" value={photoURL} onChange={e => setPhotoURL(e.target.value)} className="input input-bordered w-full h-13 pl-12 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-xl focus:input-primary text-base" />
            </div>
          </div>

          {/* Password */}
          <div className="form-control">
            <div className="relative">
              <Lock className="absolute left-4 top-4 text-gray-400" size={20} />
              <input type="password" placeholder="Password (Upper & Lowercase)" value={password} onChange={e => setPassword(e.target.value)} required className="input input-bordered w-full h-13 pl-12 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-xl focus:input-primary text-base" />
            </div>
          </div>
          
          <button type="submit" disabled={loading} className="btn w-full h-13 mt-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white border-none font-bold text-lg shadow-lg shadow-blue-600/20">
            {loading ? <span className="loading loading-spinner loading-sm"></span> : <><UserPlus size={20} /> Register</>}
          </button>
        </form>

        <div className="divider my-8 text-gray-400 text-sm">OR CONTINUE WITH</div>
        
        <button onClick={handleGoogle} className="btn btn-outline w-full h-13 rounded-xl border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all font-semibold">
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
          Google
        </button>

        <p className="text-center mt-8 text-gray-600 dark:text-gray-400 font-medium">
          Already have an account? <Link to="/login" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;