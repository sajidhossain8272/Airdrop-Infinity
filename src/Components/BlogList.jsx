/* eslint-disable no-unused-vars */
// src/Components/BlogList.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiChevronDown, FiArrowUp, FiRefreshCw } from 'react-icons/fi';
import { Helmet } from 'react-helmet-async';
import Spinner from './Spinner';

const PER_PAGE = 9;
const SKELETON_COUNT = PER_PAGE;

const sortOptions = [
  { value: 'date-desc', label: 'Newest First' },
  { value: 'date-asc', label: 'Oldest First' },
  { value: 'readTime-asc', label: 'Shortest Read' },
  { value: 'readTime-desc', label: 'Longest Read' },
  { value: 'title-asc', label: 'Title A–Z' },
  { value: 'title-desc', label: 'Title Z–A' },
];

// Debounce hook
const useDebounce = (value, delay = 300) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
};

// Skeleton card for loading state
const SkeletonCard = () => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden animate-pulse">
    <div className="aspect-[16/9] bg-gray-200 dark:bg-gray-700" />
    <div className="p-6 space-y-3">
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded" />
      <div className="h-4 bg-gray-300 dark:bg-gray-600 w-3/4 rounded" />
      <div className="h-4 bg-gray-300 dark:bg-gray-600 w-1/2 rounded" />
    </div>
  </div>
);

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 300);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState(sortOptions[0].value);
  const [page, setPage] = useState(1);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [loadedImages, setLoadedImages] = useState(new Set());

  const location = useLocation();

  // Fetch blogs
  useEffect(() => {
    let ignore = false;
    setError('');
    setLoading(true);

    (async () => {
      try {
        const res = await fetch("https://crypto-store-server.vercel.app/api/blogs");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        if (!ignore) setBlogs(data);
      } catch (err) {
        if (!ignore) setError("Failed to load articles. Please try again.");
        console.error(err);
      } finally {
        if (!ignore) setLoading(false);
      }
    })();

    return () => { ignore = true; };
  }, []);

  // Reset page on filter/sort/search change
  useEffect(() => {
    setPage(1);
    window.scrollTo(0, 0);
  }, [selectedCategory, debouncedSearch, sortBy]);

  // Show scroll-top button
  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.pageYOffset > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const categories = useMemo(() => {
    const setCats = new Set(blogs.map(b => b.category).filter(Boolean));
    return ['All', ...setCats];
  }, [blogs]);

  // Filter + sort pipeline
  const filteredSorted = useMemo(() => {
    const q = debouncedSearch.toLowerCase();
    return blogs
      .filter(b => (
        (b.title?.toLowerCase().includes(q) ||
         b.content?.toLowerCase().includes(q) ||
         b.excerpt?.toLowerCase().includes(q) ||
         b.slug?.toLowerCase().includes(q)) &&
        (selectedCategory === 'All' || b.category === selectedCategory)
      ))
      .sort((a, b) => {
        switch (sortBy) {
          case 'date-desc':    return new Date(b.date) - new Date(a.date);
          case 'date-asc':     return new Date(a.date) - new Date(b.date);
          case 'readTime-asc': return (parseInt(a.readTime)||0) - (parseInt(b.readTime)||0);
          case 'readTime-desc':return (parseInt(b.readTime)||0) - (parseInt(a.readTime)||0);
          case 'title-asc':    return a.title.localeCompare(b.title);
          case 'title-desc':   return b.title.localeCompare(a.title);
          default:             return 0;
        }
      });
  }, [blogs, debouncedSearch, selectedCategory, sortBy]);

  // Pagination slice
  const totalPages = Math.ceil(filteredSorted.length / PER_PAGE);
  const paginated = useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    return filteredSorted.slice(start, start + PER_PAGE);
  }, [filteredSorted, page]);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: 'smooth' });

  // Error UI
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-base-100 dark:bg-gray-900 px-4">
        <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="flex items-center px-4 py-2 bg-purple-600 dark:bg-purple-700 text-white rounded-lg hover:bg-purple-700 transition"
        >
          <FiRefreshCw className="mr-2" /> Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Infinity Academy – Airdrop Infinity</title>
        <meta name="description" content={`Browse ${blogs.length} crypto & blockchain articles.`} />
        <link rel="canonical" href={window.location.href} />
      </Helmet>

      <div className="min-h-screen bg-base-100 dark:bg-gray-900 lg:px-40 px-4 py-12 bg-gradient-to-r from-blue-900/5 via-purple-700/5 to-pink-600/5 dark:from-gray-900 transition-colors">

        {/* Filters / Sort / Search */}
        <div className="max-w-4xl mx-auto mb-12 flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full px-4 py-3 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 transition"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <FiSearch className="absolute right-3 top-3.5 text-gray-400 dark:text-gray-500" />
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              className="flex items-center justify-between w-full md:w-56 px-4 py-3 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition"
              onClick={() => setIsSortOpen(o => !o)}
              aria-haspopup="listbox"
              aria-expanded={isSortOpen}
            >
              {sortOptions.find(o => o.value === sortBy)?.label}
              <FiChevronDown className={`ml-2 transform ${isSortOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {isSortOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute w-full mt-1 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg z-10"
                  role="listbox"
                >
                  {sortOptions.map(opt => (
                    <li
                      key={opt.value}
                      className={`px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${
                        sortBy === opt.value ? 'bg-purple-100 dark:bg-purple-900 font-semibold' : ''
                      }`}
                      onClick={() => { setSortBy(opt.value); setIsSortOpen(false); }}
                      role="option"
                      aria-selected={sortBy === opt.value}
                    >
                      {opt.label}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* Category Dropdown */}
          <div className="relative">
            <button
              className="flex items-center justify-between w-full md:w-56 px-4 py-3 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition"
              onClick={() => setIsCategoryOpen(o => !o)}
              aria-haspopup="listbox"
              aria-expanded={isCategoryOpen}
            >
              {selectedCategory}
              <FiChevronDown className={`ml-2 transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {isCategoryOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute w-full mt-1 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg z-10"
                  role="listbox"
                >
                  {categories.map(cat => (
                    <li
                      key={cat}
                      className={`px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${
                        selectedCategory === cat ? 'bg-purple-100 dark:bg-purple-900 font-semibold' : ''
                      }`}
                      onClick={() => { setSelectedCategory(cat); setIsCategoryOpen(false); }}
                      role="option"
                      aria-selected={selectedCategory === cat}
                    >
                      {cat}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Blog Grid or Skeletons */}
        <AnimatePresence>
          {loading ? (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </motion.div>
          ) : paginated.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 text-gray-500 dark:text-gray-400">
              No articles found
            </motion.div>
          ) : (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginated.map(blog => (
                <motion.article
                  key={blog._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg overflow-hidden flex flex-col border dark:border-gray-700"
                >
                  <Link to={`/blog/${blog.slug}`} state={{ backgroundLocation: location }} className="block h-full">
                    {/* Image with fade-in */}
                    <div className="aspect-[16/9] bg-gray-100 dark:bg-gray-700 overflow-hidden">
                      {blog.image && (
                        <img
                          src={blog.image}
                          alt={blog.title}
                          loading="lazy"
                          onLoad={() => setLoadedImages(prev => new Set(prev).add(blog._id))}
                          className={`w-full h-full object-cover transition-opacity duration-500 ${
                            loadedImages.has(blog._id) ? 'opacity-100' : 'opacity-0'
                          }`}
                        />
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col justify-between h-full">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 rounded">
                            {blog.category || 'Uncategorized'}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            🕒 {blog.readTime || '5'} min read
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                          {blog.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                          {blog.excerpt}
                        </p>
                      </div>
                      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                        {blog.date
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10 space-x-2">
            <button
              onClick={() => setPage(p => Math.max(p - 1, 1))}
              disabled={page === 1}
              className={`px-3 py-2 rounded-lg border transition ${
                page === 1
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900'
              }`}
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-2 rounded-lg border transition ${
                  page === i + 1
                    ? 'bg-purple-600 dark:bg-purple-700 text-white'
                    : 'bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage(p => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className={`px-3 py-2 rounded-lg border transition ${
                page === totalPages
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900'
              }`}
            >
              Next
            </button>
          </div>
        )}

        {/* Scroll-to-top */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 p-3 bg-purple-600 dark:bg-purple-700 text-white rounded-full shadow-lg hover:bg-purple-700 dark:hover:bg-purple-800 focus:ring-2 focus:ring-purple-500 z-50"
            >
              <FiArrowUp className="text-xl" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default BlogList;
