import React from "react";
import axios from "axios";

const Send = new (class send extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      localTestURL: "http://localhost:3888",
      liveTestURL: "https://centcom-testing-dot-pfsi-centcom.uc.r.appspot.com",
      liveProductionURL: "https://centcom-dot-pfsi-centcom.appspot.com",
      URL: "",
      SessionID: "None",
      IDSession: "None",
    };
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
      this.state.URL = this.state.localTestURL;
    } else {
      this.state.URL = this.state.liveTestURL;
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

  post = async (route, data, props, parsejson = false) => {
    this.state.SessionID = sessionStorage.getItem("SessionID");
    this.state.IDSession = sessionStorage.getItem("IDSession");
    this.update_auth();
    // Must set this here, as when we enter promise, it will disappear.  var send = this;

    var url = this.state.URL + route;

    return new Promise(function (resolve, reject) {
      axios
        .post(url, data)
        .then((res) => {
          var data = res.data; // Set a custom variable as our actual return data which contains data and our_session
          if (parsejson) data.data = JSON.parse(res.data.data);
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  get = async (route, props, parsejson = false) => {
    this.state.SessionID = sessionStorage.getItem("SessionID");
    this.state.IDSession = sessionStorage.getItem("IDSession");
    this.update_auth();

    var url = this.state.URL + route;

    return new Promise(function (resolve, reject) {
      axios
        .get(url)
        .then((res) => {
          var data = res.data; // Set a custom variable as our actual return data which contains data and our_session
          if (parsejson) data.data = JSON.parse(res.data.data);
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  //will add put/delete as needed
})();

export default Send;
