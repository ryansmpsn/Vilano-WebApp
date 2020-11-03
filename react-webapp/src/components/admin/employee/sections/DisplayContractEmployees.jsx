import React, { useState } from "react";
import { Button, Card, Col, Row, Spinner } from "react-bootstrap";
import Select from "react-select";

function DisplayContractEmployee(props) {
  let navigate = useNavigate();

  console.log(props);
  const modifiedContractEmployees = props.modifiedContractEmployees;

  function handleRoleSelect() {
    console.log("hi");
  }

  function searchEmployee(x) {
    navigate("/administration/employee/" + x);
  }
  return (
    modifiedContractEmployees !== null &&
    modifiedContractEmployees.map((employee, index) => (
      <Col md="3" key={"dataCol" + index}>
        <Card className="mb-3" border={employee[7].value === null ? "warning" : employee[7].value === "true" ? "info" : "light"}>
          <Card.Header>{employee[1].value + " " + employee[2].value}</Card.Header>
          <Card.Body>
            {employee.map(
              (content, arrayIndex) =>
                content.label !== null &&
                (content.label === "Role" ? (
                  <Row key={"employeeContent" + arrayIndex}>
                    <Col md="2" className="mt-2 pr-0">
                      <Card.Text>{content.label}:</Card.Text>
                    </Col>
                    <Col>
                      <Select
                        className="pt-2"
                        options={props.employeeDropdowns[3].options}
                        onChange={(x) => handleRoleSelect(x, index)}
                      />
                    </Col>
                  </Row>
                ) : (
                  <Card.Text key={"employeeContent" + arrayIndex}>
                    {content.label}: {content.value}
                  </Card.Text>
                ))
            )}
          </Card.Body>
          <Card.Footer>
            <Button className="btn btn-sm" variant="outline-info" onClick={() => searchEmployee(employee[0].value)}>
              view profile
            </Button>
            <Button className="btn btn-sm float-right" variant="outline-danger" onClick={() => console.log("remove this emp")}>
              remove
            </Button>
          </Card.Footer>
        </Card>
      </Col>
    ))
  );
}

export default DisplayContractEmployee;
