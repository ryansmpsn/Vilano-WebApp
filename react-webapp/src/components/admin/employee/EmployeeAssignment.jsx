import React, { useState } from "react";
import { Button, Card, Col, Row, Spinner } from "react-bootstrap";
import Select from "react-select";
import Send from "../../../libs/send";
import { useNavigate } from "react-router";
import { useToasts } from "react-toast-notifications";

function EmployeeAssignment(props) {
  let navigate = useNavigate();
  const { addToast } = useToasts();

  const [contractEmployees, setContractEmployees] = useState(null);
  const [modifiedContractEmployees, setModifiedContractEmployees] = useState(null);
  const [selectedContract, setSelectedContract] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleContractSelect(x) {
    setSelectedContract(x);
    setIsLoading(true);
    Send.get("/Employee/ContractEmployee/" + x.value).then((response) => {
      setIsLoading(false);
      setContractEmployees(response.data.value);
      setModifiedContractEmployees(response.data.value);
    });
  }

  function handleEmployeeSelect(x) {
    let newEmployeeGroup = [...contractEmployees];
    x &&
      x.forEach((x) => {
        let singleEmployee = [
          { columnName: "employee_id", inputType: null, label: "Employee Id", value: null },
          { columnName: "first_name", inputType: null, label: "First Name", value: null },
          { columnName: "last_name", inputType: null, label: "Last Name", value: null },
          { columnName: "contract_id", inputType: null, label: null, value: selectedContract.value },
          { columnName: "external_contract_code", inputType: null, label: "Contract", value: selectedContract.label },
          { columnName: "contract_role_id", inputType: null, label: null, value: null },
          { columnName: "role", inputType: null, label: "Role", value: null },
          { columnName: "is_primary", inputType: null, label: "Home Contract", value: null },
          { columnName: "employee_contract_id", inputType: null, label: null, value: null },
          { columnName: "is_active", inputType: null, label: "Active", value: true },
          { columnName: "modified_timestamp", inputType: null, label: "Last Modified", value: null },
          { columnName: "modified_by_employee_name", inputType: null, label: "Modified By", value: null },
        ];
        singleEmployee[0].value = x.value;
        singleEmployee[1].value = x.label.split(" ")[0];
        singleEmployee[2].value = x.label.split(" ")[1];

        newEmployeeGroup.push(singleEmployee);
      });
    setModifiedContractEmployees(newEmployeeGroup);
  }

  function searchEmployee(x) {
    navigate("/administration/employee/" + x);
  }

  function saveEmployeeToContract() {
    // Send.post("", modifiedContractEmployees).then((result) => {});
    addToast(`Employees Saved to Contract: ${selectedContract.label}.`, {
      appearance: "success",
      autoDismiss: true,
      autoDismissTimeout: 3000,
    });
    console.log(modifiedContractEmployees);
  }

  return (
    <>
      <Row className="mb-4 justify-content-md-center">
        <Col md="4">
          <Select
            autofocus
            options={props.contractIds}
            placeholder={"Search for contracts by ID"}
            onChange={(x) => handleContractSelect(x)}
          />
        </Col>
        <Col md="4">
          <Select
            isMulti
            options={props.employeeDropdowns[0].options || []}
            placeholder={"Employee List"}
            onChange={(x) => handleEmployeeSelect(x)}
            isDisabled={contractEmployees === null}
          />
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
          modifiedContractEmployees !== null &&
          modifiedContractEmployees.map((employee, index) => (
            <Col md="3" key={"dataCol" + index}>
              <Card
                className="mb-3"
                border={employee[7].value === null ? "warning" : employee[7].value === "true" ? "info" : "light"}
              >
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
                    view Profile
                  </Button>
                  <Button
                    className="btn btn-sm float-right"
                    variant="outline-danger"
                    onClick={() => console.log("remove this emp")}
                  >
                    remove
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))
        )}
      </Row>
      <Row className="justify-content-center">
        <Col md="2">
          {selectedContract && (
            <Button className="btn btn-md" variant="outline-warning" onClick={() => saveEmployeeToContract()}>
              save
            </Button>
          )}
        </Col>
      </Row>
    </>
  );
}

export default EmployeeAssignment;
