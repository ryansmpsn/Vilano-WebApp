import React, { Component } from "react";
import Routing from "./Router";
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
      contractSearchCode: { external_contract_code: [] },
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
  setContractSearchCode = (e) => {
    return this.setState({ contractSearchCode: e });
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
  addSelectOption = (e) => {
    let options = this.state.selectOptions;
    let newOption = { label: e, value: options.length + 1 };
    options.push(newOption);
    this.setState({ selectOptions: options });
  };

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
                  <MDBIcon icon="file-contract" className="primary-color" />
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
                </MDBRow>
                <MDBRow>
                  {this.state.contractProfile === null ? (
                    <MDBCol>
                      {sessionStorage.getItem("/contract") >= 2 && (
                        <Link to="dashboard" className="btn btn-primary btn-sm btn-outline-info">
                          Contracts
                        </Link>
                      )}
                      {sessionStorage.getItem("/contract/trips") >= 2 && (
                        <Link to="trips" className="btn btn-primary btn-sm btn-outline-info">
                          Trips
                        </Link>
                      )}
                      {sessionStorage.getItem("/contract/ratesheets") >= 2 && (
                        <Link to="costsegment" className="btn btn-primary btn-sm btn-outline-info">
                          Rate Sheets
                        </Link>
                      )}
                      {sessionStorage.getItem("/contract/routes") >= 2 && (
                        <Link to="routes" className="btn btn-primary btn-sm btn-outline-info">
                          Routes
                        </Link>
                      )}
                    </MDBCol>
                  ) : (
                    <MDBCol>
                      {sessionStorage.getItem("/contract/routes") >= 2 && (
                        <Link to="routes" className="btn btn-primary btn-sm btn-outline-info float-right">
                          Routes
                        </Link>
                      )}
                      {sessionStorage.getItem("/contract/ratesheets") >= 2 && (
                        <Link to="costsegment" className="btn btn-primary btn-sm btn-outline-info float-right">
                          Rate Sheets
                        </Link>
                      )}
                      {sessionStorage.getItem("/contract/trips") >= 2 && (
                        <Link to="trips" className="btn btn-primary btn-sm btn-outline-info float-right">
                          Trips
                        </Link>
                      )}
                      {sessionStorage.getItem("/contract") >= 2 && (
                        <Link to="dashboard" className="btn btn-primary btn-sm btn-outline-info float-right">
                          Contracts
                        </Link>
                      )}
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
          setContractSearchCode={this.setContractSearchCode}
          selectedTrip={this.state.selectedTrip}
          selectedContract={this.state.selectedContract}
          selectedContractId={this.state.selectedContractId}
          selectOptions={this.state.selectOptions}
          contractID
          isSearching={this.state.isSearching}
          contractProfile={this.state.contractProfile}
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
          contractSearch={this.state.contractSearchCode}
          getContracts={() => {
            return this.getContracts();
          }}
          getTrips={this.getTrips}
          addSelectOption={this.addSelectOption}
        />
      </>
    );
  }
}

export default ContractDashboard;
