import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { FaGoogle } from 'react-icons/fa';

export default function UserLogin() {
  const { loading, user, signInWithGoogle } = useAuth();
  const navigate   = useNavigate();
  const location   = useLocation();
  const from       = location.state?.from?.pathname || '/';
  

  useEffect(() => {
    if (!loading && user) {
      navigate(from, { replace: true });
    }
  }, [loading, user]);

  if (loading) return <div className="text-center p-6 text-white">Loading…</div>;

  const handleGoogle = async () => {
    try {
      await signInWithGoogle();
    } catch (err) {
      console.error(err);
      alert('Google sign-in failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-700 to-pink-600 p-4">
      <div className="w-full max-w-sm bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-xl text-white text-center">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
          Welcome Back
        </h1>
        <p className="mb-6 text-sm text-white/80">
          Sign in to start mining your INF tokens and claiming airdrops.
        </p>
        <button
          onClick={handleGoogle}
          className="flex items-center justify-center w-full py-3 px-4 bg-white text-indigo-700 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          <FaGoogle className="mr-2 text-red-500" /> Sign in with Google
        </button>
      </div>
    </div>
  );
}
