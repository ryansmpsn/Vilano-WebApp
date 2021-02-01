import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Row, Col } from "react-bootstrap";
import DisplayEmployeeInfo from "./sections/DisplayEmployeeInfo";
import { useNavigate, useParams } from "react-router";
import { useToasts } from "react-toast-notifications";
import Send from "../../libs/send";
import { Jumbotron } from "react-bootstrap";

function EmployeeInformation(props) {
  const { addToast } = useToasts();
  let { employeeId } = useParams();
  let navigate = useNavigate();

  const [employeeData, setEmployeeData] = useState(null);
  const [selectedContracts, setSelectedContracts] = useState(null);
  const [employeeContracts, setEmployeeContracts] = useState(null);
  const [newContracts, setNewContracts] = useState(null);
  const [allModifiedContracts, setAllModifiedContracts] = useState(null);
  const [modifiedContracts, setModifiedContracts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (employeeId !== "employee") {
      getEmployee();
    }
    function getEmployee() {
      setIsLoading(true);
      gatherAllModifiedContracts();
      setSelectedContracts(null);
      Send.get("/Employee/" + employeeId).then((res) => {
        console.log(res);
        setEmployeeContracts(res.data[0][5].value);
        setEmployeeData(res.data[0]);
        setModifiedContracts(null);
        setIsLoading(false);
      });
    }
  }, [employeeId]);

  function handleContractSelect(x) {
    setSelectedContracts(x);
    let newContractGroup = [];
    x &&
      x.forEach((x) => {
        let singleContract = [
          { columnName: "employee_id", inputType: null, label: "Employee Id", updatedValue: employeeId },
          { columnName: "first_name", inputType: null, label: "First Name", updatedValue: employeeData[0].value[0][6].value },
          { columnName: "last_name", inputType: null, label: "Last Name", updatedValue: employeeData[0].value[0][7].value },
          { columnName: "contract_id", inputType: null, label: null, updatedValue: x.value },
          { columnName: "external_contract_code", inputType: null, label: "Contract", updatedValue: x.label },
          { columnName: "contract_role_id", inputType: null, label: null, updatedValue: null },
          { columnName: "role", inputType: "select", label: "Role", updatedValue: null },
          { columnName: "is_primary", inputType: "checkbox", label: "Home Contract", updatedValue: false },
          { columnName: "employee_contract_id", inputType: null, label: null, updatedValue: null },
          { columnName: "is_active", inputType: null, label: null, updatedValue: true },
        ];

        newContractGroup.push(singleContract);
      });
    setNewContracts(newContractGroup);
    gatherAllModifiedContracts(newContractGroup, modifiedContracts);
  }

  function handleEmployeeSelect(x) {
    setModifiedContracts(null);
    setEmployeeData(null);
    navigate("/employee/" + x.value);
  }

  function handleRoleSelect(x, index) {
    let rollChange = allModifiedContracts[index];
    rollChange[5].updatedValue = x.value;
    rollChange[6].updatedValue = x.label;
  }

  function saveContractToEmployee() {
    setIsLoading(true);
    gatherAllModifiedContracts(newContracts, modifiedContracts);

    let contractEmployees = [{ columnName: "employee_contracts", value: allModifiedContracts }];
    Send.post("/Employee/Contract", contractEmployees).then((result) => {
      setModifiedContracts(null);
      setEmployeeData(result.data[0]);
      setEmployeeContracts(result.data[0][5].value);
      setIsLoading(false);
    });
    addToast(`Contracts Saved to ${employeeId}'s Profile.`, {
      appearance: "success",
      autoDismiss: true,
      autoDismissTimeout: 3000,
    });
  }

  function editContract(contract, index) {
    let newContractEmployees = [...employeeContracts];
    newContractEmployees.splice(index, 1);
    setEmployeeContracts(newContractEmployees);

    let editSelection = modifiedContracts;
    editSelection ? (editSelection = modifiedContracts) : (editSelection = []);
    editSelection.push(contract);
    setModifiedContracts(editSelection);
    gatherAllModifiedContracts(editSelection, newContracts);
  }

  function gatherAllModifiedContracts(x, y) {
    let modifiedContracts;
    if (x && y) {
      modifiedContracts = [...x, ...y];
    } else if (x) {
      modifiedContracts = [...x];
    } else if (y) {
      modifiedContracts = [...y];
    } else {
      modifiedContracts = [];
    }

    setAllModifiedContracts(modifiedContracts);
  }
  return (
    <Jumbotron>
      <Row className=" mb-4 justify-content-md-center">
        <Col md="4">
          <Select
            autofocus
            options={props.employeeDropdowns && props.employeeDropdowns[0].options}
            placeholder={"Employee List"}
            onChange={(x) => handleEmployeeSelect(x)}
            isDisabled={props.employeeDropdowns === null}
            isLoading={props.employeeDropdowns === null}
          />
        </Col>
        <Col md="4">
          <Select isMulti value={selectedContracts} options={props.contractIds} placeholder={"Add Additional Contracts"} onChange={(x) => handleContractSelect(x)} isDisabled={isLoading || employeeData === null} />
        </Col>
      </Row>
      <hr />
      <Row className="mt-5">
        <DisplayEmployeeInfo
          isLoading={isLoading}
          employeeData={employeeData}
          allModifiedContracts={allModifiedContracts}
          employeeDropdowns={props.employeeDropdowns}
          employeeContracts={employeeContracts}
          editContract={editContract}
          setContractEmployees={setModifiedContracts}
          handleRoleSelect={(x, index) => handleRoleSelect(x, index)}
          saveContractToEmployee={saveContractToEmployee}
          setAllModifiedContracts={setAllModifiedContracts}
        />
      </Row>
    </Jumbotron>
  );
}

export default EmployeeInformation;
