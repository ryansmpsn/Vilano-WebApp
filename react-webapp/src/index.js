import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./css/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import App from "./App";
// import App1 from "./App1";

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
