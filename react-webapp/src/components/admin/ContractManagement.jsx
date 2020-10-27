import React from "react";
import { Link } from "react-router-dom";
import { MDBCard, MDBCardHeader, MDBCardBody, MDBRow, MDBCol, MDBIcon } from "mdbreact";

function ContractManagement() {
  return (
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
                <Link to="routes" className="btn btn-sm btn-outline-primary">
                  Contracts
                </Link>
                <Link to="trips" className="btn btn-sm btn-outline-primary">
                  Trips
                </Link>
                <Link to="costsegment" className="btn btn-sm btn-outline-primary">
                  Rate Sheets
                </Link>
                <Link to="routes" className="btn btn-sm btn-outline-primary">
                  Routes
                </Link>
                <Link to="routes" className="btn btn-sm btn-outline-primary">
                  Facility
                </Link>
                <Link to="routes" className="btn btn-sm btn-outline-primary">
                  Frequency
                </Link>
                <Link to="routes" className="btn btn-sm btn-outline-primary">
                  Status Code
                </Link>
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
}

export default ContractManagement;
