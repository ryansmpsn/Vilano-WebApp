import React from "react";
import { MDBListGroup, MDBListGroupItem, MDBIcon } from "mdbreact";
import logo from "../../img/logo.jpg";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="sidebar-fixed position-fixed">
      <a href="/" className="mt-3 mb-3 waves-effect">
        <img
          alt="Vilano Management Services Inc."
          className="img-fluid"
          src={logo}
        />
      </a>
      <MDBListGroup className="list-group list-group-flush">
        <NavLink exact={true} to="/" activeClassName="activeClass">
          <br />
          <MDBListGroupItem>
            <MDBIcon icon="chart-pie" className="mr-3" />
            Dashboard
          </MDBListGroupItem>
        </NavLink>
        <NavLink to="/profile" activeClassName="activeClass">
          <div />
          <MDBListGroupItem>
            <MDBIcon icon="user" className="mr-3" />
            Profile
          </MDBListGroupItem>
        </NavLink>
        <NavLink to="/About" activeClassName="activeClass">
          <div />
          <MDBListGroupItem>
            <MDBIcon icon="question" className="mr-3" />
            About
          </MDBListGroupItem>
        </NavLink>
        {/* 
        <NavLink to="/testpage" activeClassName="activeClass">
          <div />
          <MDBListGroupItem>
            <MDBIcon className="fas fa-vial mr-3" />
            Test Page
          </MDBListGroupItem>
        </NavLink>
*/}
        <NavLink to="/404" activeClassName="activeClass">
          <div />
          <MDBListGroupItem>
            <MDBIcon icon="exclamation" className="mr-3" />
            404
          </MDBListGroupItem>
        </NavLink>
      </MDBListGroup>
    </div>
  );
};

export default SideBar;
