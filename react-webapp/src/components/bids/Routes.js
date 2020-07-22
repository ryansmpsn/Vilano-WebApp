import React, { Component } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import ViewBids from "./ViewBids";

class Routing extends Component {
  render() {
    return (
      <Routes>
        <Route path="dashboard" element={<ViewBids {...this.props} />} />

        <Navigate from="/bids" to="/bids/dashboard" />
      </Routes>
    );
  }
}

export default Routing;
