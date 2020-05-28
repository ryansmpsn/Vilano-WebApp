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
      inputRestrictions: null,
    };
  }

  set_Input_restrictions = (cn) => {
    this.state.inputRes.forEach((input_res) => {
      if (input_res.columnName === cn) {
        this.setState({ inputRestrictions: input_res });
      }
    });
  };

  render() {
    return (
      <div key={"FormControlSelect" + this.state.index + "div"}>
        {console.log(this.state.content)}
        {this.state.inputRestrictions === null && (
          <Button
            onClick={() => {
              this.set_Input_restrictions(this.state.content.columnName);
            }}
          >
            {this.state.content.value || "null"}
          </Button>
        )}
        {this.state.inputRestrictions !== null && (
          <Select key={"FormControlSelect" + this.state.index} options={this.state.inputRestrictions.options} onChange={this.state.onChange} />
        )}
      </div>
    );
  }
}
