import React, { useState } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse } from "mdbreact";
import Clock from "./Clock";
import NavBarAuth from "./NavBarAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const MenuIcon = styled.div.attrs((props) => ({
  toggle: props.toggle,
}))`
  transition: 1.2s;
  transition: visibility 1.2s opacity 1s;
  opacity: 0;
  display: hidden;
  margin-right: -10px;
  :hover {
    cursor: pointer;
  }

  @media (max-width: 1199.98px) {
    margin-left: ${(props) => (props.toggle ? "220px" : "0")};
    margin-right: 0px;
    display: visible;
    opacity: 1;
  }
`;

function NavBar(props) {
  const [collapse, setCollapse] = useState(false);

  return (
    <MDBNavbar className="navbar fixed-top flexible-navbar" light expand="md" scrolling>
      <MenuIcon onClick={() => props.setToggle(!props.toggle)} toggle={props.toggle}>
        <FontAwesomeIcon icon={props.toggle ? faChevronRight : faChevronLeft} />
      </MenuIcon>

      <MDBNavbarBrand>
        <Clock />
      </MDBNavbarBrand>

      <MDBNavbarToggler onClick={() => setCollapse(!collapse)} />
      <MDBCollapse isOpen={collapse} navbar>
        <MDBNavbarNav right>
          <NavBarAuth {...props} />
        </MDBNavbarNav>
      </MDBCollapse>
    </MDBNavbar>
  );
}

export default NavBar;
