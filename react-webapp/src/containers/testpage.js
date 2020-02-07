import React from "react";
import ReactDOM from "react-dom";
import { Panel } from "react-bootstrap";

export default class Car extends React.Component {
  render() {
    return (
      <Panel>
        <Panel.Heading as="h5">TestPage</Panel.Heading>
        <Panel.Body>
          <Panel.Title>
            Welcome to the PostalFleetSVS Beta WebSoftware
          </Panel.Title>
          We are ever working on making this site a useful tool for you, so that
          you can more easily take care of things like adding/updating
          contracts, task management, submitting tickets and many more things to
          come in the future. Eventually we will replace this small informative
          space with a proper landing page designed to look nice and pretty, but
          for now we just have this little informative area to tell you exactly
          what we are doing. At the moment this little space right here is just
          so the developer has some white space to fill in the page. If he
          didn't feel weird about grabbing random text from the internet and
          putting it here, he totally would. <br />
          <br />
          At the end of the day, it would probably take the same amount of time
          to grab random text as it would to just type this anyway.
        </Panel.Body>
      </Panel>
    );
  }
}
