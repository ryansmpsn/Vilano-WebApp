import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { ButtonGroup } from "react-bootstrap";
import {
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBIcon
} from "mdbreact";
import NavPerm from "../../NavPerms";
import Send from "../../send";
import ViewBids from "./ViewBids";

class BidDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessLevel: NavPerm.nav_perm_check(),
      selectOptions: [],
      selectedContract: "",
      selectedTrip: ""
    };
    this.setSelectedContract = this.setSelectedContract.bind(this);
    this.setSelectedTrip = this.setSelectedTrip.bind(this);
  }

  setSelectedContract(e) {
    return this.setState({ selectedContract: e });
  }
  setSelectedTrip(e) {
    return this.setState({ selectedTrip: e });
  }

  search = contractSearch => {
    return Send.post("/ViewContracts", contractSearch, this.props);
  };

  show_all() {
    return Send.post("/ViewContracts", "", this.props);
  }

  contentEditSubmitAction = editContent => {
    return Send.post("/UpdateContract", editContent, this.props);
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
                </div>
                <h1 className="m-3 text-center">Contract Bid Dashboard</h1>
              </MDBCardHeader>
              <MDBCardBody>
                <div className="d-flex flex-column">
                  <ButtonGroup size="lg">
                    <Link className="btn btn-primary" to="/bids">
                      View Bids
                    </Link>
                    <Link to="/bids/trips" className="btn btn-primary">
                      View Trips
                    </Link>
                    <Link to="/bids/routes" className="btn btn-primary">
                      View Routes
                    </Link>
                  </ButtonGroup>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>

        <ViewBids
          setSelectedTrip={this.setSelectedTrip}
          onClick={this.setSelectedContract}
          selectedTrip={this.state.selectedTrip}
          selectedContract={this.state.selectedContract}
          selectOptions={this.state.selectOptions}
          contractID
          modalName="Edit Contract"
          accessLevel={this.state.accessLevel}
          contentEditSubmitAction={this.contentEditSubmitAction}
          SearchFunction={contractSearch => {
            return this.search(contractSearch);
          }}
          showAll={() => {
            return this.show_all();
          }}
          appProps={this.props}
          contentSearch={{
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

export default BidDashboard;
