import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col, Button, Spinner } from "react-bootstrap";
import { MDBIcon } from "mdbreact";
import UpsertContractModal from "./UpsertContractModal";
import CreateBidModal from "./CreateBidModal";
import FinalizeBidModal from "./FinalizeBidModal";
import Documents from "../admin/employee/Documents";
import { ListGroup } from "react-bootstrap";
import { ListGroupItem } from "react-bootstrap";

function ContractCards(props) {
  const [contract, setContract] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [showBidModal, setShowBidModal] = useState(false);
  const [showFinalModal, setShowFinalModal] = useState(false);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    onLoad();
  });

  function onLoad() {
    setContract(props.Contract);
    setIsLoading(false);
  }
  function openModal() {
    setShowModal(true);
    window.location.hash = "edit";
  }

  function openFinalModal() {
    setShowFinalModal(true);
    window.location.hash = "finalize";
  }

  function closeFinalModal() {
    window.history.replaceState(null, null, " ");
    setShowFinalModal(false);
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
  function openDocumentModal() {
    setShowDocumentModal(true);
  }
  function closeDocumentModal() {
    setShowDocumentModal(false);
  }
  function setSelectedId() {
    if (props.type === "Contract") {
      props.setSelectedContract(contract[6].value);
      props.setSelectedContractId(contract[0].value);
      props.getTrips("/Contract/" + contract[0].value);
    }

    if (props.type === "Bid") {
      props.setSelectedBid(contract[10].value);
      props.setSelectedBidId(contract[0].value);
      props.getTrips("/Bid/" + contract[0].value);
    }
  }

  function gatherDocuments() {
    setSearching(true);
  }
  return (
    !isLoading && (
      <Card
        className="border-primary mb-3 "
        style={{
          width: "100%",
        }}
      >
        {contract.map(
          (c, index) =>
            c.label !== null &&
            (c.label === "Contract No." || c.label === "Bid Name") && (
              <Card.Header key={index + "header"} as="h3">
                {c.label} {c.value}
              </Card.Header>
            )
        )}
        <Card.Body>
          <Card.Title className="mb-4 text-center">
            <h2>Contract Information</h2>
          </Card.Title>
          <Row>
            <Col md="10">
              <Row>
                {contract.map(
                  (c, index) =>
                    c.label !== null && (
                      <Col md="2" key={index + "body"}>
                        <p className="m-0" style={{ minHeight: "2.5em" }}>
                          {c.label} :<br />
                          <small className="text-muted m-0" style={{ whiteSpace: "nowrap" }}>
                            {c.value}
                          </small>
                        </p>
                        <hr className="my-2" />
                      </Col>
                    )
                )}
              </Row>
            </Col>
            <Col md="2" className="text-center p-0">
              <h5>Contract Documents</h5>
              <p className="text-muted small">No Documents.</p>
              <ListGroup className="text-left overflow-auto" style={{ height: "15em" }}>
                <ListGroupItem>Item</ListGroupItem>
                <ListGroupItem>Item</ListGroupItem>
                <ListGroupItem>Item</ListGroupItem>
                <ListGroupItem>Item</ListGroupItem>
                <ListGroupItem>Item</ListGroupItem>
                <ListGroupItem>Item</ListGroupItem>
                <ListGroupItem>Item</ListGroupItem>
                <ListGroupItem>Item</ListGroupItem>
                <ListGroupItem>Item</ListGroupItem>
                <ListGroupItem>Item</ListGroupItem>
              </ListGroup>
              {searching ? (
                <Spinner animation="border" variant="primary" />
              ) : (
                <>
                  <Button className="btn btn-sm btn-outline-info mt-3" onClick={() => gatherDocuments()}>
                    Search
                    <MDBIcon fas icon="search" className="ml-1" />
                  </Button>
                  <Button className="btn btn-sm btn-outline-info mt-3 " onClick={() => openDocumentModal()}>
                    Upload
                    <MDBIcon fas icon="upload" className="ml-1" />
                  </Button>
                </>
              )}
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer>
          {sessionStorage.getItem("/contract/trips") >= 2 && (
            <Link
              onClick={() => {
                setSelectedId();
              }}
              to={"../trips"}
              className="btn btn-primary"
            >
              View Trips
            </Link>
          )}
          {sessionStorage.getItem("/contract/ratesheets") >= 2 && (
            <Link
              onClick={() => {
                setSelectedId();
              }}
              to={"../ratesheets"}
              className="btn btn-primary"
            >
              View Rate Information
            </Link>
          )}
          {props.type === "Contract" && sessionStorage.getItem("/bid") >= 3 && (
            <Button className="float-right btn-outline-warning" onClick={openBidModal}>
              Create Bid
            </Button>
          )}
          {props.type === "Bid" && sessionStorage.getItem("/bid/final") >= 3 && (
            <Button className="float-right btn-outline-warning" onClick={openFinalModal}>
              Finalize Bid
            </Button>
          )}
          {sessionStorage.getItem("/" + props.type.toLowerCase()) >= 3 && (
            <Button className="float-right btn-outline-warning" onClick={openModal}>
              Edit {props.type}
            </Button>
          )}
        </Card.Footer>
        <Documents
          showModal={showDocumentModal}
          closeModal={closeDocumentModal}
          endpoint="/Contract/FileUpload"
          fileTypes={props.inputRestrictions[4].options}
          uploadData={[{ columnName: "contract_id", inputType: null, label: null, updatedValue: null, value: contract[0].updatedValue }]}
          modalName={"Upload Document to " + contract[6].label + " " + contract[6].value}
        />
        <UpsertContractModal
          modalName={"Edit " + props.type}
          contract={contract}
          inputRestrictions={props.inputRestrictions}
          show={showModal}
          closeModal={closeModal}
          appProps={props.appProps}
          submitAction={(editContent) => {
            return props.submitAction(editContent);
          }}
        />
        {sessionStorage.getItem("/bid") >= 3 && (
          <>
            <CreateBidModal show={showBidModal} closeModal={closeBidModal} appProps={props.appProps} contractId={contract[0].updatedValue} externalContractCode={contract[6].updatedValue} bidOptions={props.bidOptions} />

            {props.type === "Bid" && <FinalizeBidModal show={showFinalModal} closeModal={closeFinalModal} appProps={props.appProps} bidOptions={props.bidFinalOptions} contract={contract} />}
          </>
        )}
      </Card>
    )
  );
}

export default ContractCards;
