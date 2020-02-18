import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AppliedRoute, { ModuleRoute } from "./components/AppliedRoute";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";

import testpage from "./containers/testpage";
import ContractPage from "./containers/ContractPage";

export default function Routes({ appProps }) {
  return (
    <Switch>
      <Redirect
        from="/"
        to="/home"
        exact
        component={Home}
        appProps={appProps}
      />
      <AppliedRoute path="/home" exact component={Home} appProps={appProps} />
      <ModuleRoute
        exact
        component={ContractPage}
        appProps={appProps}
        path="/Contract/Dashboard"
      />
      <AppliedRoute path="/login" exact component={Login} appProps={appProps} />
      <AppliedRoute
        path="/testpage"
        exact
        component={testpage}
        appProps={appProps}
      />
      {/* Finally, catch all unmatched routes */}
      <Route component={NotFound} />
    </Switch>
  );
}
