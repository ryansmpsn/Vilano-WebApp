import React, { Component } from "react";
import { MDBRow, MDBCol, MDBCard, MDBView, MDBCardBody, MDBInput, MDBContainer, MDBBtn } from "mdbreact";
import Send from "../../libs/send";

class ProfilePage extends Component {
  _isMounted = false;
  state = { employeeProfile: null, employeeData: null };

  componentDidMount() {
    this._isMounted = true;

    return Send.get("/Employee/Profile/" + sessionStorage.getItem("IDSession"), this.props).then((res) => {
      console.log(res.data[0]);
      if (this._isMounted) {
        this.setState({ employeeProfile: res.data[0][0].value });
        this.setState({ employeeData: [res.data[0][1], res.data[0][2], res.data[0][3]] });
      }
    });
  }

  render() {
    return (
      <MDBContainer fluid>
        <MDBRow center>
          <MDBCol lg="10" className="mb-4 mt-5">
            <MDBCard narrow className="cascading-admin-card">
              <div className="admin-up" style={{ marginRight: "10%" }}>
                <MDBBtn icon="money-bill-alt" className="mdb-color lighten-3 text-center" block>
                  Profile
                </MDBBtn>
              </div>
              <MDBCardBody className="text-center">
                <MDBRow>
                  {this.state.employeeProfile !== null &&
                    this.state.employeeProfile.map(
                      (c, index) =>
                        c.label !== null && (
                          <MDBCol md="4" key={index + "profile"}>
                            <MDBInput
                              type="text"
                              label={c.label}
                              value={c.updatedValue !== null ? c.updatedValue : ""}
                              disabled
                            ></MDBInput>
                          </MDBCol>
                        )
                    )}
                </MDBRow>
                {/* <MDBRow center>
                  <MDBBtn color="info" rounded size="sm">
                    Update Account
                  </MDBBtn>
                </MDBRow> */}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          {this.state.employeeData !== null &&
            this.state.employeeData.map((data, index) => (
              <MDBCol lg="4" className="mb-r mt-4" key={index + "employeeData"}>
                <MDBCard narrow>
                  <MDBView cascade className="mdb-color lighten-3 card-header">
                    <h5 className="mb-0 font-weight-bold text-center text-white">{data.label}</h5>
                  </MDBView>
                  <MDBCardBody className="text-center">
                    <MDBRow>
                      {data.value !== null &&
                        data.value[0].map(
                          (c, index) =>
                            c.label !== null && (
                              <MDBCol md="6" key={index + "cData"}>
                                <MDBInput
                                  type="text"
                                  label={c.label}
                                  value={c.updatedValue !== null ? c.updatedValue : ""}
                                  disabled
                                ></MDBInput>
                              </MDBCol>
                            )
                        )}
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            ))}
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default ProfilePage;
