import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/index.scss";

import { MovieProvider } from "./context/MovieContext";
import { Home } from "./pages/Home";
import { Detail } from "./pages/Detail";
import { PageNotFound } from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout/AppLayout";
import { StarDetail } from "./pages/StarDetail";
import { SearchResult } from "./pages/SearchResult";
import { TvDetail } from "./pages/TvDetail";
import { Discover } from "./pages/Discover";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <PageNotFound />,
    children: [
      { index: true, element: <Home />, errorElement: <PageNotFound /> },
      {
        path: "movie/:id",
        element: <Detail />,
        errorElement: <PageNotFound />,
      },
      {
        path: "tv/:id",
        element: <TvDetail />,
        errorElement: <PageNotFound />,
      },
      {
        path: "star/:starId",
        element: <StarDetail />,
        errorElement: <PageNotFound />,
      },

      {
        path: "search/result",
        element: <SearchResult />,
        errorElement: <PageNotFound />,
      },
      {
        path: "/discover",
        element: <Discover />,
        errorElement: <PageNotFound />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
