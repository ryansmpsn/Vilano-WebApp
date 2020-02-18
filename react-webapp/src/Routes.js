import React from "react";
import { BrowserRouter as Route, Switch } from "react-router-dom";
import AppliedRoute, { ModuleRoute } from "./components/AppliedRoute";
import Home from "./components/pages/Home";
import NotFoundPage from "./components/pages/NotFoundPage";
import About from "./components/pages/About";
import Login from "./containers/Login";
import testpage from "./components/pages/testpage";
import ContractList from "./components/pages/ContractList";
import MapsPage from "./components/pages/MapsPage";

import testpage from "./containers/testpage";
import ContractPage from "./containers/ContractPage";

export default function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} appProps={appProps} />
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
      <Route path="/maps" component={MapsPage} />

      <Route path="/about" component={About} />
      {/* Finally, catch all unmatched routes */}
      <Route component={NotFoundPage} />
    </Switch>
  );
}
