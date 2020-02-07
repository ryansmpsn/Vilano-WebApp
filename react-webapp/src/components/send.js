import React from 'react';
import axios from 'axios';

const Send = new class send extends React.Component {
  constructor(props) {
    super(props)
    this.props = props;
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

  set_our_session = (sess, props) => {
    if (sess) {
      if (sess.match != "false")
        props.handleLogin(sess);
      else 
        props.handleLogout(); // Still not refreshing page for loggout... Get 401 denieds, but no user display change. 
        // Oh yeah I need to handle 401s to loggout. Will do this later. 
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

  post = async (route, data, props, parsejson = false) => {
    this.update_auth();
    var send = this; // Must set this here, as when we enter promise, it will disappear.

    var url = this.state.URL + route;

    return new Promise(function(resolve, reject) {
      axios.post(url, data)
      .then(res => {
        var data = res.data; // Set a custom variable as our actual return data which contains data and our_session
        if (data.our_session){ 
          send.set_our_session(data.our_session, props); 
        }
        if (parsejson) 
          data.data = JSON.parse(res.data.data);
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
    });
  }

  get = async (route, props, parsejson = false) => {
    this.update_auth();
    var send = this;

    var url = this.state.URL + route;

    return new Promise(function(resolve, reject) {
      axios.get(url)
      .then(res => {
        var data = res.data; // Set a custom variable as our actual return data which contains data and our_session
        if (data.our_session){ 
          send.set_our_session(data.our_session, props);
        }
        if (parsejson) 
          data.data = JSON.parse(res.data.data);
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
    });
  }

  //will add put/delete as needed
  
}

export default Send;
