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
import AuthPage from "./components/pages/AuthPage";

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/resources" component={ResourcesPage} />
        <Route path="/about" component={About} />
        <Route path="/login" component={Login} props={this.props} />
        {this.props.isAuthenticated && <Route path="/contracts" render={(appProps) => <ContractDashboard {...this.props} />} />}
        {this.props.isAuthenticated && <Route path="/axios" render={(appProps) => <AxiosTestPage {...this.props} />} />}
        {this.props.isAuthenticated && <Route path="/bids" render={(appProps) => <BidDashboard {...this.props} />} />}
        <PrivateRoute path="/testpage" exact component={testpage} props={this.props} />
        <PrivateRoute path="/payroll" component={PayrollPage} />
        <PrivateRoute path="/performance" component={PerformancePage} />
        <PrivateRoute path="/financials" component={FinancialsPage} />
        <PrivateRoute path="/subcontractor" component={SubcontractorPage} />
        <PrivateRoute path="/profile" component={ProfilePage} />
        <PrivateRoute path="/private" component={AuthPage} />
        {/* Catch all unmatched routes */}
        <Route component={NotFoundPage} />
      </Switch>
    );
  }
}

export default Routes;
