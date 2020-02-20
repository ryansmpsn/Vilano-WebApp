import React from "react";
import { MDBListGroup, MDBListGroupItem, MDBIcon } from "mdbreact";
import { Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="sidebar-fixed position-fixed">
      <a href="/" className="logo-wrapper waves-effect">
        <Navbar.Brand>Vilano Management</Navbar.Brand>
      </a>
      <MDBListGroup className="list-group-flush">
        <NavLink exact={true} to="/" activeClassName="activeClass">
          <MDBListGroupItem>
            <MDBIcon icon="chart-pie" className="mr-3" />
            Dashboard
          </MDBListGroupItem>
        </NavLink>
        <NavLink to="/profile" activeClassName="activeClass">
          <MDBListGroupItem>
            <MDBIcon icon="user" className="mr-3" />
            Profile
          </MDBListGroupItem>
        </NavLink>
        <NavLink to="/About" activeClassName="activeClass">
          <MDBListGroupItem>
            <MDBIcon icon="question" className="mr-3" />
            About
          </MDBListGroupItem>
        </NavLink>
        {/* Future Development Idea!!!!!
        
        <NavLink to="/maps" activeClassName="activeClass">
          <MDBListGroupItem>
           <MDBIcon icon="map" className="mr-3" />
            Maps
          </MDBListGroupItem>
  </NavLink>
  */}
        <NavLink to="/404" activeClassName="activeClass">
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
