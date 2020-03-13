import React, { Component } from "react";
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBView,
  MDBCardBody,
  MDBInput,
  MDBContainer,
  MDBBtn
} from "mdbreact";

class ProfilePage extends Component {
  state = {};
  render() {
    return (
      <div>
        <MDBContainer fluid>
          <MDBRow>
            <MDBCol lg="4" className="mb-4 mt-5">
              <MDBCard narrow className="cascading-admin-card">
                <div className="admin-up">
                  <MDBBtn
                    style={{ width: "440px" }}
                    icon="money-bill-alt"
                    className="mdb-color lighten-3"
                    href="/profile"
                  >
                    Profile
                  </MDBBtn>
                </div>
                <MDBCardBody className="text-center">
                  <img
                    tag="img"
                    src="https://picsum.photos/200/300"
                    alt="User Avatar"
                    className="z-depth-1 mb-3 mx-auto"
                  />

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
                  <h5 className="mb-0 font-weight-bold text-center text-white">
                    Edit Account Details
                  </h5>
                </MDBView>
                <MDBCardBody className="text-center">
                  <MDBRow>
                    <MDBCol md="6">
                      <MDBInput
                        type="text"
                        label="Company"
                        value="Vilano Management Services, Inc."
                        disabled
                      />
                    </MDBCol>
                    <MDBCol md="6">
                      <MDBInput type="text" label="Username" />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md="6">
                      <MDBInput type="text" label="First name" />
                    </MDBCol>
                    <MDBCol md="6">
                      <MDBInput type="text" label="Last name" />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md="6">
                      <MDBInput type="email" label="Email address" />
                    </MDBCol>
                    <MDBCol md="6">
                      <MDBInput
                        type="text"
                        label="Department"
                        value="Sofware Development"
                        disabled
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md="12">
                      <MDBInput type="textarea" label="About me" />
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
      </div>
    );
  }
}

export default ProfilePage;
