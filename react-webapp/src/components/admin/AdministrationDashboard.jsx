import React from "react";
import { Link } from "react-router-dom";
import { MDBCard, MDBCardHeader, MDBCardBody, MDBRow, MDBCol, MDBIcon } from "mdbreact";
import ContractManagement from "./ContractManagement";

function AdministrationDashboard() {
  return (
    <>
      <MDBRow className="mb-4">
        <MDBCol xl="12" md="12" className="mb-r">
          <MDBCard className="cascading-admin-card">
            <MDBCardHeader>
              <div className="admin-up">
                <MDBIcon icon="tools" className="primary-color" />
                <h1 className="m-3 text-center">Administration Dashboard</h1>
              </div>
            </MDBCardHeader>
            <MDBCardBody>
              <MDBRow>
                <MDBCol>
                  <Link to="dashboard" className="btn btn-sm btn-outline-warning">
                    Contract Management
                  </Link>
                  <Link to="routes" className="btn btn-sm btn-outline-warning">
                    Employee Management
                  </Link>
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      <ContractManagement />
    </>
  );
}

export default AdministrationDashboard;
