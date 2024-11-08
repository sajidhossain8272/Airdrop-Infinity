import { Link } from "react-router-dom";
import FeaturedData from "../FeaturedData";
const Banner = () => {
  const data = [...FeaturedData, ...FeaturedData, ...FeaturedData]; // Repeat data for demo purposes

  return (
    <div className="overflow-hidden">
      <h3 className="lg:pl-96 lg:pt-10 lg:text-6xl text-3xl lg:pr-40 p-4 pl-8 lato-bold">
        Airdrop Infinity – Bringing you the best crypto airdrops, in 2025!
      </h3>

      <div className="lg:w-3/5 lg:ml-96 lg:overflow-hidden overflow-x-auto">
        <div className="flex animate-scroll gap-4">
          {data.map((item, index) => (
            <Link
              to={`/airdrop/${item.featured_id}`}  // Use dynamic path with featured_id
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
    </div>
  );
};

export default Banner;
