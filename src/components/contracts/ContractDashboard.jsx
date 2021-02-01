import React, { Component } from "react";
import Routing from "./Router";
import Send from "../../libs/send";
import CountUp from "react-countup";
import NavPerm from "../../libs/NavPerms";
import { MDBCard, MDBCardHeader, MDBCardBody, MDBRow, MDBCol, MDBIcon, MDBBadge, MDBListGroup, MDBListGroupItem } from "mdbreact";
import { Nav, NavItem } from "react-bootstrap";
import { NavLink } from "react-router-dom";

class ContractDashboard extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      accessLevel: NavPerm.nav_perm_check(),
      selectOptions: null,
      contractSearchCode: { external_contract_code: [] },
      selectedContractId: "null",
      selectedContract: "",
      selectedTrip: "",
      contractProfile: null,
      isSearching: false,
      contentInputRestrictions: null,
      allContracts: null,
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

  addSelectOption = (e) => {
    let options = this.state.selectOptions;
    let newOption = { label: e, value: options.length + 1 };
    options.push(newOption);
    this.setState({ selectOptions: options });
  };

  componentDidMount() {
    this._isMounted = true;
    Send.get("/Contract/Ids", this.props).then((res) => {
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

    Send.get("/Contract/Dropdowns/Contract/All", this.props).then((res) => {
      if (this._isMounted) {
        this.setState({ contentInputRestrictions: res.data });
      }
    });

    Send.post("/Contract/Search", "", this.props).then((res) => {
      if (this._isMounted) {
        this.setState({ allContracts: res.data });
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
            <div className="admin-up ">
              <MDBIcon icon="file-contract" className="primary-color" />
              <MDBCard className="w-25 ml-auto" style={{ marginTop: "-50px" }}>
                <MDBCardHeader>Statistics</MDBCardHeader>
                <MDBCardBody>
                  <MDBListGroup className="list-group-flush">
                    <MDBListGroupItem>
                      Active Contracts
                      <MDBBadge color="primary-color" pill className="float-right">
                        <CountUp start={0} end={this.state.selectOptions ? this.state.selectOptions.length : 0} duration={5} />
                      </MDBBadge>
                    </MDBListGroupItem>
                  </MDBListGroup>
                </MDBCardBody>
              </MDBCard>
              <h2 className="text-center mb-5" style={{ marginTop: "-50px" }}>
                Contract Management
              </h2>
            </div>
          </MDBCardHeader>
          {this.state.contractProfile !== null && (
            <MDBCardBody>
              <MDBRow>
                {this.state.contractProfile.map(
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
              Contracts
            </NavLink>
          </NavItem>

          {sessionStorage.getItem("/contract/trips") >= 2 && (
            <NavItem>
              <NavLink to="trips" activeClassName="text-primary border-top">
                Trips
              </NavLink>
            </NavItem>
          )}

          {sessionStorage.getItem("/contract/ratesheets") >= 2 && (
            <NavItem>
              <NavLink to="ratesheets" activeClassName="text-primary border-top">
                Cost Segments
              </NavLink>
            </NavItem>
          )}

          {sessionStorage.getItem("/contract/routes") >= 2 && (
            <NavItem>
              <NavLink to="routes" activeClassName="text-primary border-top">
                Routes
              </NavLink>
            </NavItem>
          )}

          {sessionStorage.getItem("/contract/drivers") >= 2 && (
            <NavItem>
              <NavLink to="/employee" activeClassName="text-primary border-top">
                Drivers
              </NavLink>
            </NavItem>
          )}

          {sessionStorage.getItem("/contract/analytics") >= 1 && (
            <NavItem>
              <NavLink to="analytics" activeClassName="text-primary border-top">
                Analytics
              </NavLink>
            </NavItem>
          )}
        </Nav>
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
          contentInputRestrictions={this.state.contentInputRestrictions}
          allContracts={this.state.allContracts}
        />
      </>
    );
  }
}

export default ContractDashboard;
