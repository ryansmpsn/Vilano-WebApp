import React from "react";
import { useAuth } from "../../auth";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";

function NavBarAuth(props) {
  const { setSession } = useAuth();

  function logOut() {
    setSession();
    sessionStorage.clear();
    props.setIsAuthenticated(false);
  }

  return props.isAuthenticated ? (
    <>
      {sessionStorage.getItem("/profile") >= 3 && (
        <NavLink to="/profile" className="mr-2">
          <Button variant="outline-dark">
            <div className="fas fa-user mr-2" />
            Profile
          </Button>
        </NavLink>
      )}
      <NavLink onClick={logOut} to="/">
        <Button variant="outline-dark">
          Logout
          <div className="fas fa-sign-out-alt ml-2" />
        </Button>
      </NavLink>
    </>
  ) : (
    <NavLink to="/Login">
      <Button variant="outline-dark">
        Login
        <div className="fas fa-sign-in-alt ml-2" />
      </Button>
    </NavLink>
  );
}
export default NavBarAuth;
