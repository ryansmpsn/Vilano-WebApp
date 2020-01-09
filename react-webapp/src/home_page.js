import React from 'react';
import ReactDOM from 'react-dom';

export default class Car extends React.Component {
  render() {
    return (
      <div class="container">
        <div class="row">
          <h1>Welcome to the PostalFleetSVS Beta WebSoftware</h1>
        </div>
        <div class="row">
          <div class="col-sm">
            <h3>We are ever working on making this site a useful tool for you, 
            so that you can more easily take care of things like adding/updating contracts, task management, 
            submitting tickets and many more things to come in the future.</h3>
          </div>
          <div class="col-sm">
            <h3>Eventually we will replace this small informative space with a proper landing page designed to look nice and pretty, 
            but for now we just have this little informative area to tell you exactly what we are doing.</h3>
          </div>
          <div class="col-sm">
            <h3>At the moment this little space right here is just so the developer has some white space to fill in the page. 
            If he didn't feel weird about grabbing random text from the internet and putting it here, he totally would. <br /><br />
            At the end of the day, it would probably take the same amount of time to grab random text as it would to just type this anyway.</h3>
          </div>
        </div>

        <div class="row">
          <h1>Oh yes if you are seeing this little landing page, you are not logged in, btw. That is why the developer put it here.</h1>
        </div>
      </div>
      );
  }
}
