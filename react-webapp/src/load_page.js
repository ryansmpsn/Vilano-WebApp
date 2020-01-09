import React from 'react';
import Send from './send';
import { Route, Redirect } from "react-router-dom";


//HERE IS WHERE WE LEFT OFF NOAH. 
//Using react-router-dom. 
//create routes and private routes for user seeing access
const PrivateRoute = ({component: Component, isAuthenticated, ...rest}) => (
  <Route {...rest} render={props => (
    isAuthenticated 
      ? 
      (<Component {...props}/>)
      :
      (<Redirect to={{pathname: '/login', state: {from: props.location}}}/>)
  )}/>
);

const Load = new class load_page extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      testURL: 'http://localhost:3888',
      liveURL: 'fakeWebsiteForNow',
      URL: '',
    }
    
  }

  first_load = async () => {
    Send.post('/ViewContracts', '', true)
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
  }

  load = async () => {
    return new Promise(function(resolve, reject) {
      
    });
  }
  
}

export default Load;