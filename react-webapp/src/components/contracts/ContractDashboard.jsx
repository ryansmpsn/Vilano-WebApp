import React, { Component } from "react";
import Routing from "./Routing";
import Send from "../../libs/send";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import NavPerm from "../../libs/NavPerms";
import { MDBCard, MDBCardHeader, MDBCardBody, MDBRow, MDBCol, MDBIcon, MDBBadge, MDBListGroup, MDBListGroupItem } from "mdbreact";

class ContractDashboard extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      accessLevel: NavPerm.nav_perm_check(),
      selectOptions: [],
      selectedContractId: "null",
      selectedContract: "",
      selectedTrip: "",
      contractProfile: null,
      isSearching: false,
    };
  }

  setSelectedContract = (e) => {
    return this.setState({ selectedContract: e });
  };
  setSelectedContractId = (e) => {
    return this.setState({ selectedContractId: e });
  };
  setSelectedTrip = (e) => {
    return this.setState({ selectedTrip: e });
  };

  search = (contractSearch) => {
    return Send.post("/Contract/Search", contractSearch, this.props);
  };

  show_all() {
    return Send.post("/Contract/Search", "", this.props);
  }

  getTrips = (e) => {
    this.setState({ isSearching: true });
    return Send.get(e, this.props).then((res) => {
      this.setState({ contractProfile: res.data[0] });
      this.setState({ isSearching: false });
    });
  };

  contractEditSubmitAction = (editContract) => {
    return Send.post("/Contract/Contract", editContract, this.props);
  };
  tripEditSubmitAction = (editTrip) => {
    this.setState({ isSearching: true });

    return Send.post("/Contract/ContractTrip", editTrip, this.props).then((res) => {
      this.setState({ contractProfile: res.data[0] });
      this.setState({ isSearching: false });
    });
  };
  getSelectOptions() {
    return Send.get("/Contract/Dropdowns/Contract/All", this.props);
  }

  componentDidMount() {
    this._isMounted = true;
    return Send.get("/Contract/Ids", this.props).then((res) => {
      let contractData = res.data;
      let getSelectOptions = [];
      contractData.map((item, index) => {
        return getSelectOptions.push({
          label: item[1].value,
          value: item[0].value,
        });
      });
      if (this._isMounted) {
        this.setState({ selectOptions: getSelectOptions });
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
                  <MDBIcon icon="file-invoice-dollar" className="primary-color" />
                  <h1 className="m-3 text-center">Contract Dashboard</h1>
                  <MDBRow style={{ margin: -20 }}>
                    <MDBCol md="4" className="ml-auto mb-4">
                      <MDBCard className="mb-4">
                        <MDBCardHeader>Statistics</MDBCardHeader>
                        <MDBCardBody>
                          <MDBListGroup className="list-group-flush">
                            <MDBListGroupItem>
                              Active Contracts
                              <MDBBadge color="primary-color" pill className="float-right">
                                <CountUp start={0} end={this.state.selectOptions.length} duration={5} />
                              </MDBBadge>
                            </MDBListGroupItem>
                            {/* <MDBListGroupItem>
                              Total Trips
                              <MDBBadge color="default-color-dark" pill className="float-right">
                                <CountUp start={0} end={0} duration={5} />
                              </MDBBadge>
                            </MDBListGroupItem>
                            <MDBListGroupItem>
                              Total Routes
                              <MDBBadge color="unique-color" pill className="float-right">
                                <CountUp start={0} end={0} duration={8} />
                              </MDBBadge>
                            </MDBListGroupItem> */}
                          </MDBListGroup>
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                  </MDBRow>
                </div>
              </MDBCardHeader>
              <MDBCardBody>
                {this.state.contractProfile !== null && " Selected Contract Information"}
                <MDBRow>
                  {this.state.contractProfile !== null &&
                    this.state.contractProfile.map(
                      (c, index) =>
                        c.label !== null &&
                        typeof c.value !== "object" && (
                          <MDBCol md="2" key={c.label + index}>
                            <p className="h5 mb-1">{c.label}: </p>
                            <div className="text-muted">{c.value}</div>
                          </MDBCol>
                        )
                    )}
                  {this.state.contractProfile === null ? (
                    <MDBCol>
                      <Link to="dashboard" className="btn btn-primary btn-sm btn-outline-info">
                        Contracts
                      </Link>
                      <Link to="trips" className="btn btn-primary btn-sm btn-outline-info">
                        Trips
                      </Link>
                      <Link to="costsegment" className="btn btn-primary btn-sm btn-outline-info">
                        Rate Sheets
                      </Link>
                    </MDBCol>
                  ) : (
                    <MDBCol>
                      <Link to="costsegment" className="btn btn-primary btn-sm btn-outline-info float-right">
                        Rate Sheets
                      </Link>
                      <Link to="trips" className="btn btn-primary btn-sm btn-outline-info float-right">
                        Trips
                      </Link>
                      <Link to="dashboard" className="btn btn-primary btn-sm btn-outline-info float-right">
                        Contracts
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
          setSelectedContract={this.setSelectedContract}
          setSelectedContractId={this.setSelectedContractId}
          selectedTrip={this.state.selectedTrip}
          selectedContract={this.state.selectedContract}
          selectedContractId={this.state.selectedContractId}
          selectOptions={this.state.selectOptions}
          contractID
          isSearching={this.state.isSearching}
          contractProfile={this.state.contractProfile}
          modalName="Edit Contract"
          accessLevel={this.state.accessLevel}
          contractEditSubmitAction={this.contractEditSubmitAction}
          tripEditSubmitAction={this.tripEditSubmitAction}
          getSelectOptions={() => {
            return this.getSelectOptions();
          }}
          SearchFunction={(contractSearch) => {
            return this.search(contractSearch);
          }}
          showAll={() => {
            return this.show_all();
          }}
          appProps={this.props}
          contractSearch={{
            external_contract_code: [],
          }}
          getContracts={() => {
            return this.getContracts();
          }}
          getTrips={this.getTrips}
        />
      </>
    );
  }
}

export default ContractDashboard;
