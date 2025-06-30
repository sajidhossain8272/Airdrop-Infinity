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
      <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-900/10 via-fuchsia-700/10 to-pink-600/10 dark:from-purple-900/20 dark:via-fuchsia-700/20 dark:to-pink-600/20'>
        <Spinner />
      </div>
    );
  }
  if (!item) {
    return (
      <div className='p-8 text-center text-xl text-red-500 dark:text-red-400 bg-gradient-to-br from-purple-900/10 via-fuchsia-700/10 to-pink-600/10 min-h-screen'>
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
    bitcoin: <FaBitcoin className='text-2xl sm:text-3xl text-yellow-500' />,
    ethereum: <FaEthereum className='text-2xl sm:text-3xl text-blue-400' />,
    solana: <SiSolana className='text-2xl sm:text-3xl text-green-400' />,
  };

  const formatPrice = (val) =>
    typeof val === "number"
      ? `$${val.toLocaleString(undefined, { maximumFractionDigits: 2 })}`
      : "N/A";

  const statusColor =
    status?.toLowerCase() === "active"
      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      : status?.toLowerCase() === "upcoming"
      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200";

  return (
    <div className='bg-gradient-to-br from-purple-900/5 via-fuchsia-700/10 to-pink-600/10 dark:from-purple-900/20 dark:via-fuchsia-700/20 dark:to-pink-600/20 min-h-screen transition-colors duration-200'>
      <Helmet>
        <title>Airdrop Infinity | {featured_title}</title>
        <meta name='description' content={description} />
      </Helmet>

      {/* HERO */}
      <section className='relative flex flex-col items-center justify-center px-4 sm:px-6 py-10 md:py-16 lg:px-16 text-white overflow-hidden'>
        {/* Modern Gradient Glass */}
        <div className='absolute inset-0 bg-gradient-to-r from-purple-900/50 via-fuchsia-700/60 to-pink-600/60 blur-2xl opacity-30 pointer-events-none' />
        <div className='relative z-10 w-full max-w-3xl text-center'>
          <h1 className='text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold drop-shadow-xl bg-gradient-to-r from-fuchsia-400 via-pink-500 to-purple-600 bg-clip-text text-transparent'>
            {featured_title}
          </h1>
          <p className='mt-3 text-sm sm:text-lg md:text-xl dark:text-gray-200/90 text-gray-950/100 font-normal max-w-2xl mx-auto'>
            {description}
          </p>

          {/* Live prices */}
          <div className='flex flex-wrap justify-center gap-3 sm:gap-6 mt-6'>
            {Object.entries(cryptoPrices).map(([coin, { usd }]) => (
              <div
                key={coin}
                className='flex-shrink-0 bg-white/20 dark:bg-black/30 backdrop-blur-md px-4 py-3 rounded-xl flex flex-col items-center border border-fuchsia-500/30 shadow-md'
              >
                {CoinIcon[coin]}
                <span className='mt-1 uppercase text-[11px] sm:text-xs tracking-wide darK:text-gray-100 text-gray-900/100 font-semibold'>
                  {coin}
                </span>
                <span className='font-bold text-base sm:text-lg text-gray-900/100 dark:text-white drop-shadow'>
                  {formatPrice(usd)}
                </span>
              </div>
            ))}
          </div>

          {/* Main CTA */}
          {claimUrl && (
            <a
              href={claimUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='mt-7 inline-flex items-center gap-2
    bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-pink-500
    text-white px-4 py-2 sm:px-6 sm:py-2.5
    rounded-md shadow-md hover:brightness-110 hover:scale-105
    transition-all duration-200 focus:outline-none
    focus:ring-2 focus:ring-fuchsia-400 dark:focus:ring-fuchsia-600
    font-bold text-base sm:text-lg tracking-wide'
              style={{
                boxShadow:
                  "0 2px 12px 0 rgba(199, 70, 158, 0.13), 0 1px 3px 0 rgba(99, 102, 241, 0.09)",
              }}
            >
              Claim Airdrop <FaExternalLinkAlt className='ml-1 text-lg' />
            </a>
          )}
        </div>
      </section>

      {/* Back link */}
      <div className='px-4 sm:px-6 lg:px-16 py-4 flex justify-center'>
        <NavLink
          to='/listed-airdrop'
          className='inline-flex items-center gap-2 text-gray-800 dark:text-gray-200 hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition font-medium bg-white/70 dark:bg-gray-800/70 px-5 py-2 rounded-full shadow hover:shadow-lg border border-gray-200 dark:border-gray-700'
        >
          <FaArrowLeft className='mr-1 text-lg' /> Back to All Airdrops
        </NavLink>
      </div>

      {/* Content Grid */}
      <div className='container mx-auto px-2 sm:px-6 lg:px-16 py-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16'>
        {/* Left Side */}
        <aside className='space-y-7'>
          <div className='aspect-video w-full rounded-xl overflow-hidden border-2 border-fuchsia-700/20 dark:border-fuchsia-500/20 shadow-lg bg-gray-100 dark:bg-gray-800/60'>
            <img
              src={featured_image}
              alt={featured_title}
              className='w-full h-full object-cover rounded-xl'
              loading='lazy'
            />
          </div>
          {/* Metadata */}
          <div className='bg-white/80 dark:bg-gray-900/70 p-4 sm:p-6 rounded-xl shadow-lg border border-fuchsia-500/10 transition-colors'>
            <div className='flex items-center justify-between mb-4'>
              <div className='flex items-center gap-2 sm:gap-3'>
                <img
                  src={network_logo}
                  alt={network}
                  className='w-9 h-9 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-fuchsia-400 dark:border-fuchsia-600'
                  loading='lazy'
                />
                <span className='font-semibold text-fuchsia-700 dark:text-fuchsia-400'>
                  {network}
                </span>
              </div>
              {availability ? (
                <span className='inline-flex items-center text-green-600 dark:text-green-400 text-sm sm:text-base font-medium'>
                  <FaCheckCircle className='mr-1 text-base' /> Available
                </span>
              ) : (
                <span className='inline-flex items-center text-red-600 dark:text-red-400 text-sm sm:text-base font-medium'>
                  <FaTimesCircle className='mr-1 text-base' /> Not Available
                </span>
              )}
            </div>
            <div className='space-y-2 text-sm sm:text-base text-gray-700 dark:text-gray-300'>
              <p>
                <span className='font-bold'>Est. Airdrop:</span>{" "}
                <span className='text-fuchsia-700 dark:text-fuchsia-400'>
                  {formatPrice(price)}
                </span>
              </p>
              <p>
                <span className='font-bold'>Listed Price:</span>{" "}
                <span>{listed_price ? formatPrice(listed_price) : "N/A"}</span>
              </p>
              <p className='flex items-center'>
                <FaTasks className='mr-2 text-fuchsia-700 dark:text-fuchsia-400' />
                <div className='flex gap-2'>
                  <span className='font-bold'>Tasks:</span>
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

        {/* Right Side */}
        <div className='space-y-8'>
          <section className='bg-white/80 dark:bg-gray-900/70 p-4 sm:p-6 rounded-xl shadow-lg border border-fuchsia-500/10 transition-colors'>
            <h2 className='text-xl sm:text-2xl font-bold mb-4 text-fuchsia-700 dark:text-fuchsia-300'>
              Step-by-Step Guide
            </h2>
            <ol className='list-decimal list-inside space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-800 dark:text-gray-100'>
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
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-fuchsia-700 dark:text-fuchsia-400 underline ml-1 hover:text-pink-500 dark:hover:text-pink-300 transition'
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
            <div className='text-center'>
              <a
                href={claimUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='mt-7 inline-flex items-center gap-2
    bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-pink-500
    text-white px-4 py-2 sm:px-6 sm:py-2.5
    rounded-md shadow-md hover:brightness-110 hover:scale-105
    transition-all duration-200 focus:outline-none
    focus:ring-2 focus:ring-fuchsia-400 dark:focus:ring-fuchsia-600
    font-bold text-base sm:text-lg tracking-wide'
                style={{
                  boxShadow:
                    "0 2px 12px 0 rgba(199, 70, 158, 0.13), 0 1px 3px 0 rgba(99, 102, 241, 0.09)",
                }}
              >
                Claim this Airdrop Now{" "}
                <FaExternalLinkAlt className='ml-1 text-lg' />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
