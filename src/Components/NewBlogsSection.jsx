// src/Components/NewBlogsSection.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";
import {
  FaBitcoin,
  FaEthereum,
  FaHistory,
  FaChartLine,
  FaArrowRight,
  FaGlobe,
  FaGift,
  FaSearchDollar,
  FaHammer,
  FaBookOpen,
} from "react-icons/fa";
import { SiSolana, SiCardano, SiPolkadot } from "react-icons/si";

const COINS = [
  { id: "bitcoin", icon: <FaBitcoin /> },
  { id: "ethereum", icon: <FaEthereum /> },
  { id: "solana", icon: <SiSolana /> },
  { id: "cardano", icon: <SiCardano /> },
  { id: "polkadot", icon: <SiPolkadot /> },
];

export default function NewBlogsSection() {
  const [blogs, setBlogs] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [prices, setPrices] = useState([]);
  const [loadingPrices, setLoadingPrices] = useState(true);

  // — fetch blogs
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          "https://crypto-store-server.vercel.app/api/blogs"
        );
        if (!res.ok) throw new Error("Failed to fetch blogs");
        const data = await res.json();
        setBlogs(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingBlogs(false);
      }
    })();
  }, []);

  // — fetch live prices
  useEffect(() => {
    (async () => {
      try {
        const ids = COINS.map((c) => c.id).join(",");
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}`
        );
        const data = await res.json();
        setPrices(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingPrices(false);
      }
    })();
  }, []);

  if (loadingBlogs || loadingPrices) {
    return (
      <div className='flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-950'>
        <Spinner />
      </div>
    );
  }

  const journeyItems = [
    {
      icon: <FaGift />,
      text: "Earn tokens for simple social tasks & early engagement",
    },
    {
      icon: <FaSearchDollar />,
      text: "Discover the best upcoming DeFi & Web3 projects",
    },
    {
      icon: <FaHammer />,
      text: "Claim $INF token airdrop",
    },
    {
      icon: <FaBookOpen />,
      text: "Grow your crypto knowledge via Infinity Academy",
    },
  ];

  return (
    <section className='relative z-10 py-16 bg-gray-50 dark:bg-gray-950 transition-colors duration-300'>
      {/* — Live Prices Ticker */}
      <div className='overflow-x-auto'>
        <div className='flex gap-4 px-4 lg:px-0 lg:justify-center py-2'>
          {prices.map((coin) => {
            const change = coin.price_change_percentage_24h.toFixed(2);
            const up = change >= 0;
            // Show only the latest 3 blogs
            return (
              <div
                key={coin.id}
                className='flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 rounded-full shadow-md border border-gray-200 dark:border-gray-800'
              >
                <span className='text-xl dark:text-white'>
                  {COINS.find((c) => c.id === coin.id)?.icon}
                </span>
                <span className='font-semibold uppercase text-gray-700 dark:text-gray-200'>
                  {coin.symbol}
                </span>
                <span className='text-gray-800 dark:text-gray-100'>
                  ${coin.current_price.toLocaleString()}
                </span>
                <span className={up ? "text-green-500" : "text-red-500"}>
                  {up ? "+" : ""}
                  {change}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12'
      >
        <motion.h2
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.85,
            type: "spring",
            stiffness: 70,
            delay: 0.1,
          }}
          className='
    text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-12 tracking-tight
    text-gray-900 dark:text-white
    drop-shadow-[0_3px_20px_rgba(20,20,20,0.12)]
    flex flex-col items-center gap-2
  '
        >
          Learn How Millions Are Succeeding with Crypto
        </motion.h2>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
          {blogs.slice(0, 3).map((blog) => (
            <motion.div
              key={blog._id || blog.id}
              whileHover={{ scale: 1.02 }}
              className='bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden flex flex-col border border-gray-200 dark:border-gray-800 transition-colors'
            >
              {/* Category Pill */}
              <div className='px-6 pt-6'>
                <span className='inline-block bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 px-3 py-1 rounded-full text-xs font-medium'>
                  {blog.category}
                </span>
              </div>

              <div className='p-6 flex-1 flex flex-col'>
                <h3 className='text-xl font-semibold mb-4 flex-1 text-gray-900 dark:text-white'>
                  {blog.title}
                </h3>
                <div className='flex justify-between text-gray-500 dark:text-gray-400 text-sm'>
                  <span>{new Date(blog.date).toLocaleDateString()}</span>
                  <span>
                    🕒 {blog.readTime}
                    {blog.readTime &&
                    !blog.readTime.toLowerCase().includes("min")
                      ? " min read"
                      : ""}
                  </span>
                </div>
              </div>

              {/* Gradient Footer */}
              <Link
                to={`/blog/${blog.slug}`}
                className='block text-center py-4 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-medium hover:opacity-90 transition'
              >
                Read More →
              </Link>
            </motion.div>
          ))}
        </div>

        <div className='mt-12 text-center'>
          <Link
            to='/blog'
            className='inline-block px-8 py-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-full shadow-lg hover:scale-105 transition'
          >
            View All Articles
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20'
      >
        <motion.h2
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.85,
            type: "spring",
            stiffness: 70,
            delay: 0.1,
          }}
          className='
    text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-12 tracking-tight
    bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500
    bg-clip-text text-transparent
    drop-shadow-[0_3px_20px_rgba(162,38,255,0.20)]
    dark:from-fuchsia-300 dark:via-purple-400 dark:to-pink-400
    flex flex-col items-center gap-2
  '
        >
          <span className='inline-block animate-pulse text-4xl sm:text-5xl mb-1 drop-shadow-lg'>
            🚀
          </span>
          <span>
            Airdrop
            <span
              className='
      inline-block px-3 py-1 ml-2 mr-2 rounded-xl
      bg-white/90 dark:bg-gray-900/80
      border-l-4 border-fuchsia-500
      shadow-xl
      text-purple-700 dark:text-purple-200
      font-bold
      transition
      '
              style={{
                boxShadow: "0 6px 24px 0 rgba(162,38,255,0.10)",
              }}
            >
              Success
            </span>
            Stories
          </span>
          <span className='block text-base sm:text-lg mt-2 font-medium text-gray-700 dark:text-gray-300 tracking-normal opacity-85'>
            Real users. Real rewards.
          </span>
        </motion.h2>

        <div className='grid gap-8 sm:grid-cols-2'>
          {/* Uniswap */}
          <div className='bg-white dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-lg border-l-4 border-purple-500 p-6 rounded-2xl shadow-2xl hover:shadow-purple-300/50 transition duration-300 flex items-start gap-5'>
            <div className='p-4 bg-purple-100 dark:bg-purple-900 rounded-full'>
              <FaChartLine className='text-purple-600 dark:text-purple-300 text-3xl sm:text-5xl' />
            </div>
            <div>
              <h3 className='text-xl sm:text-2xl font-semibold text-purple-800 dark:text-purple-200 mb-2'>
                Uniswap (UNI)
              </h3>
              <p className='text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed'>
                In September 2020, Uniswap distributed{" "}
                <strong className='text-gray-900 dark:text-white'>
                  400 UNI
                </strong>{" "}
                to every past user—worth over{" "}
                <strong className='text-gray-900 dark:text-white'>
                  $12,000
                </strong>{" "}
                at the time. Early adopters netted a{" "}
                <strong className='text-gray-900 dark:text-white'>100×</strong>{" "}
                return for simply trying the platform.
              </p>
            </div>
          </div>

          {/* 1inch */}
          <div className='bg-white dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-lg border-l-4 border-yellow-500 p-6 rounded-2xl shadow-2xl hover:shadow-yellow-300/50 transition duration-300 flex items-start gap-5'>
            <div className='p-4 bg-yellow-100 dark:bg-yellow-900 rounded-full'>
              <FaHistory className='text-yellow-600 dark:text-yellow-300 text-3xl sm:text-5xl' />
            </div>
            <div>
              <h3 className='text-xl sm:text-2xl font-semibold text-yellow-800 dark:text-yellow-200 mb-2'>
                1inch (1INCH)
              </h3>
              <p className='text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed'>
                In December 2020, 1inch rewarded early users with thousands in{" "}
                <strong className='text-gray-900 dark:text-white'>
                  retroactive airdrops
                </strong>
                . Just by providing liquidity, participants received huge
                gains—no prior investment required.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* — Start Your Crypto Journey */}
      <motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, delay: 0.4 }}
  className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20"
>
  {/* Decorative gradient glow */}
  <div className="absolute inset-0 flex justify-center pointer-events-none">
    <div className="w-2/3 h-2/3 bg-gradient-to-r from-indigo-400 to-pink-400 rounded-full opacity-20 blur-3xl" />
  </div>

  <div className="relative bg-white dark:bg-gray-900 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-lg border border-gray-200 dark:border-gray-800 p-12 rounded-3xl shadow-2xl text-center overflow-hidden">
    {/* Icon */}
    <FaGlobe className="mx-auto text-5xl text-indigo-500 dark:text-indigo-400 mb-4 animate-pulse" />

    {/* Heading */}
    <h2 className="text-4xl font-extrabold mb-2 text-gray-800 dark:text-white">
      Start Your Crypto Journey
    </h2>

    {/* Updated Message */}
    <p className="text-lg text-gray-700 dark:text-gray-300 mb-2 max-w-2xl mx-auto">
      Airdrop Infinity rewards early adopters. By joining now, you can:
    </p>
    <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
      Join{" "}
      <span className="font-semibold text-indigo-600 dark:text-indigo-400">
        100,000+
      </span>{" "}
      early adopters and claim yours today.
    </p>

    {/* Feature List */}
   <motion.ul
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={{
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.15 },
    },
  }}
  className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto mb-10 text-left"
>
  {journeyItems.map((item, idx) => {
    const route =
      idx === 1
        ? "/listed-airdrop"
        : idx === 3
        ? "/blog"
        : "/infinity-drop";

    return (
      <Link to={route} key={idx} className="block">
        <motion.li
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}
          className="flex items-start gap-3 group cursor-pointer"
        >
          <div
            className="
              bg-indigo-100 dark:bg-indigo-900
              group-hover:bg-indigo-500
              p-2 rounded-full
              transition-colors
            "
          >
            {React.cloneElement(item.icon, {
              className: `
                text-xl
                text-indigo-600 dark:text-indigo-300
                group-hover:text-white
                transition-colors
              `,
            })}
          </div>
          <p
            className="
              text-gray-800 dark:text-gray-200
              group-hover:text-gray-900 dark:group-hover:text-white
              transition-colors
            "
          >
            {item.text}
          </p>
        </motion.li>
      </Link>
    );
  })}
</motion.ul>


    {/* CTA Buttons */}
    <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
      <Link
        to="/infinity-drop"
        aria-label="Join Infinity Drop"
        className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500 text-white rounded-full shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-300 transition"
      >
        Join Now <FaArrowRight className="ml-2" />
      </Link>
      <Link
        to="/blog"
        aria-label="Learn More"
        className="inline-flex items-center justify-center px-6 py-3 border-2 border-purple-600 dark:border-purple-400 text-purple-600 dark:text-purple-300 rounded-full hover:bg-purple-600 dark:hover:bg-purple-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-300 transition"
      >
        Learn More <FaArrowRight className="ml-2" />
      </Link>
    </div>
  </div>
</motion.div>
    </section>
  );
}
