const Footer = () => {
  return (
    <div className='lato-regular'>
      <hr
        className='h-2 w-5/6 bg-gradient-to-r from-blue-900 via-purple-700 to-pink-600
 rounded-lg mx-auto my-4'
      />
      <footer className='footer footer-center bg-base-100 text-black-content p-10'>
        <aside>
          <img width={50} src='/Logo-t-2.png' alt='' />
          <p className='lato-bold text-2xl'>Airdrop Infinity </p>
          <p className='text-lg lato-bold text-gray-700'>
            Brings you the best crypto airdrops!{" "}
          </p>
          <nav>
            <div className='grid grid-flow-col gap-4'>
              <a>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  x='0px'
                  y='0px'
                  width='24'
                  height='24'
                  viewBox='0 0 50 50'
                >
                  <path d='M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z'></path>
                </svg>
              </a>
              <a>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  x='0px'
                  y='0px'
                  width='24'
                  height='24'
                  viewBox='0 0 50 50'
                >
                  <path d='M25,2c12.703,0,23,10.297,23,23S37.703,48,25,48S2,37.703,2,25S12.297,2,25,2z M32.934,34.375	c0.423-1.298,2.405-14.234,2.65-16.783c0.074-0.772-0.17-1.285-0.648-1.514c-0.578-0.278-1.434-0.139-2.427,0.219	c-1.362,0.491-18.774,7.884-19.78,8.312c-0.954,0.405-1.856,0.847-1.856,1.487c0,0.45,0.267,0.703,1.003,0.966	c0.766,0.273,2.695,0.858,3.834,1.172c1.097,0.303,2.346,0.04,3.046-0.395c0.742-0.461,9.305-6.191,9.92-6.693	c0.614-0.502,1.104,0.141,0.602,0.644c-0.502,0.502-6.38,6.207-7.155,6.997c-0.941,0.959-0.273,1.953,0.358,2.351	c0.721,0.454,5.906,3.932,6.687,4.49c0.781,0.558,1.573,0.811,2.298,0.811C32.191,36.439,32.573,35.484,32.934,34.375z'></path>
                </svg>
              </a>
              <a>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  x='0px'
                  y='0px'
                  width='24'
                  height='24'
                  viewBox='0 0 50 50'
                >
                  <path d='M25,3C12.85,3,3,12.85,3,25c0,11.03,8.125,20.137,18.712,21.728V30.831h-5.443v-5.783h5.443v-3.848 c0-6.371,3.104-9.168,8.399-9.168c2.536,0,3.877,0.188,4.512,0.274v5.048h-3.612c-2.248,0-3.033,2.131-3.033,4.533v3.161h6.588 l-0.894,5.783h-5.694v15.944C38.716,45.318,47,36.137,47,25C47,12.85,37.15,3,25,3z'></path>
                </svg>
              
              </a>
            </div>
          </nav>
          <hr className=' w-full h-2 mx-auto my-1' />{" "}
          <p>
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
    </div>
  );
};

export default Footer;
