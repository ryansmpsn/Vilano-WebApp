import React, { useState } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "./../libs/hookslib";
import Send from "../components/send";
import "./Login.css";

export default function Login(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    username: "",
    password: ""
  });

  function validateForm() {
    return fields.username.length > 0 && fields.password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    Send.post("/Login", fields, props)
      .then(res => {
        setIsLoading(false);
        props.handleLogin(res.our_session);
        props.history.push("/");
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
        props.handleLogout();
        props.userHasAuthenticated(false);
      });
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        {/*ControlID must match useFormFields value*/}
        <FormGroup controlId="username" bsSize="large">
          <ControlLabel>Username</ControlLabel>
          <FormControl
            autoFocus
            type="text"
            value={fields.username.replace(/[*|\":<>[\]{}`\\()';@&$]/, "")}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={fields.password.replace(/[*|\":<>[\]{}`\\()';@&$]/, "")}
            onChange={handleFieldChange}
            type="password"
          />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Login
        </LoaderButton>
      </form>
    </div>
  );
}
