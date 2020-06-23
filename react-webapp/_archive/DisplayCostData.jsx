import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { MDBContainer } from "mdbreact";

function DisplayCostData(props) {
  const [costData, setCostData] = useState([]);
  const [showCost, setShowCost] = useState(false);

  useEffect(() => {
    onLoad();
  });

  function onLoad() {
    setCostData(props.costData);
  }

  var cardClass = "card border-primary mb-3" + (showCost ? "cardContract" : null);

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
          {costData.map(
            (c, index) =>
              c.label !== null && (
                <div key={index}>
                  {c.label === "Cost Number" || c.label === "Cost Segment" || c.label === "Frequency" ? (
                    <>
                      <Card.Title>{c.label}:</Card.Title>
                      <Card.Text>{c.value}</Card.Text>
                      <hr />
                    </>
                  ) : (
                    <div key={index} hidden={!showCost}>
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
          {costData.map(
            (c, index) => typeof c.value === "object" && c.value !== null && c.value.map((t, index) => console.log(t))
          )}

          <Button
            hidden={showCost}
            className=" btn btn-primary"
            onClick={() => setShowCost(true)}
            data-target="#collapseExample"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            Show Cost
          </Button>
          <Button
            hidden={!showCost}
            className=" btn btn-primary"
            onClick={() => setShowCost(false)}
            data-target="#collapseExample"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            Hide Cost
          </Button>
          <Link
            onClick={(e) => props.setSelectedCost("Cost 326")}
            to={`${props.url}/cost/${props.selectedContractId}`}
            className="btn btn-primary"
          >
            View Routes
          </Link>
        </Card>
      </MDBContainer>
    </div>
  );
}

export default DisplayCostData;
