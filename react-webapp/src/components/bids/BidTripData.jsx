import React, { useState } from "react";
import { Button, Row, Container, Jumbotron, Spinner, Col } from "react-bootstrap";
import Select from "react-select";
import ViewTrips from "../contracts/trips/ViewTrips";
import UpsertTripModal from "../contracts/trips/UpsertTripModal";
import Send from "../../libs/send";

function BidTripData(props) {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [contentInputRestrictions, setContentInputRestrictions] = useState([]);

  function getTripData(x) {
    props.getTrips("/Bid/" + x.value);
  }
  function addTrip() {
    setIsLoading(true);
    Send.get("/Bid/Dropdowns/BidTrip/Cached", props).then((res) => {
      console.log(res.data);
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
    <Jumbotron>
      <Container className="container-sm pl-5 pr-5 pt-2">
        <Row className="justify-content-md-center">
          <Col lg="6">
            <Select
              defaultInputValue={props.selectedBid}
              options={props.selectOptions}
              placeholder={"Select a Bid to View Trips"}
              onChange={(x) => {
                props.setSelectedBid(x.label);
                props.setSelectedBidId(x.value);
                getTripData(x);
              }}
              isLoading={props.isSearching | isLoading}
              isDisabled={props.isSearching | isLoading}
            />
            {isLoading ? (
              <Spinner animation="border" variant="primary" />
            ) : (
              <Button
                variant="outline-warning"
                className="float-right"
                onClick={addTrip}
                disabled={(props.bidProfile === null) | props.isSearching}
              >
                Add Trip
              </Button>
            )}
          </Col>
        </Row>
      </Container>
      <hr />
      {props.isSearching ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        props.bidProfile !== null && (
          <Row key="topRow" className="show-grid">
            {props.bidProfile[33].value.map((c, index) => (
              <ViewTrips
                key={index}
                tripData={c}
                tripVehicles={c[17]}
                tripTrailers={c[18]}
                contractProfile={props.bidProfile}
                inputRestrictions={contentInputRestrictions}
                submitAction={(editTrip) => {
                  return props.tripEditSubmitAction(editTrip);
                }}
                appProps={props.appProps}
              />
            ))}
          </Row>
        )
      )}
      {!isLoading && (
        <UpsertTripModal
          modalName={"Create New Trip"}
          inputRestrictions={contentInputRestrictions}
          show={showModal}
          closeModal={closeModal}
          accessLevel={props.accessLevel}
          appProps={props.appProps}
          bidProfile={props.bidProfile}
          submitAction={(editTrip) => {
            return props.tripEditSubmitAction(editTrip);
          }}
          trip={[
            {
              columnName: "bid_id",
              inputType: null,
              label: null,
              updatedValue: null,
              value: props.selectedBidId,
            },
            {
              columnName: "external_bid_code",
              inputType: null,
              label: "Bid Number",
              updatedValue: null,
              value: props.selectedBid,
            },
            {
              columnName: "bid_trip_id",
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
              columnName: "bid_trip_status",
              inputType: "select",
              label: "Trip Status",
              updatedValue: null,
              value: null,
            },
            {
              columnName: "start_date",
              inputType: "date",
              label: "Start Date",
              updatedValue: null,
              value: null,
            },
            {
              columnName: "end_date",
              inputType: "date",
              label: "End Date",
              updatedValue: null,
              value: null,
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
          ]}
        />
      )}
    </Jumbotron>
  );
}

export default BidTripData;