import React, { useState } from "react";
import SideNav from "./SideNav";
import NavBar from "./NavBar";

function Navigation(props) {
  const [toggle, setToggle] = useState(false);

  return (
    <React.Fragment>
      <NavBar toggle={toggle} setToggle={setToggle} />
      <SideNav {...props} toggle={toggle} setToggle={setToggle} />
    </React.Fragment>
  );
}

export default Navigation;
