import React, { Component } from "react";
import { DefaultToast } from "react-toast-notifications";

class Notification extends Component {
  state = {
    show: true,
    date: new Date()
  };

  render() {
    return (
      <DefaultToast {...this.props}>
        <strong className="text-capitalize">{this.props.appearance}</strong>
        <small className="float-right">
          {this.state.date.toLocaleTimeString()}
        </small>
        <hr className="mt-1 mb-2" />
        {this.props.children}
      </DefaultToast>
    );
  }
}

export default Notification;
