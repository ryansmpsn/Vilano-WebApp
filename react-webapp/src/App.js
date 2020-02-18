import React, { useState, useEffect } from "react";
import { Nav, Navbar } from "react-bootstrap";
import styled from "styled-components";
import Routes from "./Routes";
import Send from "./components/send";
import SideBar from "./components/layout/SideBar";
import Footer from "./components/layout/Footer";
import Clock from "./components/layout/Clock";

const Styles = styled.div`
  .sticky-bottom {
    min-height: calc(100vh - 38px);
  }
`;

function App(props) {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [contractAccess, setContractAccess] = useState("None");

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    Send.get("/Loggedin", { handleLogout, handleLogin })
      .then(res => {
        //handleLogin(res.headers);
      })
      .catch(err => {
        console.log(err);
        console.log("Logging Out");
      });

    setIsAuthenticating(false);
  }

  function handleLogin(sess) {
    if (sess.match === "true") {
      sessionStorage.setItem("SessionID", sess.SessionID);
      sessionStorage.setItem("IDSession", sess.IDSession);
      sess.PagePermissions.map(a => {
        sessionStorage.setItem(a[0], a[1]);
      });
      userHasAuthenticated(true);
      setContractAccess(sessionStorage.getItem("Contracts"));
    }
  }

  function handleLogout() {
    userHasAuthenticated(false);
    setContractAccess("None");
    sessionStorage.clear();
    props.history.push("/login");
  }

  return (
    !isAuthenticating && (
      <React.Fragment>
        <div className="flexible-content">
          <SideBar />
          <Styles>
            <div id="content" className="sticky-bottom">
              <Navbar fluid inverse>
                <Navbar.Brand href="/">
                  <Clock />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="ml-auto">
                    {isAuthenticated ? (
                      <>
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/testpage">TestPage</Nav.Link>
                        {contractAccess != "None" && (
                          <Nav.Link href="/ContractList">Contracts</Nav.Link>
                        )}
                      </>
                    ) : (
                      <Nav.Link href="/">Home</Nav.Link>
                    )}
                    {isAuthenticated ? (
                      <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                    ) : (
                      <>
                        {/* <LinkContainer to="/signup">
                  <NavItem>Signup</NavItem>
                </LinkContainer> */}
                        <Nav.Link href="/Login">Login</Nav.Link>
                      </>
                    )}
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
              <div className="p-5">
                <Routes
                  appProps={{
                    handleLogout,
                    handleLogin,
                    isAuthenticated,
                    userHasAuthenticated,
                    contractAccess
                  }}
                />
              </div>
            </div>
          </Styles>
          <Footer />
        </div>
      </React.Fragment>
    )
  );
}

export default App;
