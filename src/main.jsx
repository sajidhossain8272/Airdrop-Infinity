import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import WebApp from "@twa-dev/sdk";
import ErrorBoundary from "./Components/ErrorBoundary.jsx";

// Components
import Airdrop from "./Components/Airdop.jsx";
import Construction from "./Components/Construction.jsx";
import InfinityDrop from "./Components/InfinityDrop.jsx";
import ListedAirdrop from "./Components/ListedAirdrop.jsx";
import BlogList from "./Components/BlogList.jsx";
import BlogDetails from "./Components/BlogDetails.jsx";
import { blogPosts } from "./data/blogPosts";
import Home from "./Components/Home.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Home /> // Make sure you have a Home component imported
      },
      {
        path: "airdrop/:id",
        element: <Airdrop />
      },
      {
        path: "construction",
        element: <Construction />
      },
      {
        path: "infinity-drop", // Changed to kebab-case
        element: <InfinityDrop />
      },
      {
        path: "listed-airdrop", // Changed to kebab-case
        element: <ListedAirdrop />
      },
      {
        path: "blog",
        element: <BlogList blogs={blogPosts} />,
        errorElement: <ErrorBoundary />
      },
      {
        path: "blog/:slug",
        element: <BlogDetails />,
        errorElement: <ErrorBoundary />
      },
      {
        path: "*",
        element: <ErrorBoundary />
      }
    ]
  }
]);

WebApp.ready();

createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </HelmetProvider>
);