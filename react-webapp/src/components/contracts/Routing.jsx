import React, { Component } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import TripData from "./trips/TripData";
import ViewRoutes from "./routes/ViewRoutes";
import ContractData from "./ContractData";
import CostSegmentData from "./costSegments/CostSegmentData";

class Routing extends Component {
  render() {
    return (
      <Routes>
        <Route path="dashboard" element={<ContractData {...this.props} />} />
        <Route path="routes" element={<ViewRoutes {...this.props} />} />
        <Route path="trips" element={<TripData {...this.props} />} />
        <Route path="costsegment" element={<CostSegmentData {...this.props} />} />
        {/* <Route path={`${this.props.path}/trip/:tripId`} element={<ViewRoutes {...this.props} />} />
        <Route path={`${this.props.path}/:contractId`} element={<TripData {...this.props} />} /> */}
        <Navigate from="/contracts" to="/contracts/dashboard" />
      </Routes>
    );
  }
}

export default Routing;

// <Routes>
//    <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">

//     <Tab eventKey="home" title="Contracts">
//       <Route path="dashboard" element={<ContractData {...this.props} />} />
//     </Tab>
//     <Tab eventKey="profile" title="Trips" unmountOnExit>
//       <Route path="trips" element={<TripData {...this.props} />} />
//     </Tab>
//     <Tab eventKey="contact" title="Rate Sheets" unmountOnExit>
//       <Route path="costsegment" element={<CostSegmentData {...this.props} />} />
//     </Tab>
//   </Tabs>

//   <Route path="routes" element={<ViewRoutes {...this.props} />} />

//    <Route path={`${this.props.path}/trip/:tripId`} element={<ViewRoutes {...this.props} />} />
//   <Route path={`${this.props.path}/:contractId`} element={<TripData {...this.props} />} /> */}
//   <Navigate from="/contracts" to="/contracts/dashboard" />
// </Routes>
