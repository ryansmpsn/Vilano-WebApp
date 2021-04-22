import React from "react";

const Footer = () => {
  return (
    <footer color="blue" className="text-center font-small darken-4 page-footer">
      <p className="footer-copyright mb-0 py-2 text-center">
        &copy; {new Date().getFullYear()} Copyright:
        <a href="/"> Vilano Management Services, Inc. All rights reserved </a>
      </p>
    </footer>
  );
};

export default Footer;
