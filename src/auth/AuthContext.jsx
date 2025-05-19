import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [user, setUser]           = useState(null);
  const [loading, setLoading]     = useState(true);
  const adminEmail               = import.meta.env.VITE_ADMIN_EMAIL;

  useEffect(() => {
    // subscribe to auth state on mount
    const unsubscribe = onAuthStateChanged(auth, u => {
      setUser(u);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // only let through if there's a user AND their email matches the admin
  const isAdmin = !!user && user.email === adminEmail;

  async function login(email, password) {
    await signInWithEmailAndPassword(auth, email, password);
    // if creds wrong, it'll throw and you can catch in Login.jsx
  }

  function logout() {
    return signOut(auth);
  }

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};


export const useAuth = () => useContext(AuthContext);
