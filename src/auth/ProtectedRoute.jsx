// src/auth/ProtectedRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth }  from './AuthContext';
import PropTypes    from 'prop-types';

export default function ProtectedRoute({ children }) {
  const { loading, user } = useAuth();
  const location = useLocation();


  if (loading) {
    return <div>Loading…</div>;
  }

  return user
      ? children
    : <Navigate
        to="/user-login"
        replace
        state={{ from: location }}
      />;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
