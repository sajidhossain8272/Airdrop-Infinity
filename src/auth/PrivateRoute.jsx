import { Navigate } from 'react-router-dom';
import { useAuth }  from './AuthContext';
import PropTypes    from 'prop-types';

export default function PrivateRoute({ children }) {
  const { loading, isAdmin } = useAuth();

  if (loading) {
    return <div>Loading…</div>;
  }

  return isAdmin
    ? children
    : <Navigate to="/login" replace />;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
