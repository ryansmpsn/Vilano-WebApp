import React, { useState } from "react";
import { Link } from "react-router-dom";
import EditContractTable from "./EditContractTable";
import MaterialTable from "material-table";
import Select, { createFilter } from "react-select";
import MenuList from "../../libs/OptimizedSelect";

function ContractTable(props) {
  let contractData = props.contractData;
  let columnData = contractData[0].filter(labelFilter).map((c, index) => ({ title: c.label, field: c.columnName }));
  // if (sessionStorage.getItem("/contract/trips") >= 3) {
  //   columnData = [...columnData, { title: "View Trips", field: "viewTrips", editable: "never" }];
  // }

  // if (sessionStorage.getItem("/contract/ratesheets") >= 3) {
  //   columnData = [...columnData, { title: "View Cost Data", field: "viewCostData", editable: "never" }];
  // }
  // if (sessionStorage.getItem("/contract") >= 3) {
  //   columnData = [...columnData, { title: "Edit " + props.type, field: "editContract", editable: "never" }];
  // }

  let rowData = contractData.map((data, index) => data.map((c, index) => [c.columnName, c.value]));
  rowData = rowData.map((c, index) => Object.fromEntries(c));
  // rowData = rowData.map((c, index) => ({
  //   ...c,
  //   viewTrips: (
  //     <Link
  //       onClick={() => {
  //         setSelectedId(index);
  //       }}
  //       to={"../trips"}
  //       className="btn btn-outline-primary btn-sm"
  //     >
  //       Trips
  //     </Link>
  //   ),
  //   viewCostData: (
  //     <Link
  //       onClick={() => {
  //         setSelectedId(index);
  //       }}
  //       to="../ratesheets"
  //       className="btn btn-outline-primary btn-sm text-nowrap"
  //     >
  //       Cost Data
  //     </Link>
  //   ),
  //   editContract: (
  //     <EditContractTable
  //       type={props.type}
  //       contract={contractData[index]}
  //       inputRestrictions={props.inputRestrictions}
  //       submitAction={(editContent) => {
  //         return props.submitAction(editContent);
  //       }}
  //     />
  //   ),
  // }));

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
  //   <Select
  //   components={{ MenuList }}
  //   options={this.state.inputRestrictions.options}
  //   filterOption={createFilter({ ignoreAccents: false })}
  //   onChange={this.state.onChange}
  // /
  columnData[3].editComponent = (rowProps) => <Select options={props.inputRestrictions[2].options} onChange={() => console.log(rowProps)} />;
  columnData[4].editComponent = (rowProps) => (
    <Select placeholder={"Search Facilities"} options={props.inputRestrictions[0].options} onChange={(e) => rowProps.onChange(e.label)} components={{ MenuList }} filterOption={createFilter({ ignoreAccents: false })} />
  );
  columnData[5].editComponent = (rowProps) => (
    <Select placeholder={"Search Facilities"} options={props.inputRestrictions[0].options} onChange={(e) => rowProps.onChange(e.label)} components={{ MenuList }} filterOption={createFilter({ ignoreAccents: false })} />
  );

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
  const [rows, setRows] = useState(rowData);
  const [columns, setColumn] = useState(columnData);
  console.log(columns, rows, props);

  return (
    <MaterialTable
      columns={columnData}
      data={rowData}
      title="Active Contracts"
      onRowClick={(event, rowData) => console.log(event, rowData)}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              console.log(newData, oldData);
              const dataUpdate = [...rows];
              const index = oldData.tableData.id;
              console.log(index);
              dataUpdate[index] = newData;
              setRows([...dataUpdate]);

              resolve();
            }, 1000);
          }),
      }}
      // actions={[
      //   {
      //     icon: "save",
      //     tooltip: "Save User",
      //     onClick: (event, rowData) => console.log(rowData),
      //   },
      //   {
      //     icon: "timeline",
      //     tooltip: "View Trips",
      //     onClick: (event, rowData) => alert("You saved " + rowData.external_contract_code),
      //   },
      // ]}
    />
  );
}

export default ContractTable;
