import { MDBDataTable, MDBDataTableV5 } from "mdbreact";
import React from "react";

function AllEmployees(props) {
  return (
    <div>
      <h1>All Employees</h1>
      <MDBDataTable />
      <MDBDataTableV5 />
    </div>
  );
}

export default AllEmployees;
