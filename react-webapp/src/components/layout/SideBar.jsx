import React, { useState } from "react";
import { MDBIcon } from "mdbreact";
import logo from "../../img/logo.jpg";
import SideBarAuth from "./SideBarAuth";
import { NavLink } from "react-router-dom";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

function SideBar(props) {
  const StyledMenuMask = styled.div`
    position: fixed;
    background-color: rgba(0, 0, 0, 0.5);
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    z-index: 1030;
    transition: 1s;
    display: ${props.toggle ? "visible" : "none"};

    @media (min-width: 1199.98px) {
      display: none;
    }
  `;

  const StyledMenu = styled.div`
    width: 230px;
    transition: 1s;
    transition: visibility 0.5s, opacity 1.2s;
    visibility: ${props.toggle ? "visible" : "hidden"};
    opacity: ${props.toggle ? 1 : 0};

    @media (min-width: 1199.98px) {
      visibility: visible;
      opacity: 1;
    }
  `;

  function toggleMenu() {
    props.setToggle(!props.toggle);
  }

  return (
    <>
      {console.log(props.toggle)}
      {console.log(window.innerWidth)}

      {/* {window.innerWidth <= 1200 && props.toggle && <> </>} */}
      <StyledMenuMask id="menuMask" onClick={() => toggleMenu()} />

      <div className="h3 nav position-absolute" style={{ zIndex: 1032, marginTop: "5px", marginLeft: "10px" }}>
        <FontAwesomeIcon icon={props.toggle ? faChevronRight : faChevronLeft} onClick={() => toggleMenu()} />
      </div>

      {/* {(window.innerWidth <= 1200 || !props.toggle) && (
        
      )} */}

      <StyledMenu className="sidebar-fixed side-nav " style={{ zIndex: 1032, marginTop: "200px", marginLeft: "400px" }}>
        <FontAwesomeIcon icon={props.toggle ? faChevronRight : faChevronLeft} onClick={() => toggleMenu()} />
      </StyledMenu>

      <StyledMenu className="sidebar-fixed  side-nav ">
        <a href="/" className="mt-3 mb-3 waves-effect">
          <img alt="Vilano Management Services Inc." className="img-fluid" src={logo} />
        </a>
        <ListGroup className="list-group-flush">
          <NavLink
            to="/dashboard"
            activeClassName="activeClass"
            onClick={() => window.innerWidth <= 1200 && props.setToggle(false)}
          >
            <ListGroupItem style={{ borderWidth: "0 0 1px" }}>
              <MDBIcon icon="chart-pie" className="mr-3" />
              Dashboard
            </ListGroupItem>
          </NavLink>
          <NavLink to="/resources" activeClassName="activeClass">
            <ListGroupItem style={{ borderWidth: "0 0 1px" }} onClick={() => window.innerWidth <= 1200 && props.setToggle(false)}>
              <div className="fas fa-paperclip mr-3" />
              Resources
            </ListGroupItem>
          </NavLink>
          <SideBarAuth {...props} />
          <NavLink to="/about" activeClassName="activeClass">
            <ListGroupItem style={{ borderWidth: "0 0 1px" }} onClick={() => window.innerWidth <= 1200 && props.setToggle(false)}>
              <MDBIcon icon="question" className="mr-3" />
              About
            </ListGroupItem>
          </NavLink>
          <NavLink to="/axios" activeClassName="activeClass">
            <ListGroupItem style={{ borderWidth: "0 0 1px" }} onClick={() => window.innerWidth <= 1200 && props.setToggle(false)}>
              <div className="fas fa-vials mr-3" />
              Test Endpoint
            </ListGroupItem>
          </NavLink>
          <NavLink to="/testpage" activeClassName="activeClass">
            <ListGroupItem style={{ borderWidth: "0 0 1px" }} onClick={() => window.innerWidth <= 1200 && props.setToggle(false)}>
              <div className="fas fa-vial mr-3" />
              UI Sandbox
            </ListGroupItem>
          </NavLink>
          <NavLink to="/404" activeClassName="activeClass">
            <ListGroupItem style={{ borderWidth: "0 0 1px" }} onClick={() => window.innerWidth <= 1200 && props.setToggle(false)}>
              <MDBIcon icon="exclamation" className="mr-3" />
              404
            </ListGroupItem>
          </NavLink>
        </ListGroup>
      </StyledMenu>
    </>
  );
}

export default SideBar;
