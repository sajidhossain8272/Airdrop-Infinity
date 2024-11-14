import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";

const InfinityDrop = () => {
  return (
    <div>
      <Helmet><title>Airdrop Infinity | Infinity Drop🔥</title></Helmet>
      <div className='flex justify-center pt-20 lat-regular'>
        <img width='200' src='./Logo-t-2.png' alt='' />
      </div>
      <div className='flex justify-center pt-2'>
        <h1 className='text-5xl'>Airdrop Infinity</h1>
      </div>{" "}
      <br />
      <h2 className=' lg:flex pl-4 pr-4 lg:pl-0 lg:pr-0 justify-center lg:text-3xl text-sm lato-regular'>
        <span className="lato-bold">Infinity Drop🔥</span> Whitepaper and Tokenomics will be released soon.
      </h2> <br />
      <div className='flex justify-center'>
          <NavLink
            to='/'
            className='btn  text-white bg-gradient-to-r from-blue-900 via-purple-700 to-pink-600 '
          >
            Back to Home
          </NavLink>
        </div>
    </div>
  );
};

export default InfinityDrop;
