import React, { useState } from "react";
import { Button, Col, FormControl, FormLabel, Modal, Row, Spinner } from "react-bootstrap";
import Select from "react-select";
import Send from "../../libs/send";

function CreateBidModal(props) {
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

    console.log(JSON.stringify(newBid));
    return Send.post("/Bid/BidContract", newBid)
      .then((res) => {
        console.log(res);
        setIsSending(false);
      })
      .catch((err) => {
        console.log(err);
        setIsSending(false);
      });
  }
  return (
    <Modal show={props.show} onHide={props.closeModal}>
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
            {console.log(props.bidOptions)}
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
            <FormLabel>Company: </FormLabel>
            <Select
              options={[
                { value: "1", label: "Vilano Management" },
                { value: "2", label: "Stageline" },
                { value: "3", label: "Omega Mile" },
                { value: 4, label: "Postal Fleet Services" },
              ]}
              onChange={(x) => {
                let object = newBid;
                object[5].updatedValue = x.value;
                setNewBid(object);
              }}
            />
            {isSending === null ? (
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
