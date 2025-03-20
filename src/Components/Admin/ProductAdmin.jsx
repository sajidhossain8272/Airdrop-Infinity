import { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../Spinner';

const ProductAdmin = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    image: '',
    cashback: '',
    rating: '',
    reviews: '',
    discount: '',
    description: ''
  });

  // API Base URL
  const API_BASE_URL =
    window.location.hostname === 'localhost'
      ? 'http://localhost:5000/api/products'
      : 'https://crypto-store-server.vercel.app/api/products';

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(API_BASE_URL);
      if (response.data && Array.isArray(response.data)) {
        setProducts(response.data);
      } else {
        setError('Invalid data format received');
      }
    } catch (err) {
      setError('Failed to fetch products');
      console.error('Error fetching products:', err);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = selectedProduct ? 'put' : 'post';
      const url = selectedProduct
        ? `${API_BASE_URL}/${selectedProduct._id}`
        : API_BASE_URL;

      await axios[method](url, formData);
      resetForm();
      fetchProducts();
      setShowModal(false);
    } catch (err) {
      setError('Failed to save product');
      console.error('Error saving product:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      fetchProducts();
    } catch (err) {
      setError('Failed to delete product');
      console.error('Error deleting product:', err);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      price: '',
      image: '',
      cashback: '',
      rating: '',
      reviews: '',
      discount: '',
      description: ''
    });
    setSelectedProduct(null);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Product Admin Panel</h1>

      {error && <p className="text-red-600 p-2 bg-red-100 rounded mb-4">{error}</p>}

      {/* Button to open modal for creating new product */}
      <div className="mb-4">
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Add New Product
        </button>
      </div>

      {/* Product List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">Existing Products</h2>
        {loading ? (
          <div className="flex justify-center items-center min-h-screen min-w-screen"><Spinner /> </div>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className="p-4 border rounded-md flex justify-between items-center"
            >
              <div>
                <h3 className="font-medium text-gray-800">{product.title}</h3>
                <p className="text-gray-600">${product.price}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectedProduct(product);
                    setFormData({
                      title: product.title,
                      price: product.price,
                      image: product.image,
                      cashback: product.cashback,
                      rating: product.rating,
                      reviews: product.reviews,
                      discount: product.discount,
                      description: product.description || ''
                    });
                    setShowModal(true);
                  }}
                  className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal for add/edit product */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              {selectedProduct ? 'Edit Product' : 'Add New Product'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                {Object.entries(formData).map(([key, value]) => (
                  <div key={key} className="space-y-1">
                    <label className="block text-sm font-medium capitalize text-gray-600">
                      {key}
                    </label>
                    {key === 'description' ? (
                      <textarea
                        value={value}
                        onChange={(e) =>
                          setFormData({ ...formData, [key]: e.target.value })
                        }
                        className="w-full p-2 border rounded-md"
                        rows="4"
                        required
                      />
                    ) : (
                      <input
                        type={key === 'price' ? 'number' : 'text'}
                        value={value}
                        onChange={(e) =>
                          setFormData({ ...formData, [key]: e.target.value })
                        }
                        className="w-full p-2 border rounded-md"
                        required
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  {selectedProduct ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setShowModal(false);
                  }}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductAdmin;
