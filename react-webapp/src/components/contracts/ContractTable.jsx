import React from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import EditContractTable from "./EditContractTable";

function ContractTable(props) {
  let contractData = props.contractData.map((c, index) => c);
  let columnData = contractData[0].filter(labelFilter).map((c, index) => ({ label: c.label, field: c.columnName, sort: "asc" }));
  if (sessionStorage.getItem("/contract/trips") >= 3) {
    columnData = [...columnData, { label: "View Trips", field: "viewTrips" }];
  }

  if (sessionStorage.getItem("contract/ratesheets") >= 3) {
    columnData = [...columnData, { label: "View Cost Data", field: "viewCostData" }];
  }
  if (sessionStorage.getItem("/contract") >= 3) {
    columnData = [...columnData, { label: "Edit Contract", field: "editContract" }];
  }

  let rowData = contractData.map((data, index) => data.filter(labelFilter).map((c, index) => [c.columnName, c.value]));
  rowData = rowData.map((c, index) => Object.fromEntries(c));
  rowData = rowData.map((c, index) => ({
    ...c,
    viewTrips: (
      <Link
        onClick={(e) => {
          props.setSelectedContract(contractData[index][6].value);
          props.setSelectedContractId(contractData[index][0].value);
          props.getTrips("/Contract/" + contractData[index][0].value);
        }}
        to={"../trips"}
        className="btn btn-primary btn-sm"
      >
        View Trips
      </Link>
    ),
    viewCostData: (
      <Link
        onClick={(e) => {
          props.setSelectedContract(contractData[index][6].value);
          props.setSelectedContractId(contractData[index][0].value);
        }}
        to="../costsegment"
        className="btn btn-primary btn-sm"
      >
        Cost Segments
      </Link>
    ),
    editContract: (
      <EditContractTable
        contract={contractData[index]}
        inputRestrictions={props.inputRestrictions}
        submitAction={(editContent) => {
          return props.submitAction(editContent);
        }}
      />
    ),
  }));

  function labelFilter(tableData) {
    return tableData.label !== null;
  }

  const data = {
    columns: columnData,
    rows: rowData,
  };
  return (
    <div>
      <MDBDataTable striped bordered hover responsive data={data} />
    </div>
  );
}

export default ContractTable;
