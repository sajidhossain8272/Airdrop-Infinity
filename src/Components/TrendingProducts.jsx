import { motion } from "framer-motion";
import { FaStar, FaShoppingCart, FaEye } from 'react-icons/fa';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TrendingProducts = () => {
  // Placeholder products array
  const products = [
    {
      id: 1,
      title: "Hardware Wallet Case",
      price: "29.99",
      image: "https://placehold.co/400x200?text=Wallet+Case",
      cashback: "5% $IDP",
      rating: 4.5,
      reviews: 12,
      discount: "20% OFF",
    },
    {
      id: 2,
      title: "Mining Rig Cooler",
      price: "89.99",
      image: "https://placehold.co/400x200?text=Mining+Cooler",
      cashback: "7% $IDP",
      rating: 4.2,
      reviews: 8,
      discount: "15% OFF",
    },
    {
      id: 3,
      title: "Crypto VPN Router",
      price: "49.99",
      image: "https://placehold.co/400x200?text=VPN+Router",
      cashback: "3% $IDP",
      rating: 4.7,
      reviews: 15,
      discount: "10% OFF",
    },
    {
      id: 4,
      title: "Crypto Mining GPU",
      price: "299.99",
      image: "https://placehold.co/400x200?text=Mining+GPU",
      cashback: "10% $IDP",
      rating: 4.8,
      reviews: 20,
      discount: "25% OFF",
    },
  ];

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="py-16 lg:pl-40 lg:pr-40 relative z-10 bg-gray-50 ">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <Slider {...sliderSettings}>
          {products.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.02 }}
              className="card card-bordered card-title bg-white shadow-xl overflow-hidden group mx-2"
            >
              <div className="relative h-48 bg-gray-100 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Discount Badge */}
                {product.discount && (
                  <div className="absolute top-2 right-2 bg-red-600 text-white text-sm px-2 py-1 rounded-full">
                    {product.discount}
                  </div>
                )}
                {/* Quick Actions */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                  <button className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
                    <FaShoppingCart className="text-gray-800" />
                  </button>
                  <button className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
                    <FaEye className="text-gray-800" />
                  </button>
                </div>
              </div>
              <div className="card-body p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold">{product.title}</h3>
                  <span className="badge bg-green-100 text-green-600">{product.cashback}</span>
                </div>
                {/* Rating and Reviews */}
                <div className="flex items-center mt-2">
                  <div className="flex space-x-1 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < Math.floor(product.rating) ? "fill-current" : "fill-gray-300"} />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">({product.reviews} reviews)</span>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-gray-600">${product.price}</span>
                  <button className="btn btn-sm bg-gradient-to-r from-blue-900 via-purple-700 to-pink-600 text-white hover:scale-105 transition-transform">
                    Buy Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </Slider>
      </motion.div>
    </section>
  );
};

export default TrendingProducts;