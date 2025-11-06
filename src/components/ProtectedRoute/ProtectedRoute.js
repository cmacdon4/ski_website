import React from "react";
import { Navigate } from "react-router-dom";
import { checkUser } from "../Auth/AuthService";

const ProtectedRoute = ({ element: Component }) => {
  const currentUser = checkUser();

  // If logged in → show the protected page
  if (currentUser) {
    return <Component />;
  }

  // If NOT logged in → redirect to login page
  return <Navigate to="/auth/login" replace />;
};

export default ProtectedRoute;
