import React, { Component } from "react";
import Send from "../../libs/send";
import { MDBCard, MDBCardBody, MDBRow, MDBCol, MDBIcon, MDBCardText, MDBBadge } from "mdbreact";

class AxiosTestPage extends Component {
  state = {
    endpoint: "/Facility/Active",
    display: null,
  };

  componentDidMount() {
    Send.get(this.state.endpoint, this.props).then((res) => {
      console.log(res);
      this.setState({ display: res.data });
    });
  }

  render() {
    return (
      <React.Fragment>
        <MDBRow className="mb-4">
          <MDBCol xl="12" md="12" className="mb-r">
            <MDBCard className="cascading-admin-card">
              <div className="admin-up">
                <MDBIcon icon="vials" className="primary-color" />
                <div className="data">
                  <MDBCardText>Endpoint / Axios Test Page</MDBCardText>
                  <h4>
                    <MDBBadge color="primary-color" pill></MDBBadge>
                  </h4>
                </div>
              </div>
              <MDBCardBody>
                {console.log(this.state.display)}
                <h2 className="m-3 ">Endpoint / Axios Test Page</h2>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </React.Fragment>
    );
  }
}
export default AxiosTestPage;
