import React, { useState } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse } from "mdbreact";
import Clock from "./Clock";
import NavBarAuth from "./NavBarAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

function NavBar(props) {
  const [collapse, setCollapse] = useState(false);

  const MenuIcon = styled.div`
    transition: 1.5s;
    transition: visibility 1.5s opacity 1.2s;
    opacity: 0;
    display: hidden;
    margin-right: -10px;
    :hover {
      cursor: pointer;
    }

    @media (max-width: 1199.98px) {
      margin-right: 0px;
      display: visible;
      opacity: 1;
      margin-left: ${props.toggle ? "220px" : "0"};
    }
  `;

  return (
    <MDBNavbar className="navbar fixed-top flexible-navbar" light expand="md" scrolling>
      <MenuIcon onClick={() => props.setToggle(!props.toggle)}>
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
