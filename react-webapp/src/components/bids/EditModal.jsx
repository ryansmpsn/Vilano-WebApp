import React from "react";
import { Button, Modal, FormGroup, FormControl, FormLabel, Spinner } from "react-bootstrap";
import { MDBNotification } from "mdbreact";
import InputFormControl from "../InputFormControl";
import NavPerm from "../NavPerms";
import DatePicker from "react-date-picker";

export default class EditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      modalName: props.modalName,
      show: props.show,
      content: props.content,
      Permissions: NavPerm.nav_hash_perm_check(),
      editContent: props.content,
      inputRestrictions: props.inputRestrictions,
      submitting: false,
      extraButtonContent: props.extraButtonContent || null,
      submitAction: (editcontent) => {
        return props.submitAction(editcontent);
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
    var object = this.state.content;
    object.forEach((item) => {
      if (item[3] !== "" && item[3] !== item[1]) {
        hasChanged = true;
      }
    });
    return hasChanged;
  }

  update_content(newContent) {
    var object = this.state.content;
    object.forEach((item) => {
      var new_val = newContent[item[2]];
      item[1] = new_val;
      item[3] = "";
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
    var newContent = null;

    this.setState({ submitting: true });
    hand.state
      .submitAction(this.state.editContent)
      .then((res) => {
        newContent = JSON.parse(res.data);

        if (newContent !== null) {
          hand.update_content(newContent);
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
      if (item[2] === variable) {
        item[3] = value;
        set = true;
      }
    });
    if (set === false) {
      object.push(["DONOTSHOW", value, variable, "", "None"]);
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
            {this.state.editContent.map(
              (item, index) =>
                item[0] !== "DONOTSHOW" && (
                  <FormGroup key={index}>
                    <FormLabel>
                      {item[0] +
                        ": " +
                        (item[4] !== "date" ? item[1] : new Date(item[1]).getUTCMonth() + 1 + "/" + new Date(item[1]).getUTCDate() + "/" + new Date(item[1]).getUTCFullYear())}
                    </FormLabel>
                    {/* Make this formcontrol tie to values for editing-- Done I think?  */}
                    {this.state.Permissions === "Write" &&
                      ((item[4] === "text" && (
                        <FormControl
                          type="text"
                          value={item[3]}
                          onChange={(e) => {
                            var object = this.state.editContent;
                            var specials = /[*|":<>[\]{}`\\()';@&$]/; //TODO setup global module to sanatize stuff.
                            object[index][3] = e.target.value.replace(specials, "");
                            this.setState({ editContent: object });
                          }}
                          placeholder={item[1]}
                        />
                      )) ||
                        (item[4] === "select" && (
                          <InputFormControl
                            index={index}
                            input={item[4]}
                            onChange={(e) => {
                              var object = this.set_variable_id(this.state.editContent, item[2], e.value);
                              var specials = /[*|":<>[\]{}`\\()';@&$]/; //TODO setup global module to sanatize stuff.
                              object[index][3] = e.label.toString().replace(specials, "");
                              this.setState({ editContent: object });
                            }}
                            content={item}
                            inputRestrictions={this.state.inputRestrictions}
                          />
                        )) ||
                        (item[4] === "date" && (
                          <>
                            <br />
                            <span>Edit Date: &nbsp;</span>
                            <DatePicker
                              onChange={(e) => {
                                var object = this.state.editContent;
                                var date = new Date(e);
                                var return_date = date.getUTCFullYear() + "-" + (date.getUTCMonth() + 1) + "-" + date.getUTCDate();
                                object[index][3] = return_date;
                                this.setState({ editContent: object });
                                this.setState({ date: date });
                              }}
                              value={
                                item[3] !== ""
                                  ? new Date(new Date(item[3]).getUTCMonth() + 1 + "/" + new Date(item[3]).getUTCDate() + "/" + new Date(item[3]).getUTCFullYear())
                                  : item[1] !== null
                                  ? new Date(new Date(item[1]).getUTCMonth() + 1 + "/" + new Date(item[1]).getUTCDate() + "/" + new Date(item[1]).getUTCFullYear())
                                  : new Date(new Date().getUTCMonth() + 1 + "/" + new Date().getUTCDate() + "/" + new Date().getUTCFullYear())
                              }
                            />
                          </>
                        )))}
                  </FormGroup>
                )
            )}

            {/*this.state.extraButtonContent !== null && this.state.extraButtonContent.map((e, index){
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
