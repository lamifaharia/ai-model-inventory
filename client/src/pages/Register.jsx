import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase.config';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-2xl w-full max-w-md">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">Create Account</h2>
        
        <form onSubmit={handleRegister} className="space-y-6">
          <input 
            type="text" 
            placeholder="Full Name" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            required 
            className="w-full px-5 py-4 border rounded-2xl dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
          />
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required 
            className="w-full px-5 py-4 border rounded-2xl dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
          />
          <input 
            type="text" 
            placeholder="Photo URL (optional)" 
            value={photoURL} 
            onChange={e => setPhotoURL(e.target.value)} 
            className="w-full px-5 py-4 border rounded-2xl dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            required 
            className="w-full px-5 py-4 border rounded-2xl dark:bg-gray-700 dark:border-gray-600 dark:text-white" 
          />
          
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-semibold hover:bg-blue-700 disabled:bg-gray-400 transition"
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <div className="my-6 text-center text-gray-500 dark:text-gray-400">or</div>
        
        <button 
          onClick={handleGoogle} 
          className="w-full border border-gray-300 dark:border-gray-600 py-4 rounded-2xl flex items-center justify-center gap-3 text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
          Continue with Google
        </button>

        <p className="text-center mt-8 text-gray-600 dark:text-gray-400">
          Already have an account? <Link to="/login" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;