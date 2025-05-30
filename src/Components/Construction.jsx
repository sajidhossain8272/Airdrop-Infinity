import { Helmet } from "react-helmet-async";

const Construction = () => {
  return (
    <div>
      <Helmet><title>Airdrop Infinity | Under Construction</title></Helmet>
      <div className='flex justify-center pt-20 lat-regular'>
        <img width='200' src='./Logo-t-2.png' alt='' />
      </div>
      <div className='flex justify-center pt-2'>
        <h1 className='text-5xl'>Airdrop Infinity</h1>
      </div>{" "}
      <br />
      <h2 className=' flex justify-center lg:text-3xl text-xl'>
        This page is under construction!
      </h2>
    </div>
  );
};

export default Construction;
