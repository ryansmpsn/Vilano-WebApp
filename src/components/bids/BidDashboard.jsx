import React, { Component } from "react";
import Routing from "./Router";
import Send from "../../libs/send";
import CountUp from "react-countup";
import { Card, Row, Col, Badge, ListGroup, ListGroupItem } from "react-bootstrap";
import axios from "axios";

class BidDashboard extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      selectOptions: null,
      bidSearchCode: { bid_name: [] },
      bidProfile: null,
      isSearching: false,
      contentInputRestrictions: null,
      allBids: null,
      allEmployees: null,
      tripDetailOptions: null,
    };
  }

  setBidSearchCode = (e) => {
    return this.setState({ bidSearchCode: e });
  };
  search = (bidSearch) => {
    return Send.post("/Bid/Search", bidSearch, this.props);
  };

  getTrips = (e) => {
    this.setState({ isSearching: true });
    return Send.get(e, this.props).then((res) => {
      this.setState({ bidProfile: res.data[0] });
      this.setState({ isSearching: false });
    });
  };

  bidEditSubmitAction = (editBid) => {
    return Send.post("/Bid/Bid", editBid, this.props);
  };

  tripEditSubmitAction = (editTrip) => {
    this.setState({ isSearching: true });
    return Send.post("/Bid/BidTrip", editTrip, this.props).then((res) => {
      this.setState({ isSearching: false });
    });
  };

  addSelectOption = (e) => {
    let options = this.state.selectOptions;
    let newOption = { label: e, value: options.length + 1 };
    options.push(newOption);
    this.setState({ selectOptions: options });
  };

  componentDidMount() {
    this._isMounted = true;

    const requestOne = Send.get("/Bid/BidIDs");
    const requestTwo = Send.get("/Bid/Dropdowns/Bid/All");
    const requestThree = Send.post("/Bid/Search", "", this.props);
    const requestFour = Send.get("/Employee/Dropdowns/Employee/All");
    const requestFive = Send.get("/Contract/Dropdowns/TripDetails/All");

    axios
      .all([requestOne, requestTwo, requestThree, requestFour, requestFive])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          const responseTwo = responses[1];
          const responseThree = responses[2];
          const responseFour = responses[3];
          const responseFive = responses[4];

          if (this._isMounted) {
            this.setState({ selectOptions: responseOne.data[0].options });
            this.setState({ contentInputRestrictions: responseTwo.data });
            this.setState({ allBids: responseThree.data });
            this.setState({ allEmployees: responseFour.data });
            this.setState({ tripDetailOptions: responseFive.data });
          }
        })
      )
      .catch((errors) => {
        // react on errors
        console.log(errors);
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <>
        <Card className="cascading-admin-card mb-4">
          <Card.Header>
            <div className="admin-up">
              <div className="fa">
                <div className="fas fa-hand-holding-usd " />
              </div>
              <Card className="w-25 ml-auto" style={{ marginTop: "-50px" }}>
                <Card.Header>Statistics</Card.Header>
                <Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>
                      Active Bids
                      <Badge variant="primary" pill className="float-right">
                        <CountUp start={0} end={this.state.selectOptions ? this.state.selectOptions.length : 0} duration={5} />
                      </Badge>
                    </ListGroupItem>
                  </ListGroup>
                </Card.Body>
              </Card>
              <h2 className="mb-5 text-center" style={{ marginTop: "-50px" }}>
                Bid Dashboard
              </h2>
            </div>
          </Card.Header>
          {this.state.bidProfile !== null && (
            <Card.Body>
              <Row>
                {this.state.bidProfile.map(
                  (c, index) =>
                    c.label !== null &&
                    typeof c.value !== "object" && (
                      <Col md="2" key={c.label + index}>
                        <p className="h5 mb-1">{c.label}: </p>
                        <div className="text-muted">{c.value}</div>
                      </Col>
                    )
                )}
              </Row>
            </Card.Body>
          )}
        </Card>

        <Routing
          props={this.props}
          setBidSearchCode={this.setBidSearchCode}
          selectOptions={this.state.selectOptions}
          isSearching={this.state.isSearching}
          bidEditSubmitAction={this.bidEditSubmitAction}
          tripEditSubmitAction={this.tripEditSubmitAction}
          SearchFunction={(bidSearch) => {
            return this.search(bidSearch);
          }}
          appProps={this.props}
          bidSearch={this.state.bidSearchCode}
          addSelectOption={this.addSelectOption}
          contentInputRestrictions={this.state.contentInputRestrictions}
          allBids={this.state.allBids}
          allEmployees={this.state.allEmployees}
          tripDetailOptions={this.state.tripDetailOptions}
        />
      </>
    );
  }
}

export default BidDashboard;
