import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/index.scss";

import { MovieProvider } from "./context/MovieContext";
import { Home } from "./pages/Home";
import { MovieDetail } from "./pages/MovieDetail";
import { PageNotFound } from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout/AppLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <PageNotFound />,
    children: [
      { index: true, element: <Home />, errorElement: <PageNotFound /> },
      {
        path: "movies/:movieTitle",
        element: <MovieDetail />,
        errorElement: <PageNotFound />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MovieProvider>
      <RouterProvider router={router} />
    </MovieProvider>
  </React.StrictMode>
);
