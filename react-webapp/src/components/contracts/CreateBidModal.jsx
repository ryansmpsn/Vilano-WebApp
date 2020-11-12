import React, { useState } from "react";
import Select from "react-select";
import Send from "../../libs/send";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { Button, Col, FormControl, FormLabel, Modal, Row, Spinner } from "react-bootstrap";

function CreateBidModal(props) {
  const { addToast } = useToasts();
  let navigate = useNavigate();

  const [newBid, setNewBid] = useState([
    { columnName: "contract_id", updatedValue: props.contractId },
    { columnName: "external_contract_code", updatedValue: props.externalContractCode },
    { columnName: "bid_name", updatedValue: null },
    { columnName: "status_id", updatedValue: null },
    { columnName: "bid_type_id", updatedValue: null },
    { columnName: "company_id", updatedValue: null },
  ]);
  const [isSending, setIsSending] = useState(false);

  function handleSubmit() {
    setIsSending(true);

    // TODO Retrieve submitted bid on redirect

    // let someData = { "what is this": "some content" };
    // navigate("../../bids", someData);

    return Send.post("/Bid/BidContract", newBid)
      .then((res) => {
        setIsSending(false);
        addToast("Bid successfully created.", {
          appearance: "success",
          autoDismiss: true,
          autoDismissTimeout: 3000,
        });
        props.closeModal();
        navigate("../../bids", res.data);
      })
      .catch((err) => {
        setIsSending(false);
      });
  }

  return (
    <Modal show={props.show} onHide={props.closeModal} centered>
      <Modal.Header closeButton>Create Bid from Contract : {props.externalContractCode}</Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <FormLabel>Bid Name: </FormLabel>
            <FormControl
              type="text"
              onChange={(e) => {
                var object = newBid;
                var specials = /[*|":<>[\]{}`\\()';@&$]/;
                object[2].updatedValue = e.target.value.replace(specials, "");
                setNewBid(object);
              }}
              placeholder={newBid[1].updatedValue}
            />
            <FormLabel>Bid Status: </FormLabel>
            <Select
              options={props.bidOptions[1].options}
              onChange={(x) => {
                let object = newBid;
                object[3].updatedValue = x.value;
                setNewBid(object);
              }}
            />
            <FormLabel>Bid Type: </FormLabel>
            <Select
              options={props.bidOptions[2].options}
              onChange={(x) => {
                let object = newBid;
                object[4].updatedValue = x.value;
                setNewBid(object);
              }}
            />
            {isSending ? (
              <Spinner animation="border" variant="primary" />
            ) : (
              <Button onClick={() => handleSubmit()}> Save </Button>
            )}
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}
export default CreateBidModal;
