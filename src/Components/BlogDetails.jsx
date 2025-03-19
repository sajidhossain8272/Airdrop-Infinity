import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import { FiClock, FiCalendar, FiShare2, FiMessageCircle } from 'react-icons/fi';
import { blogPosts } from '../data/blogPosts';

const BlogDetails = () => {
  const { slug } = useParams();
  const [showShare, setShowShare] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const blog = blogPosts.find(b => b.slug === slug);

  if (!blog) {
    throw new Response('Not Found', { 
      status: 404,
      statusText: 'Blog post not found' 
    });
  }

  const handleShare = () => {
    setShowShare(!showShare);
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.excerpt,
        url: window.location.href
      });
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, {
        id: comments.length + 1,
        author: 'User',
        content: newComment,
        date: new Date().toISOString()
      }]);
      setNewComment('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white"
    >
      <article className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-12">
          <motion.h1
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="text-4xl lg:text-5xl font-bold mb-6 leading-tight"
          >
            {blog.title}
          </motion.h1>
          
          <div className="flex items-center gap-4 text-gray-600 mb-8">
            <div className="flex items-center gap-2">
              <FiCalendar className="text-lg" />
              <span>
                {new Date(blog.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FiClock className="text-lg" />
              <span>{blog.readTime}</span>
            </div>
          </div>

          {blog.image && (
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={blog.image}
              alt={blog.title}
              className="w-full h-96 object-cover rounded-xl mb-8"
              loading="lazy"
            />
          )}
        </header>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="prose lg:prose-xl max-w-none"
        >
          <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
            {blog.content}
          </ReactMarkdown>
        </motion.div>

        <footer className="mt-12 border-t border-gray-100 pt-8">
          <div className="flex flex-wrap gap-2 mb-8">
            {[blog.category].map(tag => (
              <span
                key={tag}
                className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 text-gray-600 hover:text-purple-600"
            >
              <FiShare2 className="text-lg" />
              <span>Share</span>
            </button>
          </div>
        </footer>

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <FiMessageCircle className="text-purple-600" />
            {comments.length} Comments
          </h2>

          <form onSubmit={handleCommentSubmit} className="mb-8">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg mb-2"
              placeholder="Write a comment..."
              rows="3"
            />
            <button
              type="submit"
              className="btn bg-purple-600 text-white hover:bg-purple-700"
            >
              Post Comment
            </button>
          </form>

          <div className="space-y-6">
            {comments.map(comment => (
              <div key={comment.id} className="border-b border-gray-100 pb-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-semibold">{comment.author}</span>
                  <span className="text-gray-500 text-sm">
                    {new Date(comment.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700">{comment.content}</p>
              </div>
            ))}
          </div>
        </section>
      </article>
    </motion.div>
  );
};

export default BlogDetails;