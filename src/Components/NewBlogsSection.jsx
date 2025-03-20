import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";

const NewBlogsSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("https://crypto-store-server.vercel.app/api/blogs");
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
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

  if (loading) return <div className="flex justify-center items-center min-h-screen min-w-screen"><Spinner /> </div>;

  return (
    <section className="py-16 relative z-10 ">
      {/* New Blogs Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lato-bold text-center mb-8">Learn How Millions Are Succeeding with Crypto</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <motion.div 
                key={blog._id || blog.id}
                whileHover={{ scale: 1.02 }}
                className="card bg-white shadow-xl overflow-hidden group"
              >
                <div className="p-6">
                  <div className="mb-4">
                    <span className="badge bg-purple-100 text-purple-600">
                      {blog.category}
                    </span>
                  </div>
                  <h3 className="text-xl lato-bold mb-2">{blog.title}</h3>
                  <p className="text-gray-600 mb-4">{blog.excerpt}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{new Date(blog.date).toLocaleDateString()}</span>
                    <span>{blog.readTime}</span>
                  </div>
                </div>
                <div className="border-t border-gray-100">
                  <Link 
                    to={`/blog/${blog.slug}`}
                    className="block w-full text-center py-3 bg-gradient-to-r from-blue-900/5 via-purple-700/5 to-pink-600/5 hover:from-blue-900/10 hover:via-purple-700/10 hover:to-pink-600/10 transition-all"
                  >
                    Read More →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link 
              to="/blog"
              className="btn bg-gradient-to-r from-blue-900 via-purple-700 to-pink-600 text-white hover:scale-105 transition-transform duration-300"
            >
              View All Articles
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Start Your Crypto Journey Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 lg:pl-40 lg:pr-40 text-center mt-16"
      >
        <div className="backdrop-blur-lg bg-white/10 p-8 rounded-2xl shadow-xl">
          <h2 className="text-3xl lato-bold mb-4">Start Your Crypto Journey</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-600">
            Join millions of people leveraging crypto for smarter investments and a better life. 
            Explore verified airdrops, smart crypto gear, and actionable insights to get started today.
          </p>
          <div className="flex justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="btn bg-gradient-to-r from-blue-900 via-purple-700 to-pink-600 text-white shadow-lg"
            >
              Explore Airdrops
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="btn btn-outline border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white"
            >
              Learn More
            </motion.button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default NewBlogsSection;
