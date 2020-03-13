import React, { Component } from "react";
import { MDBCard, MDBCardHeader, MDBCardBody } from "mdbreact";

class ViewRoutes extends Component {
  state = {};
  render() {
    return (
      <MDBCard className="m-2">
        <MDBCardHeader>
          <h4>Routes</h4>
          <h4>Trip Selected: {this.props.selectedTrip}</h4>
        </MDBCardHeader>
        <MDBCardBody>
          <ul>
            <li>Arrival Time:</li>
            <li>Departure Time</li>
            <li>Facility ID</li>
            <li>start location? destination? Neither?</li>
          </ul>
        </MDBCardBody>
      </MDBCard>
    );
  }
}

export default ViewRoutes;
