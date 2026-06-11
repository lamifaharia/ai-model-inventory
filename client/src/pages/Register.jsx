import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase.config';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import useTitle from '../hooks/useTitle';
import { User, Mail, Lock, Image as ImageIcon, UserPlus, CheckCircle, XCircle } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useTitle('Register');

  const pwChecks = {
    length: password.length >= 6,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };
  const pwValid = Object.values(pwChecks).every(Boolean);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!pwValid) return toast.error('Please meet all password requirements');
    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, { displayName: name, photoURL: photoURL || '' });
      toast.success('Account created successfully!');
      navigate('/');
    } catch (err) {
      toast.error(err.message.includes('email-already-in-use') ? 'Email already in use' : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success('Signed up with Google!');
      navigate('/');
    } catch {
      toast.error('Google sign up failed');
    }
  };

  const Check = ({ ok, label }) => (
    <li className={`flex items-center gap-2 text-xs ${ok ? 'text-green-500' : 'text-gray-400'}`}>
      {ok ? <CheckCircle size={13} /> : <XCircle size={13} />} {label}
    </li>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-6">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700/50">

        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Create Account</h2>
          <p className="text-gray-500 dark:text-gray-400">Join the AI Model community today</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="form-control">
            <label className="label" htmlFor="name"><span className="label-text font-bold text-sm">Full Name</span></label>
            <div className="relative">
              <User className="absolute left-4 top-3.5 text-gray-400" size={17} />
              <input id="name" type="text" placeholder="John Doe" value={name} onChange={e => setName(e.target.value)}
                className="input input-bordered w-full h-12 pl-11 rounded-xl text-sm bg-gray-50 dark:bg-gray-900" required />
            </div>
          </div>

          <div className="form-control">
            <label className="label" htmlFor="email"><span className="label-text font-bold text-sm">Email Address</span></label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 text-gray-400" size={17} />
              <input id="email" type="email" placeholder="developer@example.com" value={email} onChange={e => setEmail(e.target.value)}
                className="input input-bordered w-full h-12 pl-11 rounded-xl text-sm bg-gray-50 dark:bg-gray-900" required />
            </div>
          </div>

          <div className="form-control">
            <label className="label" htmlFor="photo"><span className="label-text font-bold text-sm">Photo URL <span className="text-gray-400 font-normal">(optional)</span></span></label>
            <div className="relative">
              <ImageIcon className="absolute left-4 top-3.5 text-gray-400" size={17} />
              <input id="photo" type="url" placeholder="https://example.com/photo.jpg" value={photoURL} onChange={e => setPhotoURL(e.target.value)}
                className="input input-bordered w-full h-12 pl-11 rounded-xl text-sm bg-gray-50 dark:bg-gray-900" />
            </div>
          </div>

          <div className="form-control">
            <label className="label" htmlFor="password"><span className="label-text font-bold text-sm">Password</span></label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 text-gray-400" size={17} />
              <input id="password" type="password" placeholder="Create a strong password" value={password} onChange={e => setPassword(e.target.value)}
                className="input input-bordered w-full h-12 pl-11 rounded-xl text-sm bg-gray-50 dark:bg-gray-900" required />
            </div>
            {password && (
              <ul className="mt-2 space-y-1 px-1">
                <Check ok={pwChecks.length} label="At least 6 characters" />
                <Check ok={pwChecks.upper} label="One uppercase letter" />
                <Check ok={pwChecks.lower} label="One lowercase letter" />
                <Check ok={pwChecks.special} label="One special character" />
              </ul>
            )}
          </div>

          <button type="submit" disabled={loading || !pwValid}
            className="btn w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white border-none font-bold text-sm disabled:opacity-50 mt-2">
            {loading ? <span className="loading loading-spinner loading-sm" /> : <><UserPlus size={17} /> Create Account</>}
          </button>
        </form>

        <div className="divider my-6 text-gray-400 text-xs">OR CONTINUE WITH</div>

        <button onClick={handleGoogle} className="btn btn-outline w-full h-12 rounded-xl font-semibold text-sm border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" /> Google
        </button>

        <p className="text-center mt-6 text-gray-600 dark:text-gray-400 text-sm">
          Already have an account? <Link to="/login" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;