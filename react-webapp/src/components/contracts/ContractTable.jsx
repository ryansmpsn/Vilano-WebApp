import React from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";

function ContractTable(props) {
  let contractData = props.contractData.map((c, index) => c);
  let rowData = contractData.map((data, index) => Object.fromEntries(data));
  rowData = rowData.map((c, index) => ({
    ...c,
    viewTrips: (
      <Link
        onClick={e => props.onClick(contractData[index][16][1])}
        to="/contracts/trips"
        className="btn btn-primary btn-sm"
      >
        View Trips
      </Link>
    )
  }));

  let columnData = contractData[0]
    .filter(labelFilter)
    .map((c, index) => ({ label: c[0], field: c[0], sort: "asc" }));
  columnData = [...columnData, { label: "View Trips", field: "viewTrips" }];

  function labelFilter(tableData) {
    return tableData[0] !== "DONOTSHOW";
  }
  const data = {
    columns: columnData,
    rows: rowData
  };
  return <MDBDataTable striped bordered hover responsive data={data} />;
}

export default ContractTable;
