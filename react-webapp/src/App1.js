import React, { Component } from "react";
import Routes1 from "./Routes1";
import NavBar from "./components/layout/NavBar";
import SideBar from "./components/layout/SideBar";
import Footer from "./components/layout/Footer";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <SideBar />
        <main
          id="content"
          className="p-5"
          style={{ minHeight: "calc(100vh - 102px)" }}
        >
          <Routes1 />
        </main>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
