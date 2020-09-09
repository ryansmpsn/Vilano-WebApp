import React from "react";
import { Routes, Route } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import EmployeeManagement from "./EmployeeManagement";
import ContractManagement from "./ContractManagement";
import FacilityManagement from "./FacilityManagement";

function AdministrationDashboard(props) {
  return (
    <>
      <Row className="mb-4 justify-content-md-center">
        <Col md="6" className="mb-r">
          <h1 className="m-3 text-center">Application Administration</h1>
        </Col>
      </Row>
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

      {/* <Routes>
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

         <Navigate from="/administration" to="/administration/dashboard" /> 
      </Routes> */}

      <Routes>
        <Route path="employee/*" element={<EmployeeManagement {...props} />} />
        <Route path="contract/*" element={<ContractManagement {...props} />} />
        <Route path="facility/*" element={<FacilityManagement {...props} />} />
      </Routes>
    </>
  );
}

export default AdministrationDashboard;
