import { motion } from "framer-motion";
import { FaRocket, FaWallet } from 'react-icons/fa';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import NewBlogsSection from "./NewBlogsSection";
import { Link } from "react-router-dom";
// import TrendingProducts from "./TrendingProducts";

const Home = () => {
  const particlesInit = async (engine) => {
    await loadFull(engine);
  };


  return (
    <div className="min-h-screen bg-base-100 lato-relative overflow-hidden bg-gradient-to-r from-blue-900/5 via-purple-700/5 to-pink-600/5 relative z-10">
      {/* Animated Particles Background */}
      <div className="absolute inset-0 z-0">
        <Particles
          init={particlesInit}
          options={{
            particles: {
              number: { value: 50 },
              color: { value: ["#4F46E5", "#9333EA", "#DB2777"] },
              opacity: { value: 0.5 },
              size: { value: 1 },
              move: {
                enable: true,
                speed: 1,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false,
              },
            },
            interactivity: {
              events: {
                onhover: { enable: true, mode: "repulse" },
              },
            },
          }}
        />
      </div>

      <section className="relative overflow-hidden h-[700px] flex items-center justify-center">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900 opacity-90"></div>

        {/* Animated Background Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Circle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.3, scale: 1 }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            className="absolute w-64 h-64 bg-purple-500/20 rounded-full blur-2xl top-1/4 left-1/4"
          ></motion.div>

          {/* Triangle */}
          <motion.div
            initial={{ opacity: 0, rotate: 0 }}
            animate={{ opacity: 0.3, rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute w-64 h-64 bg-blue-500/20 blur-2xl top-1/3 right-1/4 clip-triangle"
          ></motion.div>

          {/* Square */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.3, scale: 1.2 }}
            transition={{ duration: 12, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            className="absolute w-64 h-64 bg-pink-500/20 blur-2xl bottom-1/4 left-1/2"
          ></motion.div>
        </div>

        {/* Animated Lines */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-[200%] h-[200%] animate-rotate-lines" style={{
            background: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 30px,
              rgba(255, 255, 255, 0.01) 25px,
              rgba(255, 255, 255, 0.02) 500px
            )`,
          }}></div>
        </div>

        <div className="container mx-auto px-4 py-32 lg:pl-40 lg:pr-40 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="lg:text-7xl text-4xl lato-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              Something Big is coming! Stay Tuned
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-200 mb-8"
            >
   Discover verified airdrops, earn your $INF tokens, and 
   <span className="block mt-2 text-sm text-purple-300">
     expand your crypto expertise in Infinity Knowledge
   </span>
            </motion.p>

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Link 
                to="/infinity-drop" 
                className="inline-block px-8 py-3 text-lg font-semibold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-lg hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl"
              >
                Start Earning $INF
              </Link>
            </motion.div>

            {/* Animated Icons */}
            <div className="mt-16 flex justify-center space-x-12">
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <FaWallet className="text-7xl text-purple-400/80 hover:text-purple-300 transition-colors duration-300" />
              </motion.div>
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
              >
                <FaRocket className="text-7xl text-blue-400/80 hover:text-blue-300 transition-colors duration-300" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

   {/* <TrendingProducts /> */}
      {/* CTA Section */}
        <NewBlogsSection />
       
    </div>
  );
};

export default Home;