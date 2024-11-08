import { NavLink, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Nav from "./Nav";
import FeaturedData from "../FeaturedData"; // Assuming this file contains your data
import Footer from "./Footer";

const Airdrop = () => {
  const { id } = useParams(); // Retrieve the dynamic id from the URL
  const location = useLocation();
  const [item, setItem] = useState(location.state); // Set initial state with passed location.state

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
            <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline lato-black">
              Click Here
            </a>
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div>
      <Nav></Nav>
      <div className="p-8 lato-regular">
        <h1 className="text-4xl font-bold flex lg:justify-center">{item.featured_title}</h1>
        <div className="lg:flex lg:justify-center gap-10">
        <img
          src={item.featured_image}
          alt={item.featured_title}
          className="w-[780px] object-fit my-4 shadow-2xl rounded-3xl"
        />
        <div className="lg:pt-2 border-2 p-4">
        <p className="text-lg">{item.description}</p>
        <h2 className="lato-bold">Est. <span className="text-green-500"> ${item.price} </span> </h2>
        <h2>{item.availability}</h2>

        <ul className="mt-4 space-y-2">
          {item.steps.map((step, idx) => (
            <li key={idx} className="list-disc ml-5">
              {renderStepWithLinks(step)}
            </li>
          ))}
        </ul> <br />
        <h2 className="lato-regular"><span className="lato-bold">  Airdrop Network: </span>{item.network}</h2>
        <h2 className="lato-regular"> <span className="lato-bold"> Tasks: {item.task} </span> </h2>
        </div>
        </div>
      </div>
      <div className="flex justify-center lg:justify-start lg:pl-8"><NavLink to="/" className=" btn text-white bg-gradient-to-r from-blue-900 via-purple-700 to-pink-600 lg:hidden">Back to Home</NavLink></div>
      <Footer></Footer>
    </div>
  );
};

export default Airdrop;
