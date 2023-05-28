import React from "react";
import { Navigate } from "react-router-dom";
const PrivateRoute = ({ Component }) => {
  const userId = sessionStorage.getItem("userId");
  return userId ? <Component /> : <Navigate to="/" />;
};

export default PrivateRoute;
