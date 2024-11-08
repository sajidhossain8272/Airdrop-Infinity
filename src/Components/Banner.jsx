import FeaturedData from "../FeaturedData";

const Banner = () => {
  return (
    <div className="overflow-hidden">
      <h3 className="lg:pl-96 lg:pt-10 lg:text-6xl text-3xl lg:pr-40 p-4 pl-8 lato-bold">
        Airdrop Infinity – Bringing you the best crypto airdrops, in 2025!
      </h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 pl-4 gap-4 lg:pl-8 py-8 ">
        {FeaturedData.map((item) => (
          <div key={item.featured_id} className="card bg-base-100 w-96 shadow-xl hover:scale-105 transition-transform duration-300">
            <figure>
              <img src={item.featured_image} alt={item.featured_title} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{item.featured_title}</h2>
              <p>{item.description}</p>
            
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
