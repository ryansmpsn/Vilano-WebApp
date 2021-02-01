import React, { Component } from "react";
import TripData from "./trips/TripData";
import ContractData from "./ContractData";
import ViewRoutes from "./routes/ViewRoutes";
import ContractAnalytics from "./ContractAnalytics";
import { Route, Routes, Navigate } from "react-router-dom";
import CostSegmentData from "./costSegments/CostSegmentData";
import { Tab, Tabs } from "react-bootstrap";
class Routing extends Component {
  render() {
    return (
      <Routes>
        <Tabs defaultActiveKey="home" id="contract-tabs" justify>
          <Tab eventKey="home" title="Contracts">
            <Route path="dashboard" element={<ContractData {...this.props} />} />
          </Tab>

          {sessionStorage.getItem("/contract/trips") >= 2 && (
            <Tab eventKey="trips" title="Trips" unmountOnExit>
              <Route path="trips" element={<TripData {...this.props} />} />
            </Tab>
          )}

          {sessionStorage.getItem("/contract/ratesheets") >= 2 && (
            <Tab eventKey="costsegment" title="Rate Sheets" unmountOnExit>
              <Route path="costsegment" element={<CostSegmentData {...this.props} />} />
            </Tab>
          )}

          {sessionStorage.getItem("/contract/routes") >= 2 && (
            <Tab eventKey="routes" title="Routes" unmountOnExit>
              <Route path="routes" element={<ViewRoutes {...this.props} />} />
            </Tab>
          )}

          {sessionStorage.getItem("/contract/drivers") >= 2 && <Tab eventKey="drivers" title="Drivers" unmountOnExit></Tab>}

          {sessionStorage.getItem("/contract/analytics") >= 1 && (
            <Tab eventKey="Stats" title="Analytics" unmountOnExit>
              <Route path="analytics" element={<ContractAnalytics {...this.props} />} />
            </Tab>
          )}
        </Tabs>
        {/* <Route path={`${this.props.path}/trip/:tripId`} element={<ViewRoutes {...this.props} />} />
        <Route path={`${this.props.path}/:contractId`} element={<TripData {...this.props} />} />  */}
        <Navigate from="/contracts" to="/contracts/dashboard" />
      </Routes>
    );
  }
}

export default Routing;
