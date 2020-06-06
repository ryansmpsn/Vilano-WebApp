import React from "react";
import { Jumbotron, Container } from "react-bootstrap";

export default function Home() {
  return (
    <Jumbotron>
      <Container className="text-center">
        <h1 className="display-3">Vilano Management Services Application</h1>
        <h4 className="text-muted">Alpha V 1.17</h4>
        <h4 className="text-muted">Under Development</h4>
        <br />
      </Container>
    </Jumbotron>
  );
}
