// src/Components/Airdrop.jsx
import { useState, useEffect } from "react";
import { useParams, NavLink }  from "react-router-dom";
import { Helmet }              from "react-helmet-async";
import Spinner                 from "./Spinner";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaTimesCircle,
  FaTasks,
  FaExternalLinkAlt,
  FaBitcoin,
  FaEthereum
} from "react-icons/fa";
import {
  SiSolana,
} from "react-icons/si";

export default function Airdrop() {
  const { id } = useParams();
  const [item, setItem]               = useState(null);
  const [loading, setLoading]         = useState(true);
  const [claimUrl, setClaimUrl]       = useState("");
  const [cryptoPrices, setCryptoPrices] = useState({});
  const API_URL = "https://crypto-store-server.vercel.app/api/airdrops";

  // 1) Load airdrop + claim URL
  useEffect(() => {
    (async () => {
      try {
        const res  = await fetch(`${API_URL}/${id}`);
        const data = await res.json();
        setItem(data);
        const [step1] = data.steps || [];
        const urls    = step1?.match(/https?:\/\/[^\s]+/g);
        if (urls?.[0]) setClaimUrl(urls[0]);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  // 2) Load live prices
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?" +
          "ids=bitcoin,ethereum,solana,&vs_currencies=usd"
        );
        const data = await res.json();
        setCryptoPrices(data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }
  if (!item) {
    return (
      <div className="p-8 text-center text-xl text-red-500">
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
    status
  } = item;

  // map coin → icon
  const CoinIcon = {
    bitcoin:  <FaBitcoin className="text-2xl sm:text-3xl"/>,
    ethereum: <FaEthereum className="text-2xl sm:text-3xl"/>,
    solana:   <SiSolana className="text-2xl sm:text-3xl"/>,
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Helmet>
        <title>Airdrop Infinity | {featured_title}</title>
        <meta name="description" content={description} />
      </Helmet>

      {/* back link */}
      <div className="px-4 sm:px-6 lg:px-16 py-4">
        <NavLink
          to="/listed-airdrop"
          className="inline-flex items-center text-gray-700 hover:text-blue-600 transition"
        >
          <FaArrowLeft className="mr-2"/> Back
        </NavLink>
      </div>

      {/* Hero */}
      <div className="relative h-64 sm:h-72 md:h-96 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 flex flex-col items-center justify-center text-white px-4 sm:px-6 lg:px-16">
        <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold text-center drop-shadow-lg">
          {featured_title}
        </h1>
        <p className="mt-2 text-xs sm:text-sm md:text-base lg:text-lg opacity-90 text-center max-w-xl">
              {description}
        </p>

        {/* live prices */}
        <div className="flex gap-3 sm:gap-4 md:gap-6 mt-4 sm:mt-6 overflow-x-auto">
          {Object.entries(cryptoPrices).map(([coin, { usd }]) => (
            <div
              key={coin}
              className="flex-shrink-0 bg-white bg-opacity-20 backdrop-blur-md px-3 sm:px-4 py-2 sm:py-3 rounded-lg flex flex-col items-center"
            >
              {CoinIcon[coin]}
              <span className="mt-1 uppercase text-[10px] sm:text-xs">{coin}</span>
              <span className="font-bold text-sm sm:text-base">${usd.toLocaleString()}</span>
            </div>
          ))}
        </div>

        {/* main CTA */}
        {claimUrl && (
          <a
            href={claimUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 sm:mt-6 inline-flex items-center bg-gradient-to-r from-indigo-400 to-pink-400 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow hover:scale-105 transition"
          >
            Claim Airdrop <FaExternalLinkAlt className="ml-2"/>
          </a>
        )}
      </div>

      {/* content grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* left */}
        <aside className="space-y-6">
          {/* 16:9 image */}
          <div className="aspect-video w-full">
            <img
              src={featured_image}
              alt={featured_title}
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* metadata */}
          <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <img
                  src={network_logo}
                  alt={network}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                />
                <span className="font-semibold">{network}</span>
              </div>
              {availability ? (
                <span className="inline-flex items-center text-green-600 text-sm sm:text-base">
                  <FaCheckCircle className="mr-1 text-base"/> Available
                </span>
              ) : (
                <span className="inline-flex items-center text-red-600 text-sm sm:text-base">
                  <FaTimesCircle className="mr-1 text-base"/> Not Available
                </span>
              )}
            </div>
            <div className="space-y-2 text-sm sm:text-base">
              <p>
                <span className="font-bold">Est. Airdrop:</span>{" "}
                <span className="text-green-600">${price}</span>
              </p>
              <p>
                <span className="font-bold">Listed Price:</span>{" "}
                <span className="text-gray-700">{listed_price || "N/A"}</span>
              </p>
              <p className="flex items-center">
                <FaTasks className="mr-2 text-gray-600"/> 
                <div className="flex gap-2">
                <span className="font-bold">Tasks:</span> <span> {task} </span> </div>
              </p>
              <p className="inline-block bg-indigo-100 text-indigo-800 rounded-full px-2 py-0.5 text-xs sm:text-sm">
                Status: {status}
              </p>
            </div>
          </div>
        </aside>

        {/* right */}
        <div className="space-y-8">
 

          <section className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">
              Step-by-Step Guide
            </h2>
            <ol className="list-decimal list-inside space-y-2 sm:space-y-3 text-sm sm:text-base">
              {steps.map((step, idx) => (
                <li key={idx} className="text-gray-800">
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
                            className="text-indigo-600 underline ml-1"
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
                className="inline-flex items-center bg-gradient-to-r from-indigo-400 to-pink-400 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full shadow hover:scale-105 transition"
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
