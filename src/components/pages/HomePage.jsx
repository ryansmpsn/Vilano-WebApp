import React from "react";
import { Jumbotron, Container, Row, Col, Card, ListGroup, ListGroupItem, ProgressBar, Spinner } from "react-bootstrap";
import { MDBIcon, MDBBadge } from "mdbreact";
import { Bar, Pie } from "react-chartjs-2";
import CountUp from "react-countup";

export default function Home(props) {
  let { appData } = props;

  return (
    <Row>
      <Col md="12">
        <Jumbotron>
          <Container className="text-center">
            <h1 variant="h1-responsive">Vilano</h1>
            <h4 className="text-muted">Alpha V 1.40</h4>
            <h4 className="text-muted">
              <small>Under Development</small>
              {/* {(67543452345).toLocaleString()} */}
            </h4>
          </Container>
        </Jumbotron>

        {false &&
          (props.appData ? (
            <Row>
              <Col md="4">
                <Card className="mb-4">
                  <Card.Header>Application Activity</Card.Header>
                  <Card.Body>
                    <ListGroup className="list-group-flush">
                      <ListGroupItem>
                        Total Locations
                        <MDBBadge color="default-color-dark" pill className="float-right">
                          <CountUp start={0} end={72} duration={5} />

                          <MDBIcon icon="city" className="ml-1" />
                        </MDBBadge>
                      </ListGroupItem>
                      <ListGroupItem>
                        Drivers
                        <MDBBadge color="danger-color" pill className="float-right">
                          <CountUp start={0} end={appData.drivers.length} duration={3} />
                        </MDBBadge>
                      </ListGroupItem>
                      <ListGroupItem>
                        Contracts
                        <MDBBadge color="success-color" pill className="float-right">
                          <CountUp start={0} end={appData.contracts.length} duration={3} />
                        </MDBBadge>
                      </ListGroupItem>
                      <ListGroupItem>
                        Bids
                        <MDBBadge color="primary-color" pill className="float-right">
                          <CountUp start={0} end={appData.bids.length} duration={3} />
                        </MDBBadge>
                      </ListGroupItem>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          ) : (
            <Spinner animation="border" variant="primary" />
          ))}
      </Col>
    </Row>
  );
}
