import React, { Component } from "react";
import { MDBCard, MDBCardHeader, MDBRow, MDBCol, MDBIcon } from "mdbreact";
import NavPerm from "../NavPerms";
import Send from "../send";
import Select from "react-select";
import BidAnalytics from "./BidAnalytics";

class BidDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessLevel: NavPerm.nav_perm_check(),
      selectOptions: [],
      selectedContract: "null",
      selectedTrip: "null",
      dropdowns: "empty",
    };
  }

  setSelectedContract = (e) => {
    return this.setState({ selectedContract: e });
  };
  setSelectedTrip = (e) => {
    return this.setState({ selectedTrip: e });
  };

  componentDidMount() {
    Send.get("/contract/dropdowns/all", this.props, "").then((res) => {
      let showme = res.data;
      this.setState({ dropdowns: res.data });
    });
  }

  facilitySelect() {
    console.log(this.state.dropdowns[0]);
    return <Select autoFocus options={this.state.dropdowns[0].options} isMulti placeholder={"Search for Facility name"} />;
  }
  statusSelect() {
    console.log(this.state.dropdowns[1]);
  }
  contractTypeSelect() {
    console.log(this.state.dropdowns[2]);
  }
  companySelect() {
    console.log(this.state.dropdowns[3]);
  }
  divisionCodeSelect() {
    console.log(this.state.dropdowns[4]);
  }
  getSelects() {
    let getSelectOptions = [];

    return this.facilitySelect(), this.statusSelect(), this.contractTypeSelect(), this.companySelect(), this.divisionCodeSelect();
    // <div>Content: {this.state.dropdowns !== "empty" && this.state.dropdowns.map((data, index) => ("Content: ", data.column_name))} </div>;
  }
  //   contractData.map((item, index) => {
  //     return getSelectOptions.push({
  //       label: item.external_contract_code,
  //       value: item.contract_id,
  //     });
  //   });
  //   this.setState({ selectOptions: getSelectOptions });

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
          <BidAnalytics />
          <div> Search View SHow all</div>
          <Select autoFocus options={this.state.dropdowns[0].options} isMulti placeholder={"Search for Facility name"} />
          <Select autoFocus options={this.state.dropdowns[1].options} isMulti placeholder={"Search for status"} />
          <Select autoFocus options={this.state.dropdowns[2].options} isMulti placeholder={"Search for Contract Type"} />
          <Select autoFocus options={this.state.dropdowns[3].options} isMulti placeholder={"Search for Company name"} />
          {this.getSelects()}
        </MDBCol>
      </MDBRow>
    );
  }
}

export default BidDashboard;
