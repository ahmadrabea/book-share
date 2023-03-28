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
import ForgetPasswordPage from "../pages/ForgetPassword";

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
    path: "/signup",
    element: <RegistrationPage />,
  },
  {
    path: "/dev",
    element: <ForgetPasswordPage />,
  },
]);

export default router;
