import React, { Component } from "react";
import Send from "../../libs/send";
import { Link } from "react-router-dom";
import NavPerm from "../../libs/NavPerms";
import { MDBCard, MDBCardHeader, MDBCardBody, MDBRow, MDBCol, MDBIcon } from "mdbreact";

class ContractManagement extends Component {
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
                  <h1 className="m-3 text-center">Contract Management</h1>
                </div>
              </MDBCardHeader>
              <MDBCardBody>
                <MDBRow>
                  <MDBCol>
                    <Link to="routes" className="btn btn-sm btn-outline-warning">
                      Contracts
                    </Link>
                    <Link to="trips" className="btn btn-sm btn-outline-warning">
                      Trips
                    </Link>
                    <Link to="costsegment" className="btn btn-sm btn-outline-warning">
                      Rate Sheets
                    </Link>
                    <Link to="routes" className="btn btn-sm btn-outline-warning">
                      Routes
                    </Link>
                    <Link to="routes" className="btn btn-sm btn-outline-warning">
                      Facility
                    </Link>
                    <Link to="routes" className="btn btn-sm btn-outline-warning">
                      Frequency
                    </Link>
                    <Link to="routes" className="btn btn-sm btn-outline-warning">
                      Status Code
                    </Link>
                    <Link to="routes" className="btn btn-sm btn-outline-warning">
                      Routes
                    </Link>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </>
    );
  }
}

export default ContractManagement;
