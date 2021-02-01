import React, { useEffect, useState } from "react";
import Send from "../../libs/send";
import axios from "axios";
import { MDBCard, MDBCardHeader, MDBCardBody, MDBIcon, MDBListGroup, MDBListGroupItem, MDBBadge } from "mdbreact";
import CountUp from "react-countup";
import { Routes, Route, Navigate, NavLink } from "react-router-dom";
import EmployeeInformation from "./EmployeeInformation";
import EmployeeContracts from "./EmployeeContracts";
import { Nav, NavItem, Card } from "react-bootstrap";

function EmployeeDashboard(props) {
  const [employeeDropdowns, setEmployeeDropdowns] = useState(null);
  const [contractIds, setContractIds] = useState(null);

  useEffect(() => {
    const onLoad = async () => {
      const requestOne = Send.get("/Employee/Dropdowns/Employee/All");
      const requestTwo = Send.get("/Contract/Ids");
      // const requestThree = Send.get("/Facility/Active");

      axios
        .all([requestOne, requestTwo])
        .then(
          axios.spread((...responses) => {
            const responseOne = responses[0];
            const responseTwo = responses[1];
            // const responseThree = responses[2];
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
      <MDBCard className="cascading-admin-card mb-4">
        <MDBCardHeader>
          <div className="admin-up">
            <MDBIcon icon="users" className="primary-color" />
            <MDBCard className="w-25 ml-auto" style={{ marginTop: "-50px" }}>
              <MDBCardHeader>Statistics</MDBCardHeader>
              <MDBCardBody>
                <MDBListGroup className="list-group-flush">
                  <MDBListGroupItem>
                    Active Employees
                    <MDBBadge color="primary-color" pill className="float-right">
                      <CountUp start={0} end={employeeDropdowns ? employeeDropdowns[0].options.length : 0} duration={5} />
                    </MDBBadge>
                  </MDBListGroupItem>
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
          </div>
          <h2 className="mb-5 text-center" style={{ marginTop: "-50px" }}>
            Employee Management
          </h2>
        </MDBCardHeader>
      </MDBCard>
      <Nav justify variant="tabs" defaultActiveKey="employee" className="pb-2 w-50 mx-auto my-3 ">
        <NavItem>
          <NavLink to="employee" activeClassName="text-primary border-top">
            Information
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="assignment" activeClassName="text-primary border-top">
            Contracts
          </NavLink>
        </NavItem>
      </Nav>

      <Routes>
        <Route path="assignment" element={<EmployeeContracts contractIds={contractIds} employeeDropdowns={employeeDropdowns} />} />
        <Route path=":employeeId" element={<EmployeeInformation contractIds={contractIds} employeeDropdowns={employeeDropdowns} />} />
        <Navigate from="/employee" to="/employee/employee" />
      </Routes>
    </>
  );
}

export default EmployeeDashboard;
