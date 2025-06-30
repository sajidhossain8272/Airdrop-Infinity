// src/Components/Airdrop.jsx
import { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Spinner from "./Spinner";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaTimesCircle,
  FaTasks,
  FaExternalLinkAlt,
  FaBitcoin,
  FaEthereum,
} from "react-icons/fa";
import { SiSolana } from "react-icons/si";

export default function Airdrop() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [claimUrl, setClaimUrl] = useState("");
  const [cryptoPrices, setCryptoPrices] = useState({});
  const API_URL = "https://crypto-store-server.vercel.app/api/airdrops";

  // Fetch airdrop data
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) throw new Error("Failed to fetch airdrop");
        const data = await res.json();
        if (!isMounted) return;
        setItem(data);
        const [step1] = data.steps || [];
        const urls = step1?.match(/https?:\/\/[^\s]+/g);
        if (urls?.[0]) setClaimUrl(urls[0]);
      } catch (e) {
        setItem(null);
        console.error(e);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [id]);

  // Fetch live prices
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?" +
            "ids=bitcoin,ethereum,solana&vs_currencies=usd"
        );
        if (!res.ok) throw new Error("Failed to fetch prices");
        const data = await res.json();
        if (isMounted) setCryptoPrices(data);
      } catch (e) {
        console.error(e);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <Spinner />
      </div>
    );
  }
  if (!item) {
    return (
      <div className="p-8 text-center text-xl text-red-500 dark:text-red-400 bg-gray-50 dark:bg-gray-900 min-h-screen">
        Oops—couldn’t load that airdrop.
      </div>
    );
  }

  const {
    featured_title,
    featured_image,
    description,
    price,
    listed_price,
    availability,
    steps = [],
    network,
    network_logo,
    task,
    status,
  } = item;

  const CoinIcon = {
    bitcoin: <FaBitcoin className="text-2xl sm:text-3xl" />,
    ethereum: <FaEthereum className="text-2xl sm:text-3xl" />,
    solana: <SiSolana className="text-2xl sm:text-3xl" />,
  };

  // Helper: format price
  const formatPrice = (val) =>
    typeof val === "number"
      ? `$${val.toLocaleString(undefined, { maximumFractionDigits: 2 })}`
      : "N/A";

  // Helper: status color
  const statusColor =
    status?.toLowerCase() === "active"
      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      : status?.toLowerCase() === "upcoming"
      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200";

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-200">
      <Helmet>
        <title>Airdrop Infinity | {featured_title}</title>
        <meta name="description" content={description} />
      </Helmet>

    
      {/* Hero */}
      <div className="relative h-64 sm:h-72 md:h-96 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 flex flex-col items-center justify-center text-white px-4 sm:px-6 lg:px-16 shadow-lg dark:shadow-none">
        <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold text-center drop-shadow-lg">
          {featured_title}
        </h1>
        <p className="mt-2 text-xs sm:text-sm md:text-base lg:text-lg opacity-90 text-center max-w-xl">
          {description}
        </p>

        {/* Live prices */}
        <div className="flex gap-3 sm:gap-4 md:gap-6 mt-4 sm:mt-6 overflow-x-auto">
          {Object.entries(cryptoPrices).map(([coin, { usd }]) => (
            <div
              key={coin}
              className="flex-shrink-0 bg-white bg-opacity-20 dark:bg-black dark:bg-opacity-30 backdrop-blur-md px-3 sm:px-4 py-2 sm:py-3 rounded-lg flex flex-col items-center"
            >
              {CoinIcon[coin]}
              <span className="mt-1 uppercase text-[10px] sm:text-xs">{coin}</span>
              <span className="font-bold text-sm sm:text-base">
                {formatPrice(usd)}
              </span>
            </div>
          ))}
        </div>

        {/* Main CTA */}
          {claimUrl && (
            <a
              href={claimUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 sm:mt-8 inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-6 sm:px-10 py-3 sm:py-4 rounded-full shadow-xl hover:scale-105 hover:from-pink-500 hover:to-indigo-500 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-pink-300 dark:focus:ring-pink-700 font-bold text-lg sm:text-xl tracking-wide"
              style={{
                boxShadow:
            "0 4px 24px 0 rgba(236, 72, 153, 0.25), 0 1.5px 6px 0 rgba(99, 102, 241, 0.15)",
              }}
            >
              Claim Airdrop <FaExternalLinkAlt className="ml-2 text-xl" />
            </a>
          )}
              </div>

              {/* Back link */}
              <div className="px-4 sm:px-6 lg:px-16 py-4 flex justify-center">
          <NavLink
            to="/listed-airdrop"
            className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-pink-400 transition font-medium bg-white/70 dark:bg-gray-800/70 px-4 py-2 rounded-full shadow hover:shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <FaArrowLeft className="mr-1 text-lg" /> Back to All Airdrops
          </NavLink>
              </div>

              {/* Content grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left */}
        <aside className="space-y-6">
          {/* 16:9 image */}
          <div className="aspect-video w-full">
            <img
              src={featured_image}
              alt={featured_title}
              className="w-full h-full object-cover rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
              loading="lazy"
            />
          </div>

          {/* Metadata */}
          <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg shadow transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <img
                  src={network_logo}
                  alt={network}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border border-gray-200 dark:border-gray-700"
                  loading="lazy"
                />
                <span className="font-semibold text-gray-800 dark:text-gray-100">
                  {network}
                </span>
              </div>
              {availability ? (
                <span className="inline-flex items-center text-green-600 dark:text-green-400 text-sm sm:text-base">
                  <FaCheckCircle className="mr-1 text-base" /> Available
                </span>
              ) : (
                <span className="inline-flex items-center text-red-600 dark:text-red-400 text-sm sm:text-base">
                  <FaTimesCircle className="mr-1 text-base" /> Not Available
                </span>
              )}
            </div>
            <div className="space-y-2 text-sm sm:text-base text-gray-700 dark:text-gray-200">
              <p>
                <span className="font-bold">Est. Airdrop:</span>{" "}
                <span className="text-green-600 dark:text-green-400">
                  {formatPrice(price)}
                </span>
              </p>
              <p>
                <span className="font-bold">Listed Price:</span>{" "}
                <span>{listed_price ? formatPrice(listed_price) : "N/A"}</span>
              </p>
              <p className="flex items-center">
                <FaTasks className="mr-2 text-gray-600 dark:text-gray-400" />
                <div className="flex gap-2">
                  <span className="font-bold">Tasks:</span>
                  <span>{task}</span>
                </div>
              </p>
              <p
                className={`inline-block rounded-full px-2 py-0.5 text-xs sm:text-sm font-semibold ${statusColor}`}
              >
                Status: {status}
              </p>
            </div>
          </div>
        </aside>

        {/* Right */}
        <div className="space-y-8">
          <section className="bg-white dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg shadow transition-colors">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Step-by-Step Guide
            </h2>
            <ol className="list-decimal list-inside space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-800 dark:text-gray-200">
              {steps.map((step, idx) => (
                <li key={idx}>
                  {step.split(/https?:\/\/[^\s]+/g).map((text, i, arr) => {
                    if (i < arr.length - 1) {
                      const url = step.match(/https?:\/\/[^\s]+/g)[i];
                      return (
                        <span key={i}>
                          {text}
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 dark:text-indigo-400 underline ml-1 hover:text-pink-500 dark:hover:text-pink-400 transition"
                          >
                            Visit Link
                          </a>
                        </span>
                      );
                    }
                    return <span key={i}>{text}</span>;
                  })}
                </li>
              ))}
            </ol>
          </section>

          {claimUrl && (
            <div className="text-center">
              <a
                href={claimUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-gradient-to-r from-indigo-400 to-pink-400 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full shadow hover:scale-105 transition focus:outline-none focus:ring-2 focus:ring-pink-400"
              >
                Claim this Airdrop Now
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
