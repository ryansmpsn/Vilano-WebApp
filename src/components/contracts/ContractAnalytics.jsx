import React, { Component } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { ListGroup, ListGroupItem, Card, Col, ProgressBar, Row, Badge } from "react-bootstrap";
import CountUp from "react-countup";

class ContractAnalytics extends Component {
  render() {
    const dataBar = {
      labels: ["Eastern", "Southern", "Central"],
      datasets: [
        {
          label: "POSTAL FLEET SERVICES INC Total Revenue: $220,595,938.40",
          data: [134145986.86, 81333465.09, 5116486.44],
          backgroundColor: "rgba(245, 74, 85, 0.5)",
          borderWidth: 1,
        },
        {
          label: "THE STAGELINE COMPANY Total Revenue: $55,955,995.09",
          data: [48435826.52, 1886802.22, 5633366.35],
          backgroundColor: "rgba(90, 173, 246, 0.5)",
          borderWidth: 1,
        },
      ],
    };

    const barChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      dataset: {
        barPercentage: 1,
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              display: true,
              color: "rgba(0, 0, 0, 0.1)",
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              display: true,
              color: "rgba(0, 0, 0, 0.1)",
            },
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };

    //   211929497.34,      15233923.77,     386852480.70,     72317912.19,      6994797.65,      6163179.33,      55525652.46,     106378019.48,      4382487.04,146984621.56,4603807.62,4191624.78,90913748.18,96323705.46,42286598.18,49478274.35,35883080.48,2209458.63,14263535.95,59112956.14,2003899.13,

    const dataPie = {
      labels: [
        "POSTAL FLEET SERVICES INC",
        "AMERITRANS EXPRESS LLC",
        "EAGLE EXPRESS LINES INC",
        "THUNDER RIDGE TRANS INC",
        "PONY EXPRESS DELIVERY INC",
        "R L TRUCKING INC",
        "THE STAGELINE COMPANY",
        "MAIL CONTRACTORS OF AMERICA INC",
        "TNSTUMPFF ENTERPRISES LLC",
        "PAT SALMON & SONS INC",
        "ZETRICK LLC",
        "CHRISTIAN D GOHN",
        "SOUTHERN MAIL SERVICE INC",
        "MIDWEST TRANSPORT INC",
        "DAVIS MAIL SERVICES INC",
        "URSA MAJOR CORPORATION",
        "DAVENPORT TRANSPORTATION INC",
        "LEE A ERICKSON",
        "SALANGER TRUCKING LLC",
        "PAT SALMON & SONS OF FLORIDA INC",
        "NOBLE BAY EQUITIES LLC",
      ],
      datasets: [
        {
          data: [198, 185, 129, 124, 102, 94, 71, 69, 60, 59, 54, 44, 39, 39, 38, 35, 34, 31, 30, 28, 28],
          backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360", "#ac64ad"],
          hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774", "#da92db"],
        },
      ],
    };
    return (
      <Row className="mb-4">
        <Col md="8" className="mb-4">
          <Card className="mb-4">
            <Card.Header>Revenue By Region</Card.Header>
            <Card.Body>
              <Bar data={dataBar} height={500} options={barChartOptions} />
            </Card.Body>
          </Card>
          <Card className="mb-4">
            <Card.Header>Progress Chart</Card.Header>
            <Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>
                  POSTAL FLEET SERVICES INC
                  <ProgressBar>
                    <ProgressBar striped variant="danger" animated now={61} key={1} />
                    <ProgressBar variant="success" animated now={37} key={2} />
                    <ProgressBar striped variant="info" animated now={2} key={3} />
                  </ProgressBar>
                </ListGroupItem>
              </ListGroup>
              <ListGroup className="list-group-flush">
                <ListGroupItem>
                  Eastern Revenue:
                  <CountUp start={0} end={134145986.86} duration={8} decimals={2} prefix=" $" separator="," suffix=" / 61%" />
                  <ProgressBar striped variant="danger" animated now={61} />
                </ListGroupItem>
              </ListGroup>
              <ListGroup className="list-group-flush">
                <ListGroupItem>
                  Southern Revenue:
                  <CountUp start={0} end={81333465.09} duration={8} decimals={2} prefix=" $" separator="," suffix=" / 37%" />
                  <ProgressBar striped variant="success" animated now={37} />
                </ListGroupItem>
              </ListGroup>
              <ListGroup className="list-group-flush">
                <ListGroupItem>
                  Central Revenue:
                  <CountUp start={0} end={5116486.44} duration={8} decimals={2} prefix=" $" separator="," suffix=" / 2%" />
                  <ProgressBar striped variant="info" animated now={2} />
                </ListGroupItem>
              </ListGroup>
              <ListGroup className="list-group-flush">
                <ListGroupItem>
                  THE STAGELINE COMPANY
                  <ProgressBar>
                    <ProgressBar striped variant="danger" animated now={87} key={1} />
                    <ProgressBar variant="success" animated now={10} key={2} />
                    <ProgressBar striped variant="info" animated now={3} key={3} />
                  </ProgressBar>
                </ListGroupItem>
              </ListGroup>
              <ListGroup className="list-group-flush">
                <ListGroupItem>
                  Eastern Revenue:
                  <CountUp start={0} end={48435826.52} duration={8} decimals={2} prefix=" $" separator="," suffix=" / 87%" />
                  <ProgressBar striped variant="danger" animated now={87} />
                </ListGroupItem>
              </ListGroup>
              <ListGroup className="list-group-flush">
                <ListGroupItem>
                  Southern Revenue:
                  <CountUp start={0} end={1886802.22} duration={8} decimals={2} prefix=" $" separator="," suffix=" / 10%" />
                  <ProgressBar striped variant="success" animated now={10} />
                </ListGroupItem>
              </ListGroup>
              <ListGroup className="list-group-flush">
                <ListGroupItem>
                  Central Revenue:
                  <CountUp start={0} end={5633366.35} duration={8} decimals={2} prefix=" $" separator="," suffix=" / 3%" />
                  <ProgressBar striped variant="info" animated now={3} />
                </ListGroupItem>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md="4" className="mb-4">
          <Card className="mb-4">
            <Card.Header>Market Share</Card.Header>
            <Card.Body>
              <Pie data={dataPie} height={330} options={{ responsive: true }} />
            </Card.Body>
          </Card>
          <Card className="mb-4">
            <Card.Header>Postal Fleet Services Location Count By Region</Card.Header>
            <Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>
                  Total Locations
                  <Badge variant="default" pill className="float-right">
                    <CountUp start={0} end={218} duration={5} />
                    <div className="fas fa-city ml-1" />
                  </Badge>
                </ListGroupItem>
                <ListGroupItem>
                  Eastern
                  <Badge variant="danger" pill className="float-right">
                    <CountUp start={0} end={112} duration={5} />
                  </Badge>
                </ListGroupItem>
                <ListGroupItem>
                  Southern
                  <Badge variant="success" pill className="float-right">
                    <CountUp start={0} end={58} duration={5} />
                  </Badge>
                </ListGroupItem>
                <ListGroupItem>
                  Central
                  <Badge variant="primary" pill className="float-right">
                    <CountUp start={0} end={48} duration={5} />
                  </Badge>
                </ListGroupItem>
              </ListGroup>
            </Card.Body>
          </Card>
          <Card className="mb-4">
            <Card.Header>The Stageline Company Location Count By Region</Card.Header>
            <Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>
                  Total Locations
                  <Badge variant="default" pill className="float-right">
                    <CountUp start={0} end={72} duration={5} />
                    <div className="fas fa-city ml-1" />
                  </Badge>
                </ListGroupItem>
                <ListGroupItem>
                  Eastern
                  <Badge variant="danger" pill className="float-right">
                    <CountUp start={0} end={32} duration={5} />
                  </Badge>
                </ListGroupItem>
                <ListGroupItem>
                  Southern
                  <Badge variant="success" pill className="float-right">
                    <CountUp start={0} end={2} duration={5} />
                  </Badge>
                </ListGroupItem>
                <ListGroupItem>
                  Central
                  <Badge variant="primary" pill className="float-right">
                    <CountUp start={0} end={38} duration={5} />
                  </Badge>
                </ListGroupItem>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default ContractAnalytics;
