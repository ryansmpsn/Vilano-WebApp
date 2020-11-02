import React, { useState } from "react";
import { Button, Card, Col, Row, Spinner } from "react-bootstrap";
import Select from "react-select";
import Send from "../../../libs/send";
import { useNavigate } from "react-router";

function EmployeeAssignment(props) {
  let navigate = useNavigate();

  const [contractEmployees, setContractEmployees] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleContractSelect(x) {
    setIsLoading(true);
    Send.get("/Employee/ContractEmployee/" + x.value).then((response) => {
      setIsLoading(false);
      setContractEmployees(response.data.value);
    });
  }

  function handleEmployeeSelect(x) {
    console.log(x);
  }
  function searchEmployee(x) {
    navigate("/administration/employee/" + x);
  }

  return (
    <>
      <Row className="mb-4 justify-content-md-center">
        <Col md="4">
          <Select autofocus options={props.contractIds} placeholder={"Search for contracts by ID"} onChange={(x) => handleContractSelect(x)} />
        </Col>
        {console.log(props)}
        <Col md="4">
          <Select isMulti options={props.employeeDropdowns[0].options} placeholder={"Employee List"} onChange={(x) => handleEmployeeSelect(x)} />
          <Button className="btn btn-sm btn-outline-warning" onClick={()=> (console.log("Button was clicked"))}>Add</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 className="text-center">Employees Attached to Selected Contract</h2>
          <hr />
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        {isLoading ? (
          <Col>
            <Spinner animation="border" variant="primary" />
          </Col>
        ) : (
          contractEmployees !== null &&
          contractEmployees.map((employee, index) => (
            <Col md="3" key={"dataCol" + index}>
              <Card border={employee[7].value === "true" ? "info" : "light"}>
                <Card.Header>{employee[1].value + " " + employee[2].value}</Card.Header>
                <Card.Body>
                  {employee.map(
                    (content, index) =>
                      content.label !== null && (
                        <Card.Text key={"employeeContent" + index}>
                          {content.label}: {content.value}
                        </Card.Text>
                      )
                  )}
                </Card.Body>
                <Card.Footer>
                  <Button className="btn btn-sm" variant="outline-info" onClick={() => searchEmployee(employee[0].value)}>
                    View Employee Data
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </>
  );
}

export default EmployeeAssignment;
