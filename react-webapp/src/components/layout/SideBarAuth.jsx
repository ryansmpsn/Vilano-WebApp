import React from "react";
import { MDBListGroupItem, MDBIcon } from "mdbreact";
import { NavLink } from "react-router-dom";

function SideBarAuth(props) {
  return (
    <>
      {!props.appProps.isAuthenticating &&
        (props.appProps.isAuthenticated ? (
          <>
            {props.appProps.contractAccess !== "None" && (
              <NavLink to="/contracts" activeClassName="activeClass">
                <div />
                <MDBListGroupItem>
                  <MDBIcon icon="file-invoice-dollar" className="mr-3" />
                  Contracts
                </MDBListGroupItem>
              </NavLink>
            )}
          </>
        ) : (
          <div></div>
        ))}
    </>
  );
}
export default SideBarAuth;
