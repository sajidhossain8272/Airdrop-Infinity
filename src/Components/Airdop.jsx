import { NavLink, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Nav from "./Nav";
import FeaturedData from "../FeaturedData"; 
import Footer from "./Footer";
import { Title, Meta } from "react-head";
import { HeadProvider } from "react-head";
import { Helmet } from "react-helmet-async";

const Airdrop = () => {
  const { id } = useParams(); // Retrieve the dynamic id from the URL
  const location = useLocation();
  const [item, setItem] = useState(location.state); // Set initial state with passed location.state

  useEffect(() => {
    // Find the item from FeaturedData by matching the ID
    const foundItem = FeaturedData.find((data) => data.featured_id === id);
    setItem(foundItem);
  }, [id]);

  useEffect(() => {
    if (!item) {
      // If state is not available, find the item from FeaturedData by matching id
      const foundItem = FeaturedData.find((data) => data.featured_id === id);
      setItem(foundItem);
    }
  }, [id, item]);

  if (!item) return <div>No data available</div>;

  // Function to convert URLs in a string to <a> tags
  const renderStepWithLinks = (step) => {
    const urlPattern = /https?:\/\/[^\s]+/g;
    return step.split(urlPattern).map((part, index, array) => {
      if (index < array.length - 1) {
        const url = step.match(urlPattern)[index];
        return (
          <span key={index}>
            {part}
            <a
              href={url}
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-500 underline lato-black'
            >
              Click Here
            </a>
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
  
    <HeadProvider>
      <div>
        <Helmet> <title>Airdrop Infinity | {item.featured_title}</title></Helmet>
        <Nav />
        <div className='p-8 lato-regular'>
          {/* Set the dynamic page title */}
          <Title>{item.featured_title} - Airdrop Infinity</Title>

          {/* Set the dynamic meta description */}
          <Meta name='description' content={item.description} />

          <div className='lg:flex lg:justify-center gap-10 '>
            <img 
              src={item.featured_image}
              alt={item.featured_title}
              className='w-fixed object-fit my-4 shadow-2xl rounded-3xl lg:w-[1280px] lg:h-[720px] '
            />
            <div className='lg:pt-2 border-2 p-4'>
              <p className='text-lg  lg:w-[500px]'>{item.description}</p> <br />
              <h2 className='lato-bold'>
                Airdrop Est.{" "}
                <span className='text-green-500'> ${item.price} </span>{" "}
              </h2>
              <h2 className='lato-bold'>
                Listed Price{" "}
                <span className='text-green-500'> ${item.listed_price} </span>{" "}
              </h2>
              <br />
              <h1 className='text-3xl lato-bold'>
                Step-by-Step Guide for {item.featured_title}
              </h1>
              <h2>{item.availability}</h2>
              <ol className='mt-4 space-y-2 list-decimal pl-5'>
                {item.steps.map((step, idx) => (
                  <li key={idx} className='font-bold'>
                    {renderStepWithLinks(step)}
                  </li>
                ))}
              </ol>{" "}
              <br />
              <h2 className='lato-regular'>
                <span className='lato-bold'> Airdrop Network: </span>
                {item.network}
              </h2>
              <h2 className='lato-regular'>
                {" "}
                <span className='lato-bold'> Tasks: {item.task} </span>{" "}
              </h2>
            </div>
          </div>
        </div>
        <div className='flex justify-center lg:justify-start lg:pl-8'>
          <NavLink
            to='/'
            className='btn text-white bg-gradient-to-r from-blue-900 via-purple-700 to-pink-600 lg:hidden'
          >
            Back to Home
          </NavLink>
        </div>
        <Footer />
      </div>
    </HeadProvider>
  );
};

export default Airdrop;
