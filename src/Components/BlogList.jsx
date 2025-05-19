// src/Components/BlogList.jsx
import { useState, useEffect, useMemo } from 'react';
import { Link, useLocation }           from 'react-router-dom';
import { motion, AnimatePresence }     from 'framer-motion';
import { FiSearch, FiChevronDown, FiArrowUp } from 'react-icons/fi';
import { Helmet }                      from 'react-helmet-async';
import Spinner                         from './Spinner';

const BlogList = () => {
  const [blogs, setBlogs]               = useState([]);
  const [loading, setLoading]           = useState(true);
  const [searchQuery, setSearchQuery]   = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isCategoryOpen, setIsCategoryOpen]     = useState(false);
  const [visibleBlogs, setVisibleBlogs]         = useState(6);
  const [showScrollTop, setShowScrollTop]       = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("https://crypto-store-server.vercel.app/api/blogs");
        if (!response.ok) throw new Error("Failed to fetch blogs");
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set((blogs || []).map(blog => blog?.category).filter(Boolean))
    ];
    return ['All', ...uniqueCategories];
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    return (blogs || []).filter(blog => {
      const title = blog?.title?.toLowerCase() || '';
      const content = blog?.content?.toLowerCase() || '';
      const category = blog?.category || '';
      const matchesSearch   = title.includes(searchQuery.toLowerCase())
                            || content.includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All'
                            || category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [blogs, searchQuery, selectedCategory]);

  const displayedBlogs = useMemo(
    () => filteredBlogs.slice(0, visibleBlogs),
    [filteredBlogs, visibleBlogs]
  );

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
        visibleBlogs < filteredBlogs.length
      ) {
        setVisibleBlogs(prev => prev + 6);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleBlogs, filteredBlogs.length]);

  useEffect(() => {
    setVisibleBlogs(6);
    window.scrollTo(0, 0);
  }, [selectedCategory, searchQuery]);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: 'smooth' });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen min-w-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      {/* --- SEO Meta Tags --- */}
      <Helmet>
        <title>Crypto Blog – Airdrop Infinity</title>
        <meta
          name="description"
          content={`Browse ${blogs.length} articles on crypto, airdrops, trading strategies, and blockchain insights.`}
        />
        <meta
          name="keywords"
          content="crypto, cryptocurrency, blockchain, airdrops, trading, Bitcoin, Ethereum, DeFi, blog"
        />
        <link rel="canonical" href={window.location.href} />
        {/* Open Graph */}
        <meta property="og:title" content="Crypto Blog – Airdrop Infinity" />
        <meta
          property="og:description"
          content={`Browse ${blogs.length} articles on crypto, airdrops, trading strategies, and blockchain insights.`}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
      </Helmet>

      <div className="min-h-screen bg-base-100 lg:pl-40 lg:pr-40 px-4 py-12 bg-gradient-to-r from-blue-900/5 via-purple-700/5 to-pink-600/5">
        {/* Search & Category Filter */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <FiSearch className="absolute right-3 top-3.5 text-gray-400" />
            </div>

            <div className="relative">
              <button
                className="flex items-center justify-between w-full md:w-64 px-4 py-3 rounded-lg border border-gray-200 bg-white"
                onClick={() => setIsCategoryOpen(o => !o)}
              >
                {selectedCategory}
                <FiChevronDown
                  className={`transform transition-transform ${
                    isCategoryOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isCategoryOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
                >
                  {categories.map(category => (
                    <li
                      key={category}
                      className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsCategoryOpen(false);
                      }}
                    >
                      {category}
                    </li>
                  ))}
                </motion.ul>
              )}
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <AnimatePresence>
          {displayedBlogs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 text-gray-500"
            >
              No articles found matching your criteria
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              layout
            >
              {displayedBlogs.map(blog => (
                <motion.article
                  key={blog._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden flex flex-col"
                >
                  <Link
                    to={`/blog/${blog.slug}`}
                    state={{ backgroundLocation: location }}
                    className="block h-full"
                  >
                    {/* Image */}
                    <div className="aspect-[16/9] bg-gray-100">
                      {blog?.image && (
                        <img
                          src={blog.image}
                          alt={blog?.title || 'Blog image'}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col justify-between h-full">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold px-2 py-1 bg-purple-100 text-purple-600 rounded">
                            {blog?.category || 'Uncategorized'}
                          </span>
                          <span className="text-sm text-gray-500">
                                       🕒  {blog?.readTime || '5 min read'} min read
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">
                          {blog?.title || 'Untitled Article'}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-3">
                          {blog?.excerpt || 'No excerpt available'}
                        </p>
                      </div>
                      <div className="mt-4 text-sm text-gray-500">
                        {blog?.date
                          ? new Date(blog.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })
                          : 'Date not available'}
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll to Top */}
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700"
          >
            <FiArrowUp className="text-xl" />
          </motion.button>
        )}

        {/* Load More Button */}
        {visibleBlogs < filteredBlogs.length && (
          <div className="text-center mt-10">
            <button
              onClick={() => setVisibleBlogs(prev => prev + 6)}
              className="px-6 py-3 bg-gradient-to-r from-blue-900 via-purple-700 to-pink-600 text-white rounded-lg hover:opacity-90 transition"
            >
              Load More Articles
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default BlogList;
