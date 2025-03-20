// AdminAirdropList.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner';

const AdminAirdropList = () => {
  const [airdrops, setAirdrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = 'https://crypto-store-server.vercel.app'; // Replace with your actual server URL

  const fetchAirdrops = async () => {
    try {
      const response = await fetch(`${API_URL}/api/airdrops`);
      const data = await response.json();
      setAirdrops(data);
    } catch (error) {
      console.error('Error fetching airdrops:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAirdrops();
  }, []);

  const handleDelete = async (featured_id) => {
    if (window.confirm('Are you sure you want to delete this airdrop?')) {
      try {
        await fetch(`${API_URL}/api/airdrops/${featured_id}`, { method: 'DELETE' });
        setAirdrops(airdrops.filter(item => item.featured_id !== featured_id));
      } catch (error) {
        console.error('Error deleting airdrop:', error);
      }
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen min-w-screen"><Spinner /> </div>;

  return (
    <div className="admin-panel container mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Airdrop Listing</h1>
      <Link
        to="/dashboard/airdrops/new"
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors mb-4"
      >
        Add New Airdrop
      </Link>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Featured Title</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Category</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Price</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Status</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {airdrops.map((item) => (
              <tr key={item.featured_id}>
                <td className="px-4 py-2 text-sm text-gray-700">{item.featured_title}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{item.category}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{item.price}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{item.status}</td>
                <td className="px-4 py-2 space-x-2">
                  <Link
                    to={`/dashboard/airdrops/edit/${item.featured_id}`}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition-colors text-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(item.featured_id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAirdropList;
