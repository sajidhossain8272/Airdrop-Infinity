// src/Components/BlogAdmin.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Spinner from '../Spinner';

const BlogAdmin = () => {
  const [blogs, setBlogs]           = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showModal, setShowModal]   = useState(false);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState('');
  const [formData, setFormData]     = useState({
    title: '', slug: '', content: '',
    category: '', readTime: '',
    image: '', excerpt: ''
  });

  const API_BASE_URL = 'https://crypto-store-server.vercel.app/api/blogs';

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.get(API_BASE_URL);
      if (Array.isArray(data)) setBlogs(data);
      else setError('Invalid data format received');
    } catch (err) {
      console.error(err);
      setError('Failed to fetch blogs');
    }
    setLoading(false);
  };

  const resetForm = () => {
    setFormData({ title:'', slug:'', content:'', category:'', readTime:'', image:'', excerpt:'' });
    setSelectedBlog(null);
  };

  const handleSubmit = async e => {
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
      console.error(err);
      setError('Failed to save blog');
    }
  };

  const handleDelete = async id => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      fetchBlogs();
    } catch (err) {
      console.error(err);
      setError('Failed to delete blog');
    }
  };

  const openModalForNew = () => {
    resetForm();
    setShowModal(true);
  };

  const openModalForEdit = blog => {
    setSelectedBlog(blog);
    setFormData({
      title:     blog.title,
      slug:      blog.slug,
      content:   blog.content,
      category:  blog.category,
      readTime:  blog.readTime,
      image:     blog.image,
      excerpt:   blog.excerpt
    });
    setShowModal(true);
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-screen-lg mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Blog Admin Panel</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <button
        onClick={openModalForNew}
        className="mb-6 inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        + Add New Blog
      </button>

      {loading ? (
        <div className="flex justify-center py-10"><Spinner /></div>
      ) : (
        <div className="space-y-4">
          {blogs.map(blog => (
            <div
              key={blog._id}
              className="bg-white p-4 sm:p-6 rounded-lg shadow hover:shadow-md transition flex flex-col sm:flex-row sm:justify-between sm:items-center"
            >
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{blog.title}</h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{blog.excerpt}</p>
              </div>
              <div className="mt-4 sm:mt-0 flex gap-2">
                <button
                  onClick={() => openModalForEdit(blog)}
                  className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white w-full max-w-full sm:max-w-2xl md:max-w-3xl p-4 sm:p-6 md:p-8 rounded-lg shadow-lg overflow-auto max-h-screen">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-xl text-gray-500 hover:text-gray-800"
            >
              &times;
            </button>
            <h2 className="text-xl md:text-2xl font-semibold mb-4">
              {selectedBlog ? 'Edit Blog' : 'Add New Blog'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    className="w-full border p-2 rounded"
                    required
                  />
                </div>
                {/* Slug */}
                <div>
                  <label className="block text-sm font-medium mb-1">Slug</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={e => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full border p-2 rounded"
                    required
                  />
                </div>
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full border p-2 rounded"
                    required
                  />
                </div>
                {/* Read Time */}
                <div>
                  <label className="block text-sm font-medium mb-1">Read Time (min)</label>
                  <input
                    type="number"
                    value={formData.readTime}
                    onChange={e => setFormData({ ...formData, readTime: e.target.value })}
                    className="w-full border p-2 rounded"
                    required
                  />
                </div>
                {/* Image URL */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium mb-1">Image URL</label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={e => setFormData({ ...formData, image: e.target.value })}
                    className="w-full border p-2 rounded"
                    required
                  />
                </div>
                {/* Excerpt */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium mb-1">Excerpt</label>
                  <input
                    type="text"
                    value={formData.excerpt}
                    onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                    className="w-full border p-2 rounded"
                    required
                  />
                </div>
                {/* Content */}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium mb-1">Content</label>
                  <ReactQuill
                    theme="snow"
                    value={formData.content}
                    onChange={value => setFormData({ ...formData, content: value })}
                    className="h-64"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-center"
                >
                  {selectedBlog ? 'Update Blog' : 'Create Blog'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setShowModal(false);
                  }}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded text-center"
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
