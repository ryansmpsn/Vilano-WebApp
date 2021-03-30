import React, { useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import ViewTrips from "./ViewTrips";
import UpsertTripModal from "./UpsertTripModal";
import Send from "../../../libs/send";

function TripData(props) {
  let { contractProfile, trips } = props;
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [contentInputRestrictions, setContentInputRestrictions] = useState([]);

  function addTrip() {
    setIsLoading(true);
    props.bid
      ? Send.get("/Bid/Dropdowns/BidTrip/Cached", props).then((res) => {
          setContentInputRestrictions(res.data);
          setIsLoading(false);
          openModal();
        })
      : Send.get("/Contract/Dropdowns/ContractTrip/Cached", props).then((res) => {
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
      {trips.length > 0 ? (
        trips.map((c, index) => (
          <ViewTrips
            key={index}
            type="Contract"
            index={index}
            tripData={c}
            tripVehicles={props.bid ? c[17] : c[19]}
            tripTrailers={props.bid ? c[18] : c[20]}
            contractProfile={contractProfile}
            inputRestrictions={contentInputRestrictions}
            submitAction={(editTrip) => {
              return props.tripEditSubmitAction(editTrip);
            }}
            appProps={props.appProps}
            setContract={props.setContract}
            tripDetailOptions={props.tripDetailOptions}
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
          trip={
            props.bid
              ? [
                  {
                    columnName: "contract_bid_id",
                    inputType: null,
                    label: null,
                    updatedValue: null,
                    value: contractProfile[1].updatedValue,
                  },
                  {
                    columnName: "bid_name",
                    inputType: null,
                    label: "Bid Name",
                    updatedValue: null,
                    value: contractProfile[10].updatedValue,
                  },
                  {
                    columnName: "contract_bid_trip_id",
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
                    columnName: "start_date",
                    inputType: "date",
                    label: "Start Date",
                    updatedValue: contractProfile[28].updatedValue,
                    value: contractProfile[28].updatedValue,
                  },
                  {
                    columnName: "end_date",
                    inputType: "date",
                    label: "End Date",
                    updatedValue: contractProfile[29].updatedValue,
                    value: contractProfile[29].updatedValue,
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
                    label: "Last Modified By",
                    updatedValue: null,
                    value: null,
                  },
                  {
                    columnName: "last_modified",
                    inputType: null,
                    label: "Last Modified",
                    updatedValue: null,
                    value: null,
                  },
                  { columnName: "vw_contract_bid_trip_vehicles", inputType: null, label: null, updatedValue: [], value: [] },
                  { columnName: "vw_contract_bid_trip_trailers", inputType: null, label: null, updatedValue: [], value: [] },
                ]
              : [
                  {
                    columnName: "contract_id",
                    inputType: null,
                    label: null,
                    updatedValue: null,
                    value: contractProfile[1].updatedValue,
                  },
                  {
                    columnName: "external_contract_code",
                    inputType: null,
                    label: "Contract Number",
                    updatedValue: null,
                    value: contractProfile[2].updatedValue,
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
                    updatedValue: contractProfile[25].updatedValue,
                    value: contractProfile[25].updatedValue,
                  },
                  {
                    columnName: "end_date",
                    inputType: "date",
                    label: "End Date",
                    updatedValue: contractProfile[26].updatedValue,
                    value: contractProfile[26].updatedValue,
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
                ]
          }
        />
      )}
    </>
  );
}

export default TripData;
