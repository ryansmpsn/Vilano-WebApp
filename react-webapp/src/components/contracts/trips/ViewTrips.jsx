import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { Card, Button, Spinner } from "react-bootstrap";
import { MDBContainer } from "mdbreact";
import UpsertVehicleModal from "./UpsertVehicleModal";
import UpsertTripModal from "./UpsertTripModal";
import Send from "../../../libs/send";

function ViewTrips(props) {
  const [tripData] = useState(props.tripData);
  const [showTrip, setShowTrip] = useState(false);
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
  var cardClass = "card border-primary mb-3" + (showTrip ? "cardContract" : null);

  return (
    <div>
      <MDBContainer>
        <Card
          className={cardClass}
          style={{
            padding: "10px",
            margin: "10px",
            marginRight: "0px",
            width: "278px",
          }}
        >
          {tripData.map(
            (c, index) =>
              c.label !== null && (
                <div key={index + "title"}>
                  {c.label === "Trip Number" || c.label === "Cost Segment" || c.label === "Frequency" ? (
                    <>
                      <Card.Title>{c.label}:</Card.Title>
                      <Card.Text>{c.value}</Card.Text>
                      <hr />
                    </>
                  ) : (
                    <div key={index + "cardContent"} hidden={!showTrip}>
                      <Card.Title>{c.label}:</Card.Title>
                      {typeof c.value !== "object" && c.value !== null && <Card.Text>{c.value}</Card.Text>}
                      {typeof c.value === "object" &&
                        c.value !== null &&
                        c.value.map((t, index) =>
                          t.map(
                            (x, index) =>
                              x.label !== null && (
                                <div key={x.label}>
                                  <Card.Text>{x.label}:</Card.Text>
                                  <Card.Text>{x.value}</Card.Text>
                                  <br />
                                </div>
                              )
                          )
                        )}
                      <hr />
                    </div>
                  )}
                </div>
              )
          )}
          <Button
            hidden={showTrip}
            className=" btn btn-primary"
            onClick={() => setShowTrip(true)}
            data-target="#collapseExample"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            Show Trip
          </Button>
          <Button
            hidden={!showTrip}
            className=" btn btn-primary"
            onClick={() => setShowTrip(false)}
            data-target="#collapseExample"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            Hide Trip
          </Button>
          {isLoading ? (
            <Spinner animation="border" variant="primary" />
          ) : (
            <Button
              className=" btn btn-primary"
              onClick={editTrip}
              data-target="#collapseExample"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              Edit Trip
            </Button>
          )}
          <Button
            hidden={!showTrip}
            className=" btn btn-primary"
            onClick={() => openModal("vehicle")}
            data-target="#collapseExample"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            Edit Vehicles
          </Button>
          {/* <Link
            onClick={(e) => props.setSelectedTrip("Trip 326")}
            to={`${props.url}/trip/${props.selectedContractId}`}
            className="btn btn-primary"
          >
            View Routes
          </Link> */}
        </Card>
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
                modalName={"Edit Vehicles"}
                vehicles={props.tripData[19]}
                trailers={props.tripData[20]}
                show={showVehicleModal}
                closeModal={closeModal}
              />
            )}
          </>
        )}
      </MDBContainer>
    </div>
  );
}

export default ViewTrips;
