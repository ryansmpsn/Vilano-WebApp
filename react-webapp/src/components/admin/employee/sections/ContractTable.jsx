import React from "react";
import { MDBDataTable, MDBIcon } from "mdbreact";
import Select from "react-select";
import { Button, FormCheck } from "react-bootstrap";

function ContractTable(props) {
  const customStyles = {
    control: (base) => ({
      ...base,
      marginTop: -15,
      marginBottom: -10,
      width: 140,
      height: 35,
      minHeight: 35,
    }),
  };
  const contractData = [...props.contractData, ...props.modifiedContractData];
  let columnData = contractData[0].filter(labelFilter).map((c, index) => ({ label: c.label, field: c.columnName, sort: "asc" }));
  //   add permissions here
  columnData = [...columnData, { label: "Edit", field: "editContract" }];

  let rowData = contractData.map((data, index) =>
    data.filter(labelFilter).map((c, arrayIndex) => [c.columnName, handleInputValue(c, c.updatedValue, index)])
  );
  rowData = rowData.map((c) => Object.fromEntries(c));
  rowData = rowData.map((c, index) => ({
    ...c,
    editContract:
      index < props.contractData.length ? (
        <Button
          className="btn btn-sm m-0 ml-3"
          variant="outline-warning"
          onClick={() => props.editContract(contractData[index], index)}
        >
          edit
        </Button>
      ) : (
        <MDBIcon className=" flex-center" size="lg" icon="check-square" />
      ),
  }));

  function labelFilter(tableData) {
    return tableData.label !== null;
  }

  const data = {
    columns: columnData,
    rows: rowData,
  };

  function handleInputValue(data, value, index) {
    if (data.columnName === "role" && index >= props.contractData.length) {
      return (
        <Select
          className="mt-2"
          options={props.employeeDropdowns[3].options}
          onChange={(x) => props.handleRoleSelect(x, props.contractData.length - index)}
          styles={customStyles}
        />
      );
    } else if (data.columnName === "is_primary") {
      return (
        <FormCheck
          id={data.columnName}
          type="checkbox"
          disabled={index < props.contractData.length}
          onChange={() => {
            var object = [...props.modifiedContractData];
            object[index - props.contractData.length][7].updatedValue = !value;
            props.setContractEmployees(object);
          }}
          checked={data.updatedValue === true || data.updatedValue === "true"}
        />
      );
    } else return value;
  }
  return <MDBDataTable striped bordered hover responsive data={data} />;
}

export default ContractTable;
