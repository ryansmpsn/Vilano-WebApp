import React from "react";
import Calendar from "react-calendar";
import {
  Button,
  Modal,
  FormGroup,
  FormControl,
  ControlLabel,
  ListGroup,
  ListGroupItem
} from "react-bootstrap";
import InputFormControl from "./InputFormControl";
import Send from "./send";

export default class SimpleListModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalName: props.modalName,
      show: props.show,
      content: props.content,
      Permissions: props.accessLevel,
      extraButtonContent: props.extraButtonContent || null,
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

  render() {
    return (
      <Modal show={this.state.show} onHide={this.props.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{this.state.modalName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {/* {this.state.content.map((item, index){
            <ListGroupItem key={index + "listGroupItem451"}>
            {item[0]} 
            {this.state.accessLevel === "Write" && <Button onClick={() =>{
              
            }}>
              Edit
            </Button>}
            </ListGroupItem>
          })}*/}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.closeModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
