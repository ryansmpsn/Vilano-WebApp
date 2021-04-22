import React from "react";
import { Jumbotron, Container, Row, Col, Card, ListGroup, ListGroupItem, Spinner, Badge } from "react-bootstrap";
import CountUp from "react-countup";
import { useNavigate } from "react-router";
import ContractAnalytics from "../contracts/ContractAnalytics";

export default function Home(props) {
  let { appData } = props;
  let navigate = useNavigate();

  return (
    <Row>
      <Col md="12">
        <Jumbotron>
          <Container className="text-center">
            <h1 variant="h1-responsive">Vilano</h1>
            <h4 className="text-muted">Alpha V 1.42</h4>
            <h4 className="text-muted">
              <small>Under Development</small>
              {/* {(67543452345).toLocaleString()} */}
            </h4>
          </Container>
        </Jumbotron>

        {props.appData ? (
          <>
            <Row>
              <Col md="4">
                <Card className="mb-4">
                  <Card.Header>Application Activity</Card.Header>
                  <Card.Body>
                    <ListGroup className="list-group-flush">
                      {/* <ListGroupItem>
                      Total Locations
                      <Badge variant="default" pill className="float-right">
                        <CountUp start={0} end={72} duration={5} />

                        <FontAwesomeIcon icon={faCity} className="ml-1" />
                      </Badge>
                    </ListGroupItem> */}
                      <ListGroupItem action onClick={() => navigate("/employees")}>
                        Drivers
                        <Badge variant="danger" pill className="float-right">
                          <CountUp start={0} end={appData.drivers.length} duration={3} />
                          <div className="fa">
                            <div className="fas fa-user-friends ml-1" />
                          </div>
                        </Badge>
                      </ListGroupItem>
                      <ListGroupItem action onClick={() => navigate("/contracts")}>
                        Contracts
                        <Badge variant="success" pill className="float-right">
                          <CountUp start={0} end={appData.contracts.length} duration={3} />
                          <div className="fa">
                            <div className="fas fa-file-contract ml-1" />
                          </div>
                        </Badge>
                      </ListGroupItem>
                      <ListGroupItem action onClick={() => navigate("/bids")}>
                        Bids
                        <Badge variant="primary" pill className="float-right">
                          <CountUp start={0} end={appData.bids.length} duration={3} />
                          <div className="fa">
                            <div className="fas fa-hand-holding-usd ml-1" />
                          </div>
                        </Badge>
                      </ListGroupItem>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <ContractAnalytics />
          </>
        ) : (
          <Spinner animation="border" variant="primary" />
        )}
      </Col>
    </Row>
  );
}
