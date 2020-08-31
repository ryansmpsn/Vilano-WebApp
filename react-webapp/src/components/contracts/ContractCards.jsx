import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col, Button } from "react-bootstrap";
import UpsertContractModal from "./UpsertContractModal";

function ContractCards(props) {
  const [contract, setContract] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [accessLevel, setAccessLevel] = useState("None");
  //TODO would be contract_id and the like.  const [contractID, setContractID] = useState(0);

  useEffect(() => {
    onLoad();
  });

  function onLoad() {
    setAccessLevel(props.accessLevel);
    setContract(props.Contract);
    setIsLoading(false);
  }
  function openModal() {
    setShowModal(true);
    window.location.hash = "edit";
  }

  function closeModal() {
    window.history.replaceState(null, null, " ");
    setShowModal(false);
  }
  // function get_history() {
  //   Send.get("/ViewContractHistory?Contract_id=" + 851, this.state.props)
  //     .then(res => {
  //       console.log(res);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

  return (
    !isLoading && (
      <Card
        className={"card border-primary mb-3 "}
        style={{
          width: "100%",
        }}
      >
        {contract.map(
          (c, index) =>
            c.label !== null &&
            c.label === "Contract No." && (
              <Card.Header key={index + "header"} as="h5">
                {c.label} {c.value}
              </Card.Header>
            )
        )}
        <Card.Body>
          <Row>
            {contract.map(
              (c, index) =>
                c.label !== null && (
                  <Col md="3" key={index + "body"}>
                    <Card.Title className="h5 mb-1">{c.label}:</Card.Title>
                    {c.value !== null && <Card.Text className="text-muted">{c.value}</Card.Text>}
                    <hr />
                  </Col>
                )
            )}
          </Row>
          {sessionStorage.getItem("/contract/trips") >= 2 && (
            <Link
              onClick={(e) => {
                props.setSelectedContract(contract[6].value);
                props.setSelectedContractId(contract[0].value);
                props.getTrips("/Contract/" + contract[0].value);
              }}
              to={"../trips"}
              className="btn btn-primary"
            >
              View Trips
            </Link>
          )}
          {sessionStorage.getItem("/contract/ratesheets") >= 2 && (
            <Link
              onClick={(e) => {
                props.setSelectedContract(contract[6].value);
                props.setSelectedContractId(contract[0].value);
                props.getTrips("/Contract/" + contract[0].value);
              }}
              to={"../costsegment"}
              className="btn btn-primary"
            >
              View Rate Information
            </Link>
          )}
          {sessionStorage.getItem("/bid") >= 3 && (
            <Button className="float-right btn-outline-warning" onClick={openModal}>
              Create Bid
            </Button>
          )}
          {sessionStorage.getItem("/contract") >= 3 && (
            <Button className="float-right btn-outline-warning" onClick={openModal}>
              Edit Contract
            </Button>
          )}
        </Card.Body>
        <UpsertContractModal
          modalName={"Edit Contract"}
          contract={contract}
          inputRestrictions={props.inputRestrictions}
          show={showModal}
          closeModal={closeModal}
          accessLevel={accessLevel}
          appProps={props.appProps}
          submitAction={(editContent) => {
            return props.submitAction(editContent);
          }}
        />
      </Card>
    )
  );
}

export default ContractCards;
