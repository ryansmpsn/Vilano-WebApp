import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import ViewTrips from "./ViewTrips";
import ViewContracts from "./ViewContracts";
import ViewRoutes from "./ViewRoutes";
import ViewBids from "./bids/ViewBids";

class ContractRoutes extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/contracts/dashboard"
          render={props => <ViewContracts {...props} {...this.props} />}
        />
        <Route
          exact
          path="/contracts/routes"
          render={props => <ViewRoutes {...props} {...this.props} />}
        />
        <Route
          exact
          path="/contracts/trips"
          render={props => <ViewTrips {...props} {...this.props} />}
        />
        <Route
          exact
          path="/contracts/bids"
          render={props => <ViewBids {...props} {...this.props} />}
        />
        <Route
          exact
          path={`${this.props.path}/trip/:tripId`}
          render={props => <ViewRoutes {...props} {...this.props} />}
        />
        <Route
          exact
          path={`${this.props.path}/:contractId`}
          render={props => <ViewTrips {...props} {...this.props} />}
        />
        <Redirect from="/contracts" to="/contracts/dashboard" />
      </Switch>
    );
  }
}

export default withRouter(ContractRoutes);
