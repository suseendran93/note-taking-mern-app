import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
const PrivateRoute = ({ Component }) => {
  const login = sessionStorage.getItem("login");
  return login ? <Component /> : <Navigate to="/" />;
};

export default PrivateRoute;
