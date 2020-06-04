import React, { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { MDBCard, MDBCardHeader, MDBCardBody, MDBContainer } from "mdbreact";
import { Spinner, Row, Container, Jumbotron } from "react-bootstrap";
import DisplayTrips from "./DisplayTrips";

function TripData(props) {
  let { contractId } = useParams();
  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = useCallback(() => {
    props.getTrips("/Contract/" + contractId);
  }, [contractId, props]);

  return (
    <MDBCard className="m-2">
      <MDBCardHeader>
        <h4>Contract Selected: {props.selectedContract}</h4>
        {/* <h4>Contract ID from State:</h4>
        {props.selectedContractId}
        <h4>Contract ID from Params:</h4>
        {contractId}
        <h4>Trip Selected: {props.selectedTrip}</h4> */}
        {/* 
        TODO
        Select new contract to view Trips

<Button
          onClick={(e) => {
            props.getTrips("/Contract/" + contractId);
          }}
        >
          Get Trip
        </Button>

        */}
      </MDBCardHeader>
      <MDBCardBody>
        <Jumbotron>
          <Container className="container-sm pl-5 pr-5 pt-2"> Search Select will go here -> </Container>
          <hr />

          {props.contractProfile === null ? (
            <MDBContainer>
              <Spinner animation="border" variant="primary" />
            </MDBContainer>
          ) : (
            <div className="trip">
              <Row key="topRow" className="show-grid">
                {console.log(props.contractProfile)}
                {props.contractProfile[28].value.map((c, index) => (
                  <DisplayTrips key={index} tripData={c} />
                ))}
              </Row>
            </div>
          )}
        </Jumbotron>
      </MDBCardBody>
    </MDBCard>
  );
}

export default TripData;
