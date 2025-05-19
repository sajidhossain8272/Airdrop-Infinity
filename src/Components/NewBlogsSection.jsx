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
      icon: <FaChartLine />,
      text: "Discover high-growth tokens before they list on exchanges.",
    },
    {
      icon: <FaBitcoin />,
      text: "Get free tokens just for trying new protocols & sharing feedback.",
    },
    {
      icon: <FaHistory />,
      text: "Learn from historic successes like Uniswap’s 100× windfall.",
    },
    {
      icon: <FaRocket />,
      text: "Be first in line for the next big DeFi airdrop.",
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
        className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20'
      >
        <h2 className='text-3xl font-bold text-center mb-12'>
          Airdrop Success Stories
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
          {/* Uniswap */}
          <div className='bg-white p-8 rounded-2xl shadow-lg flex gap-6'>
            <div className='flex-shrink-0 bg-purple-100 p-4'>
              <FaChartLine className='lg:text-6xl text-3xl text-purple-600' />
            </div>
            <div>
              <h3 className='text-xl font-semibold mb-2'>Uniswap (UNI)</h3>
              <p className='text-gray-700'>
                In September 2020, Uniswap distributed <strong>400 UNI</strong>{" "}
                to every past user— worth over <strong>$12,000</strong> at the
                time, netting many early adopters a<strong>100×</strong>{" "}
                windfall.
              </p>
            </div>
          </div>

          {/* 1inch */}
          <div className='bg-white p-8 rounded-2xl shadow-lg flex gap-6'>
            <div className='flex-shrink-0 bg-yellow-100 p-4'>
              <FaHistory className='lg:text-6xl text-3xl text-yellow-600' />
            </div>
            <div>
              <h3 className='text-xl font-semibold mb-2'>1inch (1INCH)</h3>
              <p className='text-gray-700'>
                December 2020 saw 1inch retro airdrop to liquidity
                providers—some users walked away with{" "}
                <strong>thousands of dollars</strong> just for early
                participation.
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
        className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20'
      >
        {/* Decorative blurred blob behind */}
        <div className='absolute inset-0 flex justify-center pointer-events-none'>
          <div className='w-2/3 h-2/3 bg-gradient-to-r from-indigo-400 to-pink-400 rounded-full opacity-20 filter blur-3xl' />
        </div>

        <div className='relative bg-white p-12 rounded-3xl shadow-2xl text-center overflow-hidden'>
          {/* Heading */}
          <FaRocket className='mx-auto text-4xl text-indigo-500 mb-4' />
          <h2 className='text-4xl font-extrabold mb-2'>
            Start Your Crypto Journey
          </h2>
          <p className='text-lg text-gray-700 mb-2 max-w-2xl mx-auto'>
            Airdrops reward early adopters and fans of DeFi. By joining now, you
            can:
          </p>
          <p className='text-sm text-gray-500 mb-8'>
            Join <span className='font-semibold text-indigo-600'>100,000+</span>{" "}
            early adopters and claim yours today.
          </p>

          {/* Animated list */}
          <motion.ul
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.15 },
              },
            }}
            className='grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto mb-10 text-left'
          >
            {journeyItems.map((item, idx) => (
              <motion.li
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                className='flex items-start gap-3 group'
              >
                <div className='bg-indigo-100 group-hover:bg-indigo-500 p-2 rounded-full transition-colors'>
                  {React.cloneElement(item.icon, {
                    className: "text-xl text-indigo-600 group-hover:text-white",
                  })}
                </div>
                <p className='text-gray-800 group-hover:text-gray-900 transition'>
                  {item.text}
                </p>
              </motion.li>
            ))}
          </motion.ul>

          {/* CTA buttons */}
          <div className='flex flex-col sm:flex-row justify-center gap-4'>
            <Link
              to='/listed-airdrop'
              className='inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-full shadow-lg hover:scale-105 transition'
            >
              Explore Airdrops <FaArrowRight className='ml-2' />
            </Link>
            <Link
              to='/blog'
              className='inline-flex items-center justify-center px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-full hover:bg-purple-600 hover:text-white transition'
            >
              Learn More <FaArrowRight className='ml-2' />
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
