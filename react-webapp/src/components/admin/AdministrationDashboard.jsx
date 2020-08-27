import React from "react";
import { MDBRow, MDBCol } from "mdbreact";
import { Routes } from "react-router-dom";
import { Tabs, Tab } from "react-bootstrap";
import EmployeeManagement from "./EmployeeManagement";
import ContractManagement from "./ContractManagement";
import FacilityManagement from "./FacilityManagement";

function AdministrationDashboard() {
  return (
    <>
      <MDBRow center className="mb-4">
        <MDBCol md="6" className="mb-r">
          <h1 className="m-3 text-center">Application Administration</h1>
        </MDBCol>
      </MDBRow>
      <Routes>
        <Tabs defaultActiveKey="employee" id="administration-tabs" variant="pills" className="mb-5 shadow-lg">
          <Tab eventKey="employee" title="Employee Management">
            <EmployeeManagement />
          </Tab>
          <Tab eventKey="contract" title="Contract Management">
            <ContractManagement />
          </Tab>
          <Tab eventKey="facility" title="Facility Management">
            <FacilityManagement />
          </Tab>
        </Tabs>

        {/* <Navigate from="/administration" to="/administration/dashboard" /> */}
      </Routes>
    </>
  );
}

export default AdministrationDashboard;
