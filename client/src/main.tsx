// main.tsx or index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./components/HomePage/HomePage";
import AboutPage from "./components/AboutPage/AboutPage";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import ServicesPage from "./components/ServicesPage/ServicesPage";
import ContactPage from "./components/ContactPage/ContactPage";
import EnrollPage from "./components/EnrollPage/EnrollPage";
import LoginPage from "./components/LoginPage/LoginPage";
import TicketsPage from "./components/TicketsPage/TicketsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/services",
    element: <ServicesPage />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
  },
  {
    path: "/enroll",
    element: <EnrollPage />,
  },
  {
    path: "/authadmin",
    element: <LoginPage />,
  },
  {
    path: "/tickets",
    element: <TicketsPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
