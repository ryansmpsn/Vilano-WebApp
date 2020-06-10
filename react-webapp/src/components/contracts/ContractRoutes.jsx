import React, { Component } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import TripData from "./TripData";
import CostData from "./CostData";
import ViewRoutes from "./ViewRoutes";
import AddContractData from "./AddContractData";
import ContractData from "./ContractData";
import CostSegment from "./CostSegment";

class ContractRoutes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/contracts/dashboard" render={(props) => <ContractData {...props} {...this.props} />} />
        <Route exact path="/contracts/routes" render={(props) => <ViewRoutes {...props} {...this.props} />} />
        <Route exact path="/contracts/trips" render={(props) => <TripData {...props} {...this.props} />} />
        <Route exact path="/contracts/costdata" render={(props) => <CostData {...props} {...this.props} />} />
        <Route exact path="/contracts/add" render={(props) => <AddContractData {...props} {...this.props} />} />
        <Route exact path="/contracts/costsegment" render={(props) => <CostSegment {...props} {...this.props} />} />
        <Route exact path={`${this.props.path}/trip/:tripId`} render={(props) => <ViewRoutes {...props} {...this.props} />} />
        <Route exact path={`${this.props.path}/:contractId`} render={(props) => <TripData {...props} {...this.props} />} />
        <Route exact path={`${this.props.path}/:contractId`} render={(props) => <CostData {...props} {...this.props} />} />

        <Redirect from="/contracts" to="/contracts/dashboard" />
      </Switch>
    );
  }
}

export default withRouter(ContractRoutes);
