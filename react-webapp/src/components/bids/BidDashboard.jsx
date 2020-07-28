import React, { Component } from "react";
import Routing from "./Router";
import Send from "../../libs/send";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import NavPerm from "../../libs/NavPerms";
import { MDBCard, MDBCardHeader, MDBCardBody, MDBRow, MDBCol, MDBIcon, MDBBadge, MDBListGroup, MDBListGroupItem } from "mdbreact";

class BidDashboard extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      accessLevel: NavPerm.nav_perm_check(),
      selectOptions: [],
      bidSearchCode: { bid_name: [] },
      selectedBidId: "null",
      selectedBid: "",
      selectedTrip: "",
      bidProfile: null,
      isSearching: false,
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
    console.log(bidSearch);

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
  getSelectOptions() {
    return Send.get("/Bid/Dropdowns/Bid/All", this.props);
  }
  addSelectOption = (e) => {
    let options = this.state.selectOptions;
    let newOption = { label: e, value: options.length + 1 };
    options.push(newOption);
    this.setState({ selectOptions: options });
  };

  componentDidMount() {
    this._isMounted = true;
    return Send.get("/Bid/BidIDs", this.props).then((res) => {
      if (this._isMounted) {
        this.setState({ selectOptions: res.data[0].options });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <>
        <MDBRow className="mb-4">
          <MDBCol xl="12" md="12" className="mb-r">
            <MDBCard className="cascading-admin-card">
              <MDBCardHeader>
                <div className="admin-up">
                  <MDBIcon icon="hand-holding-usd" className="primary-color" />
                  <h1 className="m-3 text-center">Bid Dashboard</h1>
                  <MDBRow style={{ margin: -20 }}>
                    <MDBCol md="4" className="ml-auto mb-4">
                      <MDBCard className="mb-4">
                        <MDBCardHeader>Statistics</MDBCardHeader>
                        <MDBCardBody>
                          <MDBListGroup className="list-group-flush">
                            <MDBListGroupItem>
                              Active Bids
                              <MDBBadge color="primary-color" pill className="float-right">
                                <CountUp start={0} end={this.state.selectOptions.length} duration={5} />
                              </MDBBadge>
                            </MDBListGroupItem>
                          </MDBListGroup>
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                  </MDBRow>
                </div>
              </MDBCardHeader>
              <MDBCardBody>
                <MDBRow>
                  {this.state.bidProfile !== null &&
                    this.state.bidProfile.map(
                      (c, index) =>
                        c.label !== null &&
                        typeof c.value !== "object" && (
                          <MDBCol md="2" key={c.label + index}>
                            <p className="h5 mb-1">{c.label}: </p>
                            <div className="text-muted">{c.value}</div>
                          </MDBCol>
                        )
                    )}
                </MDBRow>
                <MDBRow>
                  {this.state.bidProfile === null ? (
                    <MDBCol>
                      <Link to="dashboard" className="btn btn-primary btn-sm btn-outline-info">
                        Bids
                      </Link>
                      <Link to="trips" className="btn btn-primary btn-sm btn-outline-info">
                        Trips
                      </Link>
                      <Link to="costsegment" className="btn btn-primary btn-sm btn-outline-info">
                        Rate Sheets
                      </Link>
                      <Link to="routes" className="btn btn-primary btn-sm btn-outline-info">
                        Routes
                      </Link>
                    </MDBCol>
                  ) : (
                    <MDBCol>
                      <Link to="routes" className="btn btn-primary btn-sm btn-outline-info float-right">
                        Routes
                      </Link>
                      <Link to="costsegment" className="btn btn-primary btn-sm btn-outline-info float-right">
                        Rate Sheets
                      </Link>
                      <Link to="trips" className="btn btn-primary btn-sm btn-outline-info float-right">
                        Trips
                      </Link>
                      <Link to="dashboard" className="btn btn-primary btn-sm btn-outline-info float-right">
                        Bids
                      </Link>
                    </MDBCol>
                  )}
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
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
        />
      </>
    );
  }
}

export default BidDashboard;
