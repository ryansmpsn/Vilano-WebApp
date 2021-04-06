import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col, Button, Spinner, ListGroup, ListGroupItem } from "react-bootstrap";
import UpsertContractModal from "./UpsertContractModal";
import CreateBidModal from "./CreateBidModal";
import FinalizeBidModal from "./FinalizeBidModal";
import Documents from "../util/Documents";
import Send from "../../libs/send";
import { useToasts } from "react-toast-notifications";

function ContractCards(props) {
  const { addToast } = useToasts();
  let { contract, details } = props;

  const [showModal, setShowModal] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [showBidModal, setShowBidModal] = useState(false);
  const [showFinalModal, setShowFinalModal] = useState(false);
  const [searching, setSearching] = useState(false);
  const [documents, setDocuments] = useState(null);
  const [bidOptions, setBidOptions] = useState(null);
  const [bidFinalOptions, setBidFinalOptions] = useState(null);

  function openModal() {
    setShowModal(true);
    window.location.hash = "edit";
  }

  function openCreateBidModal() {
    Send.get("/Bid/Dropdowns/BidNames/All").then((response) => {
      setBidOptions(response.data);
      setShowBidModal(true);

      window.location.hash = "createbid";
    });
  }

  function openFinalModal() {
    Send.get("/Bid/Dropdowns/Bid/Final").then((response) => {
      setBidFinalOptions(response.data);
      setShowFinalModal(true);
      window.location.hash = "finalize";
    });
  }

  function closeFinalModal() {
    window.history.replaceState(null, null, " ");

    setShowFinalModal(false);
  }

  function closeModal() {
    window.history.replaceState(null, null, " ");
    setShowModal(false);
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
  useEffect(() => {
    if (details && props.type !== "Bid") {
      setSearching(true);

      Send.get(`/Contract/${contract[0].value}/Document`).then((response) => {
        setSearching(false);
        setDocuments(response.data);
      });
    }
  }, [setSearching, contract, details, props.type]);

  async function gatherDocuments() {
    setSearching(true);

    Send.get(`/Contract/${contract[0].value}/Document`).then((response) => {
      setSearching(false);
      setDocuments(response.data);
    });
  }
  function openLink(x) {
    const newWindow = window.open("https://" + x, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  }
  function accessFile(fileData) {
    addToast("Checking your permissions for this file.", {
      appearance: "info",
      autoDismiss: true,
      autoDismissTimeout: 3000,
    });

    Send.get("/Contract/FileDownloadLink/" + fileData[11].updatedValue + "/" + fileData[9].updatedValue).then((result) => {
      openLink(result.data.share_link);
      addToast("File access granted.", {
        appearance: "success",
        autoDismiss: true,
        autoDismissTimeout: 3000,
      });
    });
  }
  return (
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
            <Card.Header key={index + "header"} as="h4">
              {c.label} {c.value}
            </Card.Header>
          )
      )}
      <Card.Body>
        <Row>
          <Col md={props.type === "Bid" ? "12" : "10"}>
            <Row>
              {contract.map(
                (c, index) =>
                  c.label !== null &&
                  !Array.isArray(c.value) && (
                    <Col md={props.type === "Bid" ? "2" : "3"} key={index + "body"}>
                      <p className="mx-0 my-2 border-bottom" style={{ minHeight: "2.5em" }}>
                        {c.label} :<br />
                        <small className="text-muted m-0" style={{ whiteSpace: "nowrap" }}>
                          {c.value || "-"}
                        </small>
                      </p>
                    </Col>
                  )
              )}
            </Row>
          </Col>
          {props.type !== "Bid" && (
            <Col md="2" className="text-center p-0">
              <h5>Contract Documents</h5>
              {documents === null ? (
                <p className="text-muted small">Search for documents attached to this contract.</p>
              ) : (
                <ListGroup className="text-left overflow-auto" style={{ height: "15em" }}>
                  {documents.map((c, index) => (
                    <ListGroupItem size="3" key={index + "document"} className="p-0 pl-2" action onClick={() => accessFile(c)}>
                      <div>
                        <small className="text-muted">{c[5].value}</small>
                        <p>{c[10].value}</p>
                      </div>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
              {searching ? (
                <Spinner animation="border" variant="primary" />
              ) : (
                <>
                  <Button className="btn btn-sm btn-outline-info mt-3" onClick={() => gatherDocuments()}>
                    Search
                    <div className="fas fa-search ml-1" />
                  </Button>
                  <Button className="btn btn-sm btn-outline-info mt-3 " onClick={() => openDocumentModal()}>
                    Upload
                    <div className="fas fa-upload ml-1" />
                  </Button>
                </>
              )}
            </Col>
          )}
        </Row>
      </Card.Body>
      <Card.Footer>
        {!details && (
          <Link to={`../details/${contract[0].value}`} className="btn btn-outline-primary">
            View Details
          </Link>
        )}

        {props.type === "Contract" && sessionStorage.getItem("/bid") >= 3 && (
          <Button className="float-right btn-outline-primary" onClick={openCreateBidModal}>
            Create Bid
          </Button>
        )}
        {props.type === "Bid" && sessionStorage.getItem("/bid/final") >= 3 && (
          <Button className="float-right btn-outline-primary" onClick={openFinalModal}>
            Finalize Bid
          </Button>
        )}
        {sessionStorage.getItem("/" + props.type.toLowerCase()) >= 3 && (
          <Button className="float-right btn-outline-primary" onClick={openModal}>
            Edit {props.type}
          </Button>
        )}
      </Card.Footer>
      {props.type === "Bid" ? (
        <Documents
          showModal={showDocumentModal}
          closeModal={closeDocumentModal}
          endpoint={"/Bid/FileUpload"}
          fileTypes={props.inputRestrictions && props.inputRestrictions[6].options}
          uploadData={[{ columnName: "contract_bid_id", inputType: null, label: null, updatedValue: contract[0].updatedValue, value: contract[0].updatedValue }]}
          modalName={"Upload Document to " + contract[10].label + " " + contract[10].value}
        />
      ) : (
        <Documents
          showModal={showDocumentModal}
          closeModal={closeDocumentModal}
          endpoint={"/Contract/FileUpload"}
          fileTypes={props.inputRestrictions && props.inputRestrictions[4].options}
          uploadData={[{ columnName: "contract_id", inputType: null, label: null, updatedValue: contract[0].updatedValue, value: contract[0].updatedValue }]}
          modalName={"Upload Document to " + contract[6].label + " " + contract[6].value}
        />
      )}
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
          {bidOptions && (
            <CreateBidModal show={showBidModal} closeModal={closeBidModal} appProps={props.appProps} contractId={contract[0].updatedValue} externalContractCode={contract[6].updatedValue} bidOptions={bidOptions} />
          )}

          {props.type === "Bid" && <FinalizeBidModal show={showFinalModal} closeModal={closeFinalModal} appProps={props.appProps} bidOptions={bidFinalOptions} contract={contract} />}
        </>
      )}
    </Card>
  );
}

export default ContractCards;
