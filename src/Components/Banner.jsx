// src/Components/Banner.jsx
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "./Spinner";

const Banner = () => {
  const [airdrops, setAirdrops] = useState([]);
  const [loading, setLoading]   = useState(true);
  const API_URL = "https://crypto-store-server.vercel.app/api/airdrops";

  useEffect(() => {
    const fetchAirdrops = async () => {
      try {
        const res  = await fetch(API_URL);
        const data = await res.json();
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
      <div className="flex justify-center items-center min-h-screen min-w-screen">
        <Spinner />
      </div>
    );
  }

  // categorize
  const featuredData = airdrops.filter(item => item.category === "featured");
  const newData      = airdrops.filter(item => item.category === "new");
  const exchangeData = airdrops.filter(item => item.category === "exchange");

  return (
    <div className="lato-regular bg-gradient-to-r from-blue-900/5 via-purple-700/5 to-pink-600/5 overflow-hidden">
      {/* Hero Title */}
      <h1 className="text-3xl lg:text-6xl font-black px-8 pt-8 lg:pt-12 lg:px-96">
        Airdrop Infinity
        <br className="hidden lg:block"/>
        <span className="text-indigo-600"> – the best crypto airdrops of 2025!</span>
      </h1>

      {/* Exchange Referral Banner Carousel */}
      <section aria-label="Exchange Referral Programs" className="mt-8 px-4 lg:px-96">
        <h2 className="text-2xl font-bold mb-4">Exchange Referral Programs</h2>
        <div
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4"
          style={{ scrollPadding: "0 1rem" }}
        >
          {exchangeData.map(item => (
            <Link
              key={item.featured_id}
              to={`/airdrop/${item.featured_id}`}
              className="relative flex-shrink-0 w-72 aspect-video snap-center rounded-lg overflow-hidden shadow-lg transform transition hover:scale-105"
            >
              <img
                src={item.featured_image}
                alt={item.featured_title}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-start p-4">
                <h3 className="text-lg font-bold text-white truncate">
                  {item.featured_title}
                </h3>
                <p className="text-sm text-gray-200 mt-1 truncate">
                  {item.network} • {item.type}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <hr className="my-8 border-0 h-px bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mx-4 lg:mx-96" />

      {/* Scrolling Featured Marquee */}
      <div className="relative lg:w-3/5 lg:ml-96 overflow-x-auto">
        <div className="flex animate-scroll gap-4 px-4 lg:px-0">
          {airdrops.map(item => (
            <Link
              key={item.featured_id}
              to={`/airdrop/${item.featured_id}`}
              className="card w-56 flex-shrink-0 aspect-video shadow-2xl hover:scale-105 transition-transform duration-300"
            >
              <img
                src={item.featured_image}
                alt={item.featured_title}
                className="object-cover w-full h-full"
              />
              <div className="card-body p-2">
                <h4 className="card-title text-center text-sm truncate">
                  {item.featured_title}
                </h4>
                <div className="flex justify-center gap-1 text-xs text-gray-600">
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
        <CategorySection title="New Airdrops"      data={newData} />
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
      ([e]) => e.isIntersecting && setVisible(v => Math.min(v + 20, data.length)),
      { rootMargin: "100px" }
    );
    obs.observe(loaderRef.current);
    return () => obs.disconnect();
  }, [data.length]);

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
      <h3 className="bg-indigo-600 text-white text-xl font-semibold px-4 py-2">
        {title}
      </h3>
      <div className="p-4 grid gap-4 sm:grid-cols-2">
        {data.slice(0, visible).map(item => (
          <Link
            key={item.featured_id}
            to={`/airdrop/${item.featured_id}`}
            className="flex flex-col bg-gray-50 rounded-lg overflow-hidden hover:shadow-md transition"
          >
            {/* HD 16:9 wrapper */}
            <div className="w-full aspect-video">
              <img
                src={item.featured_image}
                alt={item.featured_title}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="p-3 flex flex-col flex-1 justify-between">
              <h4 className="font-bold text-sm mb-1 truncate">{item.featured_title}</h4>
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>{item.network}</span>
                <span className="font-semibold text-green-600">${item.price}</span>
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
      featured_id:    PropTypes.string.isRequired,
      featured_title: PropTypes.string.isRequired,
      featured_image: PropTypes.string.isRequired,
      network:        PropTypes.string,
      price:          PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      type:           PropTypes.string,
    })
  ).isRequired,
};

export default Banner;
