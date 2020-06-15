import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { MDBContainer } from "mdbreact";
import UpsertVehicleModal from "./UpsertVehicleModal";

function ViewTrips(props) {
  const [tripData, setTripData] = useState([]);
  const [showTrip, setShowTrip] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    onLoad();
  });

  function onLoad() {
    setTripData(props.tripData);
  }
  function openModal() {
    setShowModal(true);
    window.location.hash = "edit";
    console.log(window.location.hash);
  }

  function closeModal() {
    window.history.replaceState(null, null, " ");
    setShowModal(false);
  }
  var cardClass = "card border-primary mb-3" + (showTrip ? "cardContract" : null);

  return (
    <div>
      <MDBContainer key={props.key}>
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
                <div key={index}>
                  {c.label === "Trip Number" || c.label === "Cost Segment" || c.label === "Frequency" ? (
                    <>
                      <Card.Title>{c.label}:</Card.Title>
                      <Card.Text>{c.value}</Card.Text>
                      <hr />
                    </>
                  ) : (
                    <div key={index} hidden={!showTrip}>
                      <Card.Title>{c.label}:</Card.Title>
                      {typeof c.value !== "object" && c.value !== null && <Card.Text>{c.value}</Card.Text>}
                      {typeof c.value === "object" &&
                        c.value !== null &&
                        c.value.map((t, index) =>
                          t.map(
                            (x, index) =>
                              x.label !== null && (
                                <>
                                  <Card.Text>{x.label}:</Card.Text>
                                  <Card.Text>{x.value}</Card.Text>
                                  <br />
                                </>
                              )
                          )
                        )}
                      <hr />
                    </div>
                  )}
                </div>
              )
          )}
          {tripData.map(
            (c, index) => typeof c.value === "object" && c.value !== null && c.value.map((t, index) => console.log(t))
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
          <Button
            className=" btn btn-primary"
            onClick={() => console.log("editing trip")}
            data-target="#collapseExample"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            Edit Trip Information
          </Button>
          <Button
            hidden={!showTrip}
            className=" btn btn-primary"
            onClick={openModal}
            data-target="#collapseExample"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            Edit Vehicles
          </Button>
          <Link
            onClick={(e) => props.setSelectedTrip("Trip 326")}
            to={`${props.url}/trip/${props.selectedContractId}`}
            className="btn btn-primary"
          >
            View Routes
          </Link>
        </Card>
        <UpsertVehicleModal modalName={"Edit Vehicles"} show={showModal} closeModal={closeModal} />
      </MDBContainer>
    </div>
  );
}

export default ViewTrips;
