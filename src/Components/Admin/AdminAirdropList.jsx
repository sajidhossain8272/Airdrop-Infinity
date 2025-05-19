// src/Components/AdminAirdropList.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner';

const AdminAirdropList = () => {
  const [airdrops, setAirdrops] = useState([]);
  const [loading, setLoading]   = useState(true);
  const API_URL                 = 'https://crypto-store-server.vercel.app';

  const fetchAirdrops = async () => {
    try {
      const res  = await fetch(`${API_URL}/api/airdrops`);
      const data = await res.json();
      setAirdrops(data);
    } catch (err) {
      console.error('Error fetching airdrops:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAirdrops();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this airdrop?')) return;
    try {
      await fetch(`${API_URL}/api/airdrops/${id}`, { method: 'DELETE' });
      setAirdrops(airdrops.filter(a => a.featured_id !== id));
    } catch (err) {
      console.error('Error deleting airdrop:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8 bg-white rounded-lg shadow-md pt-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Airdrop Listing</h1>
        <Link
          to="/dashboard/airdrops/new"
          className="mt-4 sm:mt-0 inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
        >
          + Add New Airdrop
        </Link>
      </div>

      {/* Mobile: card list */}
      <div className="grid gap-4 sm:hidden">
        {airdrops.map(item => (
          <div
            key={item.featured_id}
            className="border border-gray-200 rounded-lg p-4 shadow-sm"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              {item.featured_title}
            </h2>
            <p className="text-sm text-gray-600"><span className="font-medium">Category:</span> {item.category}</p>
            <p className="text-sm text-gray-600"><span className="font-medium">Price:</span> {item.price}</p>
            <p className="text-sm text-gray-600 mb-3"><span className="font-medium">Status:</span> {item.status}</p>
            <div className="flex space-x-2">
              <Link
                to={`/dashboard/airdrops/edit/${item.featured_id}`}
                className="flex-1 text-center bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm transition"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(item.featured_id)}
                className="flex-1 text-center bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Tablet+ & Desktop: table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Featured Title
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Category
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Price
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Status
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {airdrops.map(item => (
              <tr key={item.featured_id}>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {item.featured_title}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {item.category}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {item.price}
                </td>
                <td className="px-4 py-2 text-sm text-gray-700">
                  {item.status}
                </td>
                <td className="px-4 py-2 space-x-2">
                  <Link
                    to={`/dashboard/airdrops/edit/${item.featured_id}`}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm transition"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(item.featured_id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition"
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
