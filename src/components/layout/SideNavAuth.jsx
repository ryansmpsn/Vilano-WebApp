import React from "react";
import { MDBIcon } from "mdbreact";
import { NavLink } from "react-router-dom";
import { ListGroupItem } from "react-bootstrap";

function SideNavAuth(props) {
  function handleMenuToggle() {
    if (window.innerWidth <= 1200) props.setToggle(false);
  }
  return (
    <>
      {sessionStorage.getItem("/contract") >= 2 && (
        <NavLink to="/contracts" activeClassName="activeClass" onClick={() => handleMenuToggle()}>
          <ListGroupItem style={{ borderWidth: "0 0 1px" }}>
            <MDBIcon icon="file-contract" className="mr-3" />
            <span>Contracts</span>
          </ListGroupItem>
        </NavLink>
      )}

      {sessionStorage.getItem("/bid") >= 2 && (
        <NavLink to="/bids" activeClassName="activeClass" onClick={() => handleMenuToggle()}>
          <ListGroupItem style={{ borderWidth: "0 0 1px" }}>
            <MDBIcon icon="hand-holding-usd" className="mr-3" />
            <span style={{ marginRight: "2em" }}>Bids</span>
          </ListGroupItem>
        </NavLink>
      )}

      {sessionStorage.getItem("/employees") >= 2 && (
        <NavLink to="/employee" activeClassName="activeClass" onClick={() => handleMenuToggle()}>
          <ListGroupItem style={{ borderWidth: "0 0 1px" }}>
            <MDBIcon icon="users" className="mr-3" />
            Employees
          </ListGroupItem>
        </NavLink>
      )}

      {/* 
      admin section delayed

      {sessionStorage.getItem("/admin") >= 2 && (
      )} */}

      {sessionStorage.getItem("/axios") >= 2 && (
        <NavLink to="/axios" activeClassName="activeClass">
          <ListGroupItem style={{ borderWidth: "0 0 1px" }} onClick={() => handleMenuToggle()}>
            <div className="fas fa-vials mr-3" />
            Test Endpoint
          </ListGroupItem>
        </NavLink>
      )}
    </>
  );
}
export default SideNavAuth;
