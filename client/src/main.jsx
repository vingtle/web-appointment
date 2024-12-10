import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import router from "./Router";
import "./App.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider
        router={router}
        fallbackElement={<div>Loading...</div>} // Optional: Add a fallback element
      />
    </AuthProvider>
  </React.StrictMode>
);
