import React from "react";
import Calendar from "react-calendar";
import {
  Button,
  Modal,
  FormGroup,
  FormControl,
  FormLabel
} from "react-bootstrap";
import InputFormControl from "./InputFormControl";
import NavPerm from "./NavPerms";

export default class EditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalName: props.modalName,
      show: props.show,
      content: props.content,
      Permissions: NavPerm.nav_hash_perm_check(),
      editContent: props.content,
      inputRestrictions: props.inputRestrictions,
      submitting: false,
      extraButtonContent: props.extraButtonContent || null,
      submitAction: editcontent => {
        return props.submitAction(editcontent);
      },
      props: props.appProps
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.show !== state.show) {
      return {
        show: props.show
      };
    }

    // Return null if the state hasn't changed
    return null;
  }

  has_changed() {
    var hasChanged = false;
    var object = this.state.content;
    object.forEach(item => {
      if (item[3] !== "" && item[3] !== item[1]) {
        hasChanged = true;
      }
    });
    return hasChanged;
  }

  update_content(newContent) {
    var object = this.state.content;
    object.forEach(item => {
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
      .then(res => {
        newContent = JSON.parse(res.data);

        if (newContent !== null) {
          console.log(newContent);
          hand.update_content(newContent);
          hand.setState({ submitting: false });
        } else {
          hand.setState({ submitting: false });
        }
      })
      .catch(err => {
        hand.setState({ submitting: false });
        console.log(err);
      });
  }

  set_variable_id(object, variable_key, value) {
    var variable =
      variable_key.substring(0, variable_key.lastIndexOf("_")) + "_id";
    var set = false;
    object.forEach(item => {
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
        <Modal.Body>
          <form onSubmit={this.handleSubmit.bind(this)}>
            {this.state.editContent.map(
              (item, index) =>
                item[0] !== "DONOTSHOW" && (
                  <FormGroup key={index}>
                    <FormLabel>{item[0] + ": " + item[1]} </FormLabel>
                    {/* Make this formcontrol tie to values for editing-- Done I think?  */}
                    {this.state.Permissions === "Write" &&
                      ((item[4] === "text" && (
                        <FormControl
                          type="text"
                          value={item[3]}
                          onChange={e => {
                            var object = this.state.editContent;
                            var specials = /[*|\":<>[\]{}`\\()';@&$]/; //TODO setup global module to sanatize stuff.
                            object[index][3] = e.target.value.replace(
                              specials,
                              ""
                            );
                            this.setState({ editContent: object });
                          }}
                          placeholder={item[1]}
                        />
                      )) ||
                        (item[4] === "select" && (
                          <InputFormControl
                            index={index}
                            input={item[4]}
                            onChange={e => {
                              var object = this.set_variable_id(
                                this.state.editContent,
                                item[2],
                                e.value
                              );
                              var specials = /[*|\":<>[\]{}`\\()';@&$]/; //TODO setup global module to sanatize stuff.
                              object[index][3] = e.label
                                .toString()
                                .replace(specials, "");
                              this.setState({ editContent: object });
                            }}
                            content={item}
                            inputRestrictions={this.state.inputRestrictions}
                          />
                        )) ||
                        (item[4] === "date" && (
                          <Calendar
                            onChange={e => {
                              var object = this.state.editContent;
                              var date = new Date(e);
                              var return_date =
                                date.getUTCFullYear() +
                                "-" +
                                (date.getUTCMonth() + 1) +
                                "-" +
                                date.getUTCDate();
                              object[index][3] = return_date;
                              this.setState({ editContent: object });
                            }}
                            value={
                              item[1] !== null
                                ? new Date(item[1])
                                : new Date(
                                    new Date().getUTCMonth() +
                                      1 +
                                      "/" +
                                      new Date().getUTCDate() +
                                      "/" +
                                      new Date().getUTCFullYear()
                                  )
                            }
                          />
                        )))}
                  </FormGroup>
                )
            )}
            {this.state.Permissions === "Write" && this.has_changed() && (
              <LoaderButton
                block
                type="submit"
                bsSize="large"
                isLoading={this.state.submitting}
                disabled={this.state.submitting}
              >
                Save
              </LoaderButton>
            )}

            {/*this.state.extraButtonContent !== null && this.state.extraButtonContent.map((e, index){
              <LoaderButton
              block
              onClick={() => {
                this.get_history();
              }}
              bsSize="large"
              //isLoading={this.state.submitting}
              //disabled={this.state.submitting}
            >
              Edit History
            </LoaderButton>
            })*/}
          </form>
        </Modal.Body>
        <Modal.Footer>
          {this.state.Permissions === "Write" && (
            <Button
              className="btn btn-primary mr-auto"
              type="submit"
              bsSize="large"
              //isLoading={this.state.submitting}
              disabled={this.state.submitting}
            >
              Save
            </Button>
          )}
          <Button onClick={this.props.closeModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
