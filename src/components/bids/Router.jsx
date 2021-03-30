import BidData from "./BidData";
import React, { Component } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import BidDetails from "./BidDetails";

class Routing extends Component {
  render() {
    return (
      <Routes>
        <Route path="dashboard" element={<BidData {...this.props} />} />

        <Route path="details" element={<BidDetails {...this.props} />} />
        <Route path="details/:bidId" element={<BidDetails {...this.props} />} />

        <Navigate from="/bids" to="/bids/dashboard" />
        <Navigate from="/bids/details" to="/bids/details/bid" />
      </Routes>
    );
  }
}

export default Routing;
