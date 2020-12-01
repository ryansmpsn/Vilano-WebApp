import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import PortalPage from "./PortalPage";

function ResourcesPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const responseGoogle = response => {
    let hostedDomain = response.profileObj.email.split("@")[1];
    if (hostedDomain === "postalfleetsvs.com") {
      setIsAuthenticated(true);
    } else if (hostedDomain === "omega-mile.com") {
      setIsAuthenticated(true);
    } else if (hostedDomain === "stagelinecompany.com") {
      setIsAuthenticated(true);
    } else setIsAuthenticated(false);
  };

  return (
    <>
      {!isAuthenticated ? (
        <PortalPage />
      ) : (
        <div>
          <h1> I am not Authenticated</h1>
          <GoogleLogin
            clientId="464534557184-sd8anr6skkb7r1pe0l2e3qd0eepgu9c1.apps.googleusercontent.com"
            buttonText="Login"
            isSignedIn={true}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      )}
    </>
  );
}

export default ResourcesPage;
