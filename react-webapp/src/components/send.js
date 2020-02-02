import React from 'react';
import axios from 'axios';

const Send = new class send extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      testURL: 'http://VMS-MOBILE-243.POSTALFLEET.local:8080',
      //testURL: 'http://Hand-Of-God:8080',
      liveURL: 'https://centcom-dot-pfsi-centcom.appspot.com',
      URL: '',
      SessionID: 'None',
      IDSession: 'None'
    };
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'){
      this.state.URL = this.state.testURL;
    }else{
      this.state.URL = this.state.liveURL;
    }
    axios.defaults.headers.common['our_session'] = '';
  }

  set_our_session = (sess) => {
    console.log(sess);
    if (sess) {
      if (sess.match != "false")
        this.props.handleLogin(sess);
      else 
        console.log(sess);
        //this.props.handleLogout();
    }
  }

  update_auth = () => {
    this.state.SessionID = sessionStorage.getItem('SessionID');
    this.state.IDSession = sessionStorage.getItem('IDSession');
    axios.defaults.headers.common['SessionID'] = this.state.SessionID;
    axios.defaults.headers.common['IDSession'] = this.state.IDSession;
    
    axios.defaults.headers.common['Application'] = "WebApp";
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  }

  parse_json = (data) => {
    var array = [];
    data.forEach(e => {
      let x = JSON.parse(e);
      array.push(x);
    });
    console.log(array);
    return array;  
  }

  post = async (route, data, parsejson = false) => {
    var send = this;
    this.update_auth();
    var url = this.state.URL + route;
    var our_session = null;
    return new Promise(function(resolve, reject) {
      axios.post(url, data)
      .then(res => { //send.set_our_session(res.data, send);
        var data = res;
        if (data.data.our_session){
          our_session = JSON.parse(data.data.our_session);
          data.data.our_session = our_session;
        }
        if (parsejson) 
          data.data = send.parse_json(res.data.data);

        console.log(data);
        resolve(data);
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
    });
    if (our_session != null){
      this.set_our_session(our_session);
    }
  }

  get = async (route, parsejson = false) => {
    var send = this;
    this.update_auth();
    var url = this.state.URL + route;
    var our_session = null;
    return new Promise(function(resolve, reject) {
      axios.get(url)
      .then(res => { 
        var data = res;
        if (data.data.our_session){
          our_session = JSON.parse(data.data.our_session);
          data.data.our_session = our_session;
        }
        if (parsejson) 
          data.data = send.parse_json(res.data.data);
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
    });
    if (our_session != null){
      this.set_our_session(our_session);
    }
  }

  put = async (route, data, parsejson = false) => {
    var send = this;
    this.update_auth();
    var url = this.state.URL + route;
    return new Promise(function(resolve, reject) {
      axios.put(url, data)
      .then(res => { send.set_our_session(res.data, send);
        var data = res.data;
        if (parsejson) 
          data.data = send.parse_json(res.data.data);;
        resolve(data);
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
    });
  }
  
}

export default Send;
