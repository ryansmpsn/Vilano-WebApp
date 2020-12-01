import React from "react";

const NavPerm = new (class nav_perms extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {};
  }
  nav_perm_check = (route = null) => {
    route = route == null ? window.location.pathname : route;
    var perm = sessionStorage.getItem(route);
    perm = perm != null ? perm : "NA";
    return perm;
  };

  nav_hash_perm_check = () => {
    var perm = sessionStorage.getItem(
      window.location.pathname + window.location.hash
    );
    return perm;
  };
})();

export default NavPerm;
