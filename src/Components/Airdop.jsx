import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Nav from "./Nav";
import FeaturedData from "../FeaturedData"; // Assuming this file contains your data

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
            <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
              click here
            </a>
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div>
      <Nav />
      <div className="p-8">
        <h1 className="text-4xl font-bold">{item.featured_title}</h1>
        <img
          src={item.featured_image}
          alt={item.featured_title}
          className="w-[780px] object-fit my-4"
        />
        <p className="text-lg">{item.description}</p>
        <ul className="mt-4 space-y-2">
          {item.steps.map((step, idx) => (
            <li key={idx} className="list-disc ml-5">
              {renderStepWithLinks(step)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Airdrop;
