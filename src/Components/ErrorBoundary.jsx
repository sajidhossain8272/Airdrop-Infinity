import { useRouteError, Link } from 'react-router-dom';
import { FiAlertTriangle } from 'react-icons/fi';

const ErrorBoundary = () => {
  const error = useRouteError();
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center max-w-2xl">
        <FiAlertTriangle className="text-6xl text-red-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-4">
          {error.status === 404 ? 'Page Not Found' : 'Something Went Wrong'}
        </h1>
        <p className="text-gray-600 mb-8">
          {error.statusText || error.message}
        </p>
        <Link
          to="/"
          className="btn bg-gradient-to-r from-blue-900 via-purple-700 to-pink-600 text-white"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorBoundary;