import React from "react";
import { MDBIcon } from "mdbreact";
import { NavLink } from "react-router-dom";
import { Dropdown, ListGroupItem, ButtonGroup } from "react-bootstrap";

function SideNavAuth(props) {
  return (
    props.isAuthenticated && (
      <>
        <Dropdown as={ButtonGroup}>
          <NavLink to="/contracts" activeClassName="activeClass">
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
        <Dropdown as={ButtonGroup}>
          <NavLink to="/bids" activeClassName="activeClass">
            <ListGroupItem style={{ borderWidth: "0 0 0" }}>
              <MDBIcon icon="hand-holding-usd" className="mr-3" />
              <span style={{ marginRight: "2em" }}>Bids</span>
            </ListGroupItem>
          </NavLink>
          <Dropdown.Toggle
            id="dropdown-split-bid"
            as={ListGroupItem}
            style={{ borderWidth: "0 0 0", position: "absolute", right: "0px" }}
          />
          <Dropdown.Menu>
            <NavLink className="dropdown-item" to="/bids/trips">
              <MDBIcon icon="road" className="mr-2" />
              Trips
            </NavLink>
            <Dropdown.Divider />

            <NavLink className="dropdown-item" to="/bids/costsegment">
              <MDBIcon icon="file-signature" className="mr-2" />
              Rate Sheets
            </NavLink>
          </Dropdown.Menu>
        </Dropdown>

        <NavLink to="/employees" activeClassName="activeClass">
          <ListGroupItem style={{ borderWidth: "1px 0 1px" }}>
            <MDBIcon icon="users" className="mr-3" />
            Employees
          </ListGroupItem>
        </NavLink>
        <NavLink to="/administration" activeClassName="activeClass">
          <ListGroupItem style={{ borderWidth: "0 0 1px" }}>
            <MDBIcon icon="tools" className="mr-3" />
            Administration
          </ListGroupItem>
        </NavLink>
      </>
    )
  );
}
export default SideNavAuth;
