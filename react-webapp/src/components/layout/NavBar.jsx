import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBIcon, MDBNavItem } from "mdbreact";
import Clock from "./Clock";
import Auth from "./NavBarAuth";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      props: props,
    };
  }

  onClick = () => {
    this.setState({
      collapse: !this.state.collapse,
    });
  };

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  };

  render() {
    return (
      <MDBNavbar className="navbar fixed-top flexible-navbar" light expand="md" scrolling>
        <MDBNavbarBrand>
          <Clock />
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.onClick} />
        <MDBCollapse isOpen={this.state.collapse} navbar>
          <MDBNavbarNav right>
            <Auth appProps={this.state.props} />
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
  }
}

export default NavBar;
