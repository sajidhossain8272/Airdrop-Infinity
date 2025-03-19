// Parent component example
import { useState, useEffect } from 'react';
import BlogList from './components/BlogList';
import { ErrorDisplay, LoadingSpinner } from './LoadingSpinner';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blogs');
        const data = await response.json();
        setBlogs(data);
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