import React from "react";
import { Nav } from "react-bootstrap";

function Auth(props) {
  function handleLogout() {
    props.appProps.userHasAuthenticated(false);
    props.appProps.setContractAccess("None");
    sessionStorage.clear();
    //props.history.push("/login");
  }
  return (
    <>
      {!props.appProps.isAuthenticating &&
        (props.appProps.isAuthenticated ? (
          <Nav.Link onClick={handleLogout} href="/">
            Logout
          </Nav.Link>
        ) : (
          <>
            {/*
           <LinkContainer to="/signup">
                    <NavItem>Signup</NavItem>
                  </LinkContainer> */}
            <Nav.Link href="/Login">Login</Nav.Link>
          </>
        ))}
    </>
  );
}
export default Auth;
