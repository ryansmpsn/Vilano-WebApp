import React from "react";
import { Dropdown, ListGroupItem, ButtonGroup } from "react-bootstrap";
import { MDBIcon } from "mdbreact";
import { NavLink } from "react-router-dom";

function SideBarAuth(props) {
  return (
    <>
      {props.appProps.isAuthenticated && props.appProps.contractAccess !== "None" && (
        <>
          {/* <NavLink to="/contracts" activeClassName="activeClass">
            <div />
            <ListGroupItem>
              <MDBIcon icon="file-invoice-dollar" className="mr-3" />
              Contracts
            </ListGroupItem>
          </NavLink> */}

          <Dropdown as={ButtonGroup}>
            <NavLink to="/contracts" activeClassName="activeClass">
              <div />
              <ListGroupItem style={{ borderWidth: "0 0 1px" }}>
                <MDBIcon icon="file-invoice-dollar" className="mr-3" />
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
            </Dropdown.Menu>
          </Dropdown>

          {/* <NavLink to="/bids" activeClassName="activeClass">
                <div />
                 <MDBListGroupItem>
                  <MDBIcon icon="file-signature" className="mr-3" />
                  Contract Analytics
                </MDBListGroupItem> 
              </NavLink>*/}
        </>
      )}
      {/* <NavLink to="/performance" activeClassName="activeClass">
            <div />
            <MDBListGroupItem>
              <MDBIcon icon="chart-line" className="mr-3" />
              Performance
            </MDBListGroupItem>
          </NavLink>
          <NavLink to="/financials" activeClassName="activeClass">
            <div />
            <MDBListGroupItem>
              <MDBIcon icon="money-bill" className="mr-3" />
              Financials
            </MDBListGroupItem>
          </NavLink>
          <NavLink to="/payroll" activeClassName="activeClass">
            <div />
            <MDBListGroupItem>
              <MDBIcon icon="toilet-paper" className="mr-3" />
              Payroll
            </MDBListGroupItem>
          </NavLink>
          <NavLink to="/profile" activeClassName="activeClass">
            <div />
            <MDBListGroupItem>
              <MDBIcon icon="user" className="mr-3" />
              Profile
            </MDBListGroupItem>
          </NavLink> */}
    </>
  );
}
export default SideBarAuth;
