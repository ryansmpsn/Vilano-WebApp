import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from "./components/AppliedRoute";
import Home from "./components/pages/HomePage";
import Login from "./components/pages/LoginPage";
import About from "./components/pages/AboutPage";
import PayrollPage from "./components/pages/PayrollPage";
import ProfilePage from "./components/pages/ProfilePage";
import testpage from "./components/pages/TestPage";
import NotFoundPage from "./components/pages/NotFoundPage";
import ContractDashboard from "./components/contracts/ContractDashboard";
import BidDashboard from "./components/contracts/bids/BidDashboard";
import PerformancePage from "./components/pages/PerformancePage";
import FinancialsPage from "./components/pages/FinancialsPage";

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/about"
          render={props => <About {...this.props} />}
        />

        <Route
          path="/contracts"
          render={appProps => <ContractDashboard {...this.props} />}
        />
        <Route
          path="/bids"
          render={appProps => <BidDashboard {...this.props} />}
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
        <Route path="/payroll" component={PayrollPage} />
        <Route path="/performance" component={PerformancePage} />
        <Route path="/financials" component={FinancialsPage} />
        <Route path="/profile" component={ProfilePage} />

        {/* Finally, catch all unmatched routes */}
        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

export default Routes;
