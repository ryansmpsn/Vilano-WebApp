import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Button, ButtonGroup } from "react-bootstrap";
import CountUp from "react-countup";
import {
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBBadge,
  MDBListGroup,
  MDBListGroupItem
} from "mdbreact";
import NavPerm from "../NavPerms";
import Send from "../send";

import ContractRoutes from "./ContractRoutes";

class ContractDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessLevel: NavPerm.nav_perm_check(),
      selectOptions: [],
      selectedContract: "",
      selectedTrip: ""
    };
  }

  setSelectedContract = e => {
    return this.setState({ selectedContract: e });
  };
  setSelectedTrip = e => {
    return this.setState({ selectedTrip: e });
  };

  search = contractSearch => {
    return Send.post("/ViewContracts", contractSearch, this.props);
  };

  show_all() {
    return Send.post("/ViewContracts", "", this.props);
  }

  contractEditSubmitAction = editContract => {
    return Send.post("/UpdateContract", editContract, this.props);
  };

  componentDidMount() {
    Send.get("/GetContractIDs", this.props, "").then(res => {
      let contractData = JSON.parse(res.data);
      let getSelectOptions = [];
      contractData.map((item, index) => {
        return getSelectOptions.push({
          label: item.external_contract_code,
          value: item.contract_id
        });
      });
      this.setState({ selectOptions: getSelectOptions });
    });
  }

  render() {
    return (
      <Router>
        <MDBRow className="mb-4">
          <MDBCol xl="12" md="12" className="mb-r">
            <MDBCard className="cascading-admin-card">
              <MDBCardHeader>
                <div className="admin-up">
                  <MDBIcon
                    icon="file-invoice-dollar"
                    className="primary-color"
                  />
                  <MDBRow style={{ margin: -20 }}>
                    <MDBCol md="4" className="ml-auto mb-4">
                      <MDBCard className="mb-4">
                        <MDBCardHeader>Important Statistics</MDBCardHeader>
                        <MDBCardBody>
                          <MDBListGroup className="list-group-flush">
                            <MDBListGroupItem>
                              Current Active Contracts
                              <MDBBadge
                                color="primary-color"
                                pill
                                className="float-right"
                              >
                                <CountUp
                                  start={0}
                                  end={this.state.selectOptions.length}
                                  duration={5}
                                />
                              </MDBBadge>
                            </MDBListGroupItem>
                            <MDBListGroupItem>
                              Total Trips
                              <MDBBadge
                                color="default-color-dark"
                                pill
                                className="float-right"
                              >
                                <CountUp start={0} end={1234} duration={5} />
                              </MDBBadge>
                            </MDBListGroupItem>
                            <MDBListGroupItem>
                              Total Routes
                              <MDBBadge
                                color="unique-color"
                                pill
                                className="float-right"
                              >
                                <CountUp start={0} end={2371} duration={8} />
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
                    <Link to="/contracts/trips" className="btn btn-primary">
                      View Trips
                    </Link>
                    <Link to="/contracts/routes" className="btn btn-primary">
                      View Routes
                    </Link>
                    <Button href="/bids">Contract Bid Management</Button>
                  </ButtonGroup>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>

        <ContractRoutes
          setSelectedTrip={this.setSelectedTrip}
          onClick={this.setSelectedContract}
          selectedTrip={this.state.selectedTrip}
          selectedContract={this.state.selectedContract}
          selectOptions={this.state.selectOptions}
          contractID
          modalName="Edit Contract"
          accessLevel={this.state.accessLevel}
          contractEditSubmitAction={this.contractEditSubmitAction}
          SearchFunction={contractSearch => {
            return this.search(contractSearch);
          }}
          showAll={() => {
            return this.show_all();
          }}
          appProps={this.props}
          contractSearch={{
            external_contract_code: []
          }}
          getContracts={() => {
            return this.getContracts();
          }}
        />
      </Router>
    );
  }
}

export default ContractDashboard;
