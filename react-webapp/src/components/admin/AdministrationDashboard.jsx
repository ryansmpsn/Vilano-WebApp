import React, { useEffect, useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { Row, Col, Nav, NavItem } from "react-bootstrap";
import EmployeeManagement from "./EmployeeManagement";
import ContractManagement from "./ContractManagement";
import FacilityManagement from "./FacilityManagement";
import AllEmployees from "./employee/AllEmployees";
import EmployeeInformation from "./employee/EmployeeInformation";
import EmployeeAssignment from "./employee/EmployeeAssignment";
import Send from "../../libs/send";

function AdministrationDashboard() {
  const [employeeDropdowns, setEmployeeDropdowns] = useState([]);

  useEffect(() => {
    Send.get("/Employee/Dropdowns/Employee/All").then((res) => {
      setEmployeeDropdowns(res.data);
    });
  }, []);

  return (
    <>
      <Row className="mb-4 justify-content-md-center">
        <Col md="6" className="mb-r">
          <h1 className="m-3 text-center">Application Administration</h1>
        </Col>
      </Row>
      <Row className="mb-4 justify-content-md-center">
        <Col md="6">
          <Nav justify variant="tabs" defaultActiveKey="contract" className="pb-2">
            <NavItem>
              <NavLink to="employee" activeClassName="text-primary border-top">
                Employee Management
              </NavLink>
            </NavItem>
            <NavItem eventKey="contract">
              <NavLink to="contract" activeClassName="text-primary border-top">
                Contract Management
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="facility" activeClassName="text-primary border-top">
                Facility Management
              </NavLink>
            </NavItem>
          </Nav>
        </Col>
      </Row>
      <Routes>
        <Route path="employee" element={<EmployeeManagement />}>
          <Route path="all" element={<AllEmployees />} />
          <Route path="assignment" element={<EmployeeAssignment />} />
          <Route path="employee" element={<EmployeeInformation employeeDropdowns={employeeDropdowns} />} />
        </Route>
        <Route path="contract/*" element={<ContractManagement />} />
        <Route path="facility/*" element={<FacilityManagement />} />
      </Routes>
    </>
  );
}

export default AdministrationDashboard;
