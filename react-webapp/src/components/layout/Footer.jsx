import React from "react";
import { MDBFooter } from "mdbreact";

const Footer = () => {
  return (
    <MDBFooter color="blue" className="text-center font-small darken-3">
      <p className="footer-copyright mb-0 py-2 text-center">
        &copy; {new Date().getFullYear()} Copyright:
        <a href="/"> Vilano Management Services, Inc. All rights reserved </a>
      </p>
    </MDBFooter>
  );
};

export default Footer;
