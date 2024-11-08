import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import FeaturedData from "../FeaturedData";

const Banner = () => {
  const featuredData = FeaturedData.filter(item => item.category === "featured");
  const exchangeData = FeaturedData.filter(item => item.category === "exchange");
  const telegramData = FeaturedData.filter(item => item.category === "telegram");
  const newData = FeaturedData.filter(item => item.category === "new");

  return (
    <div className="overflow-hidden">
      <h3 className="lg:pl-96 lg:pt-10 lg:text-6xl text-3xl lg:pr-40 p-4 pl-8 lato-bold">
        Airdrop Infinity – Bringing you the best crypto airdrops, in 2025!
      </h3>

      <div className="lg:w-3/5 lg:ml-96 lg:overflow-hidden overflow-x-auto">
        <div className="flex animate-scroll gap-4">
          {FeaturedData.map((item, index) => (
            <Link
              to={`/airdrop/${item.featured_id}`}
              key={item.featured_id || index}
              className="card w-56 shadow-2xl hover:scale-105 transition-transform duration-300 flex-shrink-0"
            >
              <figure className="h-40 overflow-hidden flex items-center">
                <img
                  src={item.featured_image}
                  alt={item.featured_title}
                  className="w-full h-200 object-cover"
                />
              </figure>
              <div className="card-body p-2">
                <h2 className="card-title text-center text-sm truncate">
                  {item.featured_title}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Category sections */}
      <div className="lg:flex justify-center gap-8 pt-20 flex-wrap mb-40">
        {/* Featured Airdrops */}
        <CategorySection title="Featured Airdrops" data={featuredData} />

        {/* New Airdrops */}
        <CategorySection title="New Airdrops" data={newData} />

        {/* Telegram Airdrops */}
        <CategorySection title="Telegram Airdrops" data={telegramData} />

        {/* Exchange Airdrops */}
        <CategorySection title="Exchange Airdrops" data={exchangeData} />
      </div>
    </div>
  );
};

const CategorySection = ({ title, data }) => (
  <div className="pl-4 w-full max-w-[400px] lg:max-h-[750px] overflow-y-auto">
    <h1 className="lato-black mb-4">{title}</h1>
    <div className="grid gap-4 lg:grid-cols-1 md:grid-cols-2 sm:grid-cols-1">
      {data.slice(0, 4).map(item => (
        <div key={item.featured_id} className="mb-2 card card-bordered image-full w-full sm:w-80 shadow-xl">
          <figure>
            <img src={item.featured_image} alt={item.featured_title} />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{item.featured_title}</h2>
            <p>{item.description}</p>
            <div className="card-actions justify-end">
              <Link to={`/airdrop/${item.featured_id}`} className="btn btn-primary">
                View Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

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
