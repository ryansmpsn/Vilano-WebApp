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
  const [contractAccess, setContractAccess] = useState("None");

  
  useEffect(() => {
    onLoad();
  }, []);
  
  async function onLoad() {
    Send.get('/Loggedin')
    .then(res => {
      handleLogin(res.headers);
    })
    .catch(err => {
      //console.log("Logging Out");
    });
  
    setIsAuthenticating(false);
  }

  function handleLogin(sess){
    if (sess.match === "true"){
      sessionStorage.setItem('SessionID', sess.SessionID);
      sessionStorage.setItem('IDSession', sess.IDSession);
      sess.PagePermissions.map(a =>{
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
    <div className="App container">
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Vilano Command</Link>
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
                {contractAccess != "None" && (
                <LinkContainer to="/ContractList">
                  <NavItem>Contracts</NavItem>
                </LinkContainer>)}
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
                {/* <LinkContainer to="/signup">
                  <NavItem>Signup</NavItem>
                </LinkContainer> */}
                <LinkContainer to="/login">
                  <NavItem>Login</NavItem>
                </LinkContainer>
              </>
          }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes appProps={{handleLogout, handleLogin, isAuthenticated, userHasAuthenticated, contractAccess }} />
    </div>
    )
  );
}
export default withRouter(App);
