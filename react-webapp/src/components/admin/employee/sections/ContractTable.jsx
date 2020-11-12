import React from "react";
import { MDBDataTable } from "mdbreact";
import Select from "react-select";

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

  let contractData = [...props.contractData, ...props.modifiedContractData];
  let columnData = contractData[0].filter(labelFilter).map((c, index) => ({ label: c.label, field: c.columnName, sort: "asc" }));

  let rowData = contractData.map((data, index) =>
    data.filter(labelFilter).map((c) => [c.columnName, handleInputValue(c, c.updatedValue, index)])
  );
  rowData = rowData.map((c) => Object.fromEntries(c));
  function labelFilter(tableData) {
    return tableData.label !== null;
  }

  const data = {
    columns: columnData,
    rows: rowData,
  };

  function handleInputValue(data, value, index) {
    // console.log(contractData[index]);
    if (data.columnName === "role") {
      //   console.log(contractData[index][5].updatedValue);
      return (
        <Select
          className="mt-2"
          options={props.employeeDropdowns[3].options}
          value={{ label: value, value: contractData[index][5].updatedValue }}
          onChange={(x) => props.handleRoleSelect(x, index)}
          styles={customStyles}
        />
      );
    } else return value;
  }
  return <MDBDataTable striped bordered hover responsive data={data} />;
}

export default ContractTable;
