import { useState, useEffect } from 'react';
import BlogList from './BlogList';
import { ErrorDisplay, LoadingSpinner } from './LoadingSpinner';
import axios from 'axios';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('https://crypto-store-server.vercel.app/api/blogs');
        setBlogs(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay message={error} />;

  return (
    <div>
      <BlogList blogs={blogs} />
    </div>
  );
};

export default BlogPage;
