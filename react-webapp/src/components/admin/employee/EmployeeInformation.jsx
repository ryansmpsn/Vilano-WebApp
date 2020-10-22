import React, { useState } from "react";
import Select from "react-select";
import { Row, Col } from "react-bootstrap";
import Send from "../../../libs/send";
import DisplayEmployee from "./sections/DisplayEmployee";

function EmployeeInformation(props) {
  const [employeeData, setEmployeeData] = useState(null);
  function getEmployee(x) {
    Send.get("/Employee/" + x.value).then((res) => {
      setEmployeeData(res.data[0]);
    });
  }
  return (
    <>
      <Row className=" mb-4 justify-content-md-center">
        <Col md="4">
          <Select options={props.employeeDropdowns} onChange={(x) => getEmployee(x)} />
        </Col>
      </Row>
      <Row>{employeeData !== null && <DisplayEmployee employeeData={employeeData} />}</Row>
    </>
  );
}

export default EmployeeInformation;
