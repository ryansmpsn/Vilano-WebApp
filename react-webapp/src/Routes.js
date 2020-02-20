import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute, { ModuleRoute } from "./components/AppliedRoute";
import Home from "./components/pages/HomePage";
import Login from "./components/pages/LoginPage";
import About from "./components/pages/AboutPage";
import MapsPage from "./components/pages/MapsPage";
import testpage from "./components/pages/TestPage";
import NotFoundPage from "./components/pages/NotFoundPage";
import ContractPage from "./components/pages/ContractPage";

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <ModuleRoute
          exact
          component={ContractPage}
          appProps={this.props}
          path="/Contract/Dashboard"
        />
        <AppliedRoute
          path="/login"
          exact
          component={Login}
          appProps={this.props}
        />
        <AppliedRoute
          path="/testpage"
          exact
          component={testpage}
          appProps={this.props}
        />
        <Route path="/maps" component={MapsPage} />

        <Route path="/about" component={About} />

        {/* Finally, catch all unmatched routes */}
        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

export default Routes;
