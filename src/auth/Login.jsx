import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Login() {
  const [email, setEmail]             = useState('');
  const [password, setPassword]       = useState('');
  const [error, setError]             = useState('');
  const [loading, setLoading]         = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember]       = useState(false);

  const { login } = useAuth();
  const nav        = useNavigate();

  const toggleShowPassword = () => setShowPassword(v => !v);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      // Optionally persist login across sessions
      if (remember) {
        auth.setPersistence('local'); // firebase/auth import must support this
      } else {
        auth.setPersistence('session');
      }

      await login(email, password);
      // wait for auth state to confirm
      const unsubscribe = onAuthStateChanged(auth, u => {
        if (u) {
          nav('/dashboard', { replace: true });
          unsubscribe();
        }
      });
    } catch (err) {
      console.error(err);
      setError('Invalid credentials');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-semibold text-center">Admin Login</h2>

        {error && (
          <p className="text-red-600 text-center">{error}</p>
        )}

        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="username"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="relative">
          <label htmlFor="password" className="block mb-1 font-medium">
            Password
          </label>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
            required
          />
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute inset-y-0 right-3 top-7 flex items-center text-gray-500 hover:text-gray-700"
            tabIndex={-1}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={remember}
              onChange={e => setRemember(e.target.checked)}
              className="form-checkbox h-4 w-4 text-blue-600"
            />
            <span className="ml-2">Remember me</span>
          </label>
    
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center items-center py-2 rounded text-white ${
            loading
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
          ) : null}
          {loading ? 'Logging in…' : 'Log In'}
        </button>
      </form>
    </div>
  );
}
