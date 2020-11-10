import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Row, Col } from "react-bootstrap";
import Send from "../../../libs/send";
import DisplayEmployeeInfo from "./sections/DisplayEmployeeInfo";
import { useNavigate, useParams } from "react-router";
import { useToasts } from "react-toast-notifications";

function EmployeeInformation(props) {
  const { addToast } = useToasts();
  let { employeeId } = useParams();
  let navigate = useNavigate();

  const [employeeData, setEmployeeData] = useState(null);
  const [modifiedContracts, setModifiedContracts] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (employeeId !== "employee") {
      getEmployee();
    }
    function getEmployee() {
      Send.get("/Employee/" + employeeId).then((res) => {
        console.log(res.data[0]);
        setEmployeeData(res.data[0]);
      });
    }
  }, [employeeId]);

  function handleContractSelect(x) {
    let newContractGroup = [];
    x &&
      x.forEach((x) => {
        let singleContract = [
          { columnName: "employee_id", inputType: null, label: "Employee Id", value: employeeId },
          { columnName: "first_name", inputType: null, label: "First Name", value: employeeData[0].value[0][6].value },
          { columnName: "last_name", inputType: null, label: "Last Name", value: employeeData[0].value[0][7].value },
          { columnName: "contract_id", inputType: null, label: null, value: x.value },
          { columnName: "external_contract_code", inputType: null, label: "Contract", value: x.label },
          { columnName: "contract_role_id", inputType: null, label: null, value: null },
          { columnName: "role", inputType: "select", label: "Role", value: null },
          { columnName: "is_primary", inputType: "checkbox", label: "Home Contract", value: false },
          { columnName: "employee_contract_id", inputType: null, label: null, value: null },
          { columnName: "is_active", inputType: "checkbox", label: "Active", value: true },
        ];

        newContractGroup.push(singleContract);
      });
    setModifiedContracts(newContractGroup);
  }

  function handleEmployeeSelect(x) {
    setModifiedContracts(null);
    setEmployeeData(null);
    navigate("/administration/employee/" + x.value);
  }

  function handleRoleSelect(x, index) {
    let rollChange = modifiedContracts[index];
    rollChange[5].value = x.value;
    rollChange[6].value = x.label;
    console.log(rollChange[5]);
  }

  function saveContractToEmployee() {
    let contractEmployees = [{ columnName: "employee_contracts", value: modifiedContracts }];
    // Send.post("/Employee/ContractEmployee/", modifiedContracts).then((result) => {});
    addToast(`Contracts Saved to ${employeeId}'s Profile.`, {
      appearance: "success",
      autoDismiss: true,
      autoDismissTimeout: 3000,
    });
    console.log(contractEmployees);
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
      <DisplayEmployeeInfo
        employeeData={employeeData}
        employeeDropdowns={props.employeeDropdowns}
        modifiedContracts={modifiedContracts}
        setContractEmployees={setModifiedContracts}
        handleRoleSelect={(x, index) => handleRoleSelect(x, index)}
      />
    </>
  );
}

export default EmployeeInformation;
