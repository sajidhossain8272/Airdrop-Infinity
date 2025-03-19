import { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { FiSearch, FiChevronDown, FiArrowUp } from 'react-icons/fi';

const BlogList = ({ blogs = [] }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [visibleBlogs, setVisibleBlogs] = useState(6);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();

  // Safely get categories
  const categories = useMemo(() => {
    const blogCategories = Array.isArray(blogs) ? blogs : [];
    const uniqueCategories = [...new Set(blogCategories
      .map(blog => blog?.category)
      .filter(Boolean))];
    return ['All', ...uniqueCategories];
  }, [blogs]);

  // Safely filter blogs
  const filteredBlogs = useMemo(() => {
    const validBlogs = Array.isArray(blogs) ? blogs : [];
    return validBlogs.filter(blog => {
      const title = blog?.title?.toLowerCase() || '';
      const content = blog?.content?.toLowerCase() || '';
      const category = blog?.category || '';
      
      const matchesSearch = title.includes(searchQuery.toLowerCase()) ||
                          content.includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || 
                            category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [blogs, searchQuery, selectedCategory]);

  const displayedBlogs = useMemo(() => {
    return filteredBlogs.slice(0, visibleBlogs);
  }, [filteredBlogs, visibleBlogs]);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && 
          visibleBlogs < filteredBlogs.length) {
        setVisibleBlogs(prev => prev + 6);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleBlogs, filteredBlogs.length]);

  // Reset on filter change
  useEffect(() => {
    setVisibleBlogs(6);
    window.scrollTo(0, 0);
  }, [selectedCategory, searchQuery]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <> 

    <div className="min-h-screen bg-base-100 lg:pl-40 lg:pr-40 px-4 py-12">
      {/* Search and Filter Section */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="relative flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FiSearch className="absolute right-3 top-3.5 text-gray-400" />
          </div>

          <div className="relative">
            <button
              className="flex items-center justify-between w-full md:w-64 px-4 py-3 rounded-lg border border-gray-200 bg-white"
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              aria-haspopup="listbox"
              aria-expanded={isCategoryOpen}
            >
              {selectedCategory}
              <FiChevronDown className={`transform transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
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

      {/* Blog List */}
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
                key={blog?.id || Math.random()}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="card bg-white shadow-lg hover:shadow-xl transition-shadow"
              >
                <Link
                  to={`/blog/${blog?.slug || ''}`}
                  state={{ backgroundLocation: location }}
                  className="block h-full"
                >
                  <figure className="h-48 overflow-hidden rounded-t-lg bg-gray-100">
                    {blog?.image && (
                      <img
                        src={blog.image}
                        alt={blog?.title || 'Blog post image'}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    )}
                  </figure>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="badge bg-purple-100 text-purple-600 text-sm">
                        {blog?.category || 'Uncategorized'}
                      </span>
                      <span className="text-sm text-gray-500">
                        {blog?.readTime || '5 min read'}
                      </span>
                    </div>
                    <h3 className="text-xl lato-bold mb-2">
                      {blog?.title || 'Untitled Article'}
                    </h3>
                    <p className="text-gray-600 line-clamp-3">
                      {blog?.excerpt || 'No excerpt available'}
                    </p>
                    <div className="mt-4 text-sm text-gray-500">
                      {blog?.date ? (
                        new Date(blog.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })
                      ) : (
                        'Date not available'
                      )}
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
          className="fixed bottom-8 right-8 p-3 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-colors"
          aria-label="Scroll to top"
        >
          <FiArrowUp className="text-xl" />
        </motion.button>
      )}

      {/* Load More */}
      {visibleBlogs < filteredBlogs.length && (
        <div className="text-center mt-8">
          <button
            className="btn bg-gradient-to-r from-blue-900 via-purple-700 to-pink-600 text-white"
            onClick={() => setVisibleBlogs(prev => prev + 6)}
          >
            Load More Articles
          </button>
        </div>
      )}
    </div>
    </>
  );
};

BlogList.defaultProps = {
  blogs: []
};

BlogList.propTypes = {
  blogs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      title: PropTypes.string,
      slug: PropTypes.string,
      excerpt: PropTypes.string,
      content: PropTypes.string,
      category: PropTypes.string,
      date: PropTypes.string,
      readTime: PropTypes.string,
      image: PropTypes.string
    })
  )
};

export default BlogList;