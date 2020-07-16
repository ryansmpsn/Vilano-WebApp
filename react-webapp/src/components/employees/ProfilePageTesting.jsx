import React, { Component } from "react";
import Testing from "./Testing";
import Send from "../../libs/send";

export default class ProfilePageTesting extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      props: props.appProps,
      employeeInfo: null,
    };
  }

  profileSubmit = (profile) => {
    return Send.post("/Employee/Profile", profile, this.props);
  };

  componentDidMount() {
    this._isMounted = true;
    if (this._isMounted) {
      console.log(sessionStorage);
    }

    return Send.get("/Employee/Profile/" + sessionStorage.getItem("IDSession"), this.props).then((res) => {
      let flatEmployeeInfo = res.data[0];
      if (this._isMounted) {
        console.log(res.data[0]);
        flatEmployeeInfo[1].value = res.data[0][1].value[0];
        flatEmployeeInfo[2].value = res.data[0][2].value[0];
        flatEmployeeInfo[3].value = res.data[0][3].value[0];

        this.setState({ employeeInfo: flatEmployeeInfo });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      this.state.employeeInfo !== null && (
        <Testing
          modalName="Testing" //{props.modalName}
          contract={this.state.employeeInfo}
          inputRestrictions={"testing, so this is blank"}
          appProps={this.state.props}
          submitAction={(profile) => {
            return this.profileSubmit(profile);
          }}
        />
      )
    );
  }
}
