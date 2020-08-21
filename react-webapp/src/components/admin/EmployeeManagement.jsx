import React from "react";
import { MDBRow, MDBCol, MDBCard, MDBCardHeader, MDBCardBody, MDBIcon } from "mdbreact";
import { Button } from "react-bootstrap";

function EmployeeManagement() {
  return (
    <MDBRow className="mb-4">
      <MDBCol xl="12" md="12" className="mb-r">
        <MDBCard className="cascading-admin-card">
          <MDBCardHeader>
            <div className="admin-up">
              <MDBIcon icon="users" className="primary-color" />
            </div>
            <h1 className="m-3 text-center">Employee Management</h1>
          </MDBCardHeader>
          <MDBCardBody>
            <Button className="btn btn-sm btn-primary">All Employees</Button>
            <Button className="btn btn-sm btn-primary">Assignment</Button>
            <Button className="btn btn-sm btn-primary">Employees</Button>
            <Button className="btn btn-sm btn-primary">Hire Employee</Button>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
}

export default EmployeeManagement;
