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
import ErrorPage from './pages/ErrorPage';
import VotingPage from './pages/VotingPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: "/election/:electionId",
    element: <ErrorPage/> // To be replaced with election manager
  },
  {
    path: "/election/:electionId/vote/electorate/:electorId",
    element: <VotingPage/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
