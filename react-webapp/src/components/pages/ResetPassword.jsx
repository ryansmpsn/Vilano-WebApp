import React, { useState } from "react";
import Send from "../../libs/send";
import styled from "styled-components";
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
  .box h3 {
    color: white;
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

export default function ResetPassword(props) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const IDSession = urlParams.get("id");
  const SessionID = urlParams.get("reset");
  const { addToast } = useToasts();
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    password: "",
    password2: "",
    IDSession: IDSession,
    SessionID: SessionID,
    Application: "Reset",
  });

  function validateForm() {
    return (
      fields.password.length > 0 &&
      fields.password2.length > 0 &&
      fields.password === fields.password2
    );
  }

  async function postReset() {
    setIsLoading(true);
    Send.post("/ResetPassword", fields, props)
      .then((result) => {
        setIsLoading(false);
        switch (result) {
          case "SUCCESS":
            addToast("Password has been changed, please login.", {
              appearance: "success",
              autoDismiss: true,
            });
            break;
          case "FAILURE":
            addToast(
              "Secure Password Reset Session invalid, please make a new request",
              {
                appearance: "error",
                autoDismiss: true,
              }
            );
            break;
          case "LOCKED":
            addToast("Account is locked", {
              appearance: "error",
              autoDismiss: true,
            });
            break;
          case "OUTDATED":
            addToast(
              "Secure Password Reset Session Outdated, please make a new request.",
              {
                appearance: "error",
                autoDismiss: true,
              }
            );
            break;
          default:
            addToast("Error", {
              appearance: "error",
              autoDismiss: true,
            });
            break;
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }

  return (
    <LoginPage>
      <div className="box">
        <h3>Enter new password</h3>
        <form>
          {/*ControlID must match useFormFields value*/}
          <FormGroup controlId="password">
            <FormControl
              placeholder="Enter New Password"
              value={fields.password.replace(/[*|":<>[\]{}`\\()';@&$]/, "")}
              onChange={handleFieldChange}
              type="password"
              autoComplete="on"
            />
          </FormGroup>
          <FormGroup controlId="password2">
            <FormControl
              placeholder="Confirm New Password"
              value={fields.password2.replace(/[*|":<>[\]{}`\\()';@&$]/, "")}
              onChange={handleFieldChange}
              type="password"
              autoComplete="on"
            />
          </FormGroup>
          {isLoading ? (
            <Spinner animation="border" variant="primary" />
          ) : (
            <Button
              className="aqua-gradient"
              active={!isLoading}
              disabled={!validateForm()}
              onClick={postReset}
              gradient="aqua"
              type={"submit"}
            >
              Confirm
            </Button>
          )}
        </form>
      </div>
    </LoginPage>
  );
}
