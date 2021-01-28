import React from "react";
import { MDBIcon } from "mdbreact";
import logo from "../../img/logo.jpg";
import SideNavAuth from "./SideNavAuth";
import { NavLink } from "react-router-dom";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import styled from "styled-components";

const StyledMenuMask = styled.div.attrs((props) => ({
  toggle: props.toggle,
}))`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  z-index: 1029;
  transition: 1s;
  display: ${(props) => (props.toggle ? "visible" : "none")};

  @media (min-width: 1199.98px) {
    display: none;
  }
`;

const StyledMenu = styled.div`
  width: 230px;
  transition: visibility 0.5s, opacity 1.2s, transform 250ms ease-in-out;
  transform: ${(props) => (props.toggle ? "translateX(0)" : "translateX(-250px)")};

  @media (min-width: 1199.98px) {
    transform: translateX(0);
    visibility: visible;
    opacity: 1;
  }
`;

function SideNav(props) {
  function toggleMenu() {
    if (window.innerWidth >= 1199.98) {
      props.setToggle(false);
    } else props.setToggle(!props.toggle);
  }

  return (
    <>
      <StyledMenuMask id="menuMask" onClick={() => toggleMenu()} toggle={props.toggle} />

      {/* fix css on hover open menu */}
      <StyledMenu id="toggleSidebar" className="sidebar-fixed" toggle={props.toggle}>
        <a href="/" className="mt-3 mb-3 waves-effect">
          <img alt="Vilano Management Services Inc." className="img-fluid" src={logo} />
        </a>
        <ListGroup className="list-group-flush">
          <NavLink to="/dashboard" activeClassName="activeClass" onClick={() => window.innerWidth <= 1200 && props.setToggle(false)}>
            <ListGroupItem style={{ borderWidth: "0 0 1px" }}>
              <MDBIcon icon="chart-pie" className="mr-3" />
              Dashboard
            </ListGroupItem>
          </NavLink>
          {props.isAuthenticated && <SideNavAuth {...props} />}
          <NavLink to="/resources" activeClassName="activeClass">
            <ListGroupItem style={{ borderWidth: "0 0 1px" }} onClick={() => window.innerWidth <= 1200 && props.setToggle(false)}>
              <div className="fas fa-paperclip mr-3" />
              Resources
            </ListGroupItem>
          </NavLink>
          <NavLink to="/about" activeClassName="activeClass">
            <ListGroupItem style={{ borderWidth: "0 0 1px" }} onClick={() => window.innerWidth <= 1200 && props.setToggle(false)}>
              <MDBIcon icon="question" className="mr-3" />
              About
            </ListGroupItem>
          </NavLink>
        </ListGroup>
      </StyledMenu>
    </>
  );
}

export default SideNav;
