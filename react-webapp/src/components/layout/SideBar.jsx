import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { MDBIcon } from "mdbreact";
import logo from "../../img/logo.jpg";
import { NavLink } from "react-router-dom";
import SideBarAuth from "./SideBarAuth";

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      props: props,
    };
  }
  render() {
    return (
      <div className="sidebar-fixed position-fixed side-nav">
        <a href="/" className="mt-3 mb-3 waves-effect">
          <img alt="Vilano Management Services Inc." className="img-fluid" src={logo} />
        </a>
        <ListGroup className="list-group-flush">
          <NavLink to="/dashboard" activeClassName="activeClass">
            <ListGroupItem style={{ borderWidth: "0 0 1px" }}>
              <MDBIcon icon="chart-pie" className="mr-3" />
              Dashboard
            </ListGroupItem>
          </NavLink>
          <NavLink to="/resources" activeClassName="activeClass">
            <ListGroupItem style={{ borderWidth: "0 0 1px" }}>
              <div className="fas fa-paperclip mr-3" />
              Resources
            </ListGroupItem>
          </NavLink>
          <SideBarAuth appProps={this.state.props} />
          <NavLink to="/about" activeClassName="activeClass">
            <ListGroupItem style={{ borderWidth: "0 0 1px" }}>
              <MDBIcon icon="question" className="mr-3" />
              About
            </ListGroupItem>
          </NavLink>
          <NavLink to="/testpage" activeClassName="activeClass">
            <ListGroupItem style={{ borderWidth: "0 0 1px" }}>
              <div className="fas fa-vial mr-3" />
              Test Page
            </ListGroupItem>
          </NavLink>
          <NavLink to="/404" activeClassName="activeClass">
            <ListGroupItem style={{ borderWidth: "0 0 1px" }}>
              <MDBIcon icon="exclamation" className="mr-3" />
              404
            </ListGroupItem>
          </NavLink>
        </ListGroup>
      </div>
    );
  }
}

export default SideBar;
