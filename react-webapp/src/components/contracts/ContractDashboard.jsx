import React, { Component } from "react";
import { BrowserRouter as Router, Link, withRouter } from "react-router-dom";
import { ButtonGroup } from "react-bootstrap";
import CountUp from "react-countup";
import { MDBCard, MDBCardHeader, MDBCardBody, MDBRow, MDBCol, MDBIcon, MDBBadge, MDBListGroup, MDBListGroupItem } from "mdbreact";
import NavPerm from "../../libs/NavPerms";
import Send from "../../libs/send";

import ContractRoutes from "./ContractRoutes";

class ContractDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessLevel: NavPerm.nav_perm_check(),
      selectOptions: [],
      selectedContractId: "null",
      selectedContract: "",
      selectedTrip: "null",
      contractProfile: null,
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
    return Send.get(e, this.props).then((res) => {
      this.setState({ contractProfile: res.data[0] });
    });
  };

  contractEditSubmitAction = (editContract) => {
    return Send.post("/Contract/Contract", editContract, this.props);
  };
  getSelectOptions() {
    return Send.get("/Contract/Dropdowns/Contract/All", this.props);
  }

  componentDidMount() {
    return Send.get("/Contract/Ids", this.props).then((res) => {
      let contractData = res.data;
      let getSelectOptions = [];
      contractData.map((item, index) => {
        return getSelectOptions.push({
          label: item[1].value,
          value: item[0].value,
        });
      });
      this.setState({ selectOptions: getSelectOptions });
    });
  }

  render() {
    let { url, path } = this.props.match;

    return (
      <Router>
        <MDBRow className="mb-4">
          <MDBCol xl="12" md="12" className="mb-r">
            <MDBCard className="cascading-admin-card">
              <MDBCardHeader>
                <div className="admin-up">
                  <MDBIcon icon="file-invoice-dollar" className="primary-color" />
                  <MDBRow style={{ margin: -20 }}>
                    <MDBCol md="4" className="ml-auto mb-4">
                      <MDBCard className="mb-4">
                        <MDBCardHeader>Important Statistics</MDBCardHeader>
                        <MDBCardBody>
                          <MDBListGroup className="list-group-flush">
                            <MDBListGroupItem>
                              Current Active Contracts
                              <MDBBadge color="primary-color" pill className="float-right">
                                <CountUp start={0} end={this.state.selectOptions.length} duration={5} />
                              </MDBBadge>
                            </MDBListGroupItem>
                            <MDBListGroupItem>
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
                            </MDBListGroupItem>
                          </MDBListGroup>
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                  </MDBRow>
                </div>
                <h1 className="m-3 text-center">Contract Dashboard</h1>
              </MDBCardHeader>
              <MDBCardBody>
                <div className="d-flex flex-column">
                  <ButtonGroup size="lg">
                    <Link className="btn btn-primary" to="/contracts/dashboard">
                      View Contracts
                    </Link>
                    {/* <Link to="/contracts/trips" className="btn btn-primary">
                      View Trips
                    </Link>

                    <Link to="/contracts/routes" className="btn btn-primary">
                      View Routes
                    </Link>
                    <Link to="/contracts/costdata" className="btn btn-primary">
                      View Cost Data
                    </Link>*/}
                    <Link to="/contracts/add" className="btn btn-primary">
                      Add Cost Data (7468A)
                    </Link>
                    <Link to="/contracts/ratesheet" className="btn btn-primary">
                      Rate Sheet
                    </Link>
                  </ButtonGroup>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
        <ContractRoutes
          url={url}
          path={path}
          props={this.props}
          setSelectedTrip={this.setSelectedTrip}
          setSelectedContract={this.setSelectedContract}
          setSelectedContractId={this.setSelectedContractId}
          selectedTrip={this.state.selectedTrip}
          selectedContract={this.state.selectedContract}
          selectedContractId={this.state.selectedContractId}
          selectOptions={this.state.selectOptions}
          contractID
          contractProfile={this.state.contractProfile}
          modalName="Edit Contract"
          accessLevel={this.state.accessLevel}
          contractEditSubmitAction={this.contractEditSubmitAction}
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
      </Router>
    );
  }
}

export default withRouter(ContractDashboard);
