// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import WebApp from "@twa-dev/sdk";

// auth
import { AuthProvider } from "./auth/AuthContext.jsx";
import PrivateRoute from "./auth/PrivateRoute.jsx";
import Login from "./auth/Login.jsx";

// error + util
import ErrorBoundary from "./Components/ErrorBoundary.jsx";
import ScrollToTop from "./Components/ScrollToTop.jsx";

// public pages
import Home from "./Components/Home.jsx";
import Airdrop from "./Components/Airdop.jsx";
import Construction from "./Components/Construction.jsx";
import InfinityDrop from "./Components/InfinityDrop.jsx";
import ListedAirdrop from "./Components/ListedAirdrop.jsx";
import BlogList from "./Components/BlogList.jsx";
import BlogDetails from "./Components/BlogDetails.jsx";
import AllProducts from "./Components/AllProducts.jsx";
import ProductDetails from "./Components/ProductDetails.jsx";

// admin pages
import Dashboard from "./Components/Admin/Dashboard.jsx";
import BlogAdmin from "./Components/Admin/BlogAdmin.jsx"; // ← make sure this exists!
import AdminAirdropList from "./Components/Admin/AdminAirdropList.jsx";
import EditAirdropForm from "./Components/Admin/EditAirdropForm.jsx";
import NewAirdropForm from "./Components/Admin/NewAirdropForm.jsx";
import InfinityDropBot from "./Components/InfinityDropBot.jsx";
import ProtectedRoute from "./auth/ProtectedRoute.jsx";
import UserLogin from "./auth/UserLogin.jsx";
import Privacy from "./Components/Privacy.jsx";
import Terms from "./Components/Terms.jsx";

import ContraVerfication from "./Components/ContraVerfication.jsx";
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
      { path: "privacy-policy", element: <Privacy /> },
      {
        path: "contra-verification",
        element: <ContraVerfication />,
      },
      { path: "terms-and-condition", element: <Terms /> },

      { path: "infinity-drop", element: <InfinityDrop /> },
      { path: "listed-airdrop", element: <ListedAirdrop /> },
      { path: "blog", element: <BlogList /> },
      { path: "blog/:slug", element: <BlogDetails /> },
      { path: "products", element: <AllProducts /> },
      { path: "product/:id", element: <ProductDetails /> },
      { path: "*", element: <ErrorBoundary /> },
    ],
  },
  {
    path: "user-login",
    element: <UserLogin />,
  },
  {
    path: "/infinitydropbot",
    element: (
      <ProtectedRoute>
        <InfinityDropBot />
      </ProtectedRoute>
    ),

    errorElement: <ErrorBoundary />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorBoundary />,
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      // Redirect /dashboard → /dashboard/airdrops
      { index: true, element: <Navigate to='airdrops' replace /> },

      // Your two tabs
      { path: "blogs", element: <BlogAdmin /> },
      { path: "airdrops", element: <AdminAirdropList /> },

      // Nested create/edit
      { path: "airdrops/edit/:featured_id", element: <EditAirdropForm /> },
      { path: "airdrops/new", element: <NewAirdropForm /> },

      // Catch-all under /dashboard
      { path: "*", element: <Navigate to='airdrops' replace /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to='/' replace />,
  },
]);

WebApp.ready();

createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </StrictMode>
  </HelmetProvider>
);
