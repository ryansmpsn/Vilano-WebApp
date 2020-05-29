import React from "react";
import { Button, Modal, FormGroup, FormControl, FormLabel, Spinner } from "react-bootstrap";
import { MDBNotification } from "mdbreact";
import InputFormControl from "../InputFormControl";
import NavPerm from "../../libs/NavPerms";
import DatePicker from "react-date-picker";

export default class EditContractModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      modalName: props.modalName,
      show: props.show,
      contract: props.contract,
      Permissions: "Write",
      editContract: props.contract,
      inputRestrictions: props.inputRestrictions,
      submitting: false,
      extraButtonContract: props.extraButtonContract || null,
      submitAction: (editcontract) => {
        return props.submitAction(editcontract);
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
      if (item.updatedValue !== "" && item.updatedValue !== item.value) {
        hasChanged = true;
      }
    });
    return hasChanged;
  }

  update_contract(newContract) {
    var object = this.state.contract;
    object.forEach((item) => {
      var new_val = newContract[item.columnName];
      item.value = new_val;
      item.updatedValue = "";
    });
  }
  /*
  async get_history() {
    Send.get("/ViewContractHistory?contract_id=" + 851, this.state.props)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
  */

  async handleSubmit(event) {
    event.preventDefault();
    var hand = this;
    var newContract = null;

    this.setState({ submitting: true });
    console.log(this.state.editContract);
    hand.state
      .submitAction(this.state.editContract)
      .then((res) => {
        newContract = JSON.parse(res.data);

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
    return <MDBNotification show fade icon="envelope" iconClassName="green-text" title="New Message" message="Hello, user! You have a new message." text="just now" />;
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
      <Modal show={this.state.show} onHide={this.props.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{this.state.modalName}</Modal.Title>
        </Modal.Header>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <Modal.Body>
            {this.state.editContract.map(
              (item, index) =>
                item.label !== null && (
                  <FormGroup key={index}>
                    <FormLabel>
                      {item.label +
                        ": " +
                        (item.inputType !== "date"
                          ? item.value
                          : new Date(item.value).getUTCMonth() + 1 + "/" + new Date(item.value).getUTCDate() + "/" + new Date(item.value).getUTCFullYear())}
                    </FormLabel>
                    {/* Make this formcontrol tie to values for editing-- Done I think?  */}
                    {this.state.Permissions === "Write" &&
                      ((item.inputType === "text" && (
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
                            <span>Edit Date: &nbsp;</span>
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
                                item.updatedValue !== ""
                                  ? new Date(
                                      new Date(item.updatedValue).getUTCMonth() +
                                        1 +
                                        "/" +
                                        new Date(item.updatedValue).getUTCDate() +
                                        "/" +
                                        new Date(item.updatedValue).getUTCFullYear()
                                    )
                                  : item.value !== null
                                  ? new Date(new Date(item.value).getUTCMonth() + 1 + "/" + new Date(item.value).getUTCDate() + "/" + new Date(item.value).getUTCFullYear())
                                  : new Date(new Date().getUTCMonth() + 1 + "/" + new Date().getUTCDate() + "/" + new Date().getUTCFullYear())
                              }
                            />
                          </>
                        )))}
                  </FormGroup>
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
          </Modal.Body>
          <Modal.Footer>
            {this.state.Permissions === "Write" &&
              (!this.state.submitting ? (
                <Button className="btn btn-primary mr-auto" type="submit" disabled={this.state.submitting}>
                  Save
                </Button>
              ) : (
                <Spinner animation="border" variant="primary" className="mr-auto" />
              ))}
            <Button onClick={this.props.closeModal}>Close</Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }
}
