import React from 'react';
import axios from 'axios';

const Send = new class send extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      //testURL: 'http://VMS-MOBILE-243.POSTALFLEET.local:8080',
      testURL: 'http://Hand-Of-God:8080',
      liveURL: 'https://centcom-dot-pfsi-centcom.appspot.com',
      URL: '',
      SessionID: '',
    };
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'){
      this.state.URL = this.state.testURL;
    }else{
      this.state.URL = this.state.liveURL;
    }

  }


  update_auth = () => {
    this.state.SessionID = sessionStorage.getItem('SessionID');
    axios.defaults.headers.common['SessionID'] = this.state.SessionID;
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  }

  parse_json = (data) => {
    var array = [];
    data.forEach(e => {
      let x = JSON.parse(e);
      array.push(x);
    });
    return array;  
  }

  post = async (route, data, parsejson = false) => {
    var send = this;
    this.update_auth();
    var url = this.state.URL + route;
    return new Promise(function(resolve, reject) {
      axios.post(url, data)
      .then(res => {
        var data = res;
        if (parsejson) 
          data = send.parse_json(res.data);
        resolve(data);
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
    });
  }

  get = async (route, parsejson = false) => {
    var send = this;
    this.update_auth();
    var url = this.state.URL + route;
    return new Promise(function(resolve, reject) {
      axios.get(url)
      .then(res => {
        var data = res;
        if (parsejson) 
          data = send.parse_json(res.data);
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
    });
  }

  put = async (route, data, parsejson = false) => {
    var send = this;
    this.update_auth();
    var url = this.state.URL + route;
    return new Promise(function(resolve, reject) {
      axios.put(url, data)
      .then(res => {
        var data = res;
        if (parsejson) 
          data = send.parse_json(res.data);
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
