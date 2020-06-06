import React, { Component, useState } from "react";
import "./css/App.css";
import { AuthContext } from "./auth";
import Routes from "./Routes";
import NavBar from "./components/layout/NavBar";
import SideBar from "./components/layout/SideBar";
import Footer from "./components/layout/Footer";

function App(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const existingSession = sessionStorage.getItem("SessionID");
  const [session, setSession] = useState(existingSession);

  const setSessionData = (data) => {
    if (data !== undefined && data.match === true) {
      setIsAuthenticated(true);
      sessionStorage.setItem("SessionID", data.SessionID);
      sessionStorage.setItem("IDSession", data.IDSession);
      data.NavPermissions.map((a) => {
        return sessionStorage.setItem(a[0], a[1]);
      });
      setSession(data);
    } else setSession();
  };

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     Send.get("/Loggedin", { handleLogout, handleLogin })
  //       .then((res) => {}, setIsAuthenticated(true))
  //       .catch((err) => {
  //         // props.history.push("/");
  //         console.log(err);
  //         /* loggin out */
  //       });
  //     /* loggin in */
  //     setIsAuthenticating(false);
  //   } else {
  //     Send.get("/Loggedin", { handleLogin })
  //       .then((res) => {
  //         handleRedirect();
  //       })
  //       .catch((err) => {});

  //     setIsAuthenticated(false);
  //     setIsAuthenticating(false);
  //   }
  // }, [isAuthenticated, props.history]);

  // function authenticate() {
  //   if (isAuthenticated) {
  //     Send.get("/Loggedin", { handleLogout, handleLogin })
  //       .then((res) => setIsAuthenticated(true))
  //       .catch((err) => {
  //         // props.history.push("/");
  //         console.log(err);
  //         /* loggin out */
  //       });
  //     /* loggin in */
  //     setIsAuthenticating(false);
  //   } else {
  //     Send.get("/Loggedin", { handleLogin })
  //       .then((res) => {
  //         console.log(res);
  //         handleRedirect();
  //       })
  //       .catch((err) => {});

  //     setIsAuthenticated(false);
  //     setIsAuthenticating(false);
  //   }
  // }

  // function handleLogin(sess) {
  //   if (sess.match === true) {
  //     sessionStorage.setItem("SessionID", sess.SessionID);
  //     sessionStorage.setItem("IDSession", sess.IDSession);
  //     sess.NavPermissions.map((a) => {
  //       return sessionStorage.setItem(a[0], a[1]);
  //     });
  //     setIsAuthenticated(true);
  //     setContractAccess(sessionStorage.getItem("Contracts"));
  //   }
  // }

  // function handleRedirect() {
  //   return <Redirect to="/" />;
  // }

  // function handleLogout() {
  //   setIsAuthenticated(false);
  //   setContractAccess("None");
  //   sessionStorage.clear();
  //   //props.history.push("/login");
  // }

  class Content extends Component {
    render() {
      return (
        <AuthContext.Provider value={{ session, setSession: setSessionData }}>
          <NavBar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
          <SideBar isAuthenticated={isAuthenticated} />
          <main id="content" className="p-5" style={{ minHeight: "calc(100vh - 102px)" }}>
            <Routes isAuthenticated={isAuthenticated} />
          </main>
          <Footer />
        </AuthContext.Provider>
      );
    }
  }
  return <Content />;
}
export default App;
