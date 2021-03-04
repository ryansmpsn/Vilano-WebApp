import React, { useState } from "react";
import { Link } from "react-router-dom";
import MaterialTable from "material-table";
import Select, { createFilter } from "react-select";
import MenuList from "../../libs/OptimizedSelect";

function ContractTable(props) {
  let liveContract = null;

  let { contractData, inputRestrictions } = props;
  let columnData = contractData[0].filter(labelFilter).map((content) => ({ title: content.label, field: content.columnName }));
  columnData[1].editable = "never";
  columnData[6].editable = "never";
  columnData[7].editable = "never";

  let rowData = contractData.map((data) => data.map((content) => [content.columnName, content.value]));
  rowData = rowData.map((content) => Object.fromEntries(content));
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
  //       inputRestrictions={inputRestrictions}
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
  columnData[0].editComponent = (rowProps) => (
    <Select
      options={inputRestrictions[6].options}
      onChange={(e) => {
        rowProps.onChange(e.label);
        updateLiveContract(rowProps, e);
      }}
      filterOption={createFilter({ ignoreAccents: false })}
      menuPortalTarget={document.body}
    />
  );
  columnData[2].editComponent = (rowProps) => (
    <Select
      options={inputRestrictions[1].options}
      onChange={(e) => {
        rowProps.onChange(e.label);
        updateLiveContract(rowProps, e);
      }}
      filterOption={createFilter({ ignoreAccents: false })}
      menuPortalTarget={document.body}
    />
  );
  columnData[3].editComponent = (rowProps) => (
    <Select
      options={inputRestrictions[2].options}
      onChange={(e) => {
        rowProps.onChange(e.label);
        updateLiveContract(rowProps, e);
      }}
      filterOption={createFilter({ ignoreAccents: false })}
      menuPortalTarget={document.body}
    />
  );

  columnData[4].editComponent = (rowProps) => (
    <Select
      placeholder={"Search Facilities"}
      options={inputRestrictions[0].options}
      onChange={(e) => {
        rowProps.onChange(e.label);
        updateLiveContract(rowProps, e);
      }}
      components={{ MenuList }}
      filterOption={createFilter({ ignoreAccents: false })}
      menuPortalTarget={document.body}
    />
  );

  columnData[5].editComponent = (rowProps) => (
    <Select
      placeholder={"Search Facilities"}
      options={inputRestrictions[0].options}
      onChange={(e) => {
        rowProps.onChange(e.label);
        updateLiveContract(rowProps, e);
      }}
      components={{ MenuList }}
      filterOption={createFilter({ ignoreAccents: false })}
      menuPortalTarget={document.body}
    />
  );

  columnData[6].editComponent = (rowProps) => <input type="date" />;

  // function setSelectedId(index) {
  //   if (props.type === "Contract") {
  //     props.setSelectedContract(contractData[index][6].value);
  //     props.setSelectedContractId(contractData[index][0].value);
  //     props.getTrips("/Contract/" + contractData[index][0].value);
  //   }

  //   if (props.type === "Bid") {
  //     props.setSelectedBid(contractData[index][10].value);
  //     props.setSelectedBidId(contractData[index][0].value);
  //     props.getTrips("/Bid/" + contractData[index][0].value);
  //   }
  // }

  function updateLiveContract(rowProps, value) {
    let variable_key = rowProps.columnDef.field;
    var variable = variable_key.substring(0, variable_key.lastIndexOf("_")) + "_id";
    var set = false;

    liveContract === null && (liveContract = props.contractData[rowProps.rowData.tableData.id]);

    liveContract.forEach((item) => {
      if (item.columnName === variable) {
        item.updatedValue = value.value;
        set = true;
      }
      if (item.columnName === variable_key) {
        item.updatedValue = value.label;
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
      title="Active Contracts"
      // onRowClick={(event, rowData) => console.log(event, JSON.stringify(rowData))}
      editable={{
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            props.submitAction(liveContract).then((result) => {
              const dataUpdate = [...rows];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;
              setRows([...dataUpdate]);
              liveContract = null;

              console.log(result);
              resolve();
            });
          }),
        onRowUpdateCancelled: () => (liveContract = null),
      }}
      options={{ pageSize: 10 }}

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
