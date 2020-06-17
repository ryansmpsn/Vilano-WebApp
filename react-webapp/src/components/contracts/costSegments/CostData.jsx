import React, { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { MDBCard, MDBCardHeader, MDBCardBody, MDBContainer } from "mdbreact";
import { Spinner, Row, Container, Jumbotron } from "react-bootstrap";
import DisplayCostData from "./DisplayCostData";

function CostData(props) {
  let { contractId } = useParams();

  const onLoad = useCallback(() => {
    props.getTrips("/Contract/" + props.selectedContractId);
  }, [props]);

  useEffect(() => {
    onLoad();
  }, [onLoad]);

  return (
    <MDBCard className="m-2">
      <MDBCardHeader>
        <h4>Contract Selected: {props.selectedContract}</h4>
        <h4>Contract ID from State:</h4>
        {props.selectedContractId}
        <h4>Contract ID from Params:</h4>
        {contractId}
        <h4>Cost Selected: {props.selectedCost}</h4>
        {/* 
        TODO
        Select new contract to view Costs

<Button
          onClick={(e) => {
            props.getCosts("/Contract/" + contractId);
          }}
        >
          Get Cost
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
            <div className="cost">
              <Row key="topRow" className="show-grid">
                {console.log(props.contractProfile)}
                {props.contractProfile[29].value.map((c, index) => (
                  <DisplayCostData key={index} costData={c} />
                ))}
              </Row>
            </div>
          )}
        </Jumbotron>
      </MDBCardBody>
    </MDBCard>
  );
}

export default CostData;
