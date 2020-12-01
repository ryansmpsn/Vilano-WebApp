import React, { Component } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import BidTripData from "./BidTripData";
import BidCostSegmentData from "./BidCostSegmentData";
import BidData from "./BidData";

class Routing extends Component {
  render() {
    return (
      <Routes>
        <Route path="dashboard" element={<BidData {...this.props} />} />
        <Route path="trips" element={<BidTripData {...this.props} />} />
        <Route path="ratesheets" element={<BidCostSegmentData {...this.props} />} />
        <Navigate from="/bids" to="/bids/dashboard" />
      </Routes>
    );
  }
}

export default Routing;
