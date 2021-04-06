import React, { Component } from "react";
import ContractData from "./ContractData";
import { Route, Routes, Navigate } from "react-router-dom";
import ContractDetails from "./ContractDetails";

class Routing extends Component {
  render() {
    return (
      <Routes>
        <Route path="dashboard" element={<ContractData {...this.props} />} />
        <Route path="details" element={<ContractDetails {...this.props} />} />
        <Route path="details/:contractId" element={<ContractDetails {...this.props} />} />

        <Navigate exact from="/contracts" to="/contracts/dashboard" />
        <Navigate from="/contracts/details" to="/contracts/details/contract" />
      </Routes>
    );
  }
}

export default Routing;
