import React from "react";
import Select from "react-select";
import { Button } from "react-bootstrap";

export default class InputFormControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: props.index,
      input: props.input,
      //value: props.value,
      onChange: props.onChange,
      content: props.content,
      inputRes: props.inputRestrictions,
      inputRestrictions: null
    };
  }

  set_Input_restrictions = cn => {
    this.state.inputRes.forEach(input_res => {
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
              this.set_Input_restrictions(this.state.content[2]);
            }}
          >
            {this.state.content[1] || "null"}
          </Button>
        )}
        {this.state.inputRestrictions !== null && (
          <Select
            key={"FormControlSelect" + this.state.index}
            options={this.state.inputRestrictions.options}
            onChange={this.state.onChange}
          />
        )}
      </div>
    );
  }
}
