import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FiClock, FiCalendar, FiShare2, FiMessageCircle } from "react-icons/fi";
import { Helmet } from "react-helmet-async";
import Spinner from "./Spinner";

const SITE_URL = "https://www.airdropinfinity.com"; // Change to your prod domain
const DEFAULT_IMAGE = `${SITE_URL}/Banner-3.png`; // fallback image

const BlogDetails = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const articleRef = useRef(null);

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

  // Progress bar effect (works for whole page)
  useEffect(() => {
    function updateProgress() {
      const article = articleRef.current;
      if (!article) {
        setProgress(0);
        return;
      }
      // const articleRect = article.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const articleTop = article.offsetTop;
      const articleHeight = article.offsetHeight;
      const windowHeight = window.innerHeight;

      if (scrollTop < articleTop) {
        setProgress(0);
        return;
      }
      const totalScrollable = articleHeight - windowHeight;
      const currentScrolled = scrollTop - articleTop;
      let percent = (currentScrolled / totalScrollable) * 100;
      percent = Math.max(0, Math.min(100, percent));
      setProgress(percent);
    }

    window.addEventListener("scroll", updateProgress);
    window.addEventListener("resize", updateProgress);
    // Recalculate on mount
    setTimeout(updateProgress, 400);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [loading]);

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

  // Clean up HTML tags for meta description
  const description =
    blog.excerpt ||
    (blog.content
      ? blog.content.replace(/<[^>]+>/g, "").slice(0, 150) + "..."
      : "");

  // Absolute image URL
  const image =
    blog.image && blog.image.startsWith("http")
      ? blog.image
      : blog.image
      ? `${SITE_URL}/${blog.image.replace(/^\/+/, "")}`
      : DEFAULT_IMAGE;

  // Canonical/OG/Twitter URLs
  const canonicalUrl = `${SITE_URL}/blog/${blog.slug}`;

  return (
    <>
      <Helmet>
        {/* Standard Meta */}
        <title>{blog.title} | Airdrop Infinity</title>
        <meta name='description' content={description} />
        <meta name='keywords' content={blog.tags?.join(", ")} />
        <link rel='canonical' href={canonicalUrl} />

        {/* Open Graph */}
        <meta property='og:title' content={`${blog.title} | Airdrop Infinity`} />
        <meta property='og:description' content={description} />
        <meta property='og:type' content='article' />
        <meta property='og:url' content={canonicalUrl} />
        <meta property='og:image' content={image} />
        <meta property='og:image:alt' content={blog.title} />
        <meta property='og:site_name' content='Airdrop Infinity' />

        {/* Twitter Card */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={`${blog.title} | Airdrop Infinity`} />
        <meta name='twitter:description' content={description} />
        <meta name='twitter:image' content={image} />
        <meta name='twitter:url' content={canonicalUrl} />

        {/* Article structured data (optional for advanced SEO) */}
        <script type='application/ld+json'>
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: blog.title,
            image: [image],
            datePublished: blog.date,
            dateModified: blog.updatedAt || blog.date,
            author: {
              "@type": "Person",
              name: blog.author || "Airdrop Infinity",
            },
            publisher: {
              "@type": "Organization",
              name: "Airdrop Infinity",
              logo: {
                "@type": "ImageObject",
                url: `${SITE_URL}/logo192.png`,
              },
            },
            description: description,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": canonicalUrl,
            },
          })}
        </script>
      </Helmet>

      {/* Reading progress bar */}
      <div className="fixed lg:top-20 top-16 left-0 w-full h-1 z-50 bg-transparent">
        <div
          className="h-1 bg-gradient-to-r from-blue-500 via-fuchsia-500 to-pink-500 transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='min-h-screen bg-gradient-to-r from-blue-900/5 via-purple-700/5 to-pink-600/5'
      >
        <article ref={articleRef} className='max-w-4xl mx-auto px-4 py-12'>
          <div className='mb-6'>
            <Link to='/blog' className='text-blue-600 hover:underline'>
              &larr; Read all articles
            </Link>
          </div>
          <header className='mb-12'>
            <motion.h1
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className='
                break-words
                text-2xl sm:text-3xl md:text-4xl lg:text-5xl
                font-bold mb-6 leading-tight
                text-gray-900 dark:text-white
                '
              style={{ wordBreak: "break-word" }}
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
                <span>{blog.readTime || "5"} min read</span>
              </div>
            </div>
            {image && (
              <div className='w-full aspect-[16/9] mb-8 rounded-xl overflow-hidden'>
                <motion.img
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  src={image}
                  alt={blog.title}
                  className='w-full h-full object-cover'
                  loading='lazy'
                />
              </div>
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
                      url: canonicalUrl,
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
        </article>
      </motion.div>
    </>
  );
};

export default BlogDetails;
