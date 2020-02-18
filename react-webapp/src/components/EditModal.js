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
import Send from "./send";

export default class EditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalName: props.modalName,
      show: props.show,
      content: props.content,
      Permissions: props.accessLevel,
      editContent: props.content,
      inputRestrictions: props.inputRestrictions,
      submitting: false
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

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ submitting: true });
    Send.post("/UpdateContract", this.state.editContent, this.props)
      .then(res => {
        //bla bla update our contract to reflect DB.
        //TODO UPDATE CONTRACT TO REFLECT DB.
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    //.then()
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
