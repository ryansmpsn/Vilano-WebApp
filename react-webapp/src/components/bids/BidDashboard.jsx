import React, { Component } from "react";
import { MDBCard, MDBCardHeader, MDBRow, MDBCol, MDBIcon } from "mdbreact";
import NavPerm from "../NavPerms";
import Send from "../send";

class BidDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessLevel: NavPerm.nav_perm_check(),
      selectOptions: [],
      selectedContract: "null",
      selectedTrip: "null",
    };
  }

  setSelectedContract = (e) => {
    return this.setState({ selectedContract: e });
  };
  setSelectedTrip = (e) => {
    return this.setState({ selectedTrip: e });
  };

  search = (contractSearch) => {
    return Send.post("/ViewContracts", contractSearch, this.props);
  };

  show_all() {
    return Send.post("/ViewContracts", "", this.props);
  }

  contractEditSubmitAction = (editContract) => {
    return Send.post("/UpdateContract", editContract, this.props);
  };

  componentDidMount() {
    Send.get("/GetContractIDs", this.props, "").then((res) => {
      let contractData = JSON.parse(res.data);
      let getSelectOptions = [];
      contractData.map((item, index) => {
        return getSelectOptions.push({
          label: item.external_contract_code,
          value: item.contract_id,
        });
      });
      this.setState({ selectOptions: getSelectOptions });
    });
  }

  render() {
    return (
      <MDBRow className="mb-4">
        <MDBCol xl="12" md="12" className="mb-r">
          <MDBCard className="cascading-admin-card">
            <MDBCardHeader>
              <div className="admin-up">
                <MDBIcon icon="file-invoice-dollar" className="primary-color" />
              </div>
              <h1 className="m-3 text-center">Contract Bid Dashboard</h1>
            </MDBCardHeader>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    );
  }
}

export default BidDashboard;
