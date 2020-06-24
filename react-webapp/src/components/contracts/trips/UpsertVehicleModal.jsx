import React from "react";
import { Modal, FormControl, Button, FormLabel, FormGroup } from "react-bootstrap";
import Select from "react-select";
import Send from "../../../libs/send";

class UpsertVehicleModal extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      isLoading: true,
      modalName: props.modalName,
      show: props.show,
      vehicles: props.vehicles,
      trailers: props.trailers,
      vehicleOptions: [],
      trailerOptions: [],
      Permissions: "Write",
      contractProfile: props.contractProfile,
      submitting: false,
      submitAction: () => {
        console.log("submitting...");
      },
      props: props.appProps,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    Send.get("/Contract/Dropdowns/ContractTripVehicle/All").then((res) => {
      this.setState({ vehicleOptions: res.data[0].options });
      this.setState({ trailerOptions: res.data[1].options });
      this.setState({ isLoading: false });
    });
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.closeModal}>
        <Modal.Header closeButton>
          {console.log(this.state.vehicles)}
          {console.log(this.state.trailers)}

          <Modal.Title>{this.props.modalName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!this.isLoading && (
            <>
              Add a Vehicle Combination
              <Select
                options={this.state.vehicleOptions}
                placeholder={"Vehicles"}
                onChange={(x) => {
                  console.log(x);
                }}
              />
              <FormControl
                type="number"
                onChange={(e) => {
                  console.log(e);
                }}
                placeholder="Vehicle Count"
              />
              <Select
                options={this.state.trailerOptions}
                placeholder={"Trailers"}
                onChange={(x) => {
                  console.log(x);
                }}
              />
              <FormControl
                type="number"
                onChange={(e) => {
                  console.log(e);
                }}
                placeholder="Trailer Count"
              />
              <Button>add</Button>
            </>
          )}

          {this.state.vehicles.value.map((c, index) => (
            <FormGroup key={index}>
              <FormLabel>{c[3].label + ": " + c[3].value}</FormLabel>
              <FormLabel>{c[4].label + ": " + c[4].value}</FormLabel>
            </FormGroup>
          ))}
          {this.state.trailers.value.map((c, index) => (
            <FormGroup key={index}>
              <FormLabel>{c[3].label + ": " + c[3].value}</FormLabel>
              <FormLabel>{c[4].label + ": " + c[4].value}</FormLabel>
            </FormGroup>
          ))}

          {/* <FormGroup key={index}>
                     <FormLabel>)} */}
        </Modal.Body>
      </Modal>
    );
  }
}

export default UpsertVehicleModal;
