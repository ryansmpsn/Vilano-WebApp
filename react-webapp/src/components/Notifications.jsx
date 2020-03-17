import React, { Component } from "react";
import { Toast } from "react-bootstrap";
import Clock from "./layout/Clock";

class Notification extends Component {
  state = {
    show: true
  };

  render() {
    return (
      <Toast
        show={this.state.show}
        onClose={() => this.setState({ show: false })}
        style={{
          width: 800,
          position: "fixed",
          bottom: 40,
          right: 20,
          zIndex: 999
        }}
      >
        <Toast.Header>
          <img
            src="https://picsum.photos/20/20"
            className="rounded mr-2"
            alt=""
          />
          <strong className="mr-auto">{this.props.header}</strong>
          <small>
            <Clock />
          </small>
        </Toast.Header>
        <Toast.Body>{this.props.body}</Toast.Body>
      </Toast>
    );
  }
}

export default Notification;
