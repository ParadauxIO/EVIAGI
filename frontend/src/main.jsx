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
import Auth from './pages/Auth';
import ErrorPage from './pages/ErrorPage';
import VotingPage from './pages/VotingPage';
import OrganiserIndex from './pages/organisers/OrganiserIndex';
import OrganiserElectionList from './pages/organisers/index/OrganiserElectionList';
import OrganiserElectionEditor from './pages/organisers/index/OrganiserElectionEditor';
import OrganiserAccountEditor from './pages/organisers/index/OrganiserAccountEditor';
import OrganiserElectionViewer from './pages/organisers/index/OrganiserElectionViewer';
import OrganiserLayout from './pages/organisers/OrganiserLayout';
import OrganiserElectionCreator from './pages/organisers/index/OrganiserElectionCreator';
import OrganiserElectionCandidateEditor from './pages/organisers/index/OrganiserElectionCandidateEditor';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: "/auth",
    element: <Auth/>
  },
  {
    path: "/election/:electionId",
    element: <ErrorPage/> // To be replaced with election manager
  },
  {
    path: "/election/:electionId/vote/electorate/:electorId",
    element: <VotingPage/>
  },
  {
    path: "/organisers",
    element: <OrganiserLayout/>,
    children: [
      {
        path: "",
        element: <OrganiserIndex/>
      },
      {
        path: "elections",
        element: <OrganiserElectionList/>
      },
      {
        path: "elections/create",
        element: <OrganiserElectionCreator/>
      },
      {
        path: "election/:electionId/edit",
        element: <OrganiserElectionEditor/>
      },
      {
        path: "election/:electionId/candidates",
        element: <OrganiserElectionCandidateEditor/>
      },
      {
        path: "election/:electionId",
        element: <OrganiserElectionViewer/>
      },
      {
        path: ":organiserId",
        element: <OrganiserAccountEditor/>
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
