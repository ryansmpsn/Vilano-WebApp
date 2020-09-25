import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col, Button } from "react-bootstrap";
import UpsertContractModal from "./UpsertContractModal";
import CreateBidModal from "./CreateBidModal";

function ContractCards(props) {
  const [contract, setContract] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showBidModal, setShowBidModal] = useState(false);
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

  function openBidModal() {
    setShowBidModal(true);
    window.location.hash = "createbid";
  }
  function closeBidModal() {
    window.history.replaceState(null, null, " ");
    setShowBidModal(false);
  }

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
            (c.label === "Contract No." || c.label === "Bid Name") && (
              <Card.Header key={index + "header"} as="h5">
                {c.label}: {c.value}
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
              to={"../ratesheets"}
              className="btn btn-primary"
            >
              View Rate Information
            </Link>
          )}
          {props.type !== "Bid" && sessionStorage.getItem("/bid") >= 3 && (
            <Button className="float-right btn-outline-warning" onClick={openBidModal}>
              Create Bid
            </Button>
          )}

          {sessionStorage.getItem("/contract") >= 3 && (
            <Button className="float-right btn-outline-warning" onClick={openModal}>
              Edit {props.type}
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
        {props.type !== "Bid" && (
          <CreateBidModal
            show={showBidModal}
            closeModal={closeBidModal}
            appProps={props.appProps}
            contractId={contract[0].updatedValue}
            externalContractCode={contract[6].updatedValue}
            bidOptions={props.bidOptions}
          />
        )}
      </Card>
    )
  );
}

export default ContractCards;
