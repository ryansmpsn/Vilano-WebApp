import React, { useEffect, useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import { Row, Col, Nav, NavItem } from "react-bootstrap";
import EmployeeManagement from "./EmployeeManagement";
import ContractManagement from "./ContractManagement";
import FacilityManagement from "./FacilityManagement";
import AllEmployees from "./employee/AllEmployees";
import EmployeeInformation from "./employee/EmployeeInformation";
import EmployeeContracts from "./employee/EmployeeContracts";
import Send from "../../libs/send";
import axios from "axios";

function AdministrationDashboard() {
  const [employeeDropdowns, setEmployeeDropdowns] = useState(null);
  const [contractIds, setContractIds] = useState(null);

  useEffect(() => {
    const onLoad = async () => {
      const requestOne = Send.get("/Employee/Dropdowns/Employee/All");
      const requestTwo = Send.get("/Contract/Ids");

      axios
        .all([requestOne, requestTwo])
        .then(
          axios.spread((...responses) => {
            const responseOne = responses[0];
            const responseTwo = responses[1];
            setEmployeeDropdowns(responseOne.data);
            getContractIds(responseTwo.data);
          })
        )
        .catch((errors) => {
          // react on errors
          console.log(errors);
        });
    };
    onLoad();
  }, []);

  function getContractIds(ids) {
    let contractData = ids;
    let pushContractIds = [];
    contractData.map((item, index) => {
      return pushContractIds.push({
        label: item[1].value,
        value: item[0].value,
      });
    });
    setContractIds(pushContractIds);
  }

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
        <Route path="employee" element={<EmployeeManagement />}>
          <Route path="all" element={<AllEmployees />} />
          <Route
            path="assignment"
            element={<EmployeeContracts contractIds={contractIds} employeeDropdowns={employeeDropdowns} />}
          />
          <Route
            path=":employeeId"
            element={<EmployeeInformation contractIds={contractIds} employeeDropdowns={employeeDropdowns} />}
          />
        </Route>
        <Route path="contract/*" element={<ContractManagement />} />
        <Route path="facility/*" element={<FacilityManagement />} />
      </Routes>
    </>
  );
}

export default AdministrationDashboard;
