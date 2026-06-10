import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { auth } from '../firebase.config';
import { updateProfile, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import api from '../api';
import toast from 'react-hot-toast';
import useTitle from '../hooks/useTitle';
import { User, Mail, Image, Lock, Save } from 'lucide-react';
import Profile_img from '../assets/Profile.png';

const Profile = () => {
  const { user, dbUser } = useAuth();
  const [name, setName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [pwLoading, setPwLoading] = useState(false);
  useTitle('Profile Settings');

  useEffect(() => {
    if (user) {
      setName(user.displayName || '');
      setPhotoURL(user.photoURL || '');
    }
  }, [user]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile(auth.currentUser, { displayName: name, photoURL });
      await api.put('/api/users/profile', { name, photoURL });
      toast.success('Profile updated successfully!');
    } catch {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6) return toast.error('Password must be at least 6 characters');
    setPwLoading(true);
    try {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(auth.currentUser, credential);
      await updatePassword(auth.currentUser, newPassword);
      toast.success('Password updated!');
      setCurrentPassword('');
      setNewPassword('');
    } catch {
      toast.error('Current password is incorrect');
    } finally {
      setPwLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10">
      <div className="max-w-2xl mx-auto px-4 space-y-6">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Profile Settings</h1>

        {/* Avatar Preview */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 flex items-center gap-5">
          <img
            src={photoURL && !photoURL.includes('placeholder') ? photoURL : Profile_img}
            alt="Profile"
            className="w-20 h-20 rounded-2xl object-cover border-2 border-blue-500/30"
          />
          <div>
            <p className="font-bold text-lg text-gray-900 dark:text-white">{name || 'Your Name'}</p>
            <p className="text-sm text-gray-500">{user?.email}</p>
            <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full font-medium">
              {dbUser?.role || 'user'}
            </span>
          </div>
        </div>

        {/* Update Profile */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
          <h2 className="font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2"><User size={18} /> Personal Information</h2>
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div className="form-control">
              <label className="label" htmlFor="name"><span className="label-text font-semibold text-sm">Full Name</span></label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 text-gray-400" size={16} />
                <input id="name" type="text" value={name} onChange={e => setName(e.target.value)}
                  className="input input-bordered w-full h-11 pl-10 rounded-xl text-sm bg-gray-50 dark:bg-gray-900" required />
              </div>
            </div>
            <div className="form-control">
              <label className="label" htmlFor="email"><span className="label-text font-semibold text-sm">Email</span></label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 text-gray-400" size={16} />
                <input id="email" type="email" value={user?.email || ''} disabled
                  className="input input-bordered w-full h-11 pl-10 rounded-xl text-sm bg-gray-100 dark:bg-gray-700 cursor-not-allowed opacity-60" />
              </div>
            </div>
            <div className="form-control">
              <label className="label" htmlFor="photo"><span className="label-text font-semibold text-sm">Photo URL</span></label>
              <div className="relative">
                <Image className="absolute left-3 top-3.5 text-gray-400" size={16} />
                <input id="photo" type="url" value={photoURL} onChange={e => setPhotoURL(e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                  className="input input-bordered w-full h-11 pl-10 rounded-xl text-sm bg-gray-50 dark:bg-gray-900" />
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="btn btn-primary w-full rounded-xl h-11 font-bold text-sm">
              {loading ? <span className="loading loading-spinner loading-sm" /> : <><Save size={16} /> Save Changes</>}
            </button>
          </form>
        </div>

        {/* Update Password */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
          <h2 className="font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2"><Lock size={18} /> Change Password</h2>
          <form onSubmit={handlePasswordUpdate} className="space-y-4">
            <div className="form-control">
              <label className="label" htmlFor="currentPw"><span className="label-text font-semibold text-sm">Current Password</span></label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 text-gray-400" size={16} />
                <input id="currentPw" type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)}
                  className="input input-bordered w-full h-11 pl-10 rounded-xl text-sm bg-gray-50 dark:bg-gray-900" required />
              </div>
            </div>
            <div className="form-control">
              <label className="label" htmlFor="newPw"><span className="label-text font-semibold text-sm">New Password</span></label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 text-gray-400" size={16} />
                <input id="newPw" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)}
                  className="input input-bordered w-full h-11 pl-10 rounded-xl text-sm bg-gray-50 dark:bg-gray-900" required />
              </div>
            </div>
            <button type="submit" disabled={pwLoading}
              className="btn btn-outline w-full rounded-xl h-11 font-bold text-sm">
              {pwLoading ? <span className="loading loading-spinner loading-sm" /> : <><Lock size={16} /> Update Password</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;