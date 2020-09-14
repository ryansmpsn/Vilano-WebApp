import React, { useState } from "react";
import { Button, Col, FormControl, FormLabel, Modal, Row } from "react-bootstrap";
import Select from "react-select";

function CreateBidModal(props) {
  const [newBid, setNewBid] = useState([
    { columnName: "contract_id", inputType: null, label: null, updatedValue: props.contractId },
    { columnName: "external_contract_code", inputType: null, label: null, updatedValue: props.externalContractCode },
    { columnName: "bid_name", inputType: null, label: null, updatedValue: null },
    { columnName: "status_value", inputType: null, label: null, updatedValue: null },
    { columnName: "bid_type_value", inputType: null, label: null, updatedValue: null },
  ]);

  function handleSubmit() {
    console.log(newBid);
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
                object[1].updatedValue = e.target.value.replace(specials, "");
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
            <FormLabel>Bid Status: </FormLabel>
            <Select
              options={props.bidOptions[2].options}
              onChange={(x) => {
                let object = newBid;
                object[4].updatedValue = x.value;
                setNewBid(object);
              }}
            />
            <Button onClick={() => handleSubmit()}> Save </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}
export default CreateBidModal;
