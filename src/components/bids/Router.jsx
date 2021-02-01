import BidData from "./BidData";
import BidTripData from "./BidTripData";
import React, { Component } from "react";
import { Tab, Tabs } from "react-bootstrap";
import BidCostSegmentData from "./BidCostSegmentData";
import { Route, Routes, Navigate } from "react-router-dom";

class Routing extends Component {
  render() {
    return (
      <Routes>
        <Tabs defaultActiveKey="home" id="bid-tabs" justify>
          <Tab eventKey="home" title="Bids">
            <Route path="dashboard" element={<BidData {...this.props} />} />
          </Tab>
          {sessionStorage.getItem("/bid/trips") >= 2 && (
            <Tab eventKey="trips" title="Trips" unmountOnExit>
              <Route path="trips" element={<BidTripData {...this.props} />} />{" "}
            </Tab>
          )}
          {sessionStorage.getItem("/bid/ratesheets") >= 2 && (
            <Tab eventKey="costsegment" title="Rate Sheets" unmountOnExit>
              <Route path="ratesheets" element={<BidCostSegmentData {...this.props} />} />{" "}
            </Tab>
          )}
        </Tabs>
        <Navigate from="/bids" to="/bids/dashboard" />
      </Routes>
    );
  }
}

export default Routing;
