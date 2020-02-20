import React, { Component } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
  MDBNavLink
} from "mdbreact";
import Clock from "./Clock";
import Auth from "./NavBarAuth";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      props: props
    };
  }

  onClick = () => {
    this.setState({
      collapse: !this.state.collapse
    });
  };

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  render() {
    return (
      <div>
        <MDBNavbar
          className="navbar fixed-top flexible-navbar"
          light
          expand="md"
          scrolling
        >
          <MDBNavbarBrand href="/">
            <strong>
              <Clock />
            </strong>
          </MDBNavbarBrand>
          <MDBNavbarToggler onClick={this.onClick} />
          <MDBCollapse isOpen={this.state.collapse} navbar>
            <MDBNavbarNav left>
              <MDBNavItem active>
                <MDBNavLink to="/testpage">TestPage</MDBNavLink>
              </MDBNavItem>
            </MDBNavbarNav>
            <MDBNavbarNav right>
              <Auth appProps={this.state.props} />
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
      </div>
    );
  }
}

export default NavBar;
