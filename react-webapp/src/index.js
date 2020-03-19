import React from "react";
import ReactDOM from "react-dom";
import { ToastProvider } from "react-toast-notifications";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import App from "./App";
import Notification from "./components/Notifications";

ReactDOM.render(
  <Router>
    <ToastProvider
      autoDismiss
      autoDismissTimeout={6000}
      placement="bottom-right"
      components={{ Toast: Notification }}
    >
      <App />
    </ToastProvider>
  </Router>,
  document.getElementById("root")
);
