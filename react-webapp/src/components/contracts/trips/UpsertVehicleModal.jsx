import React from "react";
import { Modal } from "react-bootstrap";

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
