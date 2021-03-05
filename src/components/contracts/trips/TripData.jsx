import React, { useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import ViewTrips from "./ViewTrips";
import UpsertTripModal from "./UpsertTripModal";
import Send from "../../../libs/send";

function TripData(props) {
  let { contractProfile } = props;
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [contentInputRestrictions, setContentInputRestrictions] = useState([]);

  function addTrip() {
    setIsLoading(true);
    Send.get("/Contract/Dropdowns/ContractTrip/Cached", props).then((res) => {
      setContentInputRestrictions(res.data);
      setIsLoading(false);
      openModal();
    });
  }

  function openModal() {
    setShowModal(true);
    window.location.hash = "edit";
  }

  function closeModal() {
    window.history.replaceState(null, null, " ");
    setShowModal(false);
  }
  return (
    <>
      {console.log(contractProfile[28].value)}
      {contractProfile[28].value > 0 ? (
        contractProfile[28].value.map((c, index) => (
          <ViewTrips
            key={index}
            type="Contract"
            index={index}
            tripData={c}
            tripVehicles={c[19]}
            tripTrailers={c[20]}
            contractProfile={contractProfile}
            inputRestrictions={contentInputRestrictions}
            submitAction={(editTrip) => {
              return props.tripEditSubmitAction(editTrip);
            }}
            appProps={props.appProps}
            setContract={props.setContract}
          />
        ))
      ) : (
        <h5>No trips are associated with this contract.</h5>
      )}
      <Row>
        <Col>
          {sessionStorage.getItem("/contract/trips") >= 3 && (
            <Button variant="outline-primary" className="float-right" onClick={addTrip}>
              Add Trip
            </Button>
          )}
        </Col>
      </Row>
      {!isLoading && (
        <UpsertTripModal
          modalName={"Create New Trip"}
          type="Contract"
          inputRestrictions={contentInputRestrictions}
          show={showModal}
          closeModal={closeModal}
          appProps={props.appProps}
          contractProfile={contractProfile}
          submitAction={(editTrip) => {
            return props.tripEditSubmitAction(editTrip);
          }}
          trip={[
            {
              columnName: "contract_id",
              inputType: null,
              label: null,
              updatedValue: null,
              value: props.selectedContractId,
            },
            {
              columnName: "external_contract_code",
              inputType: null,
              label: "Contract Number",
              updatedValue: null,
              value: props.selectedContract,
            },
            {
              columnName: "contract_trip_id",
              inputType: null,
              label: null,
              updatedValue: null,
              value: null,
            },
            {
              columnName: "trip_number",
              inputType: "text",
              label: "Trip Number",
              updatedValue: null,
              value: null,
            },
            {
              columnName: "cost_segment_id",
              inputType: null,
              label: null,
              updatedValue: null,
              value: null,
            },
            {
              columnName: "cost_segment_value",
              inputType: "select",
              label: "Cost Segment",
              updatedValue: null,
              value: null,
            },
            {
              columnName: "frequency_id",
              inputType: null,
              label: null,
              updatedValue: null,
              value: null,
            },
            {
              columnName: "frequency_value",
              inputType: "select",
              label: "Frequency",
              updatedValue: null,
              value: null,
            },
            {
              columnName: "is_active",
              inputType: "checkbox",
              label: "Active",
              updatedValue: 1,
              value: 1,
            },
            {
              columnName: "is_peak",
              inputType: "checkbox",
              label: "Peak",
              updatedValue: 0,
              value: 0,
            },
            {
              columnName: "status_id",
              inputType: null,
              label: null,
              updatedValue: null,
              value: null,
            },
            {
              columnName: "contract_trip_status",
              inputType: "select",
              label: "Trip Status",
              updatedValue: null,
              value: null,
            },
            {
              columnName: "start_date",
              inputType: "date",
              label: "Start Date",
              updatedValue: props.contractProfile && props.contractProfile[25].updatedValue,
              value: props.contractProfile && props.contractProfile[25].updatedValue,
            },
            {
              columnName: "end_date",
              inputType: "date",
              label: "End Date",
              updatedValue: props.contractProfile && props.contractProfile[26].updatedValue,
              value: props.contractProfile && props.contractProfile[26].updatedValue,
            },
            {
              columnName: "mileage",
              inputType: "num",
              label: "Miles",
              updatedValue: null,
              value: "",
            },
            {
              columnName: "hours",
              inputType: "num",
              label: "Hours",
              updatedValue: null,
              value: "",
            },
            {
              columnName: "modified_by",
              inputType: null,
              label: null,
              updatedValue: null,
              value: null,
            },
            {
              columnName: "employee_name",
              inputType: null,
              label: null,
              updatedValue: null,
              value: null,
            },
            {
              columnName: "last_modified",
              inputType: null,
              label: null,
              updatedValue: null,
              value: null,
            },
            {
              columnName: "vw_contract_trip_vehicles",
              inputType: null,
              label: null,
              updatedValue: [],
              value: [],
            },
            {
              columnName: "vw_contract_trip_trailers",
              inputType: null,
              label: null,
              updatedValue: [],
              value: [],
            },
          ]}
        />
      )}
    </>
  );
}

export default TripData;
