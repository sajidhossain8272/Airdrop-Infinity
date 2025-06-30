// src/Components/BlogList.jsx
import { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiChevronDown, FiArrowUp } from 'react-icons/fi';
import { Helmet } from 'react-helmet-async';
import Spinner from './Spinner';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [visibleBlogs, setVisibleBlogs] = useState(6);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let ignore = false;
    const fetchBlogs = async () => {
      try {
        const response = await fetch("https://crypto-store-server.vercel.app/api/blogs");
        if (!response.ok) throw new Error("Failed to fetch blogs");
        const data = await response.json();
        if (!ignore) setBlogs(data);
      } catch (error) {
        // Optionally show user-friendly error UI
        console.error("Error fetching blogs:", error);
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetchBlogs();
    return () => { ignore = true; };
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
      const matchesSearch = title.includes(searchQuery.toLowerCase()) || content.includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || category === selectedCategory;
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
    window.addEventListener('scroll', handleScroll, { passive: true });
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
      <div className="flex justify-center items-center min-h-screen min-w-screen bg-base-100 dark:bg-gray-900">
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

      <div className="min-h-screen bg-base-100 dark:bg-gray-900 lg:pl-40 lg:pr-40 px-4 py-12 bg-gradient-to-r from-blue-900/5 via-purple-700/5 to-pink-600/5 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 transition-colors">
        {/* Search & Category Filter */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                aria-label="Search articles"
                autoComplete="off"
              />
              <FiSearch className="absolute right-3 top-3.5 text-gray-400 dark:text-gray-500 pointer-events-none" />
            </div>

            <div className="relative">
              <button
                className="flex items-center justify-between w-full md:w-64 px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition"
                onClick={() => setIsCategoryOpen(o => !o)}
                aria-haspopup="listbox"
                aria-expanded={isCategoryOpen}
                aria-label="Select category"
                type="button"
              >
                {selectedCategory}
                <FiChevronDown
                  className={`ml-2 transform transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {isCategoryOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10"
                    tabIndex={-1}
                    role="listbox"
                  >
                    {categories.map(category => (
                      <li
                        key={category}
                        className={`px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors ${
                          selectedCategory === category
                            ? 'bg-purple-100 dark:bg-purple-900 font-semibold'
                            : ''
                        }`}
                        onClick={() => {
                          setSelectedCategory(category);
                          setIsCategoryOpen(false);
                        }}
                        role="option"
                        aria-selected={selectedCategory === category}
                        tabIndex={0}
                        onKeyDown={e => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            setSelectedCategory(category);
                            setIsCategoryOpen(false);
                          }
                        }}
                      >
                        {category}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <AnimatePresence>
          {displayedBlogs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 text-gray-500 dark:text-gray-400"
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
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden flex flex-col border border-gray-100 dark:border-gray-700"
                >
                  <Link
                    to={`/blog/${blog.slug}`}
                    state={{ backgroundLocation: location }}
                    className="block h-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {/* Image */}
                    <div className="aspect-[16/9] bg-gray-100 dark:bg-gray-700">
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
                          <span className="text-xs font-semibold px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 rounded">
                            {blog?.category || 'Uncategorized'}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            🕒 {blog?.readTime || '5 min read'} min read
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                          {blog?.title || 'Untitled Article'}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                          {blog?.excerpt || 'No excerpt available'}
                        </p>
                      </div>
                      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
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
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 p-3 bg-purple-600 dark:bg-purple-700 text-white rounded-full shadow-lg hover:bg-purple-700 dark:hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 z-50"
              aria-label="Scroll to top"
              type="button"
            >
              <FiArrowUp className="text-xl" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Load More Button */}
        {visibleBlogs < filteredBlogs.length && (
          <div className="text-center mt-10">
            <button
              onClick={() => setVisibleBlogs(prev => prev + 6)}
              className="px-6 py-3 bg-gradient-to-r from-blue-900 via-purple-700 to-pink-600 dark:from-purple-900 dark:via-purple-800 dark:to-pink-800 text-white rounded-lg hover:opacity-90 transition focus:outline-none focus:ring-2 focus:ring-purple-500"
              type="button"
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
