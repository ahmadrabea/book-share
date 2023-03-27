import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Home from "../pages/Home";
import SignInPage from "../pages/SignIn";
import RegistrationPage from "../pages/Registration";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignInPage />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/dev",
    element: <RegistrationPage />,
  },
]);

export default router;
