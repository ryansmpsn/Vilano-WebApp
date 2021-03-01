import React from "react";
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
      {sessionStorage.getItem("/profile") >= 3 && (
        <NavLink to="/profile" className="border border-light rounded mr-1 nav-link">
          <div className="fas fa-user mr-2" />
          Profile
        </NavLink>
      )}
      <NavLink onClick={logOut} to="/" className="border border-light rounded mr-1 nav-link">
        Logout
        <div className="fas fa-sign-out-alt ml-2" />
      </NavLink>
    </>
  ) : (
    <NavLink to="/Login" className="border border-light rounded mr-1 nav-link">
      Login
      <div className="fas fa-sign-in-alt ml-2" />
    </NavLink>
  );
}
export default NavBarAuth;
