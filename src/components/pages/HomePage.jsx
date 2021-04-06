import React from "react";
import { Jumbotron, Container, Row, Col, Card, ListGroup, ListGroupItem, ProgressBar, Spinner, Badge } from "react-bootstrap";
import { Bar, Pie } from "react-chartjs-2";
import CountUp from "react-countup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCity } from "@fortawesome/free-solid-svg-icons";

export default function Home(props) {
  let { appData } = props;

  return (
    <Row>
      <Col md="12">
        <Jumbotron>
          <Container className="text-center">
            <h1 variant="h1-responsive">Vilano</h1>
            <h4 className="text-muted">Alpha V 1.41</h4>
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
                        <Badge color="default-color-dark" pill className="float-right">
                          <CountUp start={0} end={72} duration={5} />

                          <FontAwesomeIcon icon={faCity} className="ml-1" />
                        </Badge>
                      </ListGroupItem>
                      <ListGroupItem>
                        Drivers
                        <Badge color="danger-color" pill className="float-right">
                          <CountUp start={0} end={appData.drivers.length} duration={3} />
                        </Badge>
                      </ListGroupItem>
                      <ListGroupItem>
                        Contracts
                        <Badge color="success-color" pill className="float-right">
                          <CountUp start={0} end={appData.contracts.length} duration={3} />
                        </Badge>
                      </ListGroupItem>
                      <ListGroupItem>
                        Bids
                        <Badge color="primary-color" pill className="float-right">
                          <CountUp start={0} end={appData.bids.length} duration={3} />
                        </Badge>
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
