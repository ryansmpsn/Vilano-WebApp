import React from "react";
import { Button, Modal, FormGroup, FormControl, FormLabel, Spinner } from "react-bootstrap";

function UpsertVehicleModal(props) {
  return (
    <Modal show={props.show} onHide={props.closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{props.modalName}</Modal.Title>
      </Modal.Header>
    </Modal>
  );
}

export default UpsertVehicleModal;
