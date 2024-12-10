import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

function ProtectedRoute({ children, role }) {
  const { auth, isLoading, isAdmin, isUser } = useAuth();

  console.log({ auth, isLoading });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!auth?.token) {
    return <Navigate to="/login" replace />;
  }

  if (role === "admin" && !isAdmin) {
    return <Navigate to="/unauthorized" replace />;
  }

  if (role === "user" && !isUser) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  role: PropTypes.oneOf(["admin", "user"]).isRequired,
};

export default ProtectedRoute;
