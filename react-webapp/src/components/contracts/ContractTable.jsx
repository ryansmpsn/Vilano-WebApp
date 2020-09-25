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

  if (sessionStorage.getItem("/contract/ratesheets") >= 3) {
    columnData = [...columnData, { label: "View Cost Data", field: "viewCostData" }];
  }
  if (sessionStorage.getItem("/contract") >= 3) {
    columnData = [...columnData, { label: "Edit " + props.type, field: "editContract" }];
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
        className="btn btn-primary btn-sm"
      >
        View Trips
      </Link>
    ),
    viewCostData: (
      <Link
        onClick={() => {
          setSelectedId(index);
        }}
        to="../ratesheets"
        className="btn btn-primary btn-sm"
      >
        Rate Sheets
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
    return tableData.label !== null;
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

  const data = {
    columns: columnData,
    rows: rowData,
  };
  return (
    <div>
      <MDBDataTable striped bordered hover responsive data={data} />
      {console.log(props.type)}
    </div>
  );
}

export default ContractTable;
