import { FaFacebook, FaSquareXTwitter, FaTelegram } from "react-icons/fa6";
import { FaMedium } from "react-icons/fa";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom"; // Add this if using react-router

const Footer = () => {
  return (
    <footer className="footer footer-center bg-base-100 dark:bg-gray-900 text-black-content dark:text-gray-100 p-10 bg-gradient-to-r from-purple-900/5 via-fuchsia-700/5 to-pink-600/5 dark:from-purple-900/20 dark:via-fuchsia-700/20 dark:to-pink-600/20 relative z-10">
      <aside>
        <img width={50} src="/Logo-t-2.png" alt="Airdrop Infinity Logo" className="mx-auto mb-2" />
        <p className="lato-bold text-2xl">Airdrop Infinity</p>
        <p className="text-lg lato-bold text-gray-700 dark:text-gray-300">
          Brings you the best crypto airdrops!
        </p>
        <nav>
          <div className="grid grid-flow-col gap-4 mt-4">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://x.com/airdropinfiniti"
              className="hover:text-fuchsia-600 dark:hover:text-fuchsia-400 transition-colors"
              aria-label="Twitter"
            >
              <IconContext.Provider value={{ size: "2em", className: "global-class-name" }}>
                <div>
                  <FaSquareXTwitter />
                </div>
              </IconContext.Provider>
            </a>
            <a
              href="https://t.me/airdropinfinityofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-500 dark:hover:text-purple-300 transition-colors"
              aria-label="Telegram"
            >
              <IconContext.Provider value={{ size: "2em", className: "global-class-name" }}>
                <div>
                  <FaTelegram />
                </div>
              </IconContext.Provider>
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.facebook.com/airdropinfinity/"
              className="hover:text-pink-700 dark:hover:text-pink-500 transition-colors"
              aria-label="Facebook"
            >
              <IconContext.Provider value={{ size: "2em", className: "global-class-name" }}>
                <div>
                  <FaFacebook />
                </div>
              </IconContext.Provider>
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://medium.com/@airdropinfinity"
              className="hover:text-purple-700 dark:hover:text-fuchsia-400 transition-colors"
              aria-label="Medium"
            >
              <IconContext.Provider value={{ size: "2em", className: "global-class-name" }}>
                <div>
                  <FaMedium />
                </div>
              </IconContext.Provider>
            </a>
          </div>
        </nav>
        <div className="flex gap-4">
        <div className="mt-6">
          <Link
            to="/privacy-policy"
            className="text-sm underline text-fuchsia-600 dark:text-fuchsia-400 hover:text-fuchsia-800 dark:hover:text-fuchsia-200 transition-colors"
          >
            Privacy Policy
          </Link>
        </div>
          <div className="mt-6">
          <Link
            to="/terms-and-condition"
            className="text-sm underline text-fuchsia-600 dark:text-fuchsia-400 hover:text-fuchsia-800 dark:hover:text-fuchsia-200 transition-colors"
          >
            Terms and Condition
          </Link>
        </div>
        </div>
        <p className="lg:pl-96 lg:pr-96 mt-6 text-sm text-gray-600 dark:text-gray-400">
          <span className="lato-bold">Disclaimer:</span> The information provided on the Airdrop Infinity website is solely for informational purposes and should not be interpreted as investment advice, financial advice, trading advice, or any other kind of advice. Airdrop Infinity expressly disclaims any recommendations, endorsements, or guidance for the purchase, sale, or retention of any cryptocurrency. Visitors and users of this website should perform their own extensive research and consult with a qualified financial advisor before making any investment decisions.
        </p>
        <p className="lato-bold text-md mt-4 text-gray-700 dark:text-gray-300">
          Copyright © {new Date().getFullYear()} - All rights reserved
        </p>
          <p>Advertisements</p>

      </aside>
    </footer>
  );
};

export default Footer;
