import React, { useEffect } from "react";
import PortalPage from "./PortalPage";

useEffect(() => {
  fetch("https://apis.google.com/js/platform.js");
}, []);
function ResourcesPage() {
  fetch("https://apis.google.com/js/platform.js");

  function signOut() {
    gapi.auth2
      .getAuthInstance()
      .disconnect()
      .then(console.log("Notification here You have been Signed Out"));
  }
  function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    if (googleUser.getHostedDomain() === "postalfleetsvs.com")
      return <PortalPage />;
    else if (googleUser.getHostedDomain() === "omega-mile.com")
      return <PortalPage />;
    else if (googleUser.getHostedDomain() === "stagelinecompany.com")
      return <PortalPage />;
    else {
      console.log("Put Warning Notification Here -not authorized-");
      signOut();
    }
  }
  return <h1> Hello People</h1>;
}

export default ResourcesPage;
