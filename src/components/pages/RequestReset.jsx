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

export default function RequestReset(props) {
  const { addToast } = useToasts();
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email: "",
  });

  function validateForm() {
    return fields.email.length > 0;
  }

  async function postResetRequest() {
    setIsLoading(true);
    Send.post("/RequestResetPassword", fields, props)
      .then((result) => {
        setIsLoading(false);
        switch (result) {
          case "SUCCESS":
            addToast("Password Reset Request sent. Please check your email.", {
              appearance: "success",
              autoDismiss: true,
            });
            break;
          case "FAILURE":
            addToast("Invalid email or email not found in system. Please try again.", {
              appearance: "error",
              autoDismiss: true,
            });
            break;
          case "LOCKED":
            addToast("Account is locked", {
              appearance: "error",
              autoDismiss: true,
            });
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
        <h3>Enter Your Email</h3>
        <form>
          {/*ControlID must match useFormFields value*/}
          <FormGroup controlId="email">
            <FormControl
              autoFocus
              placeholder="example@postalfleetsvs.com"
              type="text"
              value={fields.email.replace(/[*|":<>[\]{}`\\()';&$]/, "")} //no @ removal
              onChange={handleFieldChange}
            />
          </FormGroup>
          {isLoading ? (
            <Spinner animation="border" variant="primary" />
          ) : (
            <Button className="aqua-gradient" active={!isLoading} disabled={!validateForm()} onClick={postResetRequest} gradient="aqua" type={"submit"}>
              Reset
            </Button>
          )}
        </form>
      </div>
    </LoginPage>
  );
}
