import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaStar, FaShoppingCart, FaEye } from 'react-icons/fa';
import Slider from "react-slick";
import axios from "axios";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TrendingProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const API_BASE_URL = "https://crypto-store-server.vercel.app/api/products";

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      const fetchedProducts = response.data;

      if (Array.isArray(fetchedProducts) && fetchedProducts.length > 0) {
        setProducts(fetchedProducts);
      } else {
        setProducts([]);
      }
    } catch (err) {
      setError("Failed to load products. Please try again.");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: products.length > 1,
    speed: 500,
    slidesToShow: Math.min(products.length, 3),
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(products.length, 2),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(products.length, 1),
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="py-16 lg:pl-40 lg:pr-40 relative z-10 bg-gray-50">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {loading && <p className="text-center text-gray-600">Loading trending products...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}

        {!loading && !error && products.length > 0 ? (
          <>
            <Slider {...sliderSettings}>
              {products.slice(0, 6).map((product) => (
                <motion.div
                  key={product._id}
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
                    {product.discount && (
                      <div className="absolute top-2 right-2 bg-red-600 text-white text-sm px-2 py-1 rounded-full">
                        {product.discount}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                      <Link to={`/product/${product._id}`}>
                        <button className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
                          <FaShoppingCart className="text-gray-800" />
                        </button>
                      </Link>
                      <Link to={`/product/${product._id}`}>
                        <button className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors">
                          <FaEye className="text-gray-800" />
                        </button>
                      </Link>
                    </div>
                  </div>
                  <div className="card-body p-6">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold">{product.title}</h3>
                      <span className="badge bg-green-100 text-green-600">{product.cashback}</span>
                    </div>
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
                      <Link to={`/product/${product._id}`}>
                        <button className="btn btn-sm bg-gradient-to-r from-blue-900 via-purple-700 to-pink-600 text-white hover:scale-105 transition-transform">
                          Buy Now
                        </button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </Slider>

            {/* View All Products Button */}
            <div className="text-center mt-8">
              <Link to="/products">
                <button className="btn bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
                  View All Products
                </button>
              </Link>
            </div>
          </>
        ) : (
          !loading && <p className="text-center text-gray-500">No trending products available.</p>
        )}
      </motion.div>
    </section>
  );
};

export default TrendingProducts;
