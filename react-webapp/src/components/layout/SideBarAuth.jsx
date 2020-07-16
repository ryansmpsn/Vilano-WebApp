import React from "react";
import { MDBIcon } from "mdbreact";
import { NavLink } from "react-router-dom";
import { Dropdown, ListGroupItem, ButtonGroup } from "react-bootstrap";

function SideBarAuth(props) {
  return (
    props.appProps.isAuthenticated &&
    props.appProps.contractAccess !== "None" && (
      <>
        <Dropdown as={ButtonGroup}>
          <NavLink to="/contracts" activeClassName="activeClass">
            <ListGroupItem style={{ borderWidth: "0 0 1px" }}>
              <MDBIcon icon="file-contract" className="mr-3" />
              Contracts
            </ListGroupItem>
          </NavLink>
          <Dropdown.Toggle split id="dropdown-split-basic" as={ListGroupItem} style={{ borderWidth: "0 0 1px" }} />
          <Dropdown.Menu>
            <NavLink className="dropdown-item" to="/contracts/trips">
              <MDBIcon icon="road" className="mr-2" />
              Trips
            </NavLink>
            <Dropdown.Divider />

            <NavLink className="dropdown-item" to="/contracts/costsegment">
              <MDBIcon icon="file-signature" className="mr-2" />
              Rate Sheets
            </NavLink>
            <Dropdown.Divider />

            <NavLink to="/contracts/analytics" className="dropdown-item">
              <MDBIcon icon="file-invoice-dollar" className="mr-3" />
              Contract Analytics
            </NavLink>
          </Dropdown.Menu>
        </Dropdown>
        <NavLink to="/bids" activeClassName="activeClass">
          <ListGroupItem style={{ borderWidth: "0 0 1px" }}>
            <MDBIcon icon="hand-holding-usd" className="mr-3" />
            Bids
          </ListGroupItem>
        </NavLink>
        <NavLink to="/employees" activeClassName="activeClass">
          <ListGroupItem style={{ borderWidth: "0 0 1px" }}>
            <MDBIcon icon="users" className="mr-3" />
            Employees
          </ListGroupItem>
        </NavLink>
      </>
    )
  );
}
export default SideBarAuth;
