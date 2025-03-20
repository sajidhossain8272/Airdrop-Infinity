import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import WebApp from "@twa-dev/sdk";
import ErrorBoundary from "./Components/ErrorBoundary.jsx";
import ScrollToTop from "./Components/ScrollToTop.jsx";

// Components
import Airdrop from "./Components/Airdop.jsx";
import Construction from "./Components/Construction.jsx";
import InfinityDrop from "./Components/InfinityDrop.jsx";
import ListedAirdrop from "./Components/ListedAirdrop.jsx";
import BlogList from "./Components/BlogList.jsx";
import BlogDetails from "./Components/BlogDetails.jsx";
import Home from "./Components/Home.jsx";
import Dashboard from "./Components/Admin/Dashboard.jsx";
import AllProducts from "./Components/AllProducts.jsx";
import ProductDetails from "./Components/ProductDetails.jsx"; // Ensure you have this
import AdminAirdropList from "./Components/Admin/AdminAirdropList.jsx";
import EditAirdropForm from "./Components/Admin/EditAirdropForm.jsx";
import NewAirdropForm from "./Components/Admin/NewAirdropForm.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ScrollToTop />
        <App />
      </>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <Home /> },
      { path: "airdrop/:id", element: <Airdrop /> },
      { path: "construction", element: <Construction /> },
      { path: "infinity-drop", element: <InfinityDrop /> },
      { path: "listed-airdrop", element: <ListedAirdrop /> },
      { path: "blog", element: <BlogList />, errorElement: <ErrorBoundary /> },
      { path: "blog/:slug", element: <BlogDetails />, errorElement: <ErrorBoundary /> },
      { path: "products", element: <AllProducts />, errorElement: <ErrorBoundary /> },
      { path: "product/:id", element: <ProductDetails />, errorElement: <ErrorBoundary /> },
      { path: "*", element: <ErrorBoundary /> },
    ],
  },
  // Dashboard (Admin) Routes
  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/dashboard/airdrops",
    element: <AdminAirdropList />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/dashboard/airdrops/edit/:featured_id",
    element: <EditAirdropForm />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/dashboard/airdrops/new",
    element: <NewAirdropForm />,
    errorElement: <ErrorBoundary />,
  },
]);

WebApp.ready();

createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </HelmetProvider>
);
