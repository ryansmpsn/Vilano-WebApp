import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./App.css";
import Routes from "./Routes";
import Send from "./components/send";


function App(props) {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  
  useEffect(() => {
    onLoad();
  }, []);
  
  async function onLoad() {
    Send.get('/Loggedin')
    .then(res => {
      if (res.data.match == "true"){
        userHasAuthenticated(true);
      }
    })
    .catch(err => {
      console.log(err)
      handleLogout();
    });
  
    setIsAuthenticating(false);
  }

  

  function handleLogout() {
    userHasAuthenticated(false);
    sessionStorage.clear();//('SessionID', res.data.SessionID);
    props.history.push("/login");
  }
  
  return (
    !isAuthenticating && (
    <div className="App container">
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Velono Command</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullLeft>
          {isAuthenticated
            ? 
              <> 
              <LinkContainer to="/testpage">
                  <NavItem>testpage</NavItem>
                </LinkContainer>
                <LinkContainer to="/home">
                  <NavItem>Home</NavItem>
                </LinkContainer>
                <LinkContainer to="/ContractList">
                  <NavItem>Contracts</NavItem>
                </LinkContainer>
                </>
            
            : 
              
                <LinkContainer to="/home">
                  <NavItem>Home</NavItem>
                </LinkContainer>
              
          }
          </Nav>
          <Nav pullRight>
          {isAuthenticated
            ? <NavItem onClick={handleLogout}>Logout</NavItem>
            : <>
                <LinkContainer to="/signup">
                  <NavItem>Signup</NavItem>
                </LinkContainer>
                <LinkContainer to="/login">
                  <NavItem>Login</NavItem>
                </LinkContainer>
              </>
          }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes appProps={{ isAuthenticated, userHasAuthenticated }} />
    </div>
    )
  );
}
export default withRouter(App);
