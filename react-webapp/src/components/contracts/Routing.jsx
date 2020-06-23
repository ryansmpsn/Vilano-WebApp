import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import TripData from "./trips/TripData";
import ViewRoutes from "./routes/ViewRoutes";
import ContractData from "./ContractData";
import CostSegmentData from "./costSegments/CostSegmentData";

class Routing extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/contracts/dashboard" render={(props) => <ContractData {...props} {...this.props} />} />
        <Route exact path="/contracts/routes" render={(props) => <ViewRoutes {...props} {...this.props} />} />
        <Route exact path="/contracts/trips" render={(props) => <TripData {...props} {...this.props} />} />
        <Route exact path="/contracts/costsegment" render={(props) => <CostSegmentData {...props} {...this.props} />} />
        <Route exact path={`${this.props.path}/trip/:tripId`} render={(props) => <ViewRoutes {...props} {...this.props} />} />
        <Route exact path={`${this.props.path}/:contractId`} render={(props) => <TripData {...props} {...this.props} />} />
        <Redirect from="/contracts" to="/contracts/dashboard" />
      </Switch>
    );
  }
}

export default withRouter(Routing);
