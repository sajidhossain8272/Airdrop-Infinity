import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import FeaturedData from "../FeaturedData";

const Banner = () => {
  const featuredData = FeaturedData.filter(
    (item) => item.category === "featured"
  );
  const exchangeData = FeaturedData.filter(
    (item) => item.category === "exchange"
  );
  const telegramData = FeaturedData.filter(
    (item) => item.category === "telegram"
  );
  const newData = FeaturedData.filter((item) => item.category === "new");

  return (
    <div className='overflow-hidden lato-regular'>
      <h3 className='lg:pl-96 lg:pt-10 lg:text-6xl text-3xl lg:pr-40 p-4 pl-8 lato-bold'>
        Airdrop Infinity – Bringing you the best crypto airdrops, in 2025!
      </h3>

      <div className='lg:w-3/5 lg:ml-96 lg:overflow-hidden overflow-x-auto'>
        <div className='flex animate-scroll gap-4'>
          {FeaturedData.map((item, index) => (
            <Link
              to={`/airdrop/${item.featured_id}`}
              key={item.featured_id || index}
              className='card w-56 shadow-2xl hover:scale-105 transition-transform duration-300 flex-shrink-0'
            >
              <figure className='h-40 overflow-hidden flex items-center'>
                <img
                  src={item.featured_image}
                  alt={item.featured_title}
                  className='w-full h-200 object-cover'
                />
              </figure>
              <div className='card-body p-2'>
                <h2 className='card-title text-center text-sm truncate'>
                  {item.featured_title}
                </h2>
                <div className="flex">
                <h3 className="text-xs">{item.type}</h3>
                <h3 className="text-xs">{item.type2}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <hr
        className=' w-6/6 bg-gradient-to-r from-blue-900 via-purple-700 to-pink-600
 rounded-lg mx-auto'
      />

      {/* Category sections */}
      <div className='lg:flex justify-center gap-8 pt-20 flex-wrap mb-40'>
        {/* Featured Airdrops */}
        <CategorySection title='Featured Airdrops' data={featuredData} />

        {/* New Airdrops */}
        <CategorySection title='New Airdrops' data={newData} />

        {/* Telegram Airdrops */}
        <CategorySection title='Telegram Airdrops' data={telegramData} />

        {/* Exchange Airdrops */}
        <CategorySection title='Exchange Airdrops' data={exchangeData} />
      </div>
    </div>
  );
};

const CategorySection = ({ title, data }) => {
  const [visibleItems, setVisibleItems] = useState(4); // Initially show 4 items
  const loaderRef = useRef(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loadMoreItems = () => {
    if (visibleItems < data.length) {
      setVisibleItems((prev) => prev + 4); // Increase visible items by 4 on each scroll
    }
  };

  // Infinite scroll using Intersection Observer API
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMoreItems(); // Load more items when the loader element is in view
        }
      },
      { threshold: 1.0 } // Trigger when 100% of the loader is in view
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current); // Observe the loader element
    }

    return () => {
      if (loaderRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(loaderRef.current); // Clean up the observer
      }
    };
  }, [visibleItems, data, loadMoreItems]);

  return (
    
    <div className='pl-4 w-full max-w-[400px] lg:max-h-[750px] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-700 scrollbar-track-gray-300 '>
      <h1 className='lato-black mb-4'>{title}</h1>
      <div className='grid gap-4 lg:grid-cols-1 md:grid-cols-2 sm:grid-cols-1 overflow-x-auto'>
        {data.slice(0, visibleItems).map((item) => (
          <div
            key={item.featured_id}
            className=' mb-2 card card-bordered w-full sm:w-80 shadow-xl'
          >
            <Link to={`/airdrop/${item.featured_id}`}>
            <figure>
              <img className="hover:scale-105 transition-transform duration-300 flex-shrink-0 rounded-lg" src={item.featured_image} alt={item.featured_title} />
            </figure>
            </Link>
            <div className='card-body '>
              <div className='flex justify-between '>
                <img
                  className='rounded-full'
                  width={35}
                  height={25}
                  src={item.company_logo}
                  alt=''
                />
                <h2 className='card-title'>{item.featured_title}</h2>
                <h3 className='lato-bold'>
                  Est. <span className='text-green-600'> ${item.price} </span>
                </h3>
              </div>

              <div className="flex ">
              <p className='lato-bold'>{item.type}</p>

              <p className='lato-bold'>{item.type2}</p>
              </div>

              <div className='card-actions justify-between'>
                <div className="flex gap-1">
                  <h3 className='lato-bold text-sm'>{item.network}</h3>
                  <img width={15} src={item.network_logo} alt="" />
                </div>
                <Link
                  to={`/airdrop/${item.featured_id}`}
                  className='btn w-1/3 bg-gradient-to-r from-blue-900 via-purple-700 to-pink-600 text-white hover:scale-105 transition-transform duration-300 flex-shrink-0'
                >
                  Claim Airdrop
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Loader element for triggering the infinite scroll */}
      <div ref={loaderRef} className='h-10'></div>
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
      description: PropTypes.string,
    })
  ).isRequired,
};

export default Banner;
