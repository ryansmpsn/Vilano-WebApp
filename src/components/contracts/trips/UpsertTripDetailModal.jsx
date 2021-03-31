import MaterialTable from "material-table";
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Select, { createFilter } from "react-select";
import Send from "../../../libs/send";
import MenuList from "../../../libs/OptimizedSelect";
function UpsertTripDetailModal(props) {
  let { show, closeModal, modalName, tripDetailOptions, tripData, contractDropdowns } = props;
  const [wasModified, setWasModified] = useState(false);

  let rowData = tripData[21].value.map((data) => data.map((content) => [content.columnName, content.value]));
  rowData = rowData.map((content) => Object.fromEntries(content));

  let columnData = [
    { title: "Status", field: "contract_trip_detail_action_id", lookup: createLookup(tripDetailOptions[0].options) },
    { title: "Origination Facility", field: "origination_facility_id", lookup: createLookup(contractDropdowns[0].options) },
    { title: "Destination Facility", field: "destination_facility_id", lookup: createLookup(contractDropdowns[0].options) },
    { title: "Start Time", field: "start_time", validate: (rowData) => (validateTimeInput(rowData.start_time) ? true : "Invalid Input. Example: 0530") },
    { title: "End Time", field: "end_time", validate: (rowData) => (validateTimeInput(rowData.end_time) ? true : "Invalid Input. Example: 0530") },
  ];

  function createLookup(options) {
    let newLookup = {};
    options.forEach((c) => {
      newLookup[c.value] = c.label;
    });
    return newLookup;
  }

  function validateTimeInput(e) {
    const timeRegex = /^([0-3]?[0-9]|2[0-3])[0-5][0-9]$/;
    if (e) {
      const valid = e.toString().match(timeRegex);
      return valid !== null;
    }
  }

  columnData[0].editComponent = (rowProps) => (
    <Select
      placeholder="Status"
      options={tripDetailOptions[0].options}
      onChange={(e) => {
        rowProps.onChange(e.value);
      }}
    />
  );
  columnData[1].editComponent = (rowProps) => (
    <Select
      placeholder="Origination Facility"
      options={contractDropdowns[0].options}
      filterOption={createFilter({ ignoreAccents: false })}
      components={{ MenuList }}
      onChange={(e) => {
        rowProps.onChange(e.value);
      }}
    />
  );
  columnData[2].editComponent = (rowProps) => (
    <Select
      placeholder="Destination Facility"
      components={{ MenuList }}
      options={contractDropdowns[0].options}
      filterOption={createFilter({ ignoreAccents: false })}
      onChange={(e) => {
        rowProps.onChange(e.value);
      }}
    />
  );

  const [data, setData] = useState(rowData);

  async function handleSubmit() {
    let tripInformation = [{ contract_id: tripData[0].updatedValue, contract_trip_id: tripData[2].updatedValue, vw_contract_trip_details: data }];
    setWasModified(false);

    console.log(JSON.stringify(tripInformation));

    Send.post("/Contract/ContractTripDetail", tripInformation).then((res) => {
      console.log(res);
    });
  }
  // load unload case onlyhas orgination, n destination
  return (
    <Modal show={show} onHide={closeModal} backdrop={"static"} size="xl">
      <Modal.Header closeButton>
        <Modal.Title>{modalName}</Modal.Title>
      </Modal.Header>
      <MaterialTable
        title="Trip Details"
        columns={columnData}
        data={data}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                !wasModified && setWasModified(true);
                setData([...data, newData]);

                resolve();
              }, 500);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                !wasModified && setWasModified(true);
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);

                resolve();
              }, 500);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              const dataDelete = [...data];
              const index = oldData.tableData.id;
              let deleteDetail = dataDelete[index];

              if (Object.keys(deleteDetail).length > 10) {
                deleteDetail.is_active = 0;

                Send.post("/Contract/ContractTripDetail", deleteDetail).then((res) => {
                  console.log(res);
                  dataDelete.splice(index, 1);
                  setData([...dataDelete]);
                  resolve();
                });
              } else {
                dataDelete.splice(index, 1);
                setData([...dataDelete]);
                resolve();
              }
            }),
        }}
      />
      <Modal.Footer>
        <Button disabled={!wasModified} onClick={handleSubmit} variant="outline-primary">
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpsertTripDetailModal;
