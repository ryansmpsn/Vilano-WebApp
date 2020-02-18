import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute, { ModuleRoute } from "./components/AppliedRoute";
import Home from "./components/pages/Home";
import Login from "./components/Login";
import About from "./components/pages/About";
import MapsPage from "./components/pages/MapsPage";
import testpage from "./components/pages/testpage";
import ContractList from "./components/pages/ContractList";
import NotFoundPage from "./components/pages/NotFoundPage";

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <ModuleRoute
          exact
          component={ContractList}
          appProps={this.props}
          //cModule={appProps.contractAccess}
          path="/ContractList"
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
