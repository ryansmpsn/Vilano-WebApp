import React, { useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import Select from "react-select";
import Send from "../../../libs/send";
import { useToasts } from "react-toast-notifications";
import DisplayContractEmployee from "./sections/DisplayContractEmployees";

function EmployeeContracts(props) {
  const { addToast } = useToasts();

  const [selectedContract, setSelectedContract] = useState(null);
  const [selectedEmployeees, setSelectedEmployees] = useState(null);
  const [contractEmployees, setContractEmployees] = useState(null);
  const [newEmployees, setNewEmployees] = useState(null);
  const [allModifiedEmployees, setAllModifiedEmployees] = useState(null);
  const [modifiedContractEmployees, setModifiedContractEmployees] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleContractSelect(x) {
    setSelectedContract(x);
    setIsLoading(true);
    setSelectedEmployees(null);

    Send.get("/Employee/ContractEmployee/" + x.value).then((response) => {
      setIsLoading(false);
      setContractEmployees(response.data.value);
      setModifiedContractEmployees(null);
    });
  }

  function handleEmployeeSelect(x) {
    setSelectedEmployees(x);
    let newEmployeeGroup = [];

    x &&
      x.forEach((x) => {
        let singleEmployee = [
          { columnName: "employee_id", inputType: null, label: "Employee Id", value: x.value },
          { columnName: "first_name", inputType: null, label: "First Name", value: x.label.split(" ")[0] },
          { columnName: "last_name", inputType: null, label: "Last Name", value: x.label.split(" ")[1] },
          { columnName: "contract_id", inputType: null, label: null, value: selectedContract.value },
          { columnName: "external_contract_code", inputType: null, label: "Contract", value: selectedContract.label },
          { columnName: "contract_role_id", inputType: null, label: null, value: null },
          { columnName: "role", inputType: "select", label: "Role", value: null },
          { columnName: "is_primary", inputType: "checkbox", label: "Home Contract", value: false },
          { columnName: "employee_contract_id", inputType: null, label: null, value: null },
          { columnName: "is_active", inputType: null, label: null, value: true },
        ];

        newEmployeeGroup.push(singleEmployee);
      });
    setNewEmployees(newEmployeeGroup);
    gatherAllModifiedEmployees(newEmployeeGroup, modifiedContractEmployees);
  }

  function handleRoleSelect(x, index) {
    let rollChange = allModifiedEmployees[index];
    rollChange[5].value = x.value;
    rollChange[6].value = x.label;
  }

  function saveEmployeeToContract() {
    gatherAllModifiedEmployees(newEmployees, modifiedContractEmployees);
    let contractEmployees = [{ columnName: "employee_contracts", value: allModifiedEmployees }];
    Send.post("/Employee/ContractEmployee", allModifiedEmployees).then((result) => {
      console.log(result);
    });
    addToast(`Employees Saved to Contract: ${selectedContract.label}.`, {
      appearance: "success",
      autoDismiss: true,
      autoDismissTimeout: 3000,
    });
    setSelectedEmployees(null);
    console.log(JSON.stringify(contractEmployees));
  }

  function editContract(contract, index) {
    let newContractEmployees = [...contractEmployees];
    newContractEmployees.splice(index, 1);
    setContractEmployees(newContractEmployees);

    let editSelection = modifiedContractEmployees;
    editSelection ? (editSelection = modifiedContractEmployees) : (editSelection = []);
    editSelection.push(contract);
    setModifiedContractEmployees(editSelection);
    gatherAllModifiedEmployees(editSelection, newEmployees);
  }

  function gatherAllModifiedEmployees(x, y) {
    let modifiedEmployees;
    if (x && y) {
      modifiedEmployees = [...x, ...y];
    } else if (x) {
      modifiedEmployees = [...x];
    } else if (y) {
      modifiedEmployees = [...y];
    } else {
      modifiedEmployees = [];
    }

    setAllModifiedEmployees(modifiedEmployees);
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
            value={selectedEmployeees}
            options={props.employeeDropdowns[0].options}
            placeholder={"Add Additional Employees"}
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
          <>
            <DisplayContractEmployee
              modified={false}
              contractEmployees={contractEmployees}
              employeeDropdowns={props.employeeDropdowns}
              editContract={editContract}
            />
            <DisplayContractEmployee
              modified={true}
              employeeDropdowns={props.employeeDropdowns}
              contractEmployees={allModifiedEmployees}
              setContractEmployees={setModifiedContractEmployees}
              handleRoleSelect={(x, index) => handleRoleSelect(x, index)}
            />
          </>
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

export default EmployeeContracts;
