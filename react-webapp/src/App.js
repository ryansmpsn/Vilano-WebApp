import React, { Component, useState, useEffect } from "react";
import "./App.css";
import { Redirect } from "react-router-dom";
import Routes from "./Routes";
import NavBar from "./components/layout/NavBar";
import SideBar from "./components/layout/SideBar";
import Footer from "./components/layout/Footer";
import Send from "./components/send";

function App(props) {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [contractAccess, setContractAccess] = useState("None");

  useEffect(() => {
    if (isAuthenticated) {
      Send.get("/Loggedin", { handleLogout, handleLogin })
        .then(res => {
          console.log("Logged in Successfuly");
        }, userHasAuthenticated(true))
        .catch(err => {
          props.history.push("/");
          console.log(err);
          console.log("Logging Out");
        });
      console.log("Logging In");
      setIsAuthenticating(false);
    } else {
      Send.get("/Loggedin", { handleLogin })
        .then(res => {
          handleRedirect();
        })
        .catch(err => {
          console.log("You are not Logged in. Please Login.");
        });

      userHasAuthenticated(false);
      setIsAuthenticating(false);
    }
  }, [isAuthenticated, props.history]);

  function handleLogin(sess) {
    if (sess.match === "true") {
      sessionStorage.setItem("SessionID", sess.SessionID);
      sessionStorage.setItem("IDSession", sess.IDSession);
      sess.NavPermissions.map(a => {
        return sessionStorage.setItem(a[0], a[1]);
      });
      userHasAuthenticated(true);
      setContractAccess(sessionStorage.getItem("Contracts"));
    }
  }

  function handleRedirect() {
    return <Redirect to="/" />;
  }

  function handleLogout() {
    userHasAuthenticated(false);
    setContractAccess("None");
    sessionStorage.clear();
    //props.history.push("/login");
  }

  class Content extends Component {
    render() {
      return (
        <React.Fragment>
          {/* 
          <Notifications
            header="Alert! Alert!"
            body="Hello, world! This is a toast message.It comes from App.js."
        /> 
*/}
          <NavBar
            handleLogout={handleLogout}
            handleLogin={handleLogin}
            isAuthenticated={isAuthenticated}
            userHasAuthenticated={userHasAuthenticated}
            contractAccess={contractAccess}
            isAuthenticating={isAuthenticating}
            setContractAccess={setContractAccess}
          />
          <SideBar
            contractAccess={contractAccess}
            isAuthenticated={isAuthenticated}
          />
          <main
            id="content"
            className="p-5"
            style={{ minHeight: "calc(100vh - 102px)" }}
          >
            <Routes
              handleLogout={handleLogout}
              handleLogin={handleLogin}
              isAuthenticated={isAuthenticated}
              userHasAuthenticated={userHasAuthenticated}
              contractAccess={contractAccess}
            />
          </main>
          <Footer />
        </React.Fragment>
      );
    }
  }
  return <Content />;
}
export default App;
