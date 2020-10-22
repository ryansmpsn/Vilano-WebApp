import React, { useState } from "react";
import Select from "react-select";
import { Row, Col } from "react-bootstrap";
import Send from "../../../libs/send";
import DisplayEmployee from "./sections/DisplayEmployee";

function EmployeeInformation(props) {
  const [employeeInformation, setEmployeeInformation] = useState([
    {
      columnName: "employee",
      inputType: null,
      label: "Employee",
      updatedValue: null,
      value: [
        [
          { columnName: "employee_id", inputType: null, label: "Employee ID", updatedValue: 100138, value: 100138 },
          { columnName: "is_active", inputType: "checkbox", label: "Active", updatedValue: 1, value: 1 },
          { columnName: "status_id", inputType: null, label: null, updatedValue: 11, value: 11 },
          { columnName: "status_value", inputType: "select", label: "Status", updatedValue: "Active", value: "Active" },
          { columnName: "employee_type_id", inputType: null, label: null, updatedValue: 11, value: 11 },
          {
            columnName: "employee_type_value",
            inputType: "select",
            label: "Type",
            updatedValue: "Undefined",
            value: "Undefined",
          },
          { columnName: "first_name", inputType: "text", label: "First Name", updatedValue: "Ryan", value: "Ryan" },
          { columnName: "last_name", inputType: "text", label: "Last Name", updatedValue: "Simpson", value: "Simpson" },
          { columnName: "middle_name", inputType: "text", label: "Middle Name", updatedValue: null, value: null },
          { columnName: "prefix", inputType: "text", label: "Prefix", updatedValue: null, value: null },
          { columnName: "suffix", inputType: "text", label: "Suffix", updatedValue: null, value: null },
          {
            columnName: "modified_timestamp",
            inputType: null,
            label: "Last Modified",
            updatedValue: "2020-07-09 13:49:42",
            value: "2020-07-09 13:49:42",
          },
          { columnName: "modified_by", inputType: null, label: null, updatedValue: 100000, value: 100000 },
          {
            columnName: "modified_by_employee_name",
            inputType: null,
            label: "Modified By Employee Name",
            updatedValue: "System Account",
            value: "System Account",
          },
        ],
      ],
    },
    {
      columnName: "employee_addresses",
      inputType: null,
      label: "Employee Addresses",
      updatedValue: null,
      value: [
        [
          { columnName: "employee_address_id", inputType: null, label: null, updatedValue: 2, value: 2 },
          { columnName: "employee_id", inputType: null, label: null, updatedValue: 100138, value: 100138 },
          { columnName: "is_active", inputType: "checkbox", label: "Active", updatedValue: 1, value: 1 },
          { columnName: "address_type", inputType: "select", label: "Address Type", updatedValue: "Mailing", value: "Mailing" },
          {
            columnName: "address_1",
            inputType: "text",
            label: "Street Address",
            updatedValue: "13800 Egrets Nest Drive",
            value: "13800 Egrets Nest Drive",
          },
          { columnName: "address_2", inputType: "text", label: "Street Address 2", updatedValue: "25", value: "25" },
          { columnName: "city_name", inputType: null, label: "City", updatedValue: "Jacksonville", value: "Jacksonville" },
          { columnName: "state_code", inputType: null, label: "State", updatedValue: "FL", value: "FL" },
          { columnName: "zip_postal_code", inputType: "select", label: "Zip", updatedValue: "32258", value: "32258" },
          { columnName: "zip_code_postal_id", inputType: null, label: null, updatedValue: 13961, value: 13961 },
          {
            columnName: "modified_timestamp",
            inputType: null,
            label: "Last Modified",
            updatedValue: "2020-07-08 12:13:48",
            value: "2020-07-08 12:13:48",
          },
          { columnName: "modified_by", inputType: null, label: null, updatedValue: 100000, value: 100000 },
          {
            columnName: "modified_by_employee_name",
            inputType: null,
            label: "Modified By Employee",
            updatedValue: "System Account",
            value: "System Account",
          },
        ],
      ],
    },
    {
      columnName: "employee_emails",
      inputType: null,
      label: "Employee Emails",
      updatedValue: null,
      value: [
        [
          { columnName: "employee_email_id", inputType: null, label: null, updatedValue: 2, value: 2 },
          { columnName: "employee_id", inputType: null, label: null, updatedValue: 100138, value: 100138 },
          { columnName: "is_active", inputType: "checkbox", label: "Active", updatedValue: 1, value: 1 },
          { columnName: "email_type", inputType: "select", label: "Email Type", updatedValue: "Primary", value: "Primary" },
          {
            columnName: "email_address",
            inputType: "text",
            label: "Email",
            updatedValue: "ryan.simpson@postalfleetsvs.com",
            value: "ryan.simpson@postalfleetsvs.com",
          },
          { columnName: "is_valid", inputType: "checkbox", label: "Valid", updatedValue: 1, value: 1 },
          { columnName: "is_noemail", inputType: "checkbox", label: "Opt Out", updatedValue: 0, value: 0 },
          {
            columnName: "modified_timestamp",
            inputType: null,
            label: "Last Modified",
            updatedValue: "2020-07-08 12:27:44",
            value: "2020-07-08 12:27:44",
          },
          { columnName: "modified_by", inputType: null, label: null, updatedValue: 100000, value: 100000 },
          {
            columnName: "modified_by_employee_name",
            inputType: null,
            label: "Modified By Employee",
            updatedValue: "System Account",
            value: "System Account",
          },
        ],
      ],
    },
    { columnName: "employee_phones", inputType: null, label: "Employee Phones", updatedValue: null, value: [] },
    {
      columnName: "employee_licenses",
      inputType: null,
      label: "Employee Licenses",
      updatedValue: null,
      value: [
        [
          { columnName: "employee_license_id", inputType: null, label: null, updatedValue: 3, value: 3 },
          { columnName: "employee_id", inputType: null, label: null, updatedValue: 100138, value: 100138 },
          { columnName: "is_active", inputType: null, label: "Active", updatedValue: 1, value: 1 },
          { columnName: "license_type_id", inputType: null, label: null, updatedValue: 3, value: 3 },
          { columnName: "license_type", inputType: "select", label: "Type", updatedValue: "Class C", value: "Class C" },
          { columnName: "license_state", inputType: "select", label: "Issuing State", updatedValue: "FL", value: "FL" },
          { columnName: "license_number", inputType: "text", label: "License Number", updatedValue: "3C", value: "3C" },
          { columnName: "issue_date", inputType: "date", label: "Issue Date", updatedValue: "2018-09-08", value: "2018-09-08" },
          {
            columnName: "expiration_date",
            inputType: "date",
            label: "Expiration Date",
            updatedValue: "2026-07-08",
            value: "2026-07-08",
          },
          { columnName: "is_current", inputType: "checkbox", label: "Current", updatedValue: 1, value: 1 },
          { columnName: "is_commercial", inputType: "checkbox", label: "Commercial", updatedValue: 0, value: 0 },
          { columnName: "no_night", inputType: "checkbox", label: "No Night Driving", updatedValue: 0, value: 0 },
          {
            columnName: "corrective_lenses",
            inputType: "checkbox",
            label: "Require Corrective Lenses",
            updatedValue: 0,
            value: 0,
          },
          { columnName: "no_air_brakes", inputType: "checkbox", label: "No Airbrakes", updatedValue: 0, value: 0 },
          { columnName: "other_restrictions", inputType: "checkbox", label: "Other Restrictions", updatedValue: 0, value: 0 },
          {
            columnName: "modified_timestamp",
            inputType: null,
            label: "Last Modified",
            updatedValue: "2020-07-08 13:35:54",
            value: "2020-07-08 13:35:54",
          },
          { columnName: "modified_by", inputType: null, label: null, updatedValue: 100000, value: 100000 },
          {
            columnName: "modified_by_employee_name",
            inputType: null,
            label: "Modified By Employee",
            updatedValue: "System Account",
            value: "System Account",
          },
          {
            columnName: "employee_license_endorsements",
            inputType: null,
            label: "Employee License Endorsements",
            updatedValue: null,
            value: [],
          },
        ],
      ],
    },
    {
      columnName: "employee_contracts",
      inputType: null,
      label: "Employee Contracts",
      updatedValue: null,
      value: [
        [
          { columnName: "employee_contract_id", inputType: null, label: null, updatedValue: 6, value: 6 },
          { columnName: "employee_id", inputType: null, label: null, updatedValue: 100138, value: 100138 },
          { columnName: "is_active", inputType: "checkbox", label: "Active", updatedValue: 1, value: 1 },
          { columnName: "contract_id", inputType: null, label: null, updatedValue: 857, value: 857 },
          {
            columnName: "external_contract_code",
            inputType: "select",
            label: "Contract Number",
            updatedValue: "RyanTest",
            value: "RyanTest",
          },
          { columnName: "contract_role_id", inputType: null, label: null, updatedValue: 1, value: 1 },
          { columnName: "role", inputType: "select", label: "Role", updatedValue: "Manager", value: "Manager" },
          { columnName: "is_primary", inputType: "checkbox", label: "Primary", updatedValue: 1, value: 1 },
          {
            columnName: "modified_timestamp",
            inputType: null,
            label: "Last Modified",
            updatedValue: "2020-07-08 20:18:28",
            value: "2020-07-08 20:18:28",
          },
          { columnName: "modified_by", inputType: null, label: null, updatedValue: 100000, value: 100000 },
          {
            columnName: "modified_by_employee_name",
            inputType: null,
            label: "Modified By Employee",
            updatedValue: "System Account",
            value: "System Account",
          },
        ],
        [
          { columnName: "employee_contract_id", inputType: null, label: null, updatedValue: 8, value: 8 },
          { columnName: "employee_id", inputType: null, label: null, updatedValue: 100138, value: 100138 },
          { columnName: "is_active", inputType: "checkbox", label: "Active", updatedValue: 1, value: 1 },
          { columnName: "contract_id", inputType: null, label: null, updatedValue: 860, value: 860 },
          {
            columnName: "external_contract_code",
            inputType: "select",
            label: "Contract Number",
            updatedValue: "NoahTest",
            value: "NoahTest",
          },
          { columnName: "contract_role_id", inputType: null, label: null, updatedValue: 4, value: 4 },
          { columnName: "role", inputType: "select", label: "Role", updatedValue: "Floater", value: "Floater" },
          { columnName: "is_primary", inputType: "checkbox", label: "Primary", updatedValue: 0, value: 0 },
          {
            columnName: "modified_timestamp",
            inputType: null,
            label: "Last Modified",
            updatedValue: "2020-07-08 20:18:28",
            value: "2020-07-08 20:18:28",
          },
          { columnName: "modified_by", inputType: null, label: null, updatedValue: 100000, value: 100000 },
          {
            columnName: "modified_by_employee_name",
            inputType: null,
            label: "Modified By Employee",
            updatedValue: "System Account",
            value: "System Account",
          },
        ],
        [
          { columnName: "employee_contract_id", inputType: null, label: null, updatedValue: 7, value: 7 },
          { columnName: "employee_id", inputType: null, label: null, updatedValue: 100138, value: 100138 },
          { columnName: "is_active", inputType: "checkbox", label: "Active", updatedValue: 1, value: 1 },
          { columnName: "contract_id", inputType: null, label: null, updatedValue: 861, value: 861 },
          {
            columnName: "external_contract_code",
            inputType: "select",
            label: "Contract Number",
            updatedValue: "KennyTest2",
            value: "KennyTest2",
          },
          { columnName: "contract_role_id", inputType: null, label: null, updatedValue: 3, value: 3 },
          { columnName: "role", inputType: "select", label: "Role", updatedValue: "Driver", value: "Driver" },
          { columnName: "is_primary", inputType: "checkbox", label: "Primary", updatedValue: 0, value: 0 },
          {
            columnName: "modified_timestamp",
            inputType: null,
            label: "Last Modified",
            updatedValue: "2020-07-08 20:18:28",
            value: "2020-07-08 20:18:28",
          },
          { columnName: "modified_by", inputType: null, label: null, updatedValue: 100000, value: 100000 },
          {
            columnName: "modified_by_employee_name",
            inputType: null,
            label: "Modified By Employee",
            updatedValue: "System Account",
            value: "System Account",
          },
        ],
      ],
    },
  ]);
  function getEmployee(x) {
    Send.get("/Employee/" + x.value).then((res) => {
      setEmployeeInformation(res.data[0]);
    });
  }
  return (
    <>
      <Row>
        <Col>
          <Select options={props.employeeDropdowns} onChange={(x) => getEmployee(x)} />
        </Col>
      </Row>
      <Row>{employeeInformation !== null && <DisplayEmployee employeeData={employeeInformation} />}</Row>
    </>
  );
}

export default EmployeeInformation;
