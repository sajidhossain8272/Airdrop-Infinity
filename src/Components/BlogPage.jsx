// src/Components/BlogPage.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import Spinner from './Spinner';
import { ErrorDisplay } from './LoadingSpinner'; // adjust to your actual error component
import BlogList from './BlogList';

const BlogPage = () => {
  const [blogs, setBlogs]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get('https://crypto-store-server.vercel.app/api/blogs');
        setBlogs(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load articles');
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) return <div className="flex justify-center items-center min-h-screen"><Spinner /></div>;
  if (error)   return <ErrorDisplay message={error} />;

  // dynamic description for SEO
  const description = `Browse ${blogs.length} expert articles on crypto, airdrops, trading strategies, 
                       and blockchain insights at Airdrop Infinity.`;

  return (
    <>
      <Helmet>
        <title>Crypto Blog – Airdrop Infinity</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={window.location.href} />

        {/* Open Graph */}
        <meta property="og:title" content="Crypto Blog – Airdrop Infinity" />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
      </Helmet>

      <BlogList blogs={blogs} />
    </>
  );
};

export default BlogPage;
