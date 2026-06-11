import { useState } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  
  const login = async (credentials) => {
    // API Call to /api/auth/login
    // Set localStorage with JWT
  };

  return { user, login };
};