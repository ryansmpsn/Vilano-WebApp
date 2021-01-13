import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { Row, Col, Nav, NavItem } from "react-bootstrap";
import EmployeeManagement from "./EmployeeManagement";
import ContractManagement from "./ContractManagement";
import FacilityManagement from "./FacilityManagement";

function AdministrationDashboard() {
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
              <NavLink to="employee/" activeClassName="text-primary border-top">
                Employee Management
              </NavLink>
            </NavItem>
            <NavItem>
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
        <Route path="employee/*" element={<EmployeeManagement />} />
        <Route path="contract/*" element={<ContractManagement />} />
        <Route path="facility/*" element={<FacilityManagement />} />
      </Routes>
    </>
  );
}

export default AdministrationDashboard;
