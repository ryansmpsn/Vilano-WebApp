import React from "react";
import { Nav } from "react-bootstrap";

function Auth(props) {
  return (
    <>
      {!props.appProps.isAuthenticating &&
        (props.appProps.isAuthenticated ? (
          <>
            {props.appProps.contractAccess != "None" && (
              <Nav.Link href="/Contract/Dashboard">Contracts</Nav.Link>
            )}
          </>
        ) : (
          <Nav.Link></Nav.Link>
        ))}
      {props.appProps.isAuthenticated ? (
        <Nav.Link onClick={props.appProps.handleLogout}>Logout</Nav.Link>
      ) : (
        <>
          {/*
           <LinkContainer to="/signup">
                    <NavItem>Signup</NavItem>
                  </LinkContainer> */}
          <Nav.Link href="/Login">Login</Nav.Link>
        </>
      )}
    </>
  );
}
export default Auth;
