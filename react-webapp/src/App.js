import React, { Component, useState, useEffect } from "react";
import "./css/App.css";
import Send from "./libs/send";
import Routing from "./Routes";
import { AuthContext } from "./auth";
import Notification from "./libs/Notifications";
import Footer from "./components/layout/Footer";
import Navigation from "./components/layout/Navigation";
import { ToastProvider } from "react-toast-notifications";

function App(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const existingSession = sessionStorage.getItem("SessionID");
  const [session, setSession] = useState(existingSession);

  useEffect(() => {
    if (!isAuthenticated) {
      sessionStorage.getItem("SessionID") !== null &&
        Send.get("/Loggedin").then((res) => {
          setIsAuthenticated(true);
        });
    }
  }, [isAuthenticated, props]);
  const setSessionData = (data) => {
    if (data !== undefined && data.match === true) {
      sessionStorage.setItem("SessionID", data.SessionID);
      sessionStorage.setItem("IDSession", data.IDSession);
      data.NavPermissions.map((a) => {
        return sessionStorage.setItem(a[0], a[1]);
      });
      setSession(data);
      setIsAuthenticated(true);
    } else {
      setSession();
    }
  };
  const setIsAuthenticatedData = (authenticated) => {
    setIsAuthenticated(authenticated);
  };

  class Content extends Component {
    render() {
      return (
        <AuthContext.Provider
          value={{ isAuthenticated, session, setSession: setSessionData, setIsAuthenticated: setIsAuthenticatedData }}
        >
          <Navigation isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
          <ToastProvider autoDismiss autoDismissTimeout={6000} placement="bottom-right" components={{ Toast: Notification }}>
            <main id="content" className="p-5" style={{ minHeight: "calc(100vh - 102px)" }}>
              <Routing isAuthenticated={isAuthenticated} />
            </main>
          </ToastProvider>
          <Footer />
        </AuthContext.Provider>
      );
    }
  }
  return <Content />;
}
export default App;
