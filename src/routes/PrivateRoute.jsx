import React from "react";
import { useAuth } from "./AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element, ...rest }) => {
  const { authenticated } = useAuth();

  if (!authenticated) {
    return <Navigate to="/" />;
  }

  return element;
};

export default PrivateRoute;
