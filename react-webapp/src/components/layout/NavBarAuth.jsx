import React from "react";
import { MDBIcon } from "mdbreact";
import { useAuth } from "../../auth";
import { NavLink } from "react-router-dom";

function NavBarAuth(props) {
  const { setSession } = useAuth();

  function logOut() {
    setSession();
    sessionStorage.clear();
    props.setIsAuthenticated(false);
  }

  return props.isAuthenticated ? (
    <>
      <NavLink to="/profile" className="border border-light rounded mr-1 nav-link Ripple-parent">
        <MDBIcon icon="user" className="mr-2" />
        Profile
      </NavLink>
      <NavLink onClick={logOut} to="/" className="border border-light rounded mr-1 nav-link Ripple-parent">
        Logout
        <MDBIcon icon="sign-out-alt" className="ml-2" />
      </NavLink>
    </>
  ) : (
    <NavLink to="/Login" className="border border-light rounded mr-1 nav-link Ripple-parent">
      Login
      <MDBIcon icon="sign-in-alt" className="ml-2" />
    </NavLink>
  );
}
export default NavBarAuth;
