import React, { Component, useState, useEffect } from "react";
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
    onLoad();
  }, []);

  async function onLoad() {
    Send.get("/Loggedin", { handleLogout, handleLogin })
      .then(res => {
        console.log("logging in");
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
      sess.NavPermissions.map(a => {
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
    //props.history.push("/login");
  }
  class Content extends Component {
    render() {
      return (
        <React.Fragment>
          <NavBar
            handleLogout={handleLogout}
            handleLogin={handleLogin}
            isAuthenticated={isAuthenticated}
            userHasAuthenticated={userHasAuthenticated}
            contractAccess={contractAccess}
            isAuthenticating={isAuthenticating}
          />
          <SideBar />
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
