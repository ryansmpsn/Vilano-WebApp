import React from "react";
import { Jumbotron } from "react-bootstrap";
import { MDBNotification } from "mdbreact";

const About = (props) => (
  <>
    <MDBNotification
      show
      fade
      icon="envelope"
      iconClassName="green-text"
      title="New Message"
      message="Hello, user! You have a new message."
      text="just now"
    />
    <Jumbotron>
      <h1>Welcome to the PostalFleetSVS Alpha WebSoftware</h1>
      <p>
        We are ever working on making this site a useful tool for you, so that you can easily take care of things like
        adding/updating contracts, task management, submitting tickets and many more things to come in the future. Eventually we
        will replace this small informative space with a proper landing page designed to look nice and pretty, but for now we just
        have this little informative area to tell you exactly what we are doing. At the moment this little space right here is
        just so the developer has some white space to fill in the page. If he didn't feel weird about grabbing random text from
        the internet and putting it here, he totally would.
        <br />
        <br />
        At the end of the day, it would probably take the same amount of time to grab random text as it would to just type this
        anyway.
      </p>
    </Jumbotron>
  </>
);

export default About;
