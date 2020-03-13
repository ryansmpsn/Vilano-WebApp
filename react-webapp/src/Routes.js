import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from "./components/AppliedRoute";
import Home from "./components/pages/HomePage";
import Login from "./components/pages/LoginPage";
import About from "./components/pages/AboutPage";
import MapsPage from "./components/pages/MapsPage";
import ProfilePage from "./components/pages/ProfilePage";
import testpage from "./components/pages/TestPage";
import NotFoundPage from "./components/pages/NotFoundPage";
import ContractDashboard from "./components/contracts/ContractDashboard";
import BidContractDashboard from "./components/contracts/bids/BidContractDashboard";

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route
          path="/contracts"
          render={appProps => <ContractDashboard {...this.props} />}
        />
        <Route
          path="/contracts/bids"
          render={appProps => <BidContractDashboard {...this.props} />}
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
          props={this.props}
        />
        <Route path="/maps" component={MapsPage} />
        <Route path="/profile" component={ProfilePage} />

        {/* Finally, catch all unmatched routes */}
        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

export default Routes;
