import React from "react";
import { useParams } from "react-router-dom";
import { MDBCard, MDBCardHeader, MDBCardBody } from "mdbreact";

function ViewRoutes(props) {
  let { tripId } = useParams();

  return (
    <MDBCard className="m-2">
      <MDBCardHeader>
        <h4>Routes</h4>
        <h4>Trip Selected: {props.selectedTrip}</h4>
        <h4>Trip Route Param: {tripId}</h4>
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

export default ViewRoutes;
