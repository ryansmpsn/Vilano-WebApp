import React, { useState } from "react";
import { FormGroup, FormControl, Spinner } from "react-bootstrap";
import { useFormFields } from "../../libs/hookslib";
import Send from "../../libs/send";
import { MDBBtn } from "mdbreact";
import styled from "styled-components";
import { useAuth } from "../../auth";
import { Redirect } from "react-router-dom";

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
  const { setSession } = useAuth();
  const referrer = props.location.hasOwnProperty("state").hasOwnProperty("referrer") ? props.location.state.referrer : "/";
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(true);
  const [fields, handleFieldChange] = useFormFields({
    username: "",
    password: "",
  });

  function validateForm() {
    return fields.username.length > 0 && fields.password.length > 0;
  }

  function postLogin() {
    setIsLoading(true);
    console.log(isLoading);

    Send.post("/Login", fields, props)
      .then((result) => {
        setIsLoading(false);
        setLoggedIn(true);
        setSession(result.our_session);
        handleRedirect();
        console.log(isLoading, isLoggedIn);
      })
      .catch((err) => {
        // add invalid credentials toast notification
        setIsLoading(false);
        console.log(err);
      });
  }

  function handleRedirect() {
    console.log(referrer);

    // Handle toast notifications
    return <Redirect to={referrer} />;
  }

  return (
    <LoginPage>
      <div className="box">
        {console.log(props.location)}
        <h1>Sign in</h1>
        <form>
          {/*ControlID must match useFormFields value*/}
          <FormGroup controlId="username">
            <FormControl autoFocus placeholder="Enter Username" type="text" value={fields.username.replace(/[*|":<>[\]{}`\\()';@&$]/, "")} onChange={handleFieldChange} />
          </FormGroup>
          <FormGroup controlId="password">
            <FormControl
              placeholder="Enter Password"
              value={fields.password.replace(/[*|":<>[\]{}`\\()';@&$]/, "")}
              onChange={handleFieldChange}
              type="password"
              autoComplete="on"
            />
          </FormGroup>
          {isLoading ? (
            <Spinner animation="border" variant="primary" />
          ) : (
            <MDBBtn active={!isLoading} disabled={!validateForm()} onClick={postLogin} gradient="aqua">
              Login
            </MDBBtn>
          )}
        </form>
      </div>
    </LoginPage>
  );
}
