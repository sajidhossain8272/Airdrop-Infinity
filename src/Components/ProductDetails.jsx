import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import Spinner from "./Spinner";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = "https://crypto-store-server.vercel.app/api/products";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        if (!response.data) {
          setError('Product not found');
        } else {
          setProduct(response.data);
        }
      } catch (err) {
        setError('Failed to load product details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
<div className="flex justify-center items-center min-h-screen min-w-screen"><Spinner /> </div>      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Product Image */}
        <div className="md:w-1/2 bg-gray-100 h-96 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="object-contain h-full"
          />
          {product.discount && (
            <div className="absolute top-2 right-2 bg-red-600 text-white text-sm px-2 py-1 rounded">
              {product.discount}
            </div>
          )}
        </div>

        {/* Right: Product Info */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-semibold mb-2">{product.title}</h1>
          {/* Rating & Reviews */}
          <div className="flex items-center mb-4">
            <div className="flex space-x-1 text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={
                    i < Math.floor(product.rating) ? "fill-current" : "fill-gray-300"
                  }
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-500">
              ({product.reviews} reviews)
            </span>
          </div>
          {/* Price & Cashback */}
          <div className="text-2xl font-bold text-gray-800 mb-2">
            ${product.price}
          </div>
          {product.cashback && (
            <p className="text-sm text-green-600 mb-4">
              Cashback: {product.cashback}
            </p>
          )}

          {/* Description */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-1">Description</h2>
            <p className="text-gray-700">{product.description}</p>
          </div>

          {/* Buy / Cart Buttons */}
          <div className="flex items-center gap-4">
            <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700">
              Buy Now
            </button>
            <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded hover:bg-green-700">
              Add to Cart
            </button>
          </div>

          {/* Example Review Section (optional / can be replaced with real logic) */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
            <div className="space-y-4">
              {/* Example Review */}
              <div className="border rounded p-4">
                <div className="flex items-center text-yellow-400 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < 4 ? "fill-current" : "fill-gray-300"} />
                  ))}
                  <span className="ml-2 text-sm text-gray-500">(4/5)</span>
                </div>
                <p className="text-gray-700">Great product, highly recommend!</p>
                <p className="text-sm text-gray-400 mt-1">- John Doe</p>
              </div>
              {/* Additional reviews... */}
            </div>
          </div>
        </div>
      </div>

      {/* Back to All Products Link */}
      <div className="mt-8">
        <Link to="/products" className="text-blue-600 hover:underline">
          &larr; Back to All Products
        </Link>
      </div>
    </div>
  );
};

export default ProductDetails;
