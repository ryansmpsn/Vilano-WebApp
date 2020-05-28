import React from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";

function ContractTable(props) {
  let contractData = props.contractData.map((c, index) => c);
  // let rowParameters = contractData[0].filter(labelFilter).map((c, index) => c.label);
  let columnData = contractData[0].filter(labelFilter).map((c, index) => ({ label: c.label, field: c.columnName, sort: "asc" }));
  columnData = [...columnData, { label: "View Trips", field: "viewTrips" }];
  let rowData = contractData.map((data, index) => data.filter(labelFilter).map((c, index) => [c.columnName, c.value]));
  rowData = rowData.map((c, index) => Object.fromEntries(c));
  rowData = rowData.map((c, index) => ({
    ...c,
    viewTrips: (
      <Link onClick={(e) => props.setSelectedContract(contractData[index][6].value)} to="/contracts/trips" className="btn btn-primary btn-sm">
        View Trips
      </Link>
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
