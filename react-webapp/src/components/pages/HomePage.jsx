import React from "react";
import { Jumbotron, Container } from "react-bootstrap";
import AdminCardSection1 from "./sections/AdminCardSection1";
import AdminCardSection2 from "./sections/AdminCardSection2";
import ChartSection1 from "./sections/ChartSection1";
import ChartSection2 from "./sections/ChartSection2";
import ModalSection from "./sections/ModalSection";

export default function Home() {
  return (
    <React.Fragment>
      <Jumbotron>
        <Container className="text-center">
          <h1 className="display-3">Vilano Management Services Application</h1>
          <h4 className="text-muted">In Progress</h4>
          <h4 className="text-muted">Under Development</h4>
          <br />
          <p>
            <small>
              Everything below is sample data and is meant for illustration
              purposes only.
            </small>
          </p>
        </Container>
      </Jumbotron>
      <AdminCardSection1 />
      <AdminCardSection2 />
      <ChartSection1 />
      <ChartSection2 />
      <ModalSection />
    </React.Fragment>
  );
}
