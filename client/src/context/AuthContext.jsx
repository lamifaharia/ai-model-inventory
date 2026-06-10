/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../firebase.config';
import { onAuthStateChanged } from 'firebase/auth';
import api from '../api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        try {
          const res = await api.post('/api/users/sync', {
            email: firebaseUser.email,
            name: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL
          });
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('userRole', res.data.user.role);
          setDbUser(res.data.user);
        } catch (err) {
          console.error('Backend sync failed:', err);
        }
      } else {
        setUser(null);
        setDbUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const isAdmin = dbUser?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, dbUser, loading, isAdmin }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);