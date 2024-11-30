import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";


const InfinityDrop = () => {
  return (
    <div>
      <Helmet><title>Airdrop Infinity | Infinity Drop🔥</title></Helmet>
      <Nav />
      <div className="text-black dark:text-gray-100 p-8 rounded-lg shadow-lg max-w-sm lg:max-w-4xl mx-auto glass mt-10 mb-10" >
      <h1 className="text-2xl font-bold text-center mb-6">🚀 Early Adopters Airdrop Launched for Infinity Drop $IDP 🚀</h1>
      
      <p className="text-md mb-4">
        We’re thrilled to announce the launch of the <strong>Early Adopter Airdrop</strong> for <strong>Infinity Drop</strong>! 🚀
      </p>

      <p className="text-md mb-6">
        To get huge benefits and rewards, simply complete the following tasks:
      </p>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm">1. Follow us on Twitter:</span>
          <a href="https://x.com/@airdropinfiniti" className="text-blue-500 hover:underline font-semibold">
            @airdropinfiniti
          </a>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm">2. Like our Facebook Page:</span>
          <a href="https://www.facebook.com/airdropinfinity" className="text-blue-500 hover:underline font-semibold">
            Airdrop Infinity
          </a>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm">3. Join our Telegram Community:</span>
          <a href="https://t.me/airdropinfinityofficial" className="text-blue-500 hover:underline font-semibold">
            Airdrop Infinity Official
          </a>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm">4. Complete as many airdrops as you can from the</span>
          <a href="https://airdropinfinity.com" className="text-blue-500 hover:underline font-semibold">
            Infinity Drop Airdrop Home Page
          </a>
        </div>
      </div>

      <p className="mt-6 text-md">
        This is your chance to be part of something BIG from the very beginning. Don’t miss out on these incredible rewards.  
        Start today and maximize your airdrop benefits! 💥
      </p>

      <div className="text-center mt-8">
      <div className='flex justify-center'>
          <NavLink
            to='/'
            className='btn text-white bg-gradient-to-r from-blue-900 via-purple-700 to-pink-600 '
          >
            Back to Home
          </NavLink>
        </div>
      </div>
    </div>
  
      <br />
      <h2 className=' lg:flex pl-4 pr-4 lg:pl-0 lg:pr-0 justify-center lg:text-3xl text-sm lato-regular'>
        <span className="lato-bold">Infinity Drop🔥</span> Whitepaper and Tokenomics will be released soon.
      </h2> <br />
      
        <Footer />
    </div>
  );
};

export default InfinityDrop;
