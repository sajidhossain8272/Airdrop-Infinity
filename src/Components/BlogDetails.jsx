// src/Components/BlogDetails.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FiClock, FiCalendar, FiShare2, FiMessageCircle } from "react-icons/fi";
import { Helmet } from "react-helmet-async";
import Spinner from "./Spinner";

const BlogDetails = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `https://crypto-store-server.vercel.app/api/blogs/slug/${slug}`
        );
        setBlog(response.data);
      } catch (err) {
        setError("Blog post not found");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <p className='text-red-600'>{error || "Blog post not found"}</p>
      </div>
    );
  }

  // use excerpt or first 150 chars of content (strip HTML)
  const description =
    blog.excerpt || blog.content.replace(/<[^>]+>/g, "").slice(0, 150) + "...";

  return (
    <>
      <Helmet>
        <title>{blog.title} | Airdrop Infinity</title>
        <meta name='description' content={description} />
        <link rel='canonical' href={window.location.href} />

        {/* Open Graph */}
        <meta
          property='og:title'
          content={blog.title + " | Airdrop Infinity"}
        />
        <meta property='og:description' content={description} />
        <meta property='og:type' content='article' />
        <meta property='og:url' content={window.location.href} />
        {blog.image && (
          <meta
            property='og:image'
            content={
              blog.image.startsWith("http")
                ? blog.image
                : `${window.location.origin}/${blog.image}`
            }
          />
        )}
      </Helmet>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='min-h-screen bg-gradient-to-r from-blue-900/5 via-purple-700/5 to-pink-600/5'
      >
        <article className='max-w-4xl mx-auto px-4 py-12'>
          <div className='mb-6'>
            <Link to='/blog' className='text-blue-600 hover:underline'>
              &larr; Read all articles
            </Link>
          </div>

          <header className='mb-12'>
            <motion.h1
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className='text-4xl lg:text-5xl font-bold mb-6 leading-tight'
            >
              {blog.title}
            </motion.h1>
            <div className='flex items-center gap-4 text-gray-600 mb-8'>
              <div className='flex items-center gap-2'>
                <FiCalendar className='text-lg' />
                <span>
                  {new Date(blog.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <FiClock className='text-lg' />
                <span>{blog.readTime || "5 min read"} min read</span>
              </div>
            </div>
            {blog.image && (
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={blog.image}
                alt={blog.title}
                className='w-full h-96 object-cover rounded-xl mb-8'
                loading='lazy'
              />
            )}
          </header>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='prose prose-lg lg:prose-xl max-w-none prose-headings:font-semibold prose-p:leading-relaxed prose-ul:list-disc prose-li:marker:text-purple-500 prose-a:text-blue-600 prose-a:underline'
          >
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </motion.div>

          <footer className='mt-12 border-t border-gray-100 pt-8'>
            <div className='flex flex-wrap gap-2 mb-8'>
              {[blog.category].map((tag) => (
                <span
                  key={tag}
                  className='px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm'
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className='flex items-center justify-between'>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: blog.title,
                      text: blog.excerpt,
                      url: window.location.href,
                    });
                  }
                }}
                className='flex items-center gap-2 text-gray-600 hover:text-purple-600'
              >
                <FiShare2 className='text-lg' />
                <span>Share</span>
              </button>
            </div>
          </footer>

          <section className='mt-12'>
            <h2 className='text-2xl font-bold mb-6 flex items-center gap-2'>
              <FiMessageCircle className='text-purple-600' />0 Comments
            </h2>
            {/* Future comment section */}
          </section>
        </article>
      </motion.div>
    </>
  );
};

export default BlogDetails;
