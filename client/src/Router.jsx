import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/user/Home";
import LoginPage from "./pages/LoginPage";
import SignUpForm from "./pages/SignupForm";
import TreatmentCard from "./components/user/Treatments Card/TreatmentCard";
import Galleries from "./pages/user/Galleries";
import BookingSlot from "./pages/user/BookingSlot";
import MyProfile from "./pages/user/MyProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      { path: "loginpage", element: <LoginPage /> },
      { path: "signupform", element: <SignUpForm /> },
      {
        path: "treatments/:treatmentCategory",
        element: <TreatmentCard />,
      },
      {
        path: "booking/:treatmentName",
        element: <BookingSlot />,
      },
      {
        path: "galleries",
        element: <Galleries />,
      },
      {
        path: "myprofile",
        element: <MyProfile />,
      },
      {
        future: {
          v7_normalizeFormMethod: true,
          v7_skipActionErrorRevalidation: true,
          v7_fetcherPersist: true,
          v7_relativeSplathPath: true,
        },
      },
    ],
  },
]);

export default router;
