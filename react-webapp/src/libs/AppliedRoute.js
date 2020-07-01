import React from "react";
import { Route, Navigate } from "react-router-dom";
import Home from "../components/pages/HomePage";
import NavPerm from "./NavPerms";

export default function AppliedRoute({ component: C, appProps, ...rest }) {
  return <Route {...rest} render={(props) => <C {...props} {...appProps} />} />;
}

export function ModuleRoute({
  component: C,
  appProps,
  //cModule,
  path,
  ...rest
}) {
  return (
    <>
      {(NavPerm.nav_perm_check() !== "NA" && <AppliedRoute path={path} exact component={C} appProps={appProps} />) || (
        <Navigate to="/" exact component={Home} appProps={appProps} />
      )}
    </>
  );
}
