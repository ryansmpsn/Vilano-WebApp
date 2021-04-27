import React from "react";
import { Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth";

function PrivateRoute({ element, ...rest }) {
  const { session, isAuthenticated } = useAuth();
  let location = useLocation();
  let state = { referrer: location };

  return session && isAuthenticated ? <Route {...rest} element={element} /> : <Navigate to="/login" replace state={state} />;
}

export default PrivateRoute;
