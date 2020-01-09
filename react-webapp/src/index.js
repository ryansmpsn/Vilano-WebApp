import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './login';
import Car from './car';
import LoggedINTest from './loggedin_test';
import Footer from './Footer';
import Load from './load_page';
import Send from './send';
//import GetTest from './GetTest';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';



/*
Send.get('/Loggedin')
.then(respo => {
    console.log(respo);
    if (respo.data.match === "true"){
        ReactDOM.render(<LoggedINTest />, document.getElementById('CentralContent'));
    } else{ 
        ReactDOM.render(<Car />, document.getElementById('CentralContent'));
    }
}).catch(err =>{console.log(err)});*/

 
Load.first_load();



ReactDOM.render(<Login />, document.getElementById('RightNav'));
ReactDOM.render(<Footer />, document.getElementById('Footer'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
