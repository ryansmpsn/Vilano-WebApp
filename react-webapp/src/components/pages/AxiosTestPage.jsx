import React, { Component } from "react";
import axios from "axios";
import Select from "react-select";
import { MDBCard, MDBCardBody, MDBRow, MDBCol, MDBIcon, MDBCardText, MDBBadge } from "mdbreact";

class AxiosTestPage extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      testURL: "http://localhost:5000",
      liveURL: "https://centcom-dot-pfsi-centcom.appspot.com",
      URL: "http://localhost:5000",
      SessionID: "None",
      IDSession: "None",
      contractID: [],
      selectOptions: [],
      bodyData: [{ username: "rsimpson", password: "admin1234" }],
    };
    axios.defaults.headers.common["our_session"] = "";
  }

  update_auth = () => {
    this.setState({ SessionID: sessionStorage.getItem("SessionID") });
    this.setState({ IDSession: sessionStorage.getItem("IDSession") });
    axios.defaults.headers.common["SessionID"] = this.state.SessionID;
    axios.defaults.headers.common["IDSession"] = this.state.IDSession;
    axios.defaults.headers.common["Content-Type"] = "application/json";
    axios.defaults.headers.common["Application"] = "WebApp";
    axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
  };

  componentDidMount() {
    axios.defaults.headers.common["SessionID"] = "None";
    axios.defaults.headers.common["IDSession"] = "None";
    axios.defaults.headers.common["Content-Type"] = "application/json";
    axios.defaults.headers.common["Application"] = "WebApp";
    axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

    var url = "http://localhost:5000/Login";
    var data = { username: "rsimpson", password: "admin1234" };
    axios.post(url, data).then((res) => {
      console.log(res.data);
    });
  }

  render() {
    return (
      <React.Fragment>
        <MDBRow className="mb-4">
          <MDBCol xl="12" md="12" className="mb-r">
            <MDBCard className="cascading-admin-card">
              <div className="admin-up">
                <MDBIcon icon="file-invoice-dollar" className="primary-color" />
                <div className="data">
                  <MDBCardText>Current Active Contracts</MDBCardText>
                  <h4>
                    <MDBBadge color="primary-color" pill>
                      {this.state.contractID.length}
                    </MDBBadge>
                  </h4>
                </div>
              </div>

              <MDBCardBody>
                <h2 className="m-3 ">Contract Dashboard</h2>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
        <div>
          Current Active Contracts: &nbsp;
          <Select key={this.state.contractID.contract_id} options={this.state.selectOptions} />
        </div>
      </React.Fragment>
    );
  }
}
export default AxiosTestPage;
