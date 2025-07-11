// src/Components/Banner.jsx
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "./Spinner";

const Banner = () => {
  const [airdrops, setAirdrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = "https://crypto-store-server.vercel.app/api/airdrops";

  useEffect(() => {
    const fetchAirdrops = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        // Sort so newest (latest) posted airdrops appear first
        if (Array.isArray(data) && data.length && data[0].createdAt) {
          data.sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        } else {
          // fallback: reverse order
          data.reverse();
        }
        setAirdrops(data);
      } catch (err) {
        console.error("Error fetching airdrops:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAirdrops();
  }, [API_URL]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen min-w-screen dark:bg-gray-900">
        <Spinner />
      </div>
    );
  }

  // categorize
  const featuredData = airdrops.filter((item) => item.category === "featured");
  const newData = airdrops.filter((item) => item.category === "new");
  const exchangeData = airdrops.filter((item) => item.category === "exchange");

  return (
    <div className="lato-regular bg-gradient-to-r from-blue-900/5 via-purple-700/5 to-pink-600/5 overflow-hidden dark:from-gray-900/80 dark:via-gray-900/90 dark:to-gray-900/80">
      {/* Hero Title */}
<h1 className="text-3xl lg:text-6xl font-black px-8 pt-8 lg:pt-12 lg:px-96 text-gray-900 dark:text-white">
  Airdrop Infinity
  <br className="hidden lg:block" />
  <span
    className="
      inline-block px-3 py-1 rounded-xl
      bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500
      backdrop-blur-md
      text-transparent bg-clip-text
      font-semibold
      drop-shadow-md
      dark:from-purple-800 dark:via-fuchsia-600 dark:to-pink-600
    "
  >
    – the best crypto airdrops of 2025!
  </span>
</h1>





      <section
        aria-label="Exchange Referral Programs"
        className="mt-8 px-4 lg:px-96"
      >
       <h2
    className="
      text-2xl font-bold mb-4
      bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500
      bg-clip-text text-transparent
    "
  >
    Exchange Referral Programs
  </h2>
  <p
    className="
      mb-4 p-6
      bg-gradient-to-r from-purple-900/10 via-fuchsia-700/10 to-pink-600/10
      dark:from-gray-800/50 dark:via-gray-800/60 dark:to-gray-900/70
      backdrop-blur-md rounded-xl
      text-gray-700 dark:text-gray-300
    "
  >
    Buy and sell crypto from trusted exchanges. Discover referral programs and exclusive offers from top platforms.
  </p>
        <div
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4"
          style={{ scrollPadding: "0 1rem" }}
        >
          {exchangeData.map((item) => (
        <Link
          key={item.featured_id}
          to={`/airdrop/${item.featured_id}`}
          className="relative flex-shrink-0 w-72 aspect-video snap-center rounded-lg overflow-hidden shadow-lg transform transition hover:scale-105 bg-white dark:bg-gray-800"
        >
          <img
            src={item.featured_image}
            alt={item.featured_title}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 dark:bg-opacity-60 flex flex-col justify-center items-start p-4">
            <h3 className="text-lg font-bold text-white truncate">
          {item.featured_title}
            </h3>
            <p className="text-sm text-gray-200 dark:text-gray-300 mt-1 truncate">
          {item.network} • {item.type}
            </p>
          </div>
        </Link>
          ))}
        </div>
      </section>

      <hr className="my-8 border-0 h-px bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mx-4 lg:mx-96 dark:from-indigo-700 dark:via-purple-700 dark:to-pink-700" />

      {/* Explore Verified Airdrops */}
  {/* Explore Verified Airdrops Section */}
<div className="px-8 lg:px-96 mt-6 mb-4">
  <h1
    className="
      text-2xl font-bold mb-2
      bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-500
      bg-clip-text text-transparent
    "
  >
    Explore Verified Airdrops
  </h1>
  <p
    className="
      p-6
      bg-gradient-to-r from-blue-400/10 via-green-400/10 to-purple-600/10
      dark:from-gray-800/50 dark:via-gray-800/60 dark:to-gray-900/70
      backdrop-blur-md rounded-xl
      text-gray-700 dark:text-gray-300
    "
  >
    Discover and participate in hand-checked, verified crypto airdrops. We list only trusted projects so you can earn rewards safely and confidently.
  </p>
</div>
      {/* Scrolling Featured Marquee */}
      <div className="relative lg:w-3/5 lg:ml-96 overflow-x-auto">
        <div className="flex animate-scroll gap-4 px-4 lg:px-0">
          {airdrops.map((item) => (
            <Link
              key={item.featured_id}
              to={`/airdrop/${item.featured_id}`}
              className="card w-56 flex-shrink-0 aspect-video shadow-2xl hover:scale-105 transition-transform duration-300 bg-white dark:bg-gray-800"
            >
              <img
                src={item.featured_image}
                alt={item.featured_title}
                className="object-cover w-full h-full"
              />
              <div className="card-body p-2">
                <h4 className="card-title text-center text-sm truncate text-gray-900 dark:text-gray-100">
                  {item.featured_title}
                </h4>
                <div className="flex justify-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                  <span>{item.type}</span>
                  <span>{item.type2}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      

      {/* Category Sections */}
      <div className="lg:flex justify-center gap-6 pt-20 flex-wrap mb-40 px-4 lg:px-96">
        <CategorySection title="Featured Airdrops" data={featuredData} />
        <CategorySection title="New Airdrops" data={newData} />
      </div>
    </div>
  );
};

// grid/list section
const CategorySection = ({ title, data }) => {
  const [visible, setVisible] = useState(20);
  const loaderRef = useRef(null);

  // lazy‐load on scroll
  useEffect(() => {
    if (!loaderRef.current) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible((v) => Math.min(v + 20, data.length)),
      { rootMargin: "100px" }
    );
    obs.observe(loaderRef.current);
    return () => obs.disconnect();
  }, [data.length]);

  return (
    <div className="w-full max-w-md rounded-xl shadow-xl overflow-hidden border border-[#e0e7ff] bg-gradient-to-br from-[#eaf3ff] via-[#fbeaff] to-[#fdf6fb] dark:from-[#232946] dark:via-[#181c2e] dark:to-[#1a1c2b] dark:border-[#2e3561]">
      <h3
        className="bg-gradient-to-r from-[#4f8cfb] via-[#c471ed] to-[#f64f59] text-transparent bg-clip-text text-xl font-extrabold px-4 py-2 tracking-wide shadow-sm"
      >
        {title}
      </h3>
      <div className="p-4 grid gap-4 sm:grid-cols-2">
        {data.slice(0, visible).map((item) => (
          <Link
            key={item.featured_id}
            to={`/airdrop/${item.featured_id}`}
            className="flex flex-col rounded-lg overflow-hidden hover:shadow-lg transition border border-[#d1d5fa] hover:border-[#a259f7] bg-[#f7faff] dark:bg-[#232946] dark:border-[#3b4070] dark:hover:border-[#a259f7]"
          >
            {/* HD 16:9 wrapper */}
            <div className="w-full aspect-video bg-gradient-to-r from-[#bae6fd]/20 via-[#fbeaff]/20 to-[#fdf6fb]/20 dark:from-[#5f6fff]/10 dark:via-[#a259f7]/10 dark:to-[#ff6fae]/10">
              <img
                src={item.featured_image}
                alt={item.featured_title}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="p-3 flex flex-col flex-1 justify-between">
              <h4 className="font-bold text-sm mb-1 truncate text-[#232946] dark:text-[#e0e6ff]">
                {item.featured_title}
              </h4>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#60a5fa] dark:text-[#a259f7]">
                  {item.network}
                </span>
                <span className="font-semibold text-[#f472b6] dark:text-[#ff6fae]">
                  ${item.price}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div ref={loaderRef} className="h-4" />
    </div>
  );
};

CategorySection.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      featured_id: PropTypes.string.isRequired,
      featured_title: PropTypes.string.isRequired,
      featured_image: PropTypes.string.isRequired,
      network: PropTypes.string,
      price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      type: PropTypes.string,
    })
  ).isRequired,
};

export default Banner;
