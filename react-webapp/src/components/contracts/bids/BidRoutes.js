import React from "react";
import { Route, Switch } from "react-router-dom";
import Topics from "../Topics";
import ViewBids from "./ViewBids";

class BidContractRoutes extends React.Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/bids"
          render={props => <ViewBids {...props} {...this.props} />}
        />
        <Route path="/topics">
          <Topics />
        </Route>
      </Switch>
    );
  }
}

export default BidContractRoutes;
