import React, { useState } from "react";
import Send from "../../../libs/send";
import UpsertTripModal from "./UpsertTripModal";
import { useToasts } from "react-toast-notifications";
import UpsertVehicleModal from "./UpsertVehicleModal";
import { Card, Spinner, Row, Col, OverlayTrigger, Popover, Button } from "react-bootstrap";

function ViewTrips(props) {
  const [tripData] = useState(props.tripData);
  const [showTripModal, setShowTripModal] = useState(false);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [contentInputRestrictions, setContentInputRestrictions] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const { addToast } = useToasts();

  function openModal(x) {
    x === "trip" && setShowTripModal(true);
    x === "vehicle" && setShowVehicleModal(true);
    window.location.hash = "edit";
  }

  function closeModal() {
    window.history.replaceState(null, null, " ");
    setShowTripModal(false);
    setShowVehicleModal(false);
  }

  function editTrip() {
    setIsLoading(true);
    Send.get("/Contract/Dropdowns/ContractTrip/Cached", props).then((res) => {
      setContentInputRestrictions(res.data);
      setIsLoading(false);
      openModal("trip");
    });
  }

  function vehicleSubmitAction(editVehicle) {
    setSubmitting(true);
    if (props.type === "Contract") {
      Send.post("/Contract/ContractTripVehicle", editVehicle).then((res) => {
        addToast("Vehicles Have Been Successfully Updated!", {
          appearance: "success",
          autoDismiss: true,
        });
        setSubmitting(false);
      });
    }

    if (props.type === "Bid") {
      Send.post("/Bid/BidTripVehicle", editVehicle).then((res) => {
        addToast("Vehicles Have Been Successfully Updated!", {
          appearance: "success",
          autoDismiss: true,
        });
        setSubmitting(false);
      });
    }
  }

  function trailerSubmitAction(editTrailer) {
    setSubmitting(true);
    if (props.type === "Contract") {
      Send.post("/Contract/ContractTripTrailer", editTrailer).then((res) => {
        addToast("Trailers Have Been Successfully Updated!", {
          appearance: "success",
          autoDismiss: true,
        });
        setSubmitting(false);
      });
    }

    if (props.type === "Bid") {
      Send.post("/Bid/BidTripTrailer", editTrailer).then((res) => {
        addToast("Trailers Have Been Successfully Updated!", {
          appearance: "success",
          autoDismiss: true,
        });
        setSubmitting(false);
      });
    }
  }

  return (
    <Card
      className={"card border-primary mb-3 "}
      style={{
        width: "100%",
      }}
    >
      {tripData.map(
        (c, index) =>
          c.label !== null &&
          c.label === "Trip Number" && (
            <Card.Header key={index + "header"} as="h5">
              {c.label}: {c.updatedValue}
            </Card.Header>
          )
      )}
      <Card.Body>
        <Row>
          {tripData.map(
            (c, index) =>
              c.label !== null &&
              c.label !== "Trip Number" &&
              typeof c.value !== "object" && (
                <Col md="2" key={index + "body"}>
                  <p className="h5 mb-1">{c.label}:</p>
                  {c.updatedValue !== null && <div className="text-muted">{c.updatedValue}</div>}

                  <hr />
                </Col>
              )
          )}
        </Row>

        <OverlayTrigger
          key={"vehicles"}
          placement={"top"}
          overlay={
            <Popover id={`popover-Vehicles`}>
              <Popover.Title>{props.tripVehicles.label}</Popover.Title>
              <Popover.Content>
                {props.tripVehicles.value.length !== 0 ? (
                  props.tripVehicles.value.map((c, index) => (
                    <Col key={index}>
                      <strong>{c[3].label}: </strong>
                      {c[3].updatedValue}
                      <br />
                      <strong>{c[4].label}: </strong>
                      {c[4].updatedValue}
                      <hr />
                    </Col>
                  ))
                ) : (
                  <strong>This trip has no vehicles attached!</strong>
                )}
              </Popover.Content>
            </Popover>
          }
        >
          <Button className="btn-outline-info rounded">Vehicles</Button>
        </OverlayTrigger>
        <OverlayTrigger
          key={"trailers"}
          placement={"top"}
          overlay={
            <Popover id={`popover-trailers`}>
              <Popover.Title>{props.tripTrailers.label}</Popover.Title>
              <Popover.Content>
                {props.tripTrailers.value.length !== 0 ? (
                  props.tripTrailers.value.map((c, index) => (
                    <Col key={index}>
                      <strong>{c[3].label}: </strong>
                      {c[3].updatedValue}
                      <br />
                      <strong>{c[4].label}: </strong>
                      {c[4].updatedValue}
                      <hr />
                    </Col>
                  ))
                ) : (
                  <strong>This trip has no trailers attached!</strong>
                )}
              </Popover.Content>
            </Popover>
          }
        >
          <Button className="rounded btn-outline-info">Trailers</Button>
        </OverlayTrigger>

        {isLoading ? (
          <Spinner animation="border" variant="primary" className="float-right" />
        ) : (
          <>
            {sessionStorage.getItem("/contract/trips") >= 3 && (
              <Button onClick={editTrip} className="float-right btn-sm btn-outline-warning">
                Edit Trip
              </Button>
            )}
            {sessionStorage.getItem("/contract/trips") >= 3 && (
              <Button onClick={() => openModal("vehicle")} className="float-right btn-sm btn-outline-warning">
                Edit Vehicles
              </Button>
            )}
          </>
        )}
        {/*  <Link
            onClick={(e) => props.setSelectedTrip("Trip 326")}
            to={`${props.url}/trip/${props.selectedContractId}`}
            className="btn btn-primary"
          >
            View Routes
          </Link> */}
      </Card.Body>

      {!isLoading && (
        <>
          <UpsertTripModal
            modalName={"Edit Trip"}
            type={props.type}
            inputRestrictions={contentInputRestrictions}
            show={showTripModal}
            closeModal={closeModal}
            accessLevel={props.accessLevel}
            appProps={props.appProps}
            contractProfile={props.contractProfile}
            submitAction={(editTrip) => {
              return props.submitAction(editTrip);
            }}
            trip={props.tripData}
          />
          {showVehicleModal && (
            <UpsertVehicleModal
              modalName={"Edit Vehicles & Trailers"}
              index={props.index}
              type={props.type}
              vehicles={props.tripVehicles}
              trailers={props.tripTrailers}
              tripData={tripData}
              show={showVehicleModal}
              closeModal={closeModal}
              submitting={submitting}
              contractProfile={props.contractProfile}
              vehicleSubmitAction={(editVehicle) => {
                return vehicleSubmitAction(editVehicle);
              }}
              trailerSubmitAction={(editTrip) => {
                return trailerSubmitAction(editTrip);
              }}
            />
          )}
        </>
      )}
    </Card>
  );
}

export default ViewTrips;
