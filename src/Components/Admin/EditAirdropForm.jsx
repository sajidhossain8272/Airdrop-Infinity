// EditAirdropForm.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Spinner from '../Spinner';

const EditAirdropForm = () => {
  // Replace with your actual API URL
  const API_URL = 'https://crypto-store-server.vercel.app';
  const { featured_id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    featured_id: '',
    featured_title: '',
    featured_image: '',
    company_logo: '',
    category: '',
    description: '',
    type: '',
    type2: '',
    steps: '',
    availability: false,
    price: '',
    listed_price: '',
    network: '',
    network_logo: '',
    task: '',
    status: ''
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch the existing airdrop data
  useEffect(() => {
    const fetchAirdrop = async () => {
      try {
        const response = await fetch(`${API_URL}/api/airdrops/${featured_id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch airdrop data');
        }
        const data = await response.json();
        // Convert the steps array to a newline-separated string
        data.steps = data.steps.join('\n');
        setFormData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAirdrop();
  }, [featured_id, API_URL]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const stepsArray = formData.steps.split('\n').map((s) => s.trim()).filter((s) => s);
    const payload = { ...formData, steps: stepsArray };

    try {
      const response = await fetch(`${API_URL}/api/airdrops/${featured_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update airdrop');
      }
      setSuccess('Airdrop updated successfully');
      setTimeout(() => {
        navigate('/dashboard/airdrops');
      }, 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen min-w-screen"><Spinner /> </div>;

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Edit Airdrop</h1>
      {error && <div className="mb-4 text-red-500">{error}</div>}
      {success && <div className="mb-4 text-green-500">{success}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-bold text-gray-700">Featured ID</label>
          <input
            type="text"
            name="featured_id"
            value={formData.featured_id}
            onChange={handleChange}
            className="w-full border rounded-md p-2 bg-gray-100 cursor-not-allowed"
            disabled
          />
        </div>
        <div>
          <label className="block font-bold text-gray-700">Featured Title</label>
          <input
            type="text"
            name="featured_title"
            value={formData.featured_title}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block font-bold text-gray-700">Featured Image URL</label>
          <input
            type="text"
            name="featured_image"
            value={formData.featured_image}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block font-bold text-gray-700">Company Logo URL</label>
          <input
            type="text"
            name="company_logo"
            value={formData.company_logo}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block font-bold text-gray-700">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block font-bold text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-gray-700">Type</label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            />
          </div>
          <div>
            <label className="block font-bold text-gray-700">Type2</label>
            <input
              type="text"
              name="type2"
              value={formData.type2}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            />
          </div>
        </div>
        <div>
          <label className="block font-bold text-gray-700">Steps (one per line)</label>
          <textarea
            name="steps"
            value={formData.steps}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            placeholder="Enter one step per line"
          />
        </div>
        <div className="flex items-center space-x-2">
          <label className="font-bold text-gray-700">Availability</label>
          <input
            type="checkbox"
            name="availability"
            checked={formData.availability}
            onChange={handleChange}
            className="h-5 w-5"
          />
          <span className="text-gray-600">Available</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-gray-700">Price</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            />
          </div>
          <div>
            <label className="block font-bold text-gray-700">Listed Price</label>
            <input
              type="text"
              name="listed_price"
              value={formData.listed_price}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-gray-700">Network</label>
            <input
              type="text"
              name="network"
              value={formData.network}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            />
          </div>
          <div>
            <label className="block font-bold text-gray-700">Network Logo URL</label>
            <input
              type="text"
              name="network_logo"
              value={formData.network_logo}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-gray-700">Task</label>
            <input
              type="text"
              name="task"
              value={formData.task}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            />
          </div>
          <div>
            <label className="block font-bold text-gray-700">Status</label>
            <input
              type="text"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
            />
          </div>
        </div>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
          Update Airdrop
        </button>
      </form>
    </div>
  );
};

export default EditAirdropForm;
