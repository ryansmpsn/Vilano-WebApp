import React, { Component } from "react";
import { MDBRow, MDBCol, MDBCard, MDBView, MDBCardBody, MDBInput, MDBContainer, MDBBtn, MDBCardText } from "mdbreact";

class ProfilePage extends Component {
  state = {};
  render() {
    return (
      <MDBContainer fluid>
        <MDBRow>
          <MDBCol lg="4" className="mb-4 mt-5">
            <MDBCard narrow className="cascading-admin-card">
              <div className="admin-up" style={{ marginRight: "10%" }}>
                <MDBBtn icon="money-bill-alt" className="mdb-color lighten-3 text-center" block href="/profile">
                  Profile
                </MDBBtn>
              </div>
              <MDBCardBody className="text-center">
                <img tag="img" src="https://picsum.photos/200/300" alt="User Avatar" className="z-depth-1 mb-3 mx-auto" />

                <p className="text-muted">
                  <small>Profile photo will be changed automatically</small>
                </p>
                <MDBRow center>
                  <MDBBtn color="info" rounded size="sm">
                    Upload New Photo
                  </MDBBtn>
                  <MDBBtn color="danger" rounded size="sm">
                    Delete
                  </MDBBtn>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8" className="mb-r">
            <MDBCard narrow>
              <MDBView cascade className="mdb-color lighten-3 card-header">
                <h5 className="mb-0 font-weight-bold text-center text-white">Account Details</h5>
              </MDBView>
              <MDBCardBody className="text-center">
                <MDBRow>
                  <MDBCol md="6">
                    <MDBInput type="text" label="Employee ID" />
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBInput type="text" label="Type" />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="6">
                    <MDBInput type="text" label="Active" />
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBInput type="text" label="Status" />
                  </MDBCol>

                  <MDBCol md="6">
                    <MDBInput type="text" label="First Name" />
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBInput type="text" label="Last Name" />
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBInput type="text" label="Middle Name" />
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBInput type="text" label="Prefix" />
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBInput type="text" label="Suffix" />
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBInput type="text" label="Status" />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="12" className="text-center">
                    <MDBBtn color="info" type="submit" rounded>
                      Update account
                    </MDBBtn>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="6" className="mb-r mt-4">
            <MDBCard narrow>
              <MDBView cascade className="mdb-color lighten-3 card-header">
                <h5 className="mb-0 font-weight-bold text-center text-white">Addresses</h5>
              </MDBView>
              <MDBCardBody className="text-center">
                <MDBRow>
                  <MDBCol md="6">
                    <MDBInput type="text" label="Address Type" value="Mailing" disabled />
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBInput type="text" label="Zip Code" />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="12">
                    <MDBInput type="text" label="Street Address" />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="12">
                    <MDBInput type="text" label="Street Address 2" />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="6">
                    <MDBInput type="email" label="City" />
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBInput type="text" label="State" value="FL" disabled />
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                  <MDBCol md="12" className="text-center">
                    <MDBBtn color="info" type="submit" rounded>
                      Update account
                    </MDBBtn>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="6" className="mb-r mt-4">
            <MDBCard narrow>
              <MDBView cascade className="mdb-color lighten-3 card-header">
                <h5 className="mb-0 font-weight-bold text-center text-white">Employee Emails</h5>
              </MDBView>
              <MDBCardBody className="text-center">
                <MDBRow>
                  <MDBCol md="6">
                    <MDBInput type="text" label="Email Type" value="Primary" disabled />
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBInput type="email" label="Email" />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="6">
                    <MDBInput type="checkbox" label="Valid" size="sm" />
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBInput type="text" label="Opt Out" />
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                  <MDBCol md="12" className="text-center">
                    <MDBBtn color="info" type="submit" rounded>
                      Update account
                    </MDBBtn>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="6" className="mb-r mt-4">
            <MDBCard narrow>
              <MDBView cascade className="mdb-color lighten-3 card-header">
                <h5 className="mb-0 font-weight-bold text-center text-white">Phones</h5>
              </MDBView>
              <MDBCardBody className="text-center">
                <MDBRow>
                  <MDBCol md="6">
                    <MDBInput type="text" label="Phone Type" value="Cell" disabled />
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBInput type="text" label="Phone Number" />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="6">
                    <MDBInput type="text" label="Extension" />
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBInput type="text" label="Primary" />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="6">
                    <MDBInput type="email" label="SMS Capable" />
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBInput type="text" label="Valid" disabled />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="6">
                    <MDBInput type="text" label="Text Opt Out" />
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBInput type="text" label="Call Opt Out" disabled />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="12" className="text-center">
                    <MDBBtn color="info" type="submit" rounded>
                      Update account
                    </MDBBtn>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="6" className="mb-r mt-4">
            <MDBCard narrow>
              <MDBView cascade className="mdb-color lighten-3 card-header">
                <h5 className="mb-0 font-weight-bold text-center text-white">Licenses</h5>
              </MDBView>
              <MDBCardBody className="text-center">
                <MDBRow>
                  <MDBCol md="6">
                    <MDBInput type="text" label="Type" value="Class B" disabled />
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBInput type="text" label="Issuing State" />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="6">
                    <MDBInput type="text" label="License Number" />
                  </MDBCol>
                  <MDBCol md="6">
                    <MDBInput type="date" label="Issue Date" />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md="6">
                    <MDBInput type="date" label="Expiration Date" />
                  </MDBCol>
                </MDBRow>

                <MDBRow>
                  <MDBCol md="12" className="text-center">
                    <MDBBtn color="info" type="submit" rounded>
                      Update account
                    </MDBBtn>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default ProfilePage;
