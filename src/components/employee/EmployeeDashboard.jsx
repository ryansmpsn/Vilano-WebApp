import React, { useEffect, useState } from "react";
import Send from "../../libs/send";
import axios from "axios";
import CountUp from "react-countup";
import { Routes, Route, Navigate, NavLink } from "react-router-dom";
import EmployeeInformation from "./EmployeeInformation";
import EmployeeContracts from "./EmployeeContracts";
import { Badge, Card, ListGroup, ListGroupItem, Nav, NavItem } from "react-bootstrap";

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
      <Card className="cascading-admin-card mb-4">
        <Card.Header>
          <div className="admin-up">
            <div className="fa">
              <div className="fas fa-users" />
            </div>

            <Card className="w-25 ml-auto" style={{ marginTop: "-50px" }}>
              <Card.Header>Statistics</Card.Header>
              <Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroupItem>
                    Active Employees
                    <Badge variant="primary" pill className="float-right">
                      <CountUp start={0} end={employeeDropdowns ? employeeDropdowns[0].options.length : 0} duration={5} />
                    </Badge>
                  </ListGroupItem>
                </ListGroup>
              </Card.Body>
            </Card>
          </div>
          <h2 className="mb-5 text-center" style={{ marginTop: "-50px" }}>
            Employee Management
          </h2>
        </Card.Header>
      </Card>
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
