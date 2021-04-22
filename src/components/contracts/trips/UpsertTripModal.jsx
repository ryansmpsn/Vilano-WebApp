import React from "react";
import { Button, Modal, FormGroup, FormControl, FormLabel, Spinner, Row, Col } from "react-bootstrap";
import InputFormControl from "../../../libs/InputFormControl";
import DatePicker from "react-date-picker";
import Send from "../../../libs/send";

export default class UpsertTripModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      permissions: "Write",
      date: new Date(),
      modalName: props.modalName,
      show: props.show,
      trip: props.trip,
      editTrip: props.trip,
      inputRestrictions: props.inputRestrictions,
      contractProfile: props.contractProfile,
      submitting: false,
      submitAction: (editTrip) => {
        return props.submitAction(editTrip);
      },
      setContractProfile: props.submitAction,
      props: props.appProps,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.show !== state.show) {
      return {
        show: props.show,
      };
    }

    // Return null if the state hasn't changed
    return null;
  }

  has_changed() {
    var hasChanged = false;
    var object = this.state.trip;
    object.forEach((item) => {
      if (item.updatedValue !== null && item.updatedValue !== item.value) {
        hasChanged = true;
      }
    });
    // add notification for upated Contract
    return hasChanged;
  }

  update_trip(newTrip) {
    var object = this.state.trip;

    object.forEach((item) => {
      let data = item;
      item.updatedValue = null;
      newTrip.forEach((c) => {
        if (c.columnName === data.columnName) data.value = c.value;
      });

      item = data;
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    var hand = this;
    this.setState({ submitting: true });
    let JSONResponse = this.state.contractProfile;

    if (hand.props.type === "Contract") {
      JSONResponse[28].value = [this.state.editTrip];

      Send.post("/Contract/ContractTrip", JSONResponse, this.props).then((res) => {
        hand.props.setContract(res.data[0]);
        hand.props.closeModal();
      });
    }
    if (hand.props.type === "Bid") {
      JSONResponse[33].value = [this.state.editTrip];
      hand.state.submitAction(JSONResponse);
    }
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
      <Modal show={this.state.show} onHide={this.props.closeModal} backdrop={"static"}>
        <Modal.Header closeButton>
          <Modal.Title>{this.state.modalName}</Modal.Title>
        </Modal.Header>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <Modal.Body>
            <Row>
              {this.state.editTrip.map(
                (item, index) =>
                  !Array.isArray(item.value) &&
                  item.label !== null && (
                    <Col md="6" key={index}>
                      <FormGroup>
                        <FormLabel>
                          {item.label +
                            ": " +
                            (item.inputType !== "date"
                              ? item.value !== null
                                ? item.value
                                : ""
                              : new Date(item.value).getUTCMonth() + 1 + "/" + new Date(item.value).getUTCDate() + "/" + new Date(item.value).getUTCFullYear())}
                        </FormLabel>
                        {/* Make this formcontrol tie to values for editing-- Done I think?  */}
                        {this.state.permissions === "Write" &&
                          ((item.inputType === "text" && (
                            <FormControl
                              type="text"
                              value={item.updatedValue !== null ? item.updatedValue : ""}
                              onChange={(e) => {
                                var object = this.state.editTrip;
                                var specials = /[*|":<>[\]{}`\\()';@&$]/; //TODO setup global module to sanatize stuff.
                                object[index].updatedValue = e.target.value.replace(specials, "");
                                this.setState({ editTrip: object });
                              }}
                              placeholder={item.value}
                              disabled={this.state.submitting}
                            />
                          )) ||
                            (item.inputType === "num" && (
                              <FormControl
                                type="number"
                                value={item.updatedValue !== null && item.updatedValue}
                                onChange={(e) => {
                                  var object = this.state.editTrip;
                                  var specials = /[*|":<>[\]{}`\\()';@&$]/; //TODO setup global module to sanatize stuff.
                                  object[index].updatedValue = e.target.value.replace(specials, "");
                                  this.setState({ editTrip: object });
                                }}
                                placeholder={item.value}
                                disabled={this.state.submitting}
                              />
                            )) ||
                            (item.inputType === "checkbox" && (
                              <FormControl
                                id={item.columnName}
                                style={{ width: 25 }}
                                size="sm"
                                type="checkbox"
                                checked={item.updatedValue === 1 || item.updatedValue === true}
                                onChange={() => {
                                  var object = this.state.editTrip;
                                  object[index].updatedValue = !item.updatedValue;
                                  this.setState({ editTrip: object });
                                }}
                                disabled={this.state.submitting}
                              />
                            )) ||
                            (item.inputType === "select" && (
                              <InputFormControl
                                index={index}
                                input={item.inputType}
                                onChange={(e) => {
                                  var object = this.set_variable_id(this.state.editTrip, item.columnName, e.value);
                                  var specials = /[*|":<>[\]{}`\\()';@&$]/; //TODO setup global module to sanatize stuff.
                                  object[index].updatedValue = e.label.toString().replace(specials, "");
                                  this.setState({ editTrip: object });
                                }}
                                content={item}
                                inputRestrictions={this.state.inputRestrictions}
                                disabled={this.state.submitting}
                              />
                            )) ||
                            (item.inputType === "date" && (
                              <>
                                <br />
                                <span>Edit Date: &nbsp;</span>
                                {/* Fix date picker to default to current day */}
                                <DatePicker
                                  onChange={(e) => {
                                    var object = this.state.editTrip;
                                    var date = new Date(e);
                                    var return_date = date.getUTCFullYear() + "-" + (date.getUTCMonth() + 1) + "-" + date.getUTCDate();
                                    object[index].updatedValue = return_date;
                                    this.setState({ editTrip: object });
                                    this.setState({ date: date });
                                  }}
                                  value={
                                    item.updatedValue !== null
                                      ? new Date(new Date(item.updatedValue).getUTCMonth() + 1 + "/" + new Date(item.updatedValue).getUTCDate() + "/" + new Date(item.updatedValue).getUTCFullYear())
                                      : item.value !== null
                                      ? new Date(new Date(item.value).getUTCMonth() + 1 + "/" + new Date(item.value).getUTCDate() + "/" + new Date(item.value).getUTCFullYear())
                                      : new Date(new Date().getUTCMonth() + 1 + "/" + new Date().getUTCDate() + "/" + new Date().getUTCFullYear())
                                  }
                                  disabled={this.state.submitting}
                                />
                              </>
                            )))}
                      </FormGroup>
                    </Col>
                  )
              )}
            </Row>
          </Modal.Body>
          <Modal.Footer>
            {!this.state.submitting ? (
              <Button className="btn btn-primary mr-auto" type="submit" disabled={this.state.submitting}>
                Save
              </Button>
            ) : (
              <Spinner animation="border" variant="primary" className="mr-auto" />
            )}
            <Button onClick={this.props.closeModal}>Close</Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
}
