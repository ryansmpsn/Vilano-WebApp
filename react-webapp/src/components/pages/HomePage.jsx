import React from "react";
import { Jumbotron, Container } from "react-bootstrap";

export default function Home() {
  return (
    <Jumbotron>
      <Container className="text-center">
        <h1 variant="h1-responsive">Vilano</h1>
        <h4 className="text-muted">Alpha V 1.35</h4>
        <h4 className="text-muted">
          <small>Under Development</small>
          {/* {(67543452345).toLocaleString()} */}
        </h4>
      </Container>
    </Jumbotron>
  );
}
