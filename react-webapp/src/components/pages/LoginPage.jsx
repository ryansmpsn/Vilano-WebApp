import React, { useState } from "react";
import {
  FormGroup,
  FormControl,
  FormLabel,
  Col,
  Spinner
} from "react-bootstrap";
import { useFormFields } from "../../libs/hookslib";
import Send from "../send";
import { MDBBtn, MDBCard } from "mdbreact";
import { useToasts } from "react-toast-notifications";

export default function Login(props) {
  const { addToast } = useToasts();
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
        props.handleLogin(res.our_session);
        props.history.push("/");
      })
      .catch(err => {
        addToast("Invalid Credentials! Please Try Again.", {
          appearance: "error",
          autoDismiss: true
        });
        setIsLoading(false);
        props.handleLogout();
        props.userHasAuthenticated(false);
      });
  }

  return (
    <Col className="mt-5" md={{ span: 4, offset: 4 }} size="5">
      <MDBCard className="p-5">
        <p className="h5 text-center mb-4">Sign in</p>
        <form onSubmit={handleSubmit}>
          {/*ControlID must match useFormFields value*/}
          <FormGroup controlId="username">
            <FormLabel>Username</FormLabel>
            <FormControl
              autoFocus
              placeholder="Enter Username"
              type="text"
              value={fields.username.replace(/[*|":<>[\]{}`\\()';@&$]/, "")}
              onChange={handleFieldChange}
            />
          </FormGroup>
          <FormGroup controlId="password">
            <FormLabel>Password</FormLabel>
            <FormControl
              placeholder="Enter Password"
              value={fields.password.replace(/[*|":<>[\]{}`\\()';@&$]/, "")}
              onChange={handleFieldChange}
              type="password"
            />
          </FormGroup>
          {isLoading ? (
            <Spinner animation="border" variant="primary" />
          ) : (
            <MDBBtn
              type="submit"
              active={!isLoading}
              disabled={!validateForm()}
              gradient="blue"
            >
              Login
            </MDBBtn>
          )}
        </form>
      </MDBCard>
    </Col>
  );
}