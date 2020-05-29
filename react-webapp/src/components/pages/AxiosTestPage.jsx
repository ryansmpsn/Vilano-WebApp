import React, { Component } from "react";
import Send from "../../libs/send";
import {
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBCardText,
  MDBBadge,
} from "mdbreact";

class AxiosTestPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "none",
      external_contract_code: {
        external_contract_code: ["test006"],
      },
    };
  }

  componentDidMount() {
    Send.post(
      "/Contract/Search",
      this.state.external_contract_code,
      this.props
    ).then((res) => {
      this.setState({ display: res.data[0] });
      console.log(res);
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
                  <MDBCardText>Endpoint / Axios Test Page</MDBCardText>
                  <h4>
                    <MDBBadge color="primary-color" pill></MDBBadge>
                  </h4>
                </div>
              </div>

              <MDBCardBody>
                <h2 className="m-3 ">Endpoint / Axios Test Page</h2>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
        <div>Current Active Contracts: &nbsp;</div>
        {/* {console.log(this.state.display)} */}
        {/* {this.state.display !== "none" &&
          this.state.display.map((content, index) => {
            return (
              <div>
                Content: {content.columnName} Value: {content.value}
              </div>
            );
          })} */}
      </React.Fragment>
    );
  }
}
export default AxiosTestPage;
