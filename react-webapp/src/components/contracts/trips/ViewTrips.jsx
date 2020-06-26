import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { Card, Spinner, Row, Col, OverlayTrigger, Popover } from "react-bootstrap";
import { MDBBtn } from "mdbreact";
import UpsertVehicleModal from "./UpsertVehicleModal";
import UpsertTripModal from "./UpsertTripModal";
import Send from "../../../libs/send";

function ViewTrips(props) {
  const [tripData] = useState(props.tripData);
  const [showTripModal, setShowTripModal] = useState(false);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [contentInputRestrictions, setContentInputRestrictions] = useState([]);

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
              {c.label}: {c.value}
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
                  {c.value !== null && <div className="text-muted">{c.value}</div>}

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
              <Popover.Title>{tripData[19].label}</Popover.Title>
              <Popover.Content>
                {tripData[19].value.length !== 0 ? (
                  tripData[19].value.map((c, index) => (
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
          <MDBBtn rounded outline color="info">
            Vehicles
          </MDBBtn>
        </OverlayTrigger>
        <OverlayTrigger
          key={"trailers"}
          placement={"top"}
          overlay={
            <Popover id={`popover-trailers`}>
              <Popover.Title>{tripData[20].label}</Popover.Title>
              <Popover.Content>
                {tripData[20].value.length !== 0 ? (
                  tripData[20].value.map((c, index) => (
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
          <MDBBtn rounded outline color="info">
            Trailers
          </MDBBtn>
        </OverlayTrigger>
        {isLoading ? (
          <Spinner animation="border" variant="primary" className="float-right" />
        ) : (
          <>
            <MDBBtn outline color="warning" size="sm" onClick={editTrip} className="float-right">
              Edit Trip
            </MDBBtn>

            <MDBBtn outline color="warning" size="sm" onClick={() => openModal("vehicle")} className="float-right">
              Edit Vehicles
            </MDBBtn>
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
              vehicles={props.tripData[19]}
              trailers={props.tripData[20]}
              tripData={tripData}
              show={showVehicleModal}
              closeModal={closeModal}
            />
          )}
        </>
      )}
    </Card>
  );
}

export default ViewTrips;
