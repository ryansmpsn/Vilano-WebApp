import MaterialTable from "material-table";
import React, { useState } from "react";
import { Modal, FormControl, Button, Form, FormLabel, Row, Col, FormGroup } from "react-bootstrap";
import Select from "react-select";

function UpsertTripDetailModal(props) {
  let { show, closeModal, modalName, tripDetailOptions } = props;
  const [newTripDetails, setNewTripDetails] = useState([]);
  const [facilityValue, setFacilityValue] = useState();
  const [actionValue, setActionValue] = useState();

  function createActionLookup() {
    let actionLookup = {};
    tripDetailOptions[0].options.forEach((c) => {
      actionLookup[c.value] = c.label;
    });
    return actionLookup;
  }
  let columnData = [
    { title: "Facility", field: "facility" },
    { title: "Time", field: "time", validate: (rowData) => validateTimeInput(rowData.time) },
    { title: "Action", field: "action", type: "numeric", lookup: createActionLookup() },
  ];
  // Keep for Facility dropdown
  // columnData[0].editComponent = (rowProps) => (
  //   <Select
  
  //     placeholder="Facility"
  //     options={tripDetailOptions[0].options}
  //     value={actionValue}
  //     onChange={(e) => {
  //       rowProps.onChange(e.label);
  //     }}
  //   />
  // );
  columnData[2].editComponent = (rowProps) => (
    <Select
      placeholder="Action"
      options={tripDetailOptions[0].options}
      value={actionValue}
      onChange={(e) => {
        rowProps.onChange(e.value);
      }}
    />
  );
  const [data, setData] = useState([
    { facility: "Facility 1", time: "5:00", action: 6 },
    { facility: "Facility 2", time: "5:05", action: 7 },
  ]);

  // function handleSubmit(e) {
  //   const form = e.currentTarget;
  //   if (form.checkValidity() === false) {
  //     e.preventDefault();
  //     e.stopPropagation();
  //   }
  //   setValidated(true);

  //   if (form.checkValidity() === true) {
  //     let addNewDetail = newTripDetails;
  //     addNewDetail.push({ Facility: facilityValue, time: hourValue, action: actionValue.value });

  //     console.log(addNewDetail);
  //     setNewTripDetails(addNewDetail);
  //     e.target.reset();
  //     setValidated(false);
  //     setFacilityValue(null);
  //     setActionValue(null);
  //     setHourValue(null);
  //   }
  // }

  function validateTimeInput(e) {
    const timeRegex = /^([0-3]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (e) {
      const valid = e.match(timeRegex);
      return valid !== null;
    }
  }

  return (
    <Modal show={show} onHide={closeModal} backdrop={"static"} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{modalName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <MaterialTable
          title="Trip Details"
          columns={columnData}
          data={data}
          editable={{
            onRowAdd: (newData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  setData([...data, newData]);
                  console.log(newData);
                  resolve();
                }, 1000);
              }),
          }}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button disabled={newTripDetails.length === 0} onClick={() => console.log(newTripDetails)}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpsertTripDetailModal;
