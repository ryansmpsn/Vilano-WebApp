import React, { Component } from "react";
import Routing from "./Router";
import Send from "../../libs/send";
import CountUp from "react-countup";
import NavPerm from "../../libs/NavPerms";
import { MDBCard, MDBCardHeader, MDBCardBody, MDBRow, MDBCol, MDBIcon, MDBBadge, MDBListGroup, MDBListGroupItem } from "mdbreact";
import { Nav, NavItem } from "react-bootstrap";
import { NavLink } from "react-router-dom";

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
        <MDBCard className="cascading-admin-card mb-4">
          <MDBCardHeader>
            <div className="admin-up">
              <MDBIcon icon="hand-holding-usd" className="primary-color" />
              <MDBCard className="w-25 ml-auto" style={{ marginTop: "-50px" }}>
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
              <h2 className="mb-5 text-center" style={{ marginTop: "-50px" }}>
                Bid Dashboard
              </h2>
            </div>
          </MDBCardHeader>
          {this.state.bidProfile !== null && (
            <MDBCardBody>
              <MDBRow>
                {this.state.bidProfile.map(
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
            </MDBCardBody>
          )}
        </MDBCard>

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
        />
      </>
    );
  }
}

export default BidDashboard;
