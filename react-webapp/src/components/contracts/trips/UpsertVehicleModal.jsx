import React from "react";
import { Modal, FormControl, Button, Form, FormLabel, FormGroup, Row, Col } from "react-bootstrap";
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
      tripData: props.tripData,
      vehicleValues: { vehicle_type_id: "", vehicle_type_value: "", num_vehicle: "" },
      trailerValues: { trailer_type_id: "", trailer_type_value: "", num_trailer: "" },
      submitting: false,
      submitAction: () => {
        console.log("submitting...");
      },
      props: props.appProps,
    };
    this.addVehicle = this.addVehicle.bind(this);
    this.addTrailer = this.addTrailer.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.submitData = this.submitData.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    Send.get("/Contract/Dropdowns/ContractTripVehicle/All").then((res) => {
      this.setState({ vehicleOptions: res.data[0].options });
      this.setState({ trailerOptions: res.data[1].options });
      this.setState({ isLoading: false });
    });
  }

  addVehicle(event) {
    event.preventDefault();

    let newVehicles = this.state.vehicles;
    newVehicles.value.push([
      { columnName: "contract_trip_id", label: null, updatedValue: this.state.tripData[2].updatedValue },
      { columnName: "contract_trip_vehicle_id", label: null, updatedValue: "" },
      { columnName: "vehicle_type_id", label: null, updatedValue: this.state.vehicleValues.vehicle_type_id },
      { columnName: "vehicle_type_value", label: "Vehicle Type", updatedValue: this.state.vehicleValues.vehicle_type_value },
      { columnName: "num_vehicle", label: "Number of Vehicles", updatedValue: this.state.vehicleValues.num_vehicle },
    ]);
    this.setState({ vehicles: newVehicles });
  }

  addTrailer(event) {
    event.preventDefault();

    let newTrailers = this.state.trailers;
    newTrailers.value.push([
      { columnName: "contract_trip_id", label: null, updatedValue: this.state.tripData[2].updatedValue },
      { columnName: "contract_trip_trailer_id", label: null, updatedValue: "" },
      { columnName: "trailer_type_id", label: null, updatedValue: this.state.trailerValues.trailer_type_id },
      { columnName: "trailer_type_value", label: "Trailer Type", updatedValue: this.state.trailerValues.trailer_type_value },
      { columnName: "num_trailer", label: "Number of Trailers", updatedValue: this.state.trailerValues.num_trailer },
    ]);
    this.setState({ trailers: newTrailers });
  }

  removeItem(item, index) {
    if (item === "vehicle") {
      let newVehicles = this.state.vehicles;
      newVehicles.value.splice(index, 1);
      this.setState({ vehicles: newVehicles });
    }

    if (item === "trailer") {
      let newTrailers = this.state.trailers;
      newTrailers.value.splice(index, 1);
      this.setState({ trailers: newTrailers });
    }
  }

  submitData() {
    let JSONData = this.state.tripData;
    JSONData[19] = this.state.vehicles;
    JSONData[20] = this.state.trailers;
    console.log(JSON.stringify(JSONData));
  }

  set_variable_id(object, variable_key, value) {
    var variable = variable_key.substring(0, variable_key.lastIndexOf("_")) + "_id";
    var set = false;
    object.forEach((item) => {
      if (item.columnName === variable) {
        item.updatedValue = value;
        set = true;
      }
    });
    if (set === false) {
      object.push([null, value, variable, "", "None"]);
    }
    return object;
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{this.props.modalName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            {!this.isLoading && (
              <Col>
                Add a Vehicle
                <Form onSubmit={this.addVehicle}>
                  <Select
                    options={this.state.vehicleOptions}
                    placeholder={"Vehicles"}
                    onChange={(x) => {
                      var object = this.state.vehicleValues;
                      object.vehicle_type_id = x.value;
                      object.vehicle_type_value = x.label;
                      this.setState({ vehicleValues: object });
                    }}
                  />
                  <FormControl
                    type="number"
                    onChange={(e) => {
                      var object = this.state.vehicleValues;
                      object.num_vehicle = e.target.value;
                      this.setState({ vehicleValues: object });
                    }}
                    max="100"
                    min="0"
                    step="1"
                    placeholder="Number of Vehicles"
                  />
                  <Button type="submit">add</Button>
                </Form>
                {this.state.vehicles.value.map((c, index) => (
                  <FormGroup key={index}>
                    <FormLabel>{c[3].label + ": " + c[3].updatedValue}</FormLabel>
                    <br />
                    <FormLabel>{c[4].label + ": " + c[4].updatedValue}</FormLabel>
                    <Button variant="outline-danger" size="sm" onClick={() => this.removeItem("vehicle", index)}>
                      Remove
                    </Button>
                  </FormGroup>
                ))}
              </Col>
            )}
            {!this.isLoading && (
              <Col>
                Add a Trailer
                <Form onSubmit={this.addTrailer}>
                  <Select
                    options={this.state.trailerOptions}
                    placeholder={"Trailers"}
                    onChange={(x) => {
                      var object = this.state.trailerValues;
                      object.trailer_type_id = x.value;
                      object.trailer_type_value = x.label;
                      this.setState({ trailerValues: object });
                    }}
                  />
                  <FormControl
                    type="number"
                    onChange={(e) => {
                      var object = this.state.trailerValues;
                      object.num_trailer = e.target.value;
                      this.setState({ trailerValues: object });
                    }}
                    max="100"
                    min="0"
                    step="1"
                    placeholder="Number of Trailers"
                  />
                  <Button type="submit">add</Button>
                </Form>
                {this.state.trailers.value.map((c, index) => (
                  <FormGroup key={index}>
                    <FormLabel>{c[3].label + ": " + c[3].updatedValue}</FormLabel>
                    <br />
                    <FormLabel>{c[4].label + ": " + c[4].updatedValue}</FormLabel>
                    <Button variant="outline-danger" size="sm" onClick={() => this.removeItem("trailer", index)}>
                      Remove
                    </Button>
                  </FormGroup>
                ))}
              </Col>
            )}

            {/* <FormGroup key={index}>
                     <FormLabel>)} */}
          </Row>
          <div className={"text-center"}>
            <Button variant={"outline-primary"} onClick={this.submitData}>
              Save
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

export default UpsertVehicleModal;
