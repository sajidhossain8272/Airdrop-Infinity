import { useLocation } from "react-router-dom";
import Nav from "./Nav";

const Airdrop = () => {
  const location = useLocation();
  const item = location.state;

  if (!item) return <div>No data available</div>;

  // Function to convert URLs in a string to <a> tags
  const renderStepWithLinks = (step) => {
    // Regular expression to match URLs
    const urlPattern = /https?:\/\/[^\s]+/g;

    // Replace all the URLs in the step string with <a> tags
    return step.split(urlPattern).map((part, index, array) => {
      if (index < array.length - 1) {
        // Match URL and wrap it in <a> tag
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
    <div >
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
            {/* Render the step with links */}
            {renderStepWithLinks(step)}
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default Airdrop;
