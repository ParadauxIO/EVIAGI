import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import "./styles/fonts.scss";
import "./styles/reset.scss";
import "./styles/utilities.scss";
import './styles/global.scss';
import Index from './pages/Index';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
