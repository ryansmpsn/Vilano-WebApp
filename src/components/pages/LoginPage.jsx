import React, { useState } from "react";
import Send from "../../libs/send";
import { useAuth } from "../../auth";
import styled from "styled-components";
import { Navigate, useLocation, NavLink } from "react-router-dom";
import { useFormFields } from "../../libs/hookslib";
import { useToasts } from "react-toast-notifications";
import { FormGroup, FormControl, Spinner, Button } from "react-bootstrap";

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
  const { addToast } = useToasts();
  let location = useLocation();
  const referrer = location.state !== null && location.state.hasOwnProperty("referrer") ? location.state.referrer.pathname : "/";
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    username: "",
    password: "",
  });

  function validateForm() {
    return fields.username.length > 0 && fields.password.length > 0;
  }

  async function postLogin() {
    setIsLoading(true);
    Send.post("/Login", fields, props)
      .then((result) => {
        setIsLoading(false);
        setIsDisabled(true);
        result.our_session.match ? setSession(result.our_session) : handleInvalidCredentials();
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }

  function handleInvalidCredentials() {
    setIsDisabled(false);
    addToast("Invalid Credentials. Please Try Logging In Again.", {
      appearance: "error",
      autoDismiss: true,
    });
  }

  function handleRedirect() {
    return <Navigate to={referrer} />;
  }

  return (
    <LoginPage>
      {props.isAuthenticated && handleRedirect()}
      <div className="box">
        <h1>Sign in</h1>
        <form>
          {/*ControlID must match useFormFields value*/}
          <FormGroup controlId="username">
            <FormControl autoFocus placeholder="Enter Username" type="text" value={fields.username.replace(/[*|":<>[\]{}`\\()';@&$]/, "")} onChange={handleFieldChange} />
          </FormGroup>
          <FormGroup controlId="password">
            <FormControl placeholder="Enter Password" value={fields.password.replace(/[*|":<>[\]{}`\\()';@&$]/, "")} onChange={handleFieldChange} type="password" autoComplete="on" />
          </FormGroup>
          {isLoading ? (
            <Spinner animation="border" variant="primary" />
          ) : (
            <Button className="aqua-gradient" type={"submit"} active={!isLoading} disabled={!validateForm() || isDisabled} onClick={postLogin}>
              Login
            </Button>
          )}
          <br />
          <NavLink to="/requestpasswordreset">
            <u>Forgot Password ?</u>
          </NavLink>
        </form>
      </div>
    </LoginPage>
  );
}
