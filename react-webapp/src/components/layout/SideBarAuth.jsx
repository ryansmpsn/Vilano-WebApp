import React from "react";
import { MDBListGroupItem, MDBIcon } from "mdbreact";
import { NavLink } from "react-router-dom";

function SideBarAuth(props) {
  return (
    <>
      {props.appProps.isAuthenticated && (
        <>
          {props.appProps.contractAccess !== "None" && (
            <>
              <NavLink to="/contracts" activeClassName="activeClass">
                <div />
                <MDBListGroupItem>
                  <MDBIcon icon="file-invoice-dollar" className="mr-3" />
                  Contracts
                </MDBListGroupItem>
              </NavLink>
              <NavLink to="/bids" activeClassName="activeClass">
                <div />
                {/* <MDBListGroupItem>
                  <MDBIcon icon="file-signature" className="mr-3" />
                  Contract Analytics
                </MDBListGroupItem> */}
              </NavLink>
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
          <NavLink to="/About" activeClassName="activeClass">
            <div />
            <MDBListGroupItem>
              <MDBIcon icon="question" className="mr-3" />
              About
            </MDBListGroupItem>
          </NavLink>
        </>
      )}
    </>
  );
}
export default SideBarAuth;
