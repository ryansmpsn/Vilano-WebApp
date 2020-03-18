import React from "react";
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBIcon
} from "mdbreact";

function FinancialsPage() {
  return (
    <MDBRow className="mb-4">
      <MDBCol xl="12" md="12" className="mb-r">
        <MDBCard className="cascading-admin-card">
          <MDBCardHeader>
            <div className="admin-up">
              <MDBIcon icon="money-bill" chart-line className="primary-color" />
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

export default FinancialsPage;
