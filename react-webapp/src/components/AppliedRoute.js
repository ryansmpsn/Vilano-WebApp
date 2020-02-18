import React from "react";
import { Route, Redirect } from "react-router-dom";
import Home from "../containers/Home";
import NavPerm from "./NavPerms";

export default function AppliedRoute({ component: C, appProps, ...rest }) {
  return <Route {...rest} render={props => <C {...props} {...appProps} />} />;
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
      {(NavPerm.nav_perm_check() !== "NA" && (
        <AppliedRoute path={path} exact component={C} appProps={appProps} />
      )) || <Redirect to="/home" exact component={Home} appProps={appProps} />}
    </>
  );
}
