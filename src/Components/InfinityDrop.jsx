import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import WebApp from "@twa-dev/sdk";
import { motion } from "framer-motion";
import {
  FaTwitter,
  FaFacebookF,
  FaTelegramPlane,
  FaPaperPlane,
  FaExternalLinkAlt
} from "react-icons/fa";

const InfinityDrop = () => {
  useEffect(() => {
    WebApp.ready();
  }, []);

  const openLink = (url) => WebApp.openLink(url);

  const steps = [
    {
      icon: <FaTwitter />,
      label: "Follow us on Twitter",
      action: () => openLink("https://twitter.com/airdropinfiniti"),
      cta: "@airdropinfiniti"
    },
    {
      icon: <FaFacebookF />,
      label: "Like our Facebook page",
      action: () => openLink("https://www.facebook.com/airdropinfinity"),
      cta: "Airdrop Infinity"
    },
    {
      icon: <FaTelegramPlane />,
      label: "Join our Telegram group",
      url: "https://t.me/airdropinfinityofficial",
      cta: "AirdropInfinityOfficial"
    },
    {
      icon: <FaPaperPlane />,
      label: "Complete daily airdrops",
      url: "https://airdropinfinity.com/listed-airdrop",
      cta: "Infinity Airdrops"
    },
    {
      icon: <FaExternalLinkAlt />,
      label: "Submit your details",
      url: "https://forms.gle/LS284erydXbFNsYUA",
      cta: "Google Form"
    }
  ];

  return (
    <div className="relative bg-gradient-to-br from-indigo-700 to-pink-600 overflow-hidden min-h-screen">
      <Helmet>
        <title>Infinity Drop Airdrop | $INF Early Adopters</title>
      </Helmet>

      {/* Decorative Blobs */}
      <div className="absolute -z-10 top-0 left-0 w-96 h-96 bg-purple-500 rounded-full opacity-20 blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute -z-10 bottom-0 right-0 w-80 h-80 bg-yellow-400 rounded-full opacity-20 blur-3xl translate-x-1/4 translate-y-1/4" />

      {/* Hero */}
      <div className="pt-24 pb-12 px-6 text-center text-white">
        <motion.h1
          className="text-4xl sm:text-5xl font-extrabold leading-tight max-w-4xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Early Adopter Airdrop for <span className="text-yellow-300">$INF</span>
        </motion.h1>
        <motion.p
          className="mt-4 text-lg sm:text-xl max-w-2xl mx-auto text-white/90"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Be among the first to claim your share—complete the steps below to unlock your $INF tokens.
        </motion.p>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-6 grid gap-8 md:grid-cols-2 items-start">
        {/* Steps Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white/20 backdrop-blur-md p-8 rounded-3xl shadow-2xl">
            <h2 className="text-2xl font-semibold text-white text-center mb-6">
              Complete These Steps
            </h2>
            <ul className="space-y-6">
              {steps.map((step, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-4 p-4 bg-white bg-opacity-80 rounded-xl shadow-md"
                >
                  <div className="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold">
                    {idx + 1}
                  </div>
                  <div className="text-indigo-700 text-xl">{step.icon}</div>
                  <div className="flex-1">
                    <p className="font-medium text-indigo-900">{step.label}</p>
                    {step.url ? (
                      <a
                        href={step.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:underline block mt-1"
                      >
                        {step.cta}
                      </a>
                    ) : (
                      <button
                        onClick={step.action}
                        className="text-indigo-600 hover:underline block mt-1"
                      >
                        {step.cta}
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 text-center">
              <NavLink
                to="https://forms.gle/LS284erydXbFNsYUA"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:scale-105 transition"
              >
                Claim Your Airdrop
                <FaExternalLinkAlt className="text-lg" />
              </NavLink>
            </div>
          </div>
        </motion.div>

        {/* Mining CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white/20 backdrop-blur-md p-8 rounded-3xl shadow-2xl text-center text-white">
            <h2 className="text-2xl font-bold mb-4">
              Ready to Start Mining?
            </h2>
            <p className="text-white/90 mb-6">
              Launch our Telegram Bot and begin earning $INF in real time. The earlier you start, the more you mine.
            </p>
            <a
              href="https://t.me/airdropinfinitibot"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition"
            >
              Open Telegram Bot
            </a>
            <div className="mt-6 text-sm text-purple-200">
              💡 Tip: Stay active daily to maximize your INF mining rewards!
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="mt-16 pb-12 text-center px-4 text-white/90 text-sm">
        Whitepaper & Tokenomics for Infinity Drop coming soon. Stay connected!
      </div>
    </div>
  );
};

export default InfinityDrop;
