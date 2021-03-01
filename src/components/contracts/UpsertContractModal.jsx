import React from "react";
import { Button, Modal, FormGroup, FormControl, FormLabel, Spinner, Row, Col } from "react-bootstrap";
import InputFormControl from "../../libs/InputFormControl";
import DatePicker from "react-date-picker";

export default class UpsertContractModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      modalName: props.modalName,
      show: props.show,
      contract: props.contract,
      editContract: props.contract,
      inputRestrictions: props.inputRestrictions,
      submitting: false,
      extraButtonContract: props.extraButtonContract || null,
      submitAction: (editcontract) => {
        return props.submitAction(editcontract);
      },
      addSelectOption: (option) => {
        return props.addSelectOption(option);
      },
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
    var object = this.state.contract;
    object.forEach((item) => {
      if (item.updatedValue !== null && item.updatedValue !== item.value) {
        hasChanged = true;
      }
    });
    // add notification for upated Contract
    return hasChanged;
  }

  update_contract(newContract) {
    var object = this.state.contract;

    object.forEach((item) => {
      let data = item;
      // item.updatedValue = null;
      newContract.forEach((c) => {
        if (c.columnName === data.columnName) data.value = c.value;
      });

      item = data;
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    var hand = this;
    var newContract = null;
    this.setState({ submitting: true });

    hand.state
      .submitAction(this.state.editContract)
      .then((res) => {
        hand.state.addSelectOption(this.state.editContract[6].updatedvalue);
        newContract = res.data[0];
        newContract.pop();
        if (newContract !== null) {
          hand.update_contract(newContract);
          hand.setState({ submitting: false });
        } else {
          hand.setState({ submitting: false });
        }
      })
      .catch((err) => {
        hand.setState({ submitting: false });
        console.log(err);
      });
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
      <Modal show={this.state.show} onHide={this.props.closeModal} backdrop={"static"} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{this.state.modalName}</Modal.Title>
        </Modal.Header>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <Modal.Body>
            <Row>
              {this.state.editContract.map(
                (item, index) =>
                  item.label !== null && (
                    <Col md="6" key={index}>
                      <FormGroup>
                        <FormLabel>
                          {item.label + ": "}
                          {item.inputType !== "text" && item.inputType !== "date" && item.inputType !== "select" && item.value}
                        </FormLabel>
                        {/* Make this formcontrol tie to values for editing-- Done I think?  */}
                        {(item.inputType === "text" && (
                          <FormControl
                            type="text"
                            value={item.updatedValue}
                            onChange={(e) => {
                              var object = this.state.editContract;
                              var specials = /[*|":<>[\]{}`\\()';@&$]/; //TODO setup global module to sanatize stuff.
                              object[index].updatedValue = e.target.value.replace(specials, "");
                              this.setState({ editContract: object });
                            }}
                            placeholder={item.value}
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
                                var object = this.state.editContract;
                                object[index].updatedValue = !item.updatedValue;
                                this.setState({ editTrip: object });
                              }}
                            />
                          )) ||
                          (item.inputType === "select" && (
                            <InputFormControl
                              index={index}
                              input={item.inputType}
                              onChange={(e) => {
                                var object = this.set_variable_id(this.state.editContract, item.columnName, e.value);
                                var specials = /[*|":<>[\]{}`\\()';@&$]/; //TODO setup global module to sanatize stuff.
                                object[index].updatedValue = e.label.toString().replace(specials, "");
                                this.setState({ editContract: object });
                              }}
                              content={item}
                              inputRestrictions={this.state.inputRestrictions}
                            />
                          )) ||
                          (item.inputType === "date" && (
                            <>
                              <br />
                              {/* Fix date picker to default to current day */}
                              <DatePicker
                                onChange={(e) => {
                                  var object = this.state.editContract;
                                  var date = new Date(e);
                                  var return_date = date.getUTCFullYear() + "-" + (date.getUTCMonth() + 1) + "-" + date.getUTCDate();
                                  object[index].updatedValue = return_date;
                                  this.setState({ editContract: object });
                                  this.setState({ date: date });
                                }}
                                value={
                                  item.updatedValue !== null
                                    ? new Date(new Date(item.updatedValue).getUTCMonth() + 1 + "/" + new Date(item.updatedValue).getUTCDate() + "/" + new Date(item.updatedValue).getUTCFullYear())
                                    : item.value !== null
                                    ? new Date(new Date(item.value).getUTCMonth() + 1 + "/" + new Date(item.value).getUTCDate() + "/" + new Date(item.value).getUTCFullYear())
                                    : new Date(new Date().getUTCMonth() + 1 + "/" + new Date().getUTCDate() + "/" + new Date().getUTCFullYear())
                                }
                              />
                            </>
                          ))}
                      </FormGroup>
                    </Col>
                  )
              )}

              {/*this.state.extraButtonContract !== null && this.state.extraButtonContract.map((e, index){
              <Button
              block
              onClick={() => {
                this.get_history();
              }}
              bsSize="large"
              //isLoading={this.state.submitting}
              //disabled={this.state.submitting}
            >
              Edit History
            </Button>
            })*/}
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
