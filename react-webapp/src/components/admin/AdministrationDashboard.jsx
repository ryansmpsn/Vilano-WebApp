import React from "react";
import { Routes, Route } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import EmployeeManagement from "./EmployeeManagement";
import ContractManagement from "./ContractManagement";
import FacilityManagement from "./FacilityManagement";
import AllEmployees from "./employee/AllEmployees";
import EmployeeInformation from "./employee/EmployeeInformation";
import HireEmployee from "./employee/HireEmployee";
import EmployeeAssignment from "./employee/EmployeeAssignment";

function AdministrationDashboard(props) {
  return (
    <>
      <Row>
        <Col>
          <Link to="employee" className="btn btn-primary btn-sm btn-outline-info">
            Employee Management
          </Link>
          <Link to="contract" className="btn btn-primary btn-sm btn-outline-info">
            Contract Management
          </Link>
          <Link to="facility" className="btn btn-primary btn-sm btn-outline-info">
            Facility Management
          </Link>
        </Col>
      </Row>
      <Row className="mb-4 justify-content-md-center">
        <Col md="6" className="mb-r">
          <h1 className="m-3 text-center">Application Administration</h1>
        </Col>
      </Row>

      <Routes>
        <Route path="employee" element={<EmployeeManagement {...props} />}>
          <Route path="all" element={<AllEmployees />} />
          <Route path="assignment" element={<EmployeeAssignment />} />
          <Route path="employee" element={<EmployeeInformation />} />
          <Route path="hire" element={<HireEmployee />} />
        </Route>
        <Route path="contract/*" element={<ContractManagement {...props} />} />
        <Route path="facility/*" element={<FacilityManagement {...props} />} />
      </Routes>
    </>
  );
}

export default AdministrationDashboard;
