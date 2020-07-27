import React, { Component } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import BidTripData from "./BidTripData";
import BidCostSegment from "./BidCostSegment";

class Routing extends Component {
  render() {
    return (
      <Routes>
        <Route path="trips" element={<BidTripData {...this.props} />} />
        <Route path="costsegment" element={<BidCostSegment {...this.props} />} />
        <Navigate from="/bids" to="/bids/dashboard" />
      </Routes>
    );
  }
}

export default Routing;
