import React, { useState, useEffect } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import Select from "react-select";
import Send from "../../libs/send";
import { useToasts } from "react-toast-notifications";
import DisplayContractEmployee from "./sections/DisplayContractEmployees";
import ContractTable from "./sections/ContractTable";
import { Jumbotron } from "react-bootstrap";
import { useParams } from "react-router";

function EmployeeContracts(props) {
  const { addToast } = useToasts();
  let { contractId } = useParams();
  let { contract } = props;

  const [selectedContract, setSelectedContract] = useState(null); //from select  contract dropdown
  const [selectedEmployees, setSelectedEmployees] = useState(null); // controls employee select dropdown
  const [contractEmployees, setContractEmployees] = useState(null);
  const [newEmployees, setNewEmployees] = useState(null);
  const [allModifiedEmployees, setAllModifiedEmployees] = useState(null);
  const [modifiedEmployees, setModifiedEmployees] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (contractId) {
      setIsLoading(true);
      setSelectedContract({ label: contract[6].value, value: contractId });
      gatherAllModifiedEmployees();
      Send.get("/Employee/ContractEmployee/" + contractId).then((response) => {
        setContractEmployees(response.data.value);
        setModifiedEmployees(null);
        setIsLoading(false);
      });
    } else {
      // do something
    }
  }, [contractId, contract]);

  function handleContractSelect(x) {
    setIsLoading(true);
    setSelectedContract(x);
    setSelectedEmployees(null);
    gatherAllModifiedEmployees();

    Send.get("/Employee/ContractEmployee/" + x.value).then((response) => {
      setContractEmployees(response.data.value);
      setModifiedEmployees(null);
      setIsLoading(false);
    });
  }

  function handleEmployeeSelect(x) {
    setSelectedEmployees(x);
    let newEmployeeGroup = [];

    x &&
      x.forEach((x) => {
        let singleEmployee = [
          { columnName: "employee_id", inputType: null, label: "Employee Id", updatedValue: x.value },
          { columnName: "first_name", inputType: null, label: "First Name", updatedValue: x.label.split(" ")[0] },
          { columnName: "last_name", inputType: null, label: "Last Name", updatedValue: x.label.split(" ")[1] },
          { columnName: "contract_id", inputType: null, label: null, updatedValue: selectedContract.value },
          { columnName: "external_contract_code", inputType: null, label: "Contract", updatedValue: selectedContract.label },
          { columnName: "contract_role_id", inputType: null, label: null, updatedValue: null },
          { columnName: "role", inputType: "select", label: "Role", updatedValue: null },
          { columnName: "is_primary", inputType: "checkbox", label: "Home Contract", updatedValue: false },
          { columnName: "employee_contract_id", inputType: null, label: null, updatedValue: null },
          { columnName: "is_active", inputType: null, label: null, updatedValue: true },
        ];

        newEmployeeGroup.push(singleEmployee);
      });
    setNewEmployees(newEmployeeGroup);
    gatherAllModifiedEmployees(newEmployeeGroup, modifiedEmployees);
  }

  function handleRoleSelect(x, index) {
    let rollChange = allModifiedEmployees[index];
    rollChange[5].updatedValue = x.value;
    rollChange[6].updatedValue = x.label;
  }

  function saveEmployeeToContract() {
    setIsLoading(true);
    gatherAllModifiedEmployees(newEmployees, modifiedEmployees);
    let contractEmployees = [{ columnName: "employee_contracts", value: allModifiedEmployees }];
    // remove logs inproduction
    Send.post("/Employee/ContractEmployee", contractEmployees).then((response) => {
      setContractEmployees(response.data.value);
      setModifiedEmployees(null);
      setSelectedEmployees(null);
      gatherAllModifiedEmployees();
      setIsLoading(false);
    });
    addToast(`Employees Saved to Contract: ${selectedContract.label}.`, {
      appearance: "success",
      autoDismiss: true,
      autoDismissTimeout: 3000,
    });
  }

  function removeEmployee(index) {
    let removeEmp = allModifiedEmployees;
    removeEmp[index][9].updatedValue = false;
    gatherAllModifiedEmployees(removeEmp);
  }

  function editContract(contract, index) {
    let newContractEmployees = [...contractEmployees];
    newContractEmployees.splice(index, 1);
    setContractEmployees(newContractEmployees);

    let editSelection = modifiedEmployees;
    editSelection ? (editSelection = modifiedEmployees) : (editSelection = []);
    editSelection.push(contract);
    setModifiedEmployees(editSelection);
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
      {contractId ? (
        <>
          <Row className="mb-4 justify-content-md-center">
            <Col md="4">
              <Select
                isMulti
                value={selectedEmployees}
                options={props.employeeDropdowns && props.employeeDropdowns[0].options}
                placeholder={"Select an Employee to Add to Contract"}
                onChange={(x) => handleEmployeeSelect(x)}
                isDisabled={contractEmployees === null}
              />
            </Col>
          </Row>
        </>
      ) : (
        <Jumbotron>
          <Row className="mb-4 justify-content-md-center">
            <Col md="4">
              <Select
                autofocus
                options={props.contractIds}
                placeholder={"Search for contracts by ID"}
                onChange={(x) => handleContractSelect(x)}
                isDisabled={props.contractIds === null}
                isLoading={props.contractIds === null}
              />
            </Col>
            <Col md="4">
              <Select
                isMulti
                value={selectedEmployees}
                options={props.employeeDropdowns && props.employeeDropdowns[0].options}
                placeholder={"Add Employees"}
                onChange={(x) => handleEmployeeSelect(x)}
                isDisabled={contractEmployees === null}
              />
            </Col>
          </Row>
        </Jumbotron>
      )}

      {isLoading ? (
        <Spinner animation="border" variant="primary" />
      ) : contractEmployees && contractEmployees.length + allModifiedEmployees.length >= 5 ? (
        <ContractTable
          editContract={editContract}
          contractData={contractEmployees}
          handleRoleSelect={handleRoleSelect}
          modifiedContractData={allModifiedEmployees}
          employeeDropdowns={props.employeeDropdowns}
          setContractEmployees={setAllModifiedEmployees}
          removeRow={removeEmployee}
        />
      ) : contractEmployees && (contractEmployees.length > 0 || allModifiedEmployees.length > 0) ? (
        <Row className="justify-content-md-center">
          <DisplayContractEmployee modified={false} contractEmployees={contractEmployees} employeeDropdowns={props.employeeDropdowns} editContract={editContract} />
          <DisplayContractEmployee
            modified
            employeeDropdowns={props.employeeDropdowns}
            contractEmployees={allModifiedEmployees}
            setContractEmployees={setModifiedEmployees}
            handleRoleSelect={(x, index) => handleRoleSelect(x, index)}
            removeEmployee={removeEmployee}
          />
        </Row>
      ) : (
        <h5>No employees are associated with this contract.</h5>
      )}

      {allModifiedEmployees && allModifiedEmployees.length !== 0 && (
        <Row>
          <Col className="text-center">
            <Button className="btn btn-md" variant="outline-primary" onClick={() => saveEmployeeToContract()}>
              save
            </Button>
          </Col>
        </Row>
      )}
    </>
  );
}

export default EmployeeContracts;
