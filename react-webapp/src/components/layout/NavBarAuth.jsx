import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../auth";

function Auth(props) {
  const { setSession } = useAuth();
  function logOut() {
    setSession();
    sessionStorage.clear();
    props.appProps.setIsAuthenticated(false);
  }

  return (
    <>
      {props.appProps.isAuthenticated ? (
        <NavLink onClick={logOut} to="/">
          Logout
        </NavLink>
      ) : (
        <NavLink to="/Login">Login</NavLink>
      )}
    </>
  );
}
export default Auth;
