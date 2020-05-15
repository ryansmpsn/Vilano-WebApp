import React, { Component } from "react";
import { MDBCol, MDBCard, MDBCardBody, MDBCardHeader, MDBRow, MDBListGroup, MDBListGroupItem, MDBBadge, MDBIcon } from "mdbreact";
import { Bar, Pie } from "react-chartjs-2";
import { ProgressBar } from "react-bootstrap";

class BidAnalytics extends Component {
  render() {
    const dataBar = {
      labels: ["Eastern", "Southern", "Central"],
      datasets: [
        {
          label: "Postal Fleet",
          data: [112, 58, 48],
          backgroundColor: "rgba(245, 74, 85, 0.5)",
          borderWidth: 1,
        },
        {
          label: "Stage Line",
          data: [32, 2, 38],
          backgroundColor: "rgba(90, 173, 246, 0.5)",
          borderWidth: 1,
        },
        {
          label: "Postal FLeet Revenue",
          data: [134145986.86, 81333465.09, 5116486.44],
          backgroundColor: "rgba(245, 74, 85, 0.5)",
          borderWidth: 1,
        },
        {
          label: "Stage Line Revenue",
          data: [48435826.52, 1886802.22, 5633366.35],
          backgroundColor: "rgba(90, 173, 246, 0.5)",
          borderWidth: 1,
        },
      ],
    };

    const barChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            barPercentage: 1,
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
      <MDBRow className="mb-4">
        <MDBCol md="8" className="mb-4">
          <MDBCard className="mb-4">
            <MDBCardHeader>Bar Chart</MDBCardHeader>
            <MDBCardBody>
              <Bar data={dataBar} height={500} options={barChartOptions} />
            </MDBCardBody>
          </MDBCard>
          <MDBCard className="mb-4">
            <MDBCardHeader>Progress Chart</MDBCardHeader>
            <MDBCardBody>
              <MDBListGroup className="list-group-flush">
                <MDBListGroupItem>
                  Postal fleet
                  <ProgressBar>
                    <ProgressBar striped variant="success" animated now={35} key={1} />
                    <ProgressBar variant="warning" animated now={20} key={2} />
                    <ProgressBar striped variant="danger" animated now={10} key={3} />
                  </ProgressBar>
                </MDBListGroupItem>
              </MDBListGroup>
              <MDBListGroup className="list-group-flush">
                <MDBListGroupItem>
                  Stageline
                  <ProgressBar>
                    <ProgressBar striped variant="success" animated now={35} key={1} />
                    <ProgressBar variant="warning" animated now={20} key={2} />
                    <ProgressBar striped variant="danger" animated now={10} key={3} />
                  </ProgressBar>
                </MDBListGroupItem>
              </MDBListGroup>
              <MDBListGroup className="list-group-flush">
                <MDBListGroupItem>
                  Cost Margin 3
                  <ProgressBar striped variant="info" animated now={20} />
                </MDBListGroupItem>
              </MDBListGroup>
              <MDBListGroup className="list-group-flush">
                <MDBListGroupItem>
                  Cost Margin 4
                  <ProgressBar striped variant="warning" animated now={60} />
                </MDBListGroupItem>
              </MDBListGroup>
              <MDBListGroup className="list-group-flush">
                <MDBListGroupItem>
                  Cost Margin 5
                  <ProgressBar striped variant="danger" animated now={80} />
                </MDBListGroupItem>
              </MDBListGroup>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol md="4" className="mb-4">
          <MDBCard className="mb-4">
            <MDBCardHeader>Market Value</MDBCardHeader>
            <MDBCardBody>
              <Pie data={dataPie} height={330} options={{ responsive: true }} />
            </MDBCardBody>
          </MDBCard>
          <MDBCard className="mb-4">
            <MDBCardHeader>Important Statistics</MDBCardHeader>
            <MDBCardBody>
              <MDBListGroup className="list-group-flush">
                <MDBListGroupItem>
                  Sales
                  <MDBBadge color="success-color" pill className="float-right">
                    22%
                    <MDBIcon icon="arrow-up" className="ml-1" />
                  </MDBBadge>
                </MDBListGroupItem>
                <MDBListGroupItem>
                  Traffic
                  <MDBBadge color="danger-color" pill className="float-right">
                    5%
                    <MDBIcon icon="arrow-down" className="ml-1" />
                  </MDBBadge>
                </MDBListGroupItem>
                <MDBListGroupItem>
                  Orders
                  <MDBBadge color="default-color-dark" pill className="float-right">
                    14
                  </MDBBadge>
                </MDBListGroupItem>
                <MDBListGroupItem>
                  Issues
                  <MDBBadge color="primary-color" pill className="float-right">
                    123
                  </MDBBadge>
                </MDBListGroupItem>
                <MDBListGroupItem>
                  Messages
                  <MDBBadge color="unique-color" pill className="float-right">
                    8
                  </MDBBadge>
                </MDBListGroupItem>
                <MDBListGroupItem>
                  Notifications
                  <MDBBadge color="warning-color-dark" pill className="float-right">
                    <MDBIcon icon="exclamation-circle" className="ml-1" />
                    15
                  </MDBBadge>
                </MDBListGroupItem>
              </MDBListGroup>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    );
  }
}

export default BidAnalytics;
