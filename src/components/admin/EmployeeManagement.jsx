import React, { useEffect, useState } from "react";
import Send from "../../libs/send";
import axios from "axios";
import { MDBRow, MDBCol, MDBCard, MDBCardHeader, MDBCardBody, MDBIcon } from "mdbreact";
import { Link, Routes, Route } from "react-router-dom";
import Documents from "./employee/Documents";
import EmployeeInformation from "./employee/EmployeeInformation";
import EmployeeContracts from "./employee/EmployeeContracts";

function EmployeeManagement(props) {
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
    <MDBRow className="mb-4">
      <MDBCol xl="12" md="12" className="mb-r">
        <MDBCard className="cascading-admin-card">
          <MDBCardHeader>
            <div className="admin-up">
              <MDBIcon icon="users" className="primary-color" />
            </div>
            <h1 className="m-3 text-center">Employee Management</h1>
            <Link to="assignment" className="btn btn-sm btn-outline-primary">
              Contracts
            </Link>
            <Link to="employee" className="btn btn-sm btn-outline-primary">
              Information
            </Link>
            <Link to="document" className="btn btn-sm btn-outline-primary">
              Documents
            </Link>
          </MDBCardHeader>
          <MDBCardBody>
            <Routes>
              <Route path="document" element={<Documents />} />
              <Route path="assignment" element={<EmployeeContracts contractIds={contractIds} employeeDropdowns={employeeDropdowns} />} />
              <Route path=":employeeId" element={<EmployeeInformation contractIds={contractIds} employeeDropdowns={employeeDropdowns} />} />
            </Routes>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
}

export default EmployeeManagement;
