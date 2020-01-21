import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import AppliedRoute from "./components/AppliedRoute";
import testpage from "./containers/testpage";
import ContractList from "./containers/ContractList"

export default function Routes({ appProps }) {
    return (
      <Switch>
        <Redirect from="/" to="/home" exact component={Home} appProps={appProps} />
        <AppliedRoute path="/home" exact component={Home} appProps={appProps} />
        <AppliedRoute path="/ContractList" exact component={ContractList} appProps={appProps} />
        <AppliedRoute path="/login" exact component={Login} appProps={appProps} />
        <AppliedRoute path="/testpage" exact component={testpage} appProps={appProps} />
        { /* Finally, catch all unmatched routes */ }
        <Route component={NotFound} />
      </Switch>
    );
}