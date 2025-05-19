// src/auth/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence
} from 'firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);
  const adminEmail            = import.meta.env.VITE_ADMIN_EMAIL;

  useEffect(() => {
    // subscribe to Firebase auth state
    const unsubscribe = onAuthStateChanged(auth, u => {
      setUser(u);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // if you still need admin-only routes
  const isAdmin = !!user && user.email === adminEmail;

  // Google sign-in
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    // onAuthStateChanged will update `user`
  };

   // — Email/password login for admins, with "remember me" persistence —
  const login = async (email, password, remember) => {
    // choose persistence
    await setPersistence(
      auth,
      remember ? browserLocalPersistence : browserSessionPersistence
    );
    return signInWithEmailAndPassword(auth, email, password);
  };


  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAdmin,
     
        signInWithGoogle,
                login,

        logout

      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
