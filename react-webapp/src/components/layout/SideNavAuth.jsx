import React from "react";
import { MDBIcon } from "mdbreact";
import { NavLink } from "react-router-dom";
import { Dropdown, ListGroupItem, ButtonGroup } from "react-bootstrap";

function SideNavAuth(props) {
  function handleMenuToggle() {
    if (window.innerWidth <= 1200) props.setToggle(false);
  }
  return (
    <>
      {sessionStorage.getItem("/contract") >= 2 && (
        <Dropdown as={ButtonGroup}>
          <NavLink to="/contracts" activeClassName="activeClass" onClick={() => handleMenuToggle()}>
            <ListGroupItem style={{ borderWidth: "0 0 1px" }}>
              <MDBIcon icon="file-contract" className="mr-3" />
              <span>Contracts</span>
            </ListGroupItem>
          </NavLink>
          <Dropdown.Toggle
            split
            id="dropdown-split-basic"
            as={ListGroupItem}
            style={{ borderWidth: "0 0 1px", position: "absolute", right: "0px" }}
          />

          <Dropdown.Menu>
            {sessionStorage.getItem("/contract/trips") >= 2 && (
              <>
                <NavLink className="dropdown-item" to="/contracts/trips" onClick={() => handleMenuToggle()}>
                  <MDBIcon icon="road" className="mr-2" />
                  Trips
                </NavLink>
                <Dropdown.Divider />
              </>
            )}
            {sessionStorage.getItem("/contract/ratesheets") >= 2 && (
              <>
                <NavLink className="dropdown-item" to="/contracts/costsegment" onClick={() => handleMenuToggle()}>
                  <MDBIcon icon="file-signature" className="mr-2" />
                  Rate Sheets
                </NavLink>
                <Dropdown.Divider />
              </>
            )}
            {sessionStorage.getItem("/contract/analytics") >= 2 && (
              <NavLink to="/contracts/analytics" className="dropdown-item" onClick={() => handleMenuToggle()}>
                <MDBIcon icon="file-invoice-dollar" className="mr-3" />
                Contract Analytics
              </NavLink>
            )}
          </Dropdown.Menu>
        </Dropdown>
      )}
      {sessionStorage.getItem("/bid") >= 2 && (
        <Dropdown as={ButtonGroup}>
          <NavLink to="/bids" activeClassName="activeClass" onClick={() => handleMenuToggle()}>
            <ListGroupItem style={{ borderWidth: "0 0 1px" }}>
              <MDBIcon icon="hand-holding-usd" className="mr-3" />
              <span style={{ marginRight: "2em" }}>Bids</span>
            </ListGroupItem>
          </NavLink>
          <Dropdown.Toggle
            id="dropdown-split-bid"
            as={ListGroupItem}
            style={{ borderWidth: "0 0 1px", position: "absolute", right: "0px" }}
          />
          <Dropdown.Menu>
            {sessionStorage.getItem("/bid/trips") >= 2 && (
              <>
                <NavLink className="dropdown-item" to="/bids/trips" onClick={() => handleMenuToggle()}>
                  <MDBIcon icon="road" className="mr-2" />
                  Trips
                </NavLink>
                <Dropdown.Divider />
              </>
            )}
            {sessionStorage.getItem("/bid/ratesheets") >= 2 && (
              <NavLink className="dropdown-item" to="/bids/costsegment" onClick={() => handleMenuToggle()}>
                <MDBIcon icon="file-signature" className="mr-2" />
                Rate Sheets
              </NavLink>
            )}
          </Dropdown.Menu>
        </Dropdown>
      )}
      {sessionStorage.getItem("/employees") >= 2 && (
        <NavLink to="/payroll" activeClassName="activeClass" onClick={() => handleMenuToggle()}>
          <ListGroupItem style={{ borderWidth: "0 0 1px" }}>
            <MDBIcon icon="money-bill-alt" className="mr-3" />
            Payroll
          </ListGroupItem>
        </NavLink>
      )}
      {/* {sessionStorage.getItem("/employees") >= 2 && (
        <NavLink to="/employee" activeClassName="activeClass" onClick={() => handleMenuToggle()}>
          <ListGroupItem style={{ borderWidth: "0 0 1px" }}>
            <MDBIcon icon="users" className="mr-3" />
            Employees
          </ListGroupItem>
        </NavLink>
      )} */}
      {sessionStorage.getItem("/admin") >= 2 && (
        <NavLink to="/administration" activeClassName="activeClass" onClick={() => handleMenuToggle()}>
          <ListGroupItem style={{ borderWidth: "0 0 1px" }}>
            <MDBIcon icon="tools" className="mr-3" />
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
      {sessionStorage.getItem("/testpage") >= 2 && (
        <NavLink to="/testpage" activeClassName="activeClass">
          <ListGroupItem style={{ borderWidth: "0 0 1px" }} onClick={() => handleMenuToggle()}>
            <div className="fas fa-vial mr-3" />
            UI Sandbox
          </ListGroupItem>
        </NavLink>
      )}
      {sessionStorage.getItem("/testpage") >= 2 && (
        <NavLink to="/404" activeClassName="activeClass">
          <ListGroupItem style={{ borderWidth: "0 0 1px" }} onClick={() => handleMenuToggle()}>
            <MDBIcon icon="exclamation" className="mr-3" />
            404
          </ListGroupItem>
        </NavLink>
      )}
    </>
  );
}
export default SideNavAuth;
