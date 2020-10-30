import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Row, Col } from "react-bootstrap";
import Send from "../../../libs/send";
import DisplayEmployee from "./sections/DisplayEmployee";
import { useNavigate, useParams } from "react-router";

function EmployeeInformation(props) {
  let { employeeId } = useParams();
  let navigate = useNavigate();

  const [employeeData, setEmployeeData] = useState(null);

  useEffect(() => {
    if (employeeId !== "employee") {
      getEmployee();
    }
    function getEmployee() {
      Send.get("/Employee/" + employeeId).then((res) => {
        setEmployeeData(res.data[0]);
      });
    }
  }, [employeeId]);

  function handleChange(x) {
    navigate("/administration/employee/" + x.value);
  }
  return (
    <>
      <Row className=" mb-4 justify-content-md-center">
        <Col md="4">
          <Select options={props.employeeDropdowns} onChange={(x) => handleChange(x)} />
        </Col>
      </Row>
      {employeeData !== null && <DisplayEmployee employeeData={employeeData} />}
    </>
  );
}

export default EmployeeInformation;
