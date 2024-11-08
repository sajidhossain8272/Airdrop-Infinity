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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/airdrop/:id",
    element: <Airdrop></Airdrop>,
  },

  {
    path: "/construction",
    element: <Construction></Construction>,
  },


]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router} />
  </StrictMode>,
);
