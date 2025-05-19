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
  FaRocket,
  FaArrowRight,
  FaGlobe,
  FaBolt,
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
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner />
      </div>
    );
  }

  // before the return, define your journey items:
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
    text: "Start mining $INF tokens with our Telegram Bot",
  },
  {
    icon: <FaBookOpen />,
    text: "Grow your crypto knowledge via Infinity Academy",
  },
];
  return (
    <section className='relative z-10 py-16 bg-gray-50'>
      {/* — Live Prices Ticker */}
      <div className='overflow-x-auto'>
        <div className='flex gap-4 px-4 lg:px-0 lg:justify-center py-2'>
          {prices.map((coin) => {
            const change = coin.price_change_percentage_24h.toFixed(2);
            const up = change >= 0;
            return (
              <div
                key={coin.id}
                className='flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md'
              >
                <span className='text-xl'>
                  {COINS.find((c) => c.id === coin.id)?.icon}
                </span>
                <span className='font-semibold uppercase'>{coin.symbol}</span>
                <span>${coin.current_price.toLocaleString()}</span>
                <span className={up ? "text-green-500" : "text-red-500"}>
                  {up ? "+" : ""}
                  {change}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* — Blog Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12'
      >
        <h2 className='text-3xl font-bold text-center mb-12'>
          Learn How Millions Are Succeeding with Crypto
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
          {blogs.map((blog) => (
            <motion.div
              key={blog._id || blog.id}
              whileHover={{ scale: 1.02 }}
              className='bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col'
            >
              {/* Category Pill */}
              <div className='px-6 pt-6'>
                <span className='inline-block bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs'>
                  {blog.category}
                </span>
              </div>

              {/* Title & Meta */}
              <div className='p-6 flex-1 flex flex-col'>
                <h3 className='text-xl font-semibold mb-4 flex-1'>
                  {blog.title}
                </h3>
                <div className='flex justify-between text-gray-500 text-sm'>
                  <span>{new Date(blog.date).toLocaleDateString()}</span>
                  <span>{blog.readTime}</span>
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

      {/* — Success Stories */}
    <motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, delay: 0.2 }}
  className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20"
>
  <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-950 mb-12">
    🚀 Airdrop Success Stories
  </h2>

  <div className="grid gap-8 sm:grid-cols-2">
    {/* Uniswap */}
    <div className="bg-white bg-opacity-90 backdrop-blur-lg border-l-4 border-purple-500 p-6 rounded-2xl shadow-2xl hover:shadow-purple-300/50 transition duration-300 flex items-start gap-5">
      <div className="p-4 bg-purple-100 rounded-full">
        <FaChartLine className="text-purple-600 text-3xl sm:text-5xl" />
      </div>
      <div>
        <h3 className="text-xl sm:text-2xl font-semibold text-purple-800 mb-2">
          Uniswap (UNI)
        </h3>
        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
          In September 2020, Uniswap distributed{" "}
          <strong>400 UNI</strong> to every past user—worth over{" "}
          <strong>$12,000</strong> at the time. Early adopters netted a{" "}
          <strong>100×</strong> return for simply trying the platform.
        </p>
      </div>
    </div>

    {/* 1inch */}
    <div className="bg-white bg-opacity-90 backdrop-blur-lg border-l-4 border-yellow-500 p-6 rounded-2xl shadow-2xl hover:shadow-yellow-300/50 transition duration-300 flex items-start gap-5">
      <div className="p-4 bg-yellow-100 rounded-full">
        <FaHistory className="text-yellow-600 text-3xl sm:text-5xl" />
      </div>
      <div>
        <h3 className="text-xl sm:text-2xl font-semibold text-yellow-800 mb-2">
          1inch (1INCH)
        </h3>
        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
          In December 2020, 1inch rewarded early users with thousands in{" "}
          <strong>retroactive airdrops</strong>. Just by providing liquidity,
          participants received huge gains—no prior investment required.
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

      <div className="relative bg-white p-12 rounded-3xl shadow-2xl text-center overflow-hidden">
        {/* Heading */}
        <FaGlobe className="mx-auto text-5xl text-indigo-500 mb-4 animate-pulse" />
        <h2 className="text-4xl font-extrabold mb-2 text-gray-800">
          Start Your Crypto Journey
        </h2>
        <p className="text-lg text-gray-700 mb-2 max-w-2xl mx-auto">
          Airdrops reward early adopters and fans of DeFi. By joining now, you can:
        </p>
        <p className="text-sm text-gray-500 mb-8">
          Join <span className="font-semibold text-indigo-600">100,000+</span> early adopters and claim yours today.
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
          {journeyItems.map((item, idx) => (
            <motion.li
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
              className="flex items-start gap-3 group"
            >
              <div className="bg-indigo-100 group-hover:bg-indigo-500 p-2 rounded-full transition-colors">
                {React.cloneElement(item.icon, {
                  className: "text-xl text-indigo-600 group-hover:text-white",
                })}
              </div>
              <p className="text-gray-800 group-hover:text-gray-900 transition">
                {item.text}
              </p>
            </motion.li>
          ))}
        </motion.ul>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
          {/* Airdrops */}
          <Link
            to="/listed-airdrop"
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-full shadow-lg hover:scale-105 transition"
          >
            Explore Airdrops <FaArrowRight className="ml-2" />
          </Link>

          {/* Blog */}
          <Link
            to="/blog"
            className="inline-flex items-center justify-center px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-full hover:bg-purple-600 hover:text-white transition"
          >
            Learn More <FaArrowRight className="ml-2" />
          </Link>

          {/* Highlighted Mining Button */}
          <a
            href="https://t.me/airdropinfinitibot"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold rounded-full shadow-xl hover:scale-105 transition"
          >
            <FaBolt className="mr-2" />
            Start Mining INF
          </a>
        </div>
      </div>
    </motion.div>
    </section>
  );
}
