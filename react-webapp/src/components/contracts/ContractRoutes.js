import React from "react";
import { Route, Switch } from "react-router-dom";
import Topics from "./Topics";
import ViewTrips from "./ViewTrips";
import ViewContracts from "./ViewContracts";
import ViewRoutes from "./ViewRoutes";

class ContractRoutes extends React.Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/contracts/dashboard"
          render={props => <ViewContracts {...props} {...this.props} />}
        />
        <Route path="/topics">
          <Topics />
        </Route>
        <Route
          exact
          path="/contracts/routes"
          render={props => <ViewRoutes {...props} {...this.props} />}
        />
        <Route
          exact
          path="/contracts/trips
          "
          render={props => <ViewTrips {...props} {...this.props} />}
        />
      </Switch>
    );
  }
}

export default ContractRoutes;
