// BlogAdmin.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Spinner from '../Spinner';

const BlogAdmin = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    category: '',
    readTime: '',
    image: '',
    excerpt: ''
  });

  const API_BASE_URL = 'https://crypto-store-server.vercel.app/api/blogs';

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(API_BASE_URL);
      if (response.data && Array.isArray(response.data)) {
        setBlogs(response.data);
      } else {
        setError('Invalid data format received');
      }
    } catch (err) {
      setError('Failed to fetch blogs');
      console.error('Error fetching blogs:', err);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedBlog) {
        await axios.put(`${API_BASE_URL}/${selectedBlog._id}`, formData);
      } else {
        await axios.post(API_BASE_URL, formData);
      }
      resetForm();
      fetchBlogs();
      setShowModal(false);
    } catch (err) {
      setError('Failed to save blog');
      console.error('Error saving blog:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      fetchBlogs();
    } catch (err) {
      setError('Failed to delete blog');
      console.error('Error deleting blog:', err);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      content: '',
      category: '',
      readTime: '',
      image: '',
      excerpt: ''
    });
    setSelectedBlog(null);
  };

  const openModalForNew = () => {
    resetForm();
    setShowModal(true);
  };

  const openModalForEdit = (blog) => {
    setSelectedBlog(blog);
    setFormData({
      title: blog.title,
      slug: blog.slug,
      content: blog.content,
      category: blog.category,
      readTime: blog.readTime,
      image: blog.image,
      excerpt: blog.excerpt
    });
    setShowModal(true);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Blog Admin Panel</h1>

      {error && <p className="text-red-600 p-2 bg-red-100 rounded mb-4">{error}</p>}

      {/* Button to open modal */}
      <div className="mb-4">
        <button 
          onClick={openModalForNew}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Add New Blog
        </button>
      </div>

      {/* Blog List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">Existing Blogs</h2>
        {loading ? (
          <div className="flex justify-center items-center min-h-screen min-w-screen"><Spinner /> </div>
        ) : (
          blogs.map((blog) => (
            <div key={blog._id} className="p-4 border rounded-md flex justify-between items-center">
              <div>
                <h3 className="font-medium text-gray-800">{blog.title}</h3>
                <p className="text-gray-600">{blog.excerpt}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => openModalForEdit(blog)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              {selectedBlog ? 'Edit Blog' : 'Add New Blog'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Title */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                {/* Slug */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">Slug</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                {/* Category */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                {/* Read Time */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-600">Read Time (minutes)</label>
                  <input
                    type="number"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                {/* Image */}
                <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-600">Image URL</label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                {/* Excerpt */}
                <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-600">Excerpt</label>
                  <input
                    type="text"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                {/* Content */}
                <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-600">Content</label>
                  <ReactQuill
                    theme="snow"
                    value={formData.content}
                    onChange={(value) => setFormData({ ...formData, content: value })}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  {selectedBlog ? 'Update' : 'Create'}
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

export default BlogAdmin;
