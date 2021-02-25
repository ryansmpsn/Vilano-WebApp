import React from "react";
import { Modal, FormControl, Button, Form, FormLabel, Row, Col, FormGroup } from "react-bootstrap";
import Select from "react-select";

function UpsertTripDetailModal(props) {
  let { show, closeModal, modalName } = props;

  return (
    <Modal show={show} onHide={closeModal} backdrop={"static"} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{modalName}</Modal.Title>
      </Modal.Header>
      <Form>
        <Modal.Body>
          <Row>
            <Col md="6">
              <FormGroup>
                <FormLabel>Faility</FormLabel>
                <Select placeholder="Facility" />
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
                <FormLabel>Time</FormLabel>

                <FormControl type="time" required />
              </FormGroup>
            </Col>
            <Col md="3">
              <FormGroup>
                <FormLabel>Action</FormLabel>
                <Select placeholder="Action" />
              </FormGroup>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button disabled>Save</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default UpsertTripDetailModal;
