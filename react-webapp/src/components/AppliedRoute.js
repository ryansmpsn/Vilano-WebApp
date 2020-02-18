import React from "react";
import { Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";

export default function AppliedRoute({ component: C, appProps, ...rest }) {
  return <Route {...rest} render={props => <C {...props} {...appProps} />} />;
}

export function ModuleRoute({
  component: C,
  appProps,
  cModule,
  path,
  ...rest
}) {
  return (
    <>
      {(cModule != "None" && (
        <AppliedRoute path={path} exact component={C} appProps={appProps} />
      )) || <Redirect to="/" exact component={Home} appProps={appProps} />}
    </>
  );
}
