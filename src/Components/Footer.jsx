import { FaFacebook, FaSquareXTwitter, FaTelegram } from "react-icons/fa6";
import { FaMedium } from "react-icons/fa";

import { IconContext } from "react-icons";

const Footer = () => {
  return (
//     <div className='lato-regular '>
//       {/* <hr
//         className='h-2 w-5/6 bg-gradient-to-r from-blue-900 via-purple-700 to-pink-600
//  rounded-lg mx-auto my-4'
//       /> */}

      <footer className='footer footer-center bg-base-100 text-black-content p-10  bg-gradient-to-r from-blue-900/5 via-purple-700/5 to-pink-600/5 relative z-10'>
                  <hr className=' w-full h-2 mx-auto my-1 mt-2' />{" "}

        <aside>
          <img width={50} src='/Logo-t-2.png' alt='' />
          <p className='lato-bold text-2xl'>Airdrop Infinity </p>
          <p className='text-lg lato-bold text-gray-700'>
            Brings you the best crypto airdrops!{" "}
          </p>
          <nav>
            <div className='grid grid-flow-col gap-4'>
              <a target='_blank' href='https://x.com/airdropinfiniti'>
                <IconContext.Provider
                  value={{ size: "2em", className: "global-class-name" }}
                >
                  <div>
                    <FaSquareXTwitter />
                  </div>
                </IconContext.Provider>
              </a>
              <a href='https://t.me/airdropinfinityofficial' target='_blank'>
                <IconContext.Provider
                  value={{ size: "2em", className: "global-class-name" }}
                >
                  <div>
                    <FaTelegram />
                  </div>
                </IconContext.Provider>
              </a>
              <a
                target='_blank'
                href={"https://www.facebook.com/airdropinfinity/"}
              >
                <IconContext.Provider
                  value={{ size: "2em", className: "global-class-name" }}
                >
                  <div>
                    <FaFacebook />
                  </div>
                </IconContext.Provider>
              </a>
              <a target='_blank' href={"https://medium.com/@airdropinfinity"}>
                <IconContext.Provider
                  value={{ size: "2em", className: "global-class-name" }}
                >
                  <div>
                    <FaMedium />
                  </div>
                </IconContext.Provider>
              </a>
            </div>
          </nav>
          <p className="lg:pl-96 lg:pr-96">
            {" "}
            <span className='lato-bold'> Disclaimer: </span> The information
            provided on the Airdrop Infinity website is solely for informational
            purposes and should not be interpreted as investment advice,
            financial advice, trading advice, or any other kind of advice.
            Airdrop Infinity expressly disclaims any recommendations,
            endorsements, or guidance for the purchase, sale, or retention of
            any cryptocurrency. Visitors and users of this website should
            perform their own extensive research and consult with a qualified
            financial advisor before making any investment decisions.
          </p>
          <p className='lato-bold text-md'>
            Copyright © {new Date().getFullYear()} - All right reserved
          </p>
        </aside>
      </footer>
    // </div>
  );
};

export default Footer;
