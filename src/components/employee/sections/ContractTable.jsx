import React, { useState } from "react";
import Select from "react-select";
import { FormCheck } from "react-bootstrap";
import MaterialTable from "material-table";
import { useToasts } from "react-toast-notifications";
import Send from "../../../libs/send";

function ContractTable(props) {
  let liveContract = null;
  const { addToast } = useToasts();

  const contractData = [...props.contractData, ...props.modifiedContractData];
  let columnData = contractData[0].filter(labelFilter).map((c) => ({ title: c.label, field: c.columnName, sort: "asc" }));
  columnData[0].editable = "never";
  columnData[3].editable = "never";
  columnData[4].editable = "never";

  let rowData = contractData.map((data, index) => data.filter(labelFilter).map((c) => [c.columnName, c.value]));
  rowData = rowData.map((c) => Object.fromEntries(c));

  function labelFilter(tableData) {
    return tableData.label !== null;
  }

  columnData[1].editComponent = (rowProps) => (
    <Select
      options={props.employeeDropdowns[3].options}
      onChange={(x) => {
        rowProps.onChange(x.label);
        updateLiveContract(rowProps, x);
      }}
      menuPortalTarget={document.body}
    />
  );

  columnData[2].editComponent = (rowProps) => (
    <FormCheck
      type="checkbox"
      onChange={() => {
        rowProps.onChange(rowProps.rowData.is_primary === 0 ? 1 : 0);
        updateLiveContract(rowProps, rowProps.rowData.is_primary === 0 ? 1 : 0);
      }}
      checked={rowProps.rowData.is_primary === true || rowProps.rowData.is_primary === "true" || rowProps.rowData.is_primary === 1}
    />
  );

  function updateLiveContract(rowProps, value) {
    let variable_key = rowProps.columnDef.field;
    var variable = variable_key.substring(0, variable_key.lastIndexOf("_")) + "_id";
    var set = false;

    liveContract === null && (liveContract = props.contractData[rowProps.rowData.tableData.id]);

    liveContract.forEach((item) => {
      if (item.columnName === variable) {
        item.updatedValue = value.value || value;
        set = true;
      }
      if (item.columnName === variable_key) {
        item.updatedValue = value.label || value;
        set = true;
      }
    });
    if (set === false) {
      liveContract.push([null, value.value, variable, "", "None"]);
    }
  }

  const [rows, setRows] = useState(rowData);
  return (
    <MaterialTable
      columns={columnData}
      data={rows}
      title="Linked Employees"
      editable={{
        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            let employeeContracts = [{ columnName: "employee_contracts", value: props.contractData[oldData.tableData.id] }];
            employeeContracts[0].value[2].updatedValue = 0;

            Send.post("/Employee/Contract", employeeContracts).then(() => {
              const dataDelete = [...rows];
              const index = oldData.tableData.id;
              dataDelete.splice(index, 1);
              setRows([...dataDelete]);
              addToast("Contract successfully removed.", {
                appearance: "success",
                autoDismiss: true,
                autoDismissTimeout: 3000,
              });
              liveContract = null;
              resolve();
            });
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            let employeeContracts = [{ columnName: "employee_contracts", value: liveContract }];

            Send.post("/Employee/Contract", employeeContracts).then(() => {
              const dataUpdate = [...rows];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;
              setRows([...dataUpdate]);
              addToast("Contract successfully updated.", {
                appearance: "success",
                autoDismiss: true,
                autoDismissTimeout: 3000,
              });
              liveContract = null;
              resolve();
            });
          }),
        onRowUpdateCancelled: () => (liveContract = null),
      }}
    />
  );
}

export default ContractTable;
