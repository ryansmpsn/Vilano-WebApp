import React from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../src/auth";

function HandleLogout() {
  console.log("hello logout");

  const { setIsAuthenticated } = useAuth();
  let location = useLocation();
  let state = { referrer: location };

  setIsAuthenticated(false);
  sessionStorage.clear();

  return <Navigate to="/login" replace state={state} />;
}
export default HandleLogout;
