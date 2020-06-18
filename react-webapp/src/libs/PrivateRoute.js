import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../auth";

function PrivateRoute({ component: Component, ...rest }) {
  const { session } = useAuth();
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        session && isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login", state: { referrer: props.location } }} />
        )
      }
    />
  );
}

export default PrivateRoute;
