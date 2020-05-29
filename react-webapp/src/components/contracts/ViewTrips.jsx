import React from "react";
import { Link } from "react-router-dom";
import { MDBCard, MDBCardHeader, MDBCardBody, MDBContainer } from "mdbreact";
import { Card } from "react-bootstrap";

function ViewTrips(props) {
  // let { contractId } = useParams();

  return (
    <MDBCard className="m-2">
      <MDBCardHeader>
        <h4>Trip Information from contract: {props.selectedContract}</h4>
        <h4>Trip Selected: {props.selectedTrip}</h4>
      </MDBCardHeader>
      <MDBCardBody>
        <MDBContainer>
          <MDBCard
            style={{
              padding: "10px",
              margin: "10px",
              marginRight: "0px",
              width: "278px",
            }}
          >
            <MDBCardHeader>This is a Trip Header</MDBCardHeader>

            <MDBCardBody>This is the Trip Information</MDBCardBody>
          </MDBCard>
          <MDBCard
            style={{
              padding: "10px",
              margin: "10px",
              marginRight: "0px",
              width: "278px",
            }}
          >
            <MDBCardHeader>
              <Card.Title>Trip Number</Card.Title>
              <Card.Text>326</Card.Text>
            </MDBCardHeader>
            <MDBCardBody>
              <Card.Title>Contract ID</Card.Title>
              <Card.Text>326</Card.Text>
              <hr />
              <Card.Title>Frequency</Card.Title>
              <Card.Text>326</Card.Text>
              <hr />
              <Card.Title>Start Date</Card.Title>
              <Card.Text>326</Card.Text>
              <hr />
              <Card.Title>End Date</Card.Title>
              <Card.Text>326</Card.Text>
              <hr />
              <Card.Title>Mileage</Card.Title>
              <Card.Text>326</Card.Text>
              <hr /> <Card.Title>Vehicle Type</Card.Title>
              <Card.Text>326</Card.Text>
              <hr />
            </MDBCardBody>
            <Link
              onClick={(e) => props.setSelectedTrip("Trip 326")}
              to={`${props.url}/trip/326`}
              className="btn btn-primary"
            >
              View Routes
            </Link>
          </MDBCard>
        </MDBContainer>
      </MDBCardBody>
    </MDBCard>
  );
}

export default ViewTrips;
