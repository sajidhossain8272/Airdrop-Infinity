import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaStar, FaShoppingCart, FaEye } from "react-icons/fa";
import Slider from "react-slick";
import axios from "axios";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Spinner from "./Spinner";

const TrendingProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    <section className='py-16 lg:px-40 px-4 bg-gradient-to-r from-blue-900/5 via-purple-700/5 to-pink-600/5 relative z-10'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        {/* Title */}
        <h2 className='text-3xl font-bold text-center text-gray-800 mb-10'>
          🔥 Trending Products
        </h2>

        {loading && (
          <div className='flex justify-center items-center min-h-screen min-w-screen'>
            <Spinner />
          </div>
        )}

        {error && <p className='text-center text-red-600'>{error}</p>}

        {!loading && !error && products.length > 0 ? (
          <>
            <Slider {...sliderSettings}>
              {products.slice(0, 6).map((product) => (
                <motion.div
                  key={product._id}
                  whileHover={{ scale: 1.02 }}
                  className='card bg-white shadow-lg rounded-md overflow-hidden group mx-2 border'
                >
                  <div className='relative h-60 overflow-hidden bg-white'>
                    <img
                      src={product.image}
                      alt={product.title}
                      className='w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105'
                      loading='lazy'
                    />
                    {product.discount && (
                      <div className='absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full'>
                        {product.discount}
                      </div>
                    )}
                    <div className='absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4'>
                      <Link to={`/product/${product._id}`}>
                        <button className='p-2 bg-white rounded-full hover:bg-gray-200 transition-colors'>
                          <FaShoppingCart className='text-gray-800' />
                        </button>
                      </Link>
                      <Link to={`/product/${product._id}`}>
                        <button className='p-2 bg-white rounded-full hover:bg-gray-200 transition-colors'>
                          <FaEye className='text-gray-800' />
                        </button>
                      </Link>
                    </div>
                  </div>
                  <div className='p-4'>
                    <div className='flex justify-between items-start'>
                      <h3 className='text-md font-semibold text-gray-700 h-12 overflow-hidden leading-snug'>
                        {product.title}
                      </h3>
                      {product.cashback && (
                        <span className='text-green-600 bg-green-100 text-xs px-2 py-0.5 rounded-full'>
                          {product.cashback}
                        </span>
                      )}
                    </div>
                    <div className='flex items-center mt-2'>
                      <div className='flex space-x-1 text-yellow-400'>
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={
                              i < Math.floor(product.rating)
                                ? "fill-current"
                                : "text-gray-300"
                            }
                          />
                        ))}
                      </div>
                      <span className='text-sm text-gray-500 ml-2'>
                        ({product.reviews || 0} reviews)
                      </span>
                    </div>
                    <div className='mt-4 flex justify-between items-center'>
                      <span className='text-gray-800 font-medium'>
                        ${product.price}
                      </span>
                      <Link to={`/product/${product._id}`}>
                        <button className='btn btn-sm bg-gradient-to-r from-blue-900 via-purple-700 to-pink-600 text-white hover:scale-105 transition-transform'>
                          Buy Now
                        </button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </Slider>

            {/* View All Products Button */}
            <div className='text-center mt-10'>
              <Link to='/products'>
                <button className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition duration-200'>
                  View All Products
                </button>
              </Link>
            </div>
          </>
        ) : (
          !loading && (
            <p className='text-center text-gray-500'>
              No trending products available.
            </p>
          )
        )}
      </motion.div>
    </section>
  );
};

export default TrendingProducts;
