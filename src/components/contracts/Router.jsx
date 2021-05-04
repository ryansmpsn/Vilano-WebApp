import React, { memo } from "react";
import ContractData from "./ContractData";
import { Route, Routes, Navigate } from "react-router-dom";
import ContractDetails from "./ContractDetails";

function Routing(props) {
  return (
    <Routes>
      <Route path="dashboard" element={<ContractData {...props} />} />
      <Route path="details" element={<ContractDetails {...props} />} />
      <Route path="details/:contractId" element={<ContractDetails {...props} type="Contract" />} />

      <Navigate exact from="/contracts" to="/contracts/dashboard" />
      <Navigate from="/contracts/details" to="/contracts/details/contract" />
    </Routes>
  );
}

export default memo(Routing);
