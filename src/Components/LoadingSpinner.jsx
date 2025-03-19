// LoadingSpinner.jsx
export const LoadingSpinner = () => (
  <div className="text-center py-20">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
    <p className="mt-4 text-gray-600">Loading articles...</p>
  </div>
);

// ErrorDisplay.jsx
// eslint-disable-next-line react/prop-types
export const ErrorDisplay = ({ message }) => (
  <div className="text-center py-20 text-red-600">
    <h2 className="text-2xl mb-4">Error loading content</h2>
    <p className="mb-4">{message}</p>
    <button 
      className="btn bg-purple-600 text-white"
      onClick={() => window.location.reload()}
    >
      Try Again
    </button>
  </div>
);