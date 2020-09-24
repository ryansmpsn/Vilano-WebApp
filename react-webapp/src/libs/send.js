import React from "react";
import axios from "axios";

const Send = new (class send extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      localURL: "http://localhost:3888",
      testURL: "https://centcom-testing-dot-pfsi-centcom.uc.r.appspot.com",
      productionURL: "https://centcom-dot-pfsi-centcom.appspot.com",
      URL: "",
      SessionID: "None",
      IDSession: "None",
    };
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
      this.state.URL = this.state.testURL;
    } else {
      this.state.URL = this.state.testURL;
    }
    axios.defaults.headers.common["our_session"] = "";
  }

  update_auth = () => {
    axios.defaults.headers.common["SessionID"] = this.state.SessionID;
    axios.defaults.headers.common["IDSession"] = this.state.IDSession;
    axios.defaults.headers.common["Content-Type"] = "application/json";
    axios.defaults.headers.common["Application"] = "WebApp";
    axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
  };

  set_our_session = (sess, props) => {
    if (sess) {
      if (sess.SessionID !== this.state.SessionID && sess.match === true) {
        sessionStorage.setItem("SessionID", sess.SessionID);
        sessionStorage.setItem("IDSession", sess.IDSession);
        sess.NavPermissions.map((c) => {
          return sessionStorage.setItem(c.navigation_permission_route, c.access_level);
        });
      }
    } else {
      props.handleLogout();
    }
  };

  handleError = (err, props) => {
    console.log(props);
    console.log(err.status + " Error: " + err.statusText + " at " + err.config.method + " " + err.config.url);
    console.log(err.data.data.error);
    console.log(err);
    if (props || err.match === false) {
      props.handleLogout();
    }
  };

  post = async (route, data, props) => {
    this.state.SessionID = sessionStorage.getItem("SessionID");
    this.state.IDSession = sessionStorage.getItem("IDSession");
    this.update_auth();
    var send = this;
    // Must set this here, as when we enter promise, it will disappear.

    var url = this.state.URL + route;

    return new Promise(function (resolve, reject) {
      axios
        .post(url, data)
        .then((res) => {
          var data = res.data; // Set a custom variable as our actual return data which contains data and our_session

          if (data.our_session) {
            send.set_our_session(data.our_session, props);
          }
          resolve(data);
        })
        .catch((err) => {
          send.handleError(err.response, props);
          reject(err);
        });
    });
  };

  get = async (route, props) => {
    this.state.SessionID = sessionStorage.getItem("SessionID");
    this.state.IDSession = sessionStorage.getItem("IDSession");
    this.update_auth();
    var send = this;
    // Must set this here, as when we enter promise, it will disappear.

    var url = this.state.URL + route;

    return new Promise(function (resolve, reject) {
      axios
        .get(url)
        .then((res) => {
          var data = res.data; // Set a custom variable as our actual return data which contains data and our_session

          if (data.our_session) {
            send.set_our_session(data.our_session, props);
          }
          resolve(data);
        })
        .catch((err) => {
          send.handleError(err.response, props);
          reject(err);
        });
    });
  };

  //will add put/delete as needed
})();

export default Send;
