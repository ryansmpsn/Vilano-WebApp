import React from "react";
import { MDBRow, MDBCol, MDBCard, MDBCardHeader, MDBCardBody, MDBIcon } from "mdbreact";
import { Link, Outlet } from "react-router-dom";

function EmployeeManagement(props) {
  return (
    <MDBRow className="mb-4">
      <MDBCol xl="12" md="12" className="mb-r">
        <MDBCard className="cascading-admin-card">
          <MDBCardHeader>
            <div className="admin-up">
              <MDBIcon icon="users" className="primary-color" />
            </div>
            <h1 className="m-3 text-center">Employee Management</h1>
            <Link to="all" className="btn btn-sm btn-outline-primary">
              All Employees
            </Link>
            <Link to="assignment" className="btn btn-sm btn-outline-primary">
              Assignment
            </Link>
            <Link to="employee" className="btn btn-sm btn-outline-primary">
              Employee Information
            </Link>
          </MDBCardHeader>
          <MDBCardBody>
            <Outlet />
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
}

export default EmployeeManagement;
