import BidData from "./BidData";
import React, { Component } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import ContractDetails from "../contracts/ContractDetails";

class Routing extends Component {
  render() {
    return (
      <Routes>
        <Route path="dashboard" element={<BidData {...this.props} />} />
        <Route path="details" element={<ContractDetails {...this.props} />} />
        <Route path="details/:contractId" element={<ContractDetails {...this.props} type="Bid" />} />

        <Navigate from="/bids" to="/bids/dashboard" />
        <Navigate from="/bids/details" to="/bids/details/bid" />
      </Routes>
    );
  }
}

export default Routing;
