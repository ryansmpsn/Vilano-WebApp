import React from "react";
import { Modal } from "react-bootstrap";

class UpsertVehicleModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      modalName: props.modalName,
      show: props.show,
      vehicle: props.vehicle,
      Permissions: "Write",
      editTrip: props.vehicle,
      inputRestrictions: props.inputRestrictions,
      contractProfile: props.contractProfile,
      submitting: false,
      submitAction: (editTrip) => {
        return props.submitAction(editTrip);
      },
      props: props.appProps,
    };
  }
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.modalName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* {this.state.editTrip.map((item, index) => Array.isArray(item.value) && item.label !== null && console.log(item))} */}
        </Modal.Body>
      </Modal>
    );
  }
}

export default UpsertVehicleModal;
