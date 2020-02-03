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
    if (sess) {
      if (sess.match != "false")
        this.props.handleLogin(sess);
      else 
        this.props.handleLogout();
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

  parse_json = (data) => { //I believe this parse_json function is useless now, but not removing it just yet. yyyy/mm/dd(2020/02/03 )
    var array = [];
    console.log(data);
    data.forEach(e => {
      let x = JSON.parse(e);
      array.push(x);
    });
    console.log(array);
    return array;  
  }

  post = async (route, data, parsejson = false) => {
    this.update_auth();
    var send = this;

    var url = this.state.URL + route;
    var our_session = null; //Set our_session variable so we can reference it. 

    return new Promise(function(resolve, reject) {
      axios.post(url, data)
      .then(res => {
        var data = res.data; // Set a custom variable as our actual return data which contains data and our_session
        if (data.our_session){ // Because we're inside of a promise, we cannot reference this.set_our_session properly.
          our_session = data.our_session; // So we are forced to set the variable here so we can set our session. 
        }
        if (parsejson) 
          data.data = JSON.parse(res.data.data);
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

  get = async (route, parsejson = false) => {
    this.update_auth();
    var send = this;

    var url = this.state.URL + route;
    var our_session = null; //Set our_session variable so we can reference it. 

    return new Promise(function(resolve, reject) {
      axios.get(url)
      .then(res => {
        var data = res.data; // Set a custom variable as our actual return data which contains data and our_session
        if (data.our_session){ // Because we're inside of a promise, we cannot reference this.set_our_session properly.
          our_session = data.our_session; // So we are forced to set the variable here so we can set our session. 
        }
        if (parsejson) 
          data.data = JSON.parse(res.data.data);
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

  //will add put/delete as needed
  
}

export default Send;
