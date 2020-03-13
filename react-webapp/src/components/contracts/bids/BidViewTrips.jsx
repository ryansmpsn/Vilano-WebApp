import React, { Component } from "react";
import { Link } from "react-router-dom";
import { MDBCard, MDBCardHeader, MDBCardBody, MDBContainer } from "mdbreact";
import { Spinner, Card } from "react-bootstrap";

class BidViewTrips extends Component {
  state = { isLoading: false, route: "" };

  setRoute(e) {
    this.setState({ route: e });
  }

  render() {
    return (
      <MDBCard className="m-2">
        <MDBCardHeader>
          <h4>Trip Information from contract: {this.props.selectedContract}</h4>
          <h4>Trip Selected: {this.props.selectedTrip}</h4>
        </MDBCardHeader>
        {!this.state.isLoading ? (
          <>
            <MDBCardBody>
              <MDBContainer>
                <MDBCard
                  style={{
                    padding: "10px",
                    margin: "10px",
                    marginRight: "0px",
                    width: "278px"
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
                    width: "278px"
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
                    onClick={e => this.props.setSelectedTrip("Trip 326")}
                    to="/Contract/Routes"
                    className="btn btn-primary"
                  >
                    View Routes
                  </Link>
                </MDBCard>
              </MDBContainer>
            </MDBCardBody>
          </>
        ) : (
          <MDBCardBody>
            <Spinner animation="border" variant="primary" />
          </MDBCardBody>
        )}
      </MDBCard>
    );
  }
}

export default BidViewTrips;
