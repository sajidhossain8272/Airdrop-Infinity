import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Airdrop from './Components/Airdop.jsx';
import Construction from './Components/Construction.jsx';
import { HelmetProvider } from 'react-helmet-async';
import InfinityDrop from './Components/InfinityDrop.jsx';
import WebApp from '@twa-dev/sdk'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/airdrop/:id",
    element:  <Airdrop></Airdrop>,
  },

  {
    path: "/construction",
    element: <Construction></Construction>,
  },
  
  {
    path: "/InfinityDrop",
    element: <InfinityDrop></InfinityDrop>,
  },




]);

WebApp.ready();

createRoot(document.getElementById('root')).render(
  <HelmetProvider>
  <StrictMode>
   <RouterProvider router={router} />
  </StrictMode>
  </HelmetProvider>,
);
