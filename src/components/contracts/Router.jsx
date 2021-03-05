import React, { Component } from "react";
import TripData from "./trips/TripData";
import ContractData from "./ContractData";
import ViewRoutes from "./routes/ViewRoutes";
import ContractAnalytics from "./ContractAnalytics";
import { Route, Routes, Navigate } from "react-router-dom";
import CostSegmentData from "./costSegments/CostSegmentData";
import ContractDetails from "./ContractDetails";

class Routing extends Component {
  render() {
    return (
      <Routes>
        <Route path="dashboard" element={<ContractData {...this.props} />} />
        <Route path="routes" element={<ViewRoutes {...this.props} />} />
        <Route path="trips" element={<TripData {...this.props} />} />
        <Route path="ratesheets" element={<CostSegmentData {...this.props} />} />
        <Route path="analytics" element={<ContractAnalytics {...this.props} />} />
        <Route path="details" element={<ContractDetails {...this.props} />} />
        <Route path="details/:contractId" element={<ContractDetails {...this.props} />} />

        <Navigate exact from="/contracts" to="/contracts/dashboard" />
        <Navigate from="/contracts/details" to="/contracts/details/contract" />
      </Routes>
    );
  }
}

export default Routing;
