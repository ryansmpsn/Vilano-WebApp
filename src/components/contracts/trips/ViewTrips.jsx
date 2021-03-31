import React, { useState } from "react";
import Send from "../../../libs/send";
import UpsertTripModal from "./UpsertTripModal";
import { useToasts } from "react-toast-notifications";
import UpsertVehicleModal from "./UpsertVehicleModal";
import { Card, Spinner, Row, Col, OverlayTrigger, Popover, Button } from "react-bootstrap";
import UpsertTripDetailModal from "./UpsertTripDetailModal";

function ViewTrips(props) {
  let { tripData } = props;
  const [showTripModal, setShowTripModal] = useState(false);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [contentInputRestrictions, setContentInputRestrictions] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const { addToast } = useToasts();

  function openModal(x) {
    x === "trip" && setShowTripModal(true);
    x === "vehicle" && setShowVehicleModal(true);
    x === "details" && setShowDetailsModal(true);
    window.location.hash = "edit";
  }

  function closeModal() {
    window.history.replaceState(null, null, " ");
    setShowTripModal(false);
    setShowVehicleModal(false);
    setShowDetailsModal(false);
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
      className={"mb-3 "}
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
          placement={"top-start"}
          overlay={
            <Popover id={`popover-Vehicles`} style={{ width: "400px" }}>
              <Popover.Title>{props.tripVehicles.label}</Popover.Title>
              <Popover.Content>
                <Row>
                  <Col md="7">
                    <p>
                      <b>Type:</b>
                    </p>
                  </Col>
                  <Col md="5">
                    <p>
                      <b>Number:</b>
                    </p>
                  </Col>
                </Row>
                <hr className="mt-0 mb-1" />
                {props.tripVehicles.value.length !== 0 ? (
                  props.tripVehicles.value.map((c, index) => (
                    <Row key={index}>
                      <Col md="10">
                        <p>{c[3].updatedValue}:</p>
                      </Col>
                      <Col md="2">
                        <p>{c[4].updatedValue}</p>
                      </Col>
                    </Row>
                  ))
                ) : (
                  <strong>This trip has no vehicles attached!</strong>
                )}
              </Popover.Content>
            </Popover>
          }
        >
          <Button className="btn-outline-info rounded" size="sm">
            Vehicles
          </Button>
        </OverlayTrigger>
        <OverlayTrigger
          key={"trailers"}
          placement={"top"}
          overlay={
            <Popover id={`popover-trailers`} style={{ width: "400px" }}>
              <Popover.Title>{props.tripTrailers.label}</Popover.Title>
              <Popover.Content>
                <Row>
                  <Col md="7">
                    <p>
                      <b>Type:</b>
                    </p>
                  </Col>
                  <Col md="5">
                    <p>
                      <b>Number:</b>
                    </p>
                  </Col>
                </Row>
                <hr className="mt-0 mb-1" />
                {props.tripTrailers.value.length !== 0 ? (
                  props.tripTrailers.value.map((c, index) => (
                    <Row key={index}>
                      <Col md="10">
                        <p>{c[3].updatedValue}:</p>
                      </Col>
                      <Col md="2">
                        <p>{c[4].updatedValue}</p>
                      </Col>
                    </Row>
                  ))
                ) : (
                  <strong>This trip has no trailers attached!</strong>
                )}
              </Popover.Content>
            </Popover>
          }
        >
          <Button className="rounded btn-outline-info" size="sm">
            Trailers
          </Button>
        </OverlayTrigger>

        {isLoading ? (
          <Spinner animation="border" variant="primary" className="float-right" />
        ) : (
          <>
            {sessionStorage.getItem("/contract/trips") >= 3 && (
              <Button onClick={editTrip} className="float-right btn-sm btn-outline-primary">
                Edit Trip
              </Button>
            )}
            {sessionStorage.getItem("/contract/trips") >= 3 && (
              <Button onClick={() => openModal("vehicle")} className="float-right btn-sm btn-outline-primary">
                Edit Vehicles
              </Button>
            )}
            <Button onClick={() => openModal("details")} className="float-right btn-sm btn-outline-primary">
              Trip Details
            </Button>
          </>
        )}
      </Card.Body>

      {!isLoading && (
        <>
          <UpsertTripModal
            modalName={"Edit Trip"}
            type={props.type}
            inputRestrictions={contentInputRestrictions}
            show={showTripModal}
            closeModal={closeModal}
            appProps={props.appProps}
            contractProfile={props.contractProfile}
            submitAction={(editTrip) => {
              return props.submitAction(editTrip);
            }}
            trip={props.tripData}
            setContract={props.setContract}
          />

          {showVehicleModal && (
            <UpsertVehicleModal
              modalName={`Vehicles & Trailers for Trip: ${tripData[3].updatedValue} `}
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
          {props.tripDetailOptions && (
            <UpsertTripDetailModal
              modalName={`Details for Trip: ${tripData[3].updatedValue}`}
              show={showDetailsModal}
              closeModal={closeModal}
              tripDetailOptions={props.tripDetailOptions}
              tripData={tripData}
              contractDropdowns={props.contractDropdowns}
            />
          )}
        </>
      )}
    </Card>
  );
}

export default ViewTrips;
