import React, { useState } from "react";
import { FormGroup, FormControl, Spinner } from "react-bootstrap";
import { useFormFields } from "../../libs/hookslib";
import Send from "../../libs/send";
import { MDBBtn } from "mdbreact";
import { useToasts } from "react-toast-notifications";
import styled from "styled-components";

const LoginPage = styled.div`
  .box {
    border-radius: 24px;
    background: #34495e;
    width: 390px;
    padding: 40px;
    position: absolute;
    top: 50%;
    left: 55%;
    transform: translate(-50%, -50%);
    text-align: center;
  }
  .box h1 {
    color: white;
    text-transform: uppercase;
    font-weight: 500;
  }
  .box input[type="text"],
  .box input[type="password"] {
    border: 0;
    background: none;
    display: block;
    margin: 20px auto;
    text-align: center;
    border: 2px solid #3498db;
    padding: 14px 10px;
    width: 200px;
    outline: none;
    color: white;
    border-radius: 24px;
    transition: 0.25s;
    cursor: pointer;
  }
  .box input[type="text"]:focus,
  .box input[type="password"]:focus {
    width: 280px;
    border-color: #2ecc71;
  }
`;

export default function Login(props) {
  const { addToast } = useToasts();
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    username: "",
    password: "",
  });

  function validateForm() {
    return fields.username.length > 0 && fields.password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    Send.post("/Login", fields, props)
      .then((res) => {
        props.handleLogin(res.our_session);
        props.history.push("/");
      })
      .catch((err) => {
        addToast("Invalid Credentials! Please Try Again.", {
          appearance: "error",
          autoDismiss: true,
        });
        setIsLoading(false);
        props.handleLogout();
        props.userHasAuthenticated(false);
      });
  }

  return (
    <LoginPage>
      <div className="box">
        <h1>Sign in</h1>
        <form onSubmit={handleSubmit}>
          {/*ControlID must match useFormFields value*/}
          <FormGroup controlId="username">
            <FormControl
              autoFocus
              placeholder="Enter Username"
              type="text"
              value={fields.username.replace(/[*|":<>[\]{}`\\()';@&$]/, "")}
              onChange={handleFieldChange}
            />
          </FormGroup>
          <FormGroup controlId="password">
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
              gradient="aqua"
            >
              Login
            </MDBBtn>
          )}
        </form>
      </div>
    </LoginPage>
  );
}
