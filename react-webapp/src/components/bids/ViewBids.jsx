import React, { Component } from "react";
import { Jumbotron } from "react-bootstrap";
import { MDBCard, MDBCardHeader, MDBCardBody } from "mdbreact";

class ViewBids extends Component {
  state = {};
  render() {
    return (
      <MDBCard className="m-2">
        <MDBCardHeader>
          <h4>Contract Bid Information</h4>
        </MDBCardHeader>
        <MDBCardBody>
          <Jumbotron>Bids</Jumbotron>
        </MDBCardBody>
      </MDBCard>
    );
  }
}

export default ViewBids;
