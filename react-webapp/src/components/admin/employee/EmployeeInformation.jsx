import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Row, Col } from "react-bootstrap";
import Send from "../../../libs/send";
import DisplayEmployeeInfo from "./sections/DisplayEmployeeInfo";
import { useNavigate, useParams } from "react-router";

function EmployeeInformation(props) {
  let { employeeId } = useParams();
  let navigate = useNavigate();

  const [employeeData, setEmployeeData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (employeeId !== "employee") {
      getEmployee();
    }
    function getEmployee() {
      Send.get("/Employee/" + employeeId).then((res) => {
        console.log(res);
        setEmployeeData(res.data[0]);
      });
    }
  }, [employeeId]);

  function handleContractSelect(x) {
    setIsLoading(true);
  }

  function handleEmployeeSelect(x) {
    navigate("/administration/employee/" + x.value);
  }
  return (
    <>
      <Row className=" mb-4 justify-content-md-center">
        <Col md="4">
          <Select
            autofocus
            options={props.employeeDropdowns}
            placeholder={"Employee List"}
            onChange={(x) => handleEmployeeSelect(x)}
          />
        </Col>
        <Col md="4">
          <Select
            isMulti
            options={props.contractIds}
            placeholder={"Search for contracts by ID"}
            onChange={(x) => handleContractSelect(x)}
          />
        </Col>
      </Row>
      {employeeData !== null && <DisplayEmployeeInfo employeeData={employeeData} />}
    </>
  );
}

export default EmployeeInformation;
