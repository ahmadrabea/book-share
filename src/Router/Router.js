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
import ResetPasswordPage from "../pages/ResetPasswordPage";
import NotificationPage from "../pages/Notification";
import ProfilePage from "../pages/ProfilePage";
import LibraryPage from "../pages/LibraryPage";
import YourLibrary from "../pages/YourLibrary";
import AddBookPage from "../pages/AddBookPage";
import AddBookForm from "../pages/AddBookForm";

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
    path: "/forgetpassword",
    element: <ForgetPasswordPage />,
  },
  {
    path: "/resetpassword",
    element: <ResetPasswordPage />,
  },
  {
    path: "/notifications",
    element: <NotificationPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/library",
    element: <LibraryPage />,
  },
  {
    path: "/myLibrary",
    element: <YourLibrary />,
  },
  {
    path: "/addBook",
    element: <AddBookPage />,
  },
  {
    path: "/addBookForm",
    element: <AddBookForm />,
  },
]);

export default router;
