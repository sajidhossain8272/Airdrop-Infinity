import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth }     from './AuthContext';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase'; // Adjust the path if your firebase config is elsewhere

export default function Login() {
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]     = useState('');
  const { login }             = useAuth();
  const nav                    = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await login(email, password);
      // now wait for the listener to fire:
      const unsubscribe = onAuthStateChanged(auth, (u) => {
        if (u) {
          nav('/dashboard', { replace: true });
          unsubscribe();
        }
      });
    } catch {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit}
            className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl mb-6 text-center">Admin Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <label className="block mb-4">
          <span>Email</span>
                   <input
          type="email"
           name="email"
           autoComplete="username"
           value={email}
           onChange={e => setEmail(e.target.value)}
           className="mt-1 block w-full border-gray-300 rounded"
           required
         />

        </label>
        <label className="block mb-6">
          <span>Password</span>
           <input
           type="password"
           name="password"
           autoComplete="current-password"
           value={password}
           onChange={e => setPassword(e.target.value)}
           className="mt-1 block w-full border-gray-300 rounded"
           required
         />
        </label>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Log In
        </button>
      </form>
    </div>
  );
}
