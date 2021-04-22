import React from "react";
import { Jumbotron } from "react-bootstrap";

const About = (props) => (
  <Jumbotron>
    <h1>Welcome to the Vilano Management Services Web Application</h1>
    <p>
      We are working on making this site a useful tool for you, so that you can easily take care of things like adding/updating contracts, task management, submitting tickets and many more things to come in the future.
      Eventually we will replace this small informative space with a proper landing page designed to look nice and pretty, but for now we just have this little informative area to tell you exactly what we are doing. At
      the moment this little space right here is just so the developer has some white space to fill in the page. If he didn't feel weird about grabbing random text from the internet and putting it here, he totally would.
      <br />
      <br />
      Enjoy your time using this application and please report any bugs or improvement ideas
      <a href="http://support.vilanosvs.com/" target="_blank" rel="noopener noreferrer">
        {" "}
        <u>here</u>
      </a>
      .
    </p>
  </Jumbotron>
);

export default About;
