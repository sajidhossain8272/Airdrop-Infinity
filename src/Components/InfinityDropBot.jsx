// src/Components/InfinityDropBot.jsx
import { useEffect, useState } from "react";
import { useAuth }             from "../auth/AuthContext";
import { getAuth }             from "firebase/auth";
import { Navigate }            from "react-router-dom";
import {
  FaTwitter,
  FaFacebookF,
  FaTelegramPlane,
  FaPaperPlane,
  FaExternalLinkAlt,
  FaSignOutAlt,
  FaChevronCircleUp
} from "react-icons/fa";
import WebApp from "@twa-dev/sdk";
import { motion, AnimatePresence } from "framer-motion";

const API                   = "https://crypto-store-server.vercel.app";
const RATE_FREE_PER_MIN     = 0.01;            // 0.01 INF per minute
const RATE_FREE_PER_SEC     = RATE_FREE_PER_MIN/60;
const RATE_PREMIUM_PER_MIN  = 0.1;             // 0.1 INF per minute
const RATE_PREMIUM_PER_SEC  = RATE_PREMIUM_PER_MIN/60;
const RIG_COST_INF          = 50;              // 50 INF
const PREMIUM_RIG_USD_PRICE = 5.00;            // $5

export default function InfinityDropBot() {
  const { user, loading: authLoading, logout } = useAuth();

  // State
  const [userData,     setUserData]     = useState({
    tokenBalance:     0,
    tasksCompleted:   [],
    rigPurchasedAt:   null,
    premiumPurchasedAt: null
  });
  const [loadingData,  setLoadingData]  = useState(true);
  const [loadingSteps, setLoadingSteps] = useState({});
  const [toasts,       setToasts]       = useState([]);

  // Auth guard
  if (!authLoading && !user) return <Navigate to="/user-login" replace />;
  if (authLoading)            return <div className="p-8 text-center">Loading auth…</div>;

  // TWA ready + fetch
  useEffect(() => { WebApp.ready(); }, []);
  useEffect(() => { if (user) fetchUser(); }, [user]);

  // Ownership flags
  const rigOwned     = Boolean(userData.rigPurchasedAt);
  const premiumOwned = Boolean(userData.premiumPurchasedAt);

  // Real-time mining tick
  useEffect(() => {
    if (!rigOwned && !premiumOwned) return;
    const iv = setInterval(() => {
      setUserData(prev => ({
        ...prev,
        tokenBalance:
          prev.tokenBalance
          + (rigOwned     ? RATE_FREE_PER_SEC    : 0)
          + (premiumOwned ? RATE_PREMIUM_PER_SEC : 0)
      }));
    }, 1000);
    return () => clearInterval(iv);
  }, [rigOwned, premiumOwned]);

  // Fetch user state from server
  async function fetchUser() {
    setLoadingData(true);
    try {
      const idToken = await getAuth().currentUser.getIdToken(true);
      const res     = await fetch(`${API}/api/users/me`, {
        headers: { Authorization: `Bearer ${idToken}` }
      });
      if (!res.ok) throw new Error("Cannot load user data");
      const data = await res.json();
      setUserData({
        tokenBalance:      data.tokenBalance,
        tasksCompleted:    data.tasksCompleted,
        rigPurchasedAt:    data.rigPurchasedAt || null,
        premiumPurchasedAt:data.premiumPurchasedAt || null
      });
    } catch (err) {
      console.error(err);
      addToast(err.message, 'error');
    }
    setLoadingData(false);
  }

  // Claim airdrop step (+10 INF)
  async function claimTask(taskId) {
    setLoadingSteps(prev => ({ ...prev, [taskId]: true }));
    try {
      const idToken = await getAuth().currentUser.getIdToken();
      const res     = await fetch(`${API}/api/tasks/complete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:  `Bearer ${idToken}`
        },
        body: JSON.stringify({ taskId })
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Claim failed");
      setUserData(prev => ({
        ...prev,
        tokenBalance:   result.tokenBalance,
        tasksCompleted: result.tasksCompleted
      }));
      addToast(`+10 INF for ${taskId}`, 'success');
    } catch (err) {
      console.error(err);
      addToast(err.message, 'error');
    } finally {
      setLoadingSteps(prev => ({ ...prev, [taskId]: false }));
    }
  }

  // Purchase free-rig with INF
  async function purchaseFreeRig() {
    try {
      const idToken = await getAuth().currentUser.getIdToken();
      const res     = await fetch(`${API}/api/miner/purchase`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:  `Bearer ${idToken}`
        }
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Purchase failed");
      setUserData(prev => ({
        ...prev,
        tokenBalance:   result.tokenBalance,
        rigPurchasedAt: result.rigPurchasedAt
      }));
      addToast("Rig purchased! Mining 0.01 INF/min.", "success");
    } catch (err) {
      console.error(err);
      addToast(err.message, "error");
    }
  }

  // Purchase premium rig via Coinbase Commerce
  async function purchasePremiumRig() {
    try {
      const idToken = await getAuth().currentUser.getIdToken();
      const res     = await fetch(`${API}/api/payments/premium-rig-charge`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:  `Bearer ${idToken}`
        }
      });
      const { hosted_url } = await res.json();
      if (!res.ok) throw new Error("Could not initiate payment");
      window.location.href = hosted_url;
    } catch (err) {
      console.error(err);
      addToast(err.message, "error");
    }
  }

  // Toast helper
  function addToast(message, type='info') {
    const id = Date.now();
    setToasts(ts => [...ts, { id, message, type }]);
    setTimeout(() => {
      setToasts(ts => ts.filter(t => t.id !== id));
    }, 3000);
  }

  // Airdrop steps unchanged
  const steps = [
    { id:"step-1", icon:<FaTwitter/>,       label:"Follow us on Twitter",      action:()=>WebApp.openLink("https://twitter.com/airdropinfiniti"),            cta:"@airdropinfiniti" },
    { id:"step-2", icon:<FaFacebookF/>,     label:"Like our Facebook page",     action:()=>WebApp.openLink("https://www.facebook.com/airdropinfinity"),      cta:"Airdrop Infinity" },
    { id:"step-3", icon:<FaTelegramPlane/>, label:"Join our Telegram group",    url:  "https://t.me/airdropinfinityofficial",                              cta:"AirdropInfinityOfficial" },
    { id:"step-4", icon:<FaPaperPlane/>,    label:"Complete daily airdrops",   url:  "https://airdropinfinity.com/listed-airdrop",                        cta:"Infinity Airdrops" },
    { id:"step-5", icon:<FaExternalLinkAlt/>,label:"Submit your details",       url:  "https://forms.gle/LS284erydXbFNsYUA",                                cta:"Google Form" }
  ];

  const completedCount = userData.tasksCompleted.length;
  const totalCount     = steps.length;
  const progressPct    = (completedCount/totalCount)*100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 to-pink-600">

      {/* Toasts */}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        <AnimatePresence>
          {toasts.map(t => (
            <motion.div key={t.id}
              initial={{ x:100, opacity:0 }}
              animate={{ x:0,   opacity:1 }}
              exit={{  x:100, opacity:0 }}
              className={`px-4 py-2 rounded shadow-lg text-white ${
                t.type==='success' ? 'bg-green-500' : 'bg-red-500'
              }`}
            >
              {t.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Top bar */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3 text-white">
          {user.photoURL && (
            <img
              src={user.photoURL}
              alt="avatar"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
          )}
          <div>
            <div className="font-semibold">{user.displayName||user.email}</div>
            <motion.div
              key={userData.tokenBalance}
              initial={{ scale:0.8, opacity:0 }}
              animate={{ scale:1,   opacity:1 }}
              className="text-sm"
            >
              {loadingData
                ? "Loading…"
                : `Balance: ${userData.tokenBalance.toFixed(4)} INF`}
            </motion.div>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center text-white hover:text-gray-200"
        >
          <FaSignOutAlt className="mr-1"/> Logout
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mx-auto max-w-3xl px-6 mt-2">
        <div className="h-2 bg-white bg-opacity-30 rounded">
          <motion.div
            className="h-full bg-yellow-300 rounded"
            initial={{ width: 0 }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>
        <div className="text-white text-sm text-right mt-1">
          {completedCount} / {totalCount} steps done
        </div>
      </div>

      {/* Hero */}
      <div className="px-6 pt-8 text-center text-white">
        <motion.h1
          className="text-4xl font-extrabold"
          initial={{ y:-20, opacity:0 }}
          animate={{ y:0, opacity:1 }}
        >
          Infinity Drop Bot
        </motion.h1>
        <p className="mt-2 opacity-90">
          Earn +10 INF per step, mine 0.01 INF/min (free rig), or 0.1 INF/min (premium rig).
        </p>
      </div>

      {/* Airdrop Steps */}
      <motion.div
        className="max-w-3xl mx-auto mt-6 px-6"
        initial={{ opacity:0, scale:0.95 }}
        animate={{ opacity:1, scale:1 }}
      >
        <div className="bg-white bg-opacity-20 backdrop-blur-md p-6 rounded-2xl shadow-xl">
          <ul className="space-y-4">
            {steps.map(step => {
              const done    = userData.tasksCompleted.includes(step.id);
              const loading = loadingSteps[step.id];
              return (
                <motion.li
                  key={step.id}
                  layout
                  className={`flex items-center gap-4 p-4 rounded-xl ${
                    done ? 'bg-green-100' : 'bg-white bg-opacity-80'
                  }`}
                >
                  <div className="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center">
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-indigo-900">{step.label}</p>
                    {done ? (
                      <span className="mt-1 inline-block text-green-700 font-semibold">
                        ✓ Claimed
                      </span>
                    ) : loading ? (
                      <span className="mt-1 inline-flex items-center text-indigo-600">
                        <svg
                          className="animate-spin h-5 w-5 mr-2 text-indigo-600"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                          />
                        </svg>
                        Claiming…
                      </span>
                    ) : step.url ? (
                      <a
                        href={step.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => claimTask(step.id)}
                        className="mt-1 inline-block text-indigo-600 hover:underline"
                      >
                        {step.cta} (+10 INF)
                      </a>
                    ) : (
                      <button
                        onClick={() => { step.action(); claimTask(step.id); }}
                        className="mt-1 inline-block text-indigo-600 hover:underline"
                      >
                        {step.cta} (+10 INF)
                      </button>
                    )}
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </motion.div>

      {/* Free Miner Rig */}
      <div className="mt-8 max-w-3xl mx-auto px-6">
        <div className="bg-white bg-opacity-20 backdrop-blur-md p-6 rounded-2xl shadow-xl flex items-center justify-between">
          <div className="text-white">
            <h3 className="text-xl font-semibold">INF Miner Rig</h3>
            <p className="mt-1">Cost: 50 INF | Rate: 0.01 INF/min</p>
          </div>
          {rigOwned ? (
            <motion.div
              className="flex items-center text-yellow-300"
              initial={{ scale:0.8, opacity:0 }}
              animate={{ scale:1,   opacity:1 }}
            >
              <FaChevronCircleUp className="mr-2 text-2xl"/> Mining…
            </motion.div>
          ) : (
            <button
              onClick={purchaseFreeRig}
              className="px-4 py-2 bg-yellow-400 text-indigo-900 rounded-lg hover:bg-yellow-500"
            >
              Buy Rig (−50 INF)
            </button>
          )}
        </div>
      </div>

      {/* Premium Miner Rig */}
      <div className="mt-6 max-w-3xl mx-auto px-6">
        <div className="bg-white bg-opacity-20 backdrop-blur-md p-6 rounded-2xl shadow-xl flex items-center justify-between">
          <div className="text-white">
            <h3 className="text-xl font-semibold">Premium Miner Rig</h3>
            <p className="mt-1">Cost: ${PREMIUM_RIG_USD_PRICE.toFixed(2)} | Rate: 0.1 INF/min</p>
          </div>
          {premiumOwned ? (
            <motion.div
              className="flex items-center text-yellow-300"
              initial={{ scale:0.8, opacity:0 }}
              animate={{ scale:1,   opacity:1 }}
            >
              <FaChevronCircleUp className="mr-2 text-2xl"/> Premium Mining…
            </motion.div>
          ) : (
            <button
              onClick={purchasePremiumRig}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Buy Premium Rig (${PREMIUM_RIG_USD_PRICE.toFixed(2)})
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
