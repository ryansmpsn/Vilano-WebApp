import React, { useState, useEffect } from "react";
import { FormGroup, FormControl, FormLabel, Button } from "react-bootstrap";
import { useFormFields } from "./../libs/hookslib";
import Send from "../components/send";
//import "./Login.css";
//import { Link } from "react-router";

export default function Login(props) {
  //const [username, setUsername] = useState("");
  //const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    username: "",
    password: ""
  });

  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [contractAccess, setContractAccess] = useState("None");

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    Send.get("/Loggedin", { handleLogout, handleLogin })
      .then(res => {
        //handleLogin(res.headers);
      })
      .catch(err => {
        console.log(err);
        console.log("Logging Out");
      });

    setIsAuthenticating(false);
  }

  function handleLogin(sess) {
    if (sess.match === "true") {
      sessionStorage.setItem("SessionID", sess.SessionID);
      sessionStorage.setItem("IDSession", sess.IDSession);
      sess.PagePermissions.map(a => {
        sessionStorage.setItem(a[0], a[1]);
      });
      userHasAuthenticated(true);
      setContractAccess(sessionStorage.getItem("Contracts"));
    }
  }

  function handleLogout() {
    userHasAuthenticated(false);
    setContractAccess("None");
    sessionStorage.clear();
    props.history.push("/login");
  }

  function validateForm() {
    return fields.username.length > 0 && fields.password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    Send.post("/Login", fields, props)
      .then(res => {
        setIsLoading(false);
        handleLogin(res.our_session);
        this.history.push("/");
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
        handleLogout();
        userHasAuthenticated(false);
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <FormLabel>This is a Form Label</FormLabel>
          <Button>Click mE</Button>
        </FormGroup>
      </form>

      <form onSubmit={handleSubmit}>
        {/*ControlID must match useFormFields value!!!*/}
        <FormGroup controlId="username" bsSize="large">
          <FormLabel>Username</FormLabel>
          <FormControl
            autoFocus
            type="text"
            value={fields.username.replace(/[*|\":<>[\]{}`\\()';@&$]/, "")}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <FormLabel>Password</FormLabel>
          <FormControl
            value={fields.password.replace(/[*|\":<>[\]{}`\\()';@&$]/, "")}
            onChange={handleFieldChange}
            type="password"
          />
        </FormGroup>
        <Button
          block
          type="submit"
          bsSize="large"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Login
        </Button>
      </form>
    </div>
  );
}
