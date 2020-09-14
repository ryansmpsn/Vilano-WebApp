import React from "react";
import Select, { createFilter } from "react-select";
import { Button } from "react-bootstrap";
import MenuList from "./OptimizedSelect";

export default class InputFormControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: props.index,
      onChange: props.onChange,
      content: props.content,
      inputRes: props.inputRestrictions,
      inputRestrictions: null,
    };
  }

  set_Input_restrictions = (cn) => {
    if (cn === "destination_facility_name") {
      this.setState({ inputRestrictions: this.state.inputRes[0] });
    } else if (cn === "origin_facility_name") {
      this.setState({ inputRestrictions: this.state.inputRes[0] });
    } else if (cn === "admin_facility_name") {
      this.setState({ inputRestrictions: this.state.inputRes[0] });
    }

    this.state.inputRes.forEach((input_res) => {
      if (input_res.column_name === cn) {
        this.setState({ inputRestrictions: input_res });
      }
    });
  };

  render() {
    return (
      <div key={"FormControlSelect" + this.state.index + "div"}>
        {this.state.inputRestrictions === null && (
          <Button
            onClick={() => {
              this.set_Input_restrictions(this.state.content.columnName);
            }}
          >
            {this.state.content.value || "null"}
          </Button>
        )}
        {this.state.inputRestrictions !== null &&
          (this.state.content.columnName.includes("facility") ? (
            <Select
              components={{ MenuList }}
              options={this.state.inputRestrictions.options}
              filterOption={createFilter({ ignoreAccents: false })}
              onChange={this.state.onChange}
            />
          ) : (
            <Select options={this.state.inputRestrictions.options} onChange={this.state.onChange} />
          ))}
      </div>
    );
  }
}
