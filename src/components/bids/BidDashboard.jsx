import React, { Component } from "react";
import Routing from "./Router";
import Send from "../../libs/send";
import CountUp from "react-countup";
import NavPerm from "../../libs/NavPerms";
import { Card, Row, Col, Badge, ListGroup, ListGroupItem, Nav, NavItem } from "react-bootstrap";
import { NavLink } from "react-router-dom";

class BidDashboard extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      accessLevel: NavPerm.nav_perm_check(),
      selectOptions: null,
      bidSearchCode: { bid_name: [] },
      selectedBidId: "null",
      selectedBid: "",
      selectedTrip: "",
      bidProfile: null,
      isSearching: false,
      contentInputRestrictions: null,
      allBids: null,
    };
  }

  setSelectedBid = (e) => {
    return this.setState({ selectedBid: e });
  };
  setSelectedBidId = (e) => {
    return this.setState({ selectedBidId: e });
  };
  setSelectedTrip = (e) => {
    return this.setState({ selectedTrip: e });
  };
  setBidSearchCode = (e) => {
    return this.setState({ bidSearchCode: e });
  };
  search = (bidSearch) => {
    return Send.post("/Bid/Search", bidSearch, this.props);
  };

  show_all() {
    return Send.post("/Bid/Search", "", this.props);
  }

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
      this.setState({ bidProfile: res.data[0] });
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
    Send.get("/Bid/BidIDs", this.props).then((res) => {
      if (this._isMounted) {
        this.setState({ selectOptions: res.data[0].options });
      }
    });

    Send.get("/Bid/Dropdowns/Bid/All", this.props).then((res) => {
      if (this._isMounted) {
        this.setState({ contentInputRestrictions: res.data });
      }
    });

    Send.post("/Bid/Search", "", this.props).then((res) => {
      if (this._isMounted) {
        this.setState({ allBids: res.data });
      }
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

        <Nav justify variant="tabs" defaultActiveKey="employee" className="pb-2 w-50 mx-auto my-3 ">
          <NavItem>
            <NavLink to="dashboard" activeClassName="text-primary border-top">
              Bids
            </NavLink>
          </NavItem>

          {sessionStorage.getItem("/bid/trips") >= 2 && (
            <NavItem>
              <NavLink to="trips" activeClassName="text-primary border-top">
                Trips
              </NavLink>
            </NavItem>
          )}
          {sessionStorage.getItem("/bid/ratesheets") >= 2 && (
            <NavItem>
              <NavLink to="ratesheets" activeClassName="text-primary border-top">
                Cost Segments
              </NavLink>
            </NavItem>
          )}
        </Nav>

        <Routing
          props={this.props}
          setSelectedTrip={this.setSelectedTrip}
          setSelectedBid={this.setSelectedBid}
          setSelectedBidId={this.setSelectedBidId}
          setBidSearchCode={this.setBidSearchCode}
          selectedTrip={this.state.selectedTrip}
          selectedBid={this.state.selectedBid}
          selectedBidId={this.state.selectedBidId}
          selectOptions={this.state.selectOptions}
          bidID
          isSearching={this.state.isSearching}
          bidProfile={this.state.bidProfile}
          modalName="Edit Bid"
          accessLevel={this.state.accessLevel}
          bidEditSubmitAction={this.bidEditSubmitAction}
          tripEditSubmitAction={this.tripEditSubmitAction}
          getSelectOptions={() => {
            return this.getSelectOptions();
          }}
          SearchFunction={(bidSearch) => {
            return this.search(bidSearch);
          }}
          showAll={() => {
            return this.show_all();
          }}
          appProps={this.props}
          bidSearch={this.state.bidSearchCode}
          getBids={() => {
            return this.getBids();
          }}
          getTrips={this.getTrips}
          addSelectOption={this.addSelectOption}
          contentInputRestrictions={this.state.contentInputRestrictions}
          allBids={this.state.allBids}
        />
      </>
    );
  }
}

export default BidDashboard;
