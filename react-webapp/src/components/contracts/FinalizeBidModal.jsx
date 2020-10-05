import React from "react";
import { Modal, Row, Col } from "react-bootstrap";

function FinalizeBidModal(props) {
  return (
    <Modal show={props.show} onHide={props.closeModal}>
      <Modal.Header closeButton> Finalize Bid Modal</Modal.Header>
      <Modal.Body>
        <Row>
          <Col>Hello Modal Body</Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}

export default FinalizeBidModal;
