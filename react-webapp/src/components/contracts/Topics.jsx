import React from "react";
import { useRouteMatch, Link, Switch, Route } from "react-router-dom";
import { MDBCard, MDBCardHeader, MDBCardBody } from "mdbreact";
import Topic from "./Topic";
export default function Topics() {
  // The `path` lets us build <Route> paths that are
  // relative to the parent route, while the `url` lets
  // us build relative links.
  let { path, url } = useRouteMatch();

  return (
    <MDBCard className="m-2">
      <MDBCardHeader>
        <h2>Trips Information (Nested Routes)</h2>
      </MDBCardHeader>
      <MDBCardBody>
        <h6>This is a list of all the Trips :</h6>
        <ul>
          <li>
            <Link to={`${url}/rendering`}>Rendering with React</Link>
          </li>
          <li>
            <Link to={`${url}/components`}>Components</Link>
          </li>
          <li>
            <Link to={`${url}/props-v-state`}>Props v. State</Link>
          </li>
          <li>
            <Link to={`${url}/trip100`}>Trip #100</Link>
          </li>
          <li>
            <Link to={`${url}/trip200`}>Trip #200</Link>
          </li>
        </ul>
        <Switch>
          <Route exact path={path}>
            <h3>Please select a trip to view associated routes.</h3>
          </Route>
          <Route path={`${path}/:topicId`}>
            <Topic />
          </Route>
        </Switch>
      </MDBCardBody>
    </MDBCard>
  );
}
