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

  const data = {
    columns: [
      { label: "Company", field: "Company", sort: "asc" },
      { label: "Contract Status", field: "Contract Status", sort: "asc" },
      {
        label: "Administraction Office",
        field: "Administraction Office",
        sort: "asc"
      },
      {
        label: "End Contract Term",
        field: "End Contract Term",
        sort: "asc"
      },
      {
        label: "Date of Solicitation",
        field: "Date of Solicitation",
        sort: "asc"
      },
      {
        label: "Contract Type Code",
        field: "Contract Type Code",
        sort: "asc"
      },
      {
        label: "Begin Contract Term",
        field: "Begin Contract Term",
        sort: "asc"
      },
      { label: "Solicitation No.", field: "Solicitation No.", sort: "asc" },
      { label: "Division", field: "Division", sort: "asc" },
      { label: "End City", field: "End City", sort: "asc" },
      { label: "Contract No.", field: "Contract No.", sort: "asc" },
      { label: "Start City", field: "Start City", sort: "asc" },
      { label: "View Trips", field: "viewTrips" }
    ],
    rows: rowData
  };
  return (
    <>
      <MDBDataTable striped bordered hover responsive data={data} />
    </>
  );
}

export default ContractTable;
