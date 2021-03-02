import React from "react";
import { Link } from "react-router-dom";
import EditContractTable from "./EditContractTable";
import MaterialTable from "material-table";

function ContractTable(props) {
  let contractData = props.contractData;
  let columnData = contractData[0].filter(labelFilter).map((c, index) => ({ title: c.label, field: c.columnName, sort: "asc" }));
  if (sessionStorage.getItem("/contract/trips") >= 3) {
    columnData = [...columnData, { title: "View Trips", field: "viewTrips" }];
  }

  if (sessionStorage.getItem("/contract/ratesheets") >= 3) {
    columnData = [...columnData, { title: "View Cost Data", field: "viewCostData" }];
  }
  if (sessionStorage.getItem("/contract") >= 3) {
    columnData = [...columnData, { title: "Edit " + props.type, field: "editContract" }];
  }

  let rowData = contractData.map((data, index) => data.filter(labelFilter).map((c, index) => [c.columnName, c.value]));
  rowData = rowData.map((c, index) => Object.fromEntries(c));
  rowData = rowData.map((c, index) => ({
    ...c,
    viewTrips: (
      <Link
        onClick={() => {
          setSelectedId(index);
        }}
        to={"../trips"}
        className="btn btn-outline-primary btn-sm"
      >
        Trips
      </Link>
    ),
    viewCostData: (
      <Link
        onClick={() => {
          setSelectedId(index);
        }}
        to="../ratesheets"
        className="btn btn-outline-primary btn-sm text-nowrap"
      >
        Cost Data
      </Link>
    ),
    editContract: (
      <EditContractTable
        type={props.type}
        contract={contractData[index]}
        inputRestrictions={props.inputRestrictions}
        submitAction={(editContent) => {
          return props.submitAction(editContent);
        }}
      />
    ),
  }));

  function labelFilter(tableData) {
    let excludeColumns = [
      "Active",
      "Last Modified By",
      "Contract Type Name",
      "Division Name",
      "Contract Status",
      "Date of Solicitation",
      "Last Modified",
      "Solicitation No.",
      "Administration Office",
      "Origin State",
      "Destination State",
      "Solicitation Number",
      "Contract Division Name",
      "Origination State",
    ];

    if (tableData.label && !excludeColumns.includes(tableData.label)) {
      return tableData.label;
    }
  }

  function setSelectedId(index) {
    if (props.type === "Contract") {
      props.setSelectedContract(contractData[index][6].value);
      props.setSelectedContractId(contractData[index][0].value);
      props.getTrips("/Contract/" + contractData[index][0].value);
    }

    if (props.type === "Bid") {
      props.setSelectedBid(contractData[index][10].value);
      props.setSelectedBidId(contractData[index][0].value);
      props.getTrips("/Bid/" + contractData[index][0].value);
    }
  }

  return <MaterialTable columns={columnData} data={rowData} title="Active Contracts" />;
}

export default ContractTable;
