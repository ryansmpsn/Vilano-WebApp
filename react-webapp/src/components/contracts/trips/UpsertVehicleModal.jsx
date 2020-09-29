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
      contractProfile: props.contractProfile,
      vehicleValues: { vehicle_type_id: "", vehicle_type_value: "", num_vehicle: "" },
      trailerValues: { trailer_type_id: "", trailer_type_value: "", num_trailer: "" },
      submitting: false,
      vehiclesHaveChanged: false,
      trailersHaveChanged: false,
      vehicleSubmitAction: (editVehicle) => {
        return props.vehicleSubmitAction(editVehicle);
      },
      trailerSubmitAction: (editTrailer) => {
        return props.trailerSubmitAction(editTrailer);
      },
      props: props.appProps,
    };
    this.addVehicle = this.addVehicle.bind(this);
    this.addTrailer = this.addTrailer.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.submitAction = this.submitAction.bind(this);
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

    if (this.props.type === "Contract") {
      newVehicles.value.push([
        { columnName: "contract_trip_id", label: null, updatedValue: this.state.tripData[2].updatedValue },
        { columnName: "contract_trip_vehicle_id", label: null, updatedValue: "" },
        { columnName: "vehicle_type_id", label: null, updatedValue: this.state.vehicleValues.vehicle_type_id },
        { columnName: "vehicle_type_value", label: "Vehicle Type", updatedValue: this.state.vehicleValues.vehicle_type_value },
        { columnName: "num_vehicle", label: "Number of Vehicles", updatedValue: this.state.vehicleValues.num_vehicle },
      ]);
    }
    if (this.props.type === "Bid") {
      newVehicles.value.push([
        { columnName: "contract_bid_trip_id", label: null, updatedValue: this.state.tripData[2].updatedValue },
        { columnName: "contract_bid_trip_vehicle_id", label: null, updatedValue: "" },
        { columnName: "vehicle_type_id", label: null, updatedValue: this.state.vehicleValues.vehicle_type_id },
        { columnName: "vehicle_type_value", label: "Vehicle Type", updatedValue: this.state.vehicleValues.vehicle_type_value },
        { columnName: "num_vehicle", label: "Number of Vehicles", updatedValue: this.state.vehicleValues.num_vehicle },
      ]);
    }
    this.setState({ vehicles: newVehicles });
    this.setState({ vehiclesHaveChanged: true });
  }

  addTrailer(event) {
    event.preventDefault();

    let newTrailers = this.state.trailers;
    if (this.props.type === "Contract") {
      newTrailers.value.push([
        { columnName: "contract_trip_id", label: null, updatedValue: this.state.tripData[2].updatedValue },
        { columnName: "contract_trip_trailer_id", label: null, updatedValue: "" },
        { columnName: "trailer_type_id", label: null, updatedValue: this.state.trailerValues.trailer_type_id },
        { columnName: "trailer_type_value", label: "Trailer Type", updatedValue: this.state.trailerValues.trailer_type_value },
        { columnName: "num_trailer", label: "Number of Trailers", updatedValue: this.state.trailerValues.num_trailer },
      ]);
    }

    if (this.props.type === "Bid") {
      newTrailers.value.push([
        { columnName: "contract_bid_trip_id", label: null, updatedValue: this.state.tripData[2].updatedValue },
        { columnName: "contract_bid_trip_trailer_id", label: null, updatedValue: "" },
        { columnName: "trailer_type_id", label: null, updatedValue: this.state.trailerValues.trailer_type_id },
        { columnName: "trailer_type_value", label: "Trailer Type", updatedValue: this.state.trailerValues.trailer_type_value },
        { columnName: "num_trailer", label: "Number of Trailers", updatedValue: this.state.trailerValues.num_trailer },
      ]);
    }

    this.setState({ trailers: newTrailers });
    this.setState({ trailersHaveChanged: true });
  }

  removeItem(item, index) {
    if (item === "vehicle") {
      this.setState({ vehiclesHaveChanged: true });
      let newVehicles = this.state.vehicles;
      newVehicles.value.splice(index, 1);
      this.setState({ vehicles: newVehicles });
    }

    if (item === "trailer") {
      this.setState({ trailersHaveChanged: true });
      let newTrailers = this.state.trailers;
      newTrailers.value.splice(index, 1);
      this.setState({ trailers: newTrailers });
    }
  }

  submitAction() {
    console.log(this.state.contractProfile);
    if (this.props.type === "Bid") {
      if (this.state.vehiclesHaveChanged) this.state.vehicleSubmitAction(this.state.contractProfile);
      if (this.state.trailersHaveChanged) this.state.trailerSubmitAction(this.state.contractProfile);
    }
    if (this.props.type === "Contract") {
      let JSONData = this.state.tripData;

      JSONData[19] = this.state.vehicles;
      JSONData[20] = this.state.trailers;
      if (this.state.vehiclesHaveChanged) this.state.vehicleSubmitAction(JSONData);
      if (this.state.trailersHaveChanged) this.state.trailerSubmitAction(JSONData);
      console.log(JSONData);
    }

    this.props.closeModal();
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
              <Col md="6">
                Add a Vehicle
                <Form onSubmit={this.addVehicle}>
                  <Select
                    options={this.state.vehicleOptions}
                    placeholder={"Vehicles"}
                    isDisabled={this.state.isLoading}
                    onChange={(x) => {
                      var object = this.state.vehicleValues;
                      object.vehicle_type_id = x.value;
                      object.vehicle_type_value = x.label;
                      this.setState({ vehicleValues: object });
                    }}
                  />
                  <FormControl
                    type="number"
                    disabled={this.state.isLoading}
                    onChange={(e) => {
                      var object = this.state.vehicleValues;
                      object.num_vehicle = e.target.value;
                      this.setState({ vehicleValues: object });
                    }}
                    max="100"
                    min="1"
                    step="1"
                    placeholder="Number of Vehicles"
                    required
                  />
                  <Button type="submit" disabled={this.state.isLoading}>
                    add
                  </Button>
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
                    isDisabled={this.state.isLoading}
                    onChange={(x) => {
                      var object = this.state.trailerValues;
                      object.trailer_type_id = x.value;
                      object.trailer_type_value = x.label;
                      this.setState({ trailerValues: object });
                    }}
                  />
                  <FormControl
                    type="number"
                    disabled={this.state.isLoading}
                    onChange={(e) => {
                      var object = this.state.trailerValues;
                      object.num_trailer = e.target.value;
                      this.setState({ trailerValues: object });
                    }}
                    max="100"
                    min="1"
                    step="1"
                    placeholder="Number of Trailers"
                    required
                  />
                  <Button type="submit" disabled={this.state.isLoading}>
                    add
                  </Button>
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
          </Row>
          <div className={"text-center"}>
            <Button
              variant={"outline-primary"}
              onClick={this.submitAction}
              disabled={!this.state.vehiclesHaveChanged && !this.state.trailersHaveChanged}
            >
              Save
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

export default UpsertVehicleModal;
