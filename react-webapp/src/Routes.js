import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from "./libs/AppliedRoute";
import PrivateRoute from "./libs/PrivateRoute";
import Home from "./components/pages/HomePage";
import Login from "./components/pages/LoginPage";
import About from "./components/pages/AboutPage";
import PayrollPage from "./components/pages/PayrollPage";
import ProfilePage from "./components/pages/ProfilePage";
import testpage from "./components/pages/TestPage";
import NotFoundPage from "./components/pages/NotFoundPage";
import ContractDashboard from "./components/contracts/ContractDashboard";
import BidDashboard from "./components/bids/BidDashboard";
import PerformancePage from "./components/pages/PerformancePage";
import FinancialsPage from "./components/pages/FinancialsPage";
import ResourcesPage from "./components/pages/ResourcesPage";
import SubcontractorPage from "./components/pages/SubcontractorPage";
import AxiosTestPage from "./components/pages/AxiosTestPage";

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <AppliedRoute exact path="/" component={Home} />
        <AppliedRoute path="/login" exact component={Login} appProps={this.props} />
        <Route path="/resources" component={ResourcesPage} />
        <Route path="/about" component={About} />
        <PrivateRoute path="/contracts" component={ContractDashboard} />
        <PrivateRoute path="/bids" component={BidDashboard} />
        <PrivateRoute path="/axios" component={AxiosTestPage} />
        <PrivateRoute path="/testpage" component={testpage} />
        <PrivateRoute path="/payroll" component={PayrollPage} />
        <PrivateRoute path="/performance" component={PerformancePage} />
        <PrivateRoute path="/financials" component={FinancialsPage} />
        <PrivateRoute path="/subcontractor" component={SubcontractorPage} />
        <PrivateRoute path="/profile" component={ProfilePage} />
        {/* Catch all unmatched routes */}
        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

export default Routes;
