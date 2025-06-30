import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
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
    <div className="relative min-h-screen bg-gradient-to-br from-primary-900 to-secondary-900 dark:from-primary-950 dark:to-secondary-950 overflow-hidden transition-colors">
      <Helmet>
        <title>Infinity Drop Airdrop | $INF Early Adopters</title>
      </Helmet>

      {/* Decorative Blobs */}
      <div className="absolute -z-10 top-0 left-0 w-80 h-80 bg-primary-700 dark:bg-primary-800 rounded-full opacity-20 blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute -z-10 bottom-0 right-0 w-64 h-64 bg-secondary-400 dark:bg-secondary-700 rounded-full opacity-20 blur-3xl translate-x-1/4 translate-y-1/4" />

      {/* Hero */}
      <div className="pt-24 pb-12 px-6 text-center text-neutral-900 dark:text-neutral-100">
        <motion.h1
          className="text-4xl sm:text-5xl font-extrabold leading-tight max-w-4xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Early Adopter Airdrop for{" "}
          <span className="text-accent-500 dark:text-accent-400">$INF</span>
        </motion.h1>
        <motion.p
          className="mt-4 text-lg sm:text-xl max-w-2xl mx-auto text-neutral-700 dark:text-neutral-300"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Be among the first to claim your share—complete the steps below to unlock your $INF tokens.
        </motion.p>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-2xl mx-auto px-6 grid gap-8 md:grid-cols-1 items-center">
        {/* Steps Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-neutral-200 dark:border-neutral-800">
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 text-center mb-6">
              Complete These Steps
            </h2>
            <ul className="space-y-6">
              {steps.map((step, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-4 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-xl shadow-sm"
                >
                  <div className="w-8 h-8 bg-primary-600 dark:bg-primary-700 dark:text-white rounded-full flex items-center justify-center font-bold">
                    {idx + 1}
                  </div>
                  <div className="text-primary-600 dark:text-primary-400 text-xl">
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-neutral-900 dark:text-neutral-100">{step.label}</p>
                    {step.url ? (
                      <a
                        href={step.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-700 dark:text-primary-300 hover:underline block mt-1 font-semibold"
                      >
                        {step.cta}
                      </a>
                    ) : (
                      <button
                        onClick={step.action}
                        className="text-primary-700 dark:text-primary-300 hover:underline block mt-1 font-semibold"
                      >
                        {step.cta}
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 text-center">
              <a
                href="https://forms.gle/LS284erydXbFNsYUA"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-accent-500 dark:from-primary-700 dark:to-accent-400 dark:text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:scale-105 transition"
              >
                Claim Your Airdrop
                <FaExternalLinkAlt className="text-lg" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="mt-16 pb-12 text-center px-4 text-neutral-700 dark:text-neutral-400 text-sm">
        Whitepaper & Tokenomics for Infinity Drop coming soon. Stay connected!
      </div>
    </div>
  );
};

export default InfinityDrop;
