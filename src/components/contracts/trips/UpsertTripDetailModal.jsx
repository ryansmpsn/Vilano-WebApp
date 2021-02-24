import React from "react";
import { Modal, FormControl, Button, Form, FormLabel, Row, Col } from "react-bootstrap";

function UpsertTripDetailModal(props) {
  let { show, closeModal, modalName } = props;

  return (
    <Modal show={show} onHide={closeModal} backdrop={"static"}>
      <Modal.Header closeButton>
        <Modal.Title>{modalName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>hello content</Modal.Body>
    </Modal>
  );
}

export default UpsertTripDetailModal;
