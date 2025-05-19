// src/auth/UserLogin.jsx
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { FaGoogle } from 'react-icons/fa';

export default function UserLogin() {
  const { loading, user, signInWithGoogle } = useAuth();
  const navigate   = useNavigate();
  const location   = useLocation();
  const from       = location.state?.from?.pathname || '/';

  // If they’re already signed in, send them back
  useEffect(() => {
    if (!loading && user) {
      navigate(from, { replace: true });
    }
  }, [loading, user]);

  if (loading) return <div>Loading…</div>;

  const handleGoogle = async () => {
    try {
      await signInWithGoogle();
      // on success, the effect above will rerun and redirect
    } catch (err) {
      console.error(err);
      alert('Google sign-in failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded shadow max-w-sm w-full text-center">
        <h2 className="text-2xl mb-6">Sign in with Google</h2>
        <button
          onClick={handleGoogle}
          className="flex items-center justify-center w-full py-2 px-4 border rounded hover:bg-gray-100"
        >
          <FaGoogle className="mr-2 text-red-500" /> Sign in with Google
        </button>
      </div>
    </div>
  );
}
