import React, { Component, useState, useEffect } from "react";
import Send from "./libs/send";
import Routing from "./Routes";
import { AuthContext } from "./auth";
import Notification from "./libs/Notifications";
import Footer from "./components/layout/Footer";
import Navigation from "./components/layout/Navigation";
import { ToastProvider } from "react-toast-notifications";
import axios from "axios";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const existingSession = sessionStorage.getItem("SessionID");
  const [session, setSession] = useState(existingSession);
  const [appData, setAppData] = useState(null);

  useEffect(() => {
    // const onLogin = async () => {
    //   const requestOne = Send.get("/Report/Roster");
    //   const requestTwo = Send.get("/Contract/Ids");
    //   const requestThree = Send.get("/Bid/BidIDs");

    //   // [requestOne, requestTwo, requestThree]
    //   axios
    //     .all()
    //     .then(
    //       axios.spread((...responses) => {
    //         const responseData = { drivers: responses[0].data, contracts: responses[1].data, bids: responses[2].data[0].options };
    //         setAppData(responseData);
    //       })
    //     )
    //     .catch((errors) => {
    //       // react on errors
    //       console.log(errors);
    //     });
    // };
    if (!isAuthenticated) {
      sessionStorage.getItem("SessionID") !== null &&
        Send.get("/Loggedin").then((res) => {
          setIsAuthenticated(true);
        });
    }
    //  else {
    //   onLogin();
    // }
  }, [isAuthenticated]);

  const setSessionData = (data) => {
    if (data !== undefined && data.match === true) {
      setSession(data.SessionID);
      setIsAuthenticated(true);
    } else {
      setSession();
    }
  };
  const setIsAuthenticatedData = (authenticated) => {
    setIsAuthenticated(authenticated);
  };

  function handleLogout() {
    sessionStorage.clear();
    setIsAuthenticated(false);
  }

  class Content extends Component {
    render() {
      return (
        <AuthContext.Provider
          value={{
            isAuthenticated,
            session,
            setSession: setSessionData,
            setIsAuthenticated: setIsAuthenticatedData,
          }}
        >
          <Navigation isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
          <ToastProvider autoDismiss autoDismissTimeout={6000} placement="bottom-right" components={{ Toast: Notification }}>
            <main id="content">
              <Routing isAuthenticated={isAuthenticated} handleLogout={handleLogout} appData={appData} />
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
