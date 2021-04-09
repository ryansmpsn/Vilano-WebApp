import React from "react";
import { NavLink } from "react-router-dom";
import { ListGroupItem } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileContract, faHandHoldingUsd, faUsers } from "@fortawesome/free-solid-svg-icons";

function SideNavAuth(props) {
  function handleMenuToggle() {
    if (window.innerWidth <= 1200) props.setToggle(false);
  }
  return (
    <>
      {sessionStorage.getItem("/contract") >= 2 && (
        <NavLink to="/contracts" activeClassName="activeClass" onClick={() => handleMenuToggle()}>
          <ListGroupItem style={{ borderWidth: "0 0 1px" }}>
            <FontAwesomeIcon icon={faFileContract} className="mr-3" />
            <span>Contracts</span>
          </ListGroupItem>
        </NavLink>
      )}

      {sessionStorage.getItem("/bid") >= 2 && (
        <NavLink to="/bids" activeClassName="activeClass" onClick={() => handleMenuToggle()}>
          <ListGroupItem style={{ borderWidth: "0 0 1px" }}>
            <FontAwesomeIcon icon={faHandHoldingUsd} className="mr-3" />
            <span style={{ marginRight: "2em" }}>Bids</span>
          </ListGroupItem>
        </NavLink>
      )}

      {sessionStorage.getItem("/employees") >= 2 && (
        <NavLink to="/employee" activeClassName="activeClass" onClick={() => handleMenuToggle()}>
          <ListGroupItem style={{ borderWidth: "0 0 1px" }}>
            <FontAwesomeIcon icon={faUsers} className="mr-3" />
            Employees
          </ListGroupItem>
        </NavLink>
      )}

      {sessionStorage.getItem("/admin") >= 2 && (
        <NavLink to="/administration" activeClassName="activeClass">
          <ListGroupItem style={{ borderWidth: "0 0 1px" }} onClick={() => handleMenuToggle()}>
            <div className="fas fa-shield-alt mr-3" />
            Administration
          </ListGroupItem>
        </NavLink>
      )}

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
