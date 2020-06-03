import React from "react";
import NavBar from "./components/layout/NavBar";
import Routes from "./Routes";

function App1() {
  //   useEffect(() => {
  //     addToast("Logged in Successfuly", {
  //       appearance: "success",
  //       autoDismiss: true,
  //     });
  //   }, [addToast]);
  return (
    <React.Fragment>
      <NavBar />
      <Routes />
      {console.log("Diaplay me")}

      <div className="App">
        <header className="App-header">
          <p>i'M cOMING FOR YOU!!!</p>
          <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            HELLO JESSICA I AM HACKING INTO YOU'RE LIFE!
          </a>
        </header>
      </div>
    </React.Fragment>
  );
}

export default App1;
