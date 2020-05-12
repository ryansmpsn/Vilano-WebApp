import React, { Component } from "react";
import { MDBRow, MDBCol, MDBCard, MDBCardHeader, MDBCardBody, MDBIcon } from "mdbreact";

class SubcontractorPage extends Component {
  state = {};
  render() {
    return (
      <MDBRow className="mb-4">
        <MDBCol xl="12" md="12" className="mb-r">
          <MDBCard className="cascading-admin-card">
            <MDBCardHeader>
              <div className="admin-up">
                <MDBIcon icon="money-bill" className="primary-color" />
              </div>
              <h1 className="m-3 text-center">Financials</h1>
            </MDBCardHeader>
            <MDBCardBody>
              <div className="d-flex flex-column">Hello Financials Content</div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    );
  }
}

export default SubcontractorPage;
