import { Helmet } from "react-helmet-async";

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
      <h2 className=' flex justify-center lg:text-3xl text-xl lato-regular'>
        <span className="lato-bold">Infinity Drop🔥</span> Whitepaper and Tokenomics will be released soon.
      </h2>
    </div>
  );
};

export default InfinityDrop;
