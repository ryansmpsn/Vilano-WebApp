import React from "react";
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBIcon
} from "mdbreact";

function PerformancePage() {
  return (
    <MDBRow className="mb-4">
      <MDBCol xl="12" md="12" className="mb-r">
        <MDBCard className="cascading-admin-card">
          <MDBCardHeader>
            <div className="admin-up">
              <MDBIcon icon="chart-line" chart-line className="primary-color" />
            </div>
            <h1 className="m-3 text-center">Performance</h1>
          </MDBCardHeader>
          <MDBCardBody>
            <div className="d-flex flex-column">Hello Performance Content</div>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
}

export default PerformancePage;
