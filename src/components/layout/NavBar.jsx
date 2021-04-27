import React, { useState } from "react";
import Clock from "./Clock";
import NavBarAuth from "./NavBarAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { Nav, Navbar, NavbarBrand } from "react-bootstrap";

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
  let { toggle, setToggle } = props;

  return (
    <Navbar className="navbar fixed-top flexible-navbar" expand="md">
      <MenuIcon onClick={() => setToggle(!toggle)} toggle={toggle}>
        <FontAwesomeIcon icon={toggle ? faChevronRight : faChevronLeft} />
      </MenuIcon>

      <NavbarBrand>
        <Clock />
      </NavbarBrand>

      <Navbar.Toggle onClick={() => setCollapse(!collapse)} />
      <Navbar.Collapse>
        <Nav className="ml-auto float-right flex-row">
          <NavBarAuth />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
