/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { getAuth } from "firebase/auth";
import { Navigate } from "react-router-dom";
import {
  FaTwitter, FaFacebookF, FaTelegramPlane, FaPaperPlane,
  FaExternalLinkAlt, FaSignOutAlt, FaChevronCircleUp
} from "react-icons/fa";
import WebApp from "@twa-dev/sdk";
import { motion, AnimatePresence } from "framer-motion";

const API = "https://crypto-store-server.vercel.app";
const RATE_FREE_PER_SEC = 0.01 / 60;
const RATE_PREMIUM_PER_SEC = 0.1 / 60;
const RIG_COST_INF = 50;
const PREMIUM_RIG_USD_PRICE = 5.00;

export default function InfinityDropBot() {
  const { user, loading: authLoading, logout } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loadingSteps, setLoadingSteps] = useState({});
  const [toasts, setToasts] = useState([]);
  const [tonAddress, setTonAddress] = useState("");

  const rigOwned = Boolean(userData?.rigPurchasedAt);
  const premiumOwned = Boolean(userData?.premiumPurchasedAt);

  // TWA
  useEffect(() => { WebApp.ready(); }, []);

  const fetchUserData = async () => {
    try {
      const idToken = await getAuth().currentUser.getIdToken(true);
      const res = await fetch(`${API}/api/users/me`, {
        headers: { Authorization: `Bearer ${idToken}` }
      });
      if (!res.ok) throw new Error("Failed to load user data");
      const data = await res.json();
      setUserData(data);
    } catch (err) {
      console.error(err);
      addToast(err.message, "error");
    }
  };

  useEffect(() => {
    if (user) fetchUserData();
  }, [user]);

  useEffect(() => {
    if (!userData) return;
    if (!rigOwned && !premiumOwned) return;

    const interval = setInterval(() => {
      setUserData(prev => ({
        ...prev,
        tokenBalance:
          prev.tokenBalance +
          (rigOwned ? RATE_FREE_PER_SEC : 0) +
          (premiumOwned ? RATE_PREMIUM_PER_SEC : 0)
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [rigOwned, premiumOwned, userData]);

  if (!authLoading && !user) return <Navigate to="/user-login" replace />;
  if (authLoading) return <div className="p-8 text-center">Loading auth…</div>;

  async function claimTask(taskId) {
    setLoadingSteps(prev => ({ ...prev, [taskId]: true }));
    try {
      const idToken = await getAuth().currentUser.getIdToken();
      const res = await fetch(`${API}/api/tasks/complete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`
        },
        body: JSON.stringify({ taskId })
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Task claim failed");

      setUserData(prev => ({
        ...prev,
        tokenBalance: result.tokenBalance,
        tasksCompleted: result.tasksCompleted
      }));
      addToast(`+10 INF for ${taskId}`, "success");
    } catch (err) {
      console.error(err);
      addToast(err.message, "error");
    } finally {
      setLoadingSteps(prev => ({ ...prev, [taskId]: false }));
    }
  }

  async function purchaseFreeRig() {
    try {
      const idToken = await getAuth().currentUser.getIdToken();
      const res = await fetch(`${API}/api/miner/purchase`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`
        }
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Purchase failed");
      setUserData(prev => ({
        ...prev,
        tokenBalance: result.tokenBalance,
        rigPurchasedAt: result.rigPurchasedAt
      }));
      addToast("Rig purchased successfully!", "success");
    } catch (err) {
      console.error(err);
      addToast(err.message, "error");
    }
  }

  async function purchasePremiumRig() {
    try {
      const idToken = await getAuth().currentUser.getIdToken();
      const res = await fetch(`${API}/api/payments/premium-rig-charge`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`
        }
      });
      const { hosted_url } = await res.json();
      if (!res.ok) throw new Error("Payment setup failed");
      window.location.href = hosted_url;
    } catch (err) {
      console.error(err);
      addToast(err.message, "error");
    }
  }

  function addToast(message, type = "info") {
    const id = Date.now();
    setToasts(ts => [...ts, { id, message, type }]);
    setTimeout(() => {
      setToasts(ts => ts.filter(t => t.id !== id));
    }, 3000);
  }

  const steps = [
    { id: "step-1", icon: <FaTwitter />, label: "Follow on Twitter", action: () => WebApp.openLink("https://twitter.com/airdropinfiniti"), cta: "@airdropinfiniti" },
    { id: "step-2", icon: <FaFacebookF />, label: "Like on Facebook", action: () => WebApp.openLink("https://www.facebook.com/airdropinfinity"), cta: "Airdrop Infinity" },
    { id: "step-3", icon: <FaTelegramPlane />, label: "Join Telegram", url: "https://t.me/airdropinfinityofficial", cta: "Telegram Group" },
    { id: "step-4", icon: <FaPaperPlane />, label: "Complete daily airdrops", url: "https://airdropinfinity.com/listed-airdrop", cta: "Visit Airdrops" },
    { id: "step-5", icon: <FaExternalLinkAlt />, label: "Submit details", url: "https://forms.gle/LS284erydXbFNsYUA", cta: "Google Form" }
  ];

  const completedCount = userData?.tasksCompleted?.length || 0;
  const progressPct = (completedCount / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 to-pink-600 text-sm sm:text-base">
      {/* Toasts */}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        <AnimatePresence>
          {toasts.map(t => (
            <motion.div
              key={t.id}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              className={`px-4 py-2 rounded text-white shadow-lg ${
                t.type === "success" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {t.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center p-4 text-white space-y-3 sm:space-y-0">
        <div className="flex items-center space-x-3">
          {user.photoURL && <img src={user.photoURL} alt="avatar" className="w-10 h-10 rounded-full border-2 border-white" />}
          <div>
            <div className="font-semibold">{user.displayName || user.email}</div>
            <motion.div
              key={userData?.tokenBalance}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-sm"
            >
              {userData ? `Balance: ${userData.tokenBalance.toFixed(4)} INF` : "Loading…"}
            </motion.div>
          </div>
        </div>
        <button onClick={logout} className="hover:text-gray-200">
          <FaSignOutAlt className="inline mr-1" /> Logout
        </button>
      </div>

      {/* Progress Bar */}
      <div className="max-w-3xl mx-auto px-6 mt-4">
        <div className="h-2 bg-white bg-opacity-30 rounded">
          <motion.div
            className="h-full bg-yellow-300 rounded"
            initial={{ width: 0 }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>
        <div className="text-sm text-white text-right mt-1">
          {completedCount} / {steps.length} steps completed
        </div>
      </div>

      {/* Step Tasks */}
      <div className="mt-8 max-w-3xl mx-auto px-6">
        <div className="bg-white bg-opacity-20 backdrop-blur-md p-6 rounded-2xl shadow-xl space-y-4">
          {steps.map(step => {
            const done = userData?.tasksCompleted.includes(step.id);
            const loading = loadingSteps[step.id];
            return (
              <motion.div key={step.id} layout className={`flex items-center p-4 rounded-xl ${done ? 'bg-green-100' : 'bg-white bg-opacity-80'}`}>
                <div className="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center">{step.icon}</div>
                <div className="ml-4 flex-1">
                  <p className="font-medium text-indigo-900">{step.label}</p>
                  {done ? (
                    <span className="text-green-700 font-semibold mt-1 block">✓ Claimed</span>
                  ) : loading ? (
                    <span className="text-indigo-600 mt-1 inline-flex items-center">
                      <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Claiming…
                    </span>
                  ) : step.url ? (
                    <a href={step.url} target="_blank" rel="noopener noreferrer" onClick={() => claimTask(step.id)} className="text-indigo-600 hover:underline mt-1 inline-block">
                      {step.cta} (+10 INF)
                    </a>
                  ) : (
                    <button onClick={() => { step.action(); claimTask(step.id); }} className="text-indigo-600 hover:underline mt-1 inline-block">
                      {step.cta} (+10 INF)
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Miner Rigs */}
      <div className="mt-8 max-w-3xl mx-auto px-6 space-y-6 pb-10">
        <div className="bg-white bg-opacity-20 backdrop-blur-md p-6 rounded-2xl shadow-xl flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
          <div className="text-white text-center sm:text-left">
            <h3 className="text-xl font-semibold">INF Miner Rig</h3>
            <p>Cost: 50 INF | Rate: 0.01 INF/min</p>
          </div>
          {rigOwned ? (
            <motion.div className="flex items-center text-yellow-300" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
              <FaChevronCircleUp className="mr-2 text-2xl" /> Mining…
            </motion.div>
          ) : (
            <button onClick={purchaseFreeRig} className="bg-yellow-400 text-indigo-900 px-4 py-2 rounded-lg hover:bg-yellow-500">
              Buy Rig (−50 INF)
            </button>
          )}
        </div>

        <div className="bg-white bg-opacity-20 backdrop-blur-md p-6 rounded-2xl shadow-xl flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
          <div className="text-white text-center sm:text-left">
            <h3 className="text-xl font-semibold">Premium Miner Rig</h3>
            <p>Cost: ${PREMIUM_RIG_USD_PRICE.toFixed(2)} | Rate: 0.1 INF/min</p>
          </div>
          {premiumOwned ? (
            <motion.div className="flex items-center text-yellow-300" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
              <FaChevronCircleUp className="mr-2 text-2xl" /> Premium Mining…
            </motion.div>
          ) : (
            <button onClick={purchasePremiumRig} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
              Buy Premium Rig (${PREMIUM_RIG_USD_PRICE.toFixed(2)})
            </button>
          )}
        </div>

        {/* Claim INF Airdrop Section */}
        <div className="bg-white bg-opacity-20 backdrop-blur-md p-6 rounded-2xl shadow-xl space-y-4 text-white">
          <h3 className="text-lg font-semibold">Claim INF Airdrop</h3>
          <input
            type="text"
            placeholder="Enter your TON address"
            value={tonAddress}
            onChange={(e) => setTonAddress(e.target.value)}
            className="w-full px-4 py-2 rounded-md text-black"
          />
          <button
            disabled
            className="w-full px-4 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed"
          >
            Claim INF (Disabled)
          </button>
          <p className="text-yellow-100 text-xs sm:text-sm text-center">
            Airdrop claim will start after mining ends.
          </p>
        </div>
      </div>
    </div>
  );
}
