import React, { Component } from "react";
import Testing from "./Testing";
import Send from "../../libs/send";

export default class ProfilePageTesting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      props: props.appProps,
    };
  }

  profileSubmit = (profile) => {
    return Send.post("/Employee/Profile", profile, this.props);
  };

  render() {
    return (
      <Testing
        modalName="Testing" //{props.modalName}
        contract={[
          {
            columnName: "Employee",
            inputType: null,
            label: "Employee",
            updatedValue: null,
            value: [
              {
                columnName: "first_name",
                inputType: "text",
                label: "First Name",
                updatedValue: null,
                value: "Bob",
              },
              {
                columnName: "last_name",
                inputType: "text",
                label: "Last Name",
                updatedValue: null,
                value: "Bobington",
              },
              {
                columnName: "middle_name",
                inputType: "text",
                label: "Middle Name",
                updatedValue: null,
                value: "BobsMiddleName",
              },
            ],
          },
          {
            columnName: "employee_phone",
            inputType: null,
            label: "Employee Phones",
            updatedValue: null,
            value: [
              {
                columnName: "cell_phone",
                inputType: "text",
                label: "Cell Phone",
                updatedValue: null,
                value: "1231231234",
              },
              {
                columnName: "home_phone",
                inputType: "text",
                label: "Home Phone",
                updatedValue: null,
                value: "2342342345",
              },
              {
                columnName: "work_phone",
                inputType: "text",
                label: "Work Phone",
                updatedValue: null,
                value: "3453453456",
              },
            ],
          },
        ]}
        inputRestrictions={"testing, so this is blank"}
        appProps={this.state.props}
        submitAction={(profile) => {
          return this.profileSubmit(profile);
        }}
      />
    );
  }
}
