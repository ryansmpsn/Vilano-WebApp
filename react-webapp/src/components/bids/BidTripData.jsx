import React from "react";
import { Jumbotron, Container, Col } from "react-bootstrap";

function BidTripData(props) {
  return (
    <Jumbotron>
      <Container className="justify-content-md-center">
        <Col lg="5">Select a bid to view trips. </Col>
      </Container>
    </Jumbotron>
  );
}

export default BidTripData;
