import React from "react";
import { NavLink } from "react-router-dom";

function Auth(props) {
  function handleLogout() {
    props.appProps.userHasAuthenticated(false);
    props.appProps.setContractAccess("None");
    sessionStorage.clear();
    //props.history.push("/login");
  }
  return (
    <>
      {props.appProps.isAuthenticating &&
        (props.appProps.isAuthenticated ? (
          <NavLink onClick={handleLogout} to="/">
            Logout
          </NavLink>
        ) : (
          <NavLink to="/Login">Login</NavLink>
        ))}
    </>
  );
}
export default Auth;
