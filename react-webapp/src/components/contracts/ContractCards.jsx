import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { MDBContainer } from "mdbreact";

function ContractCards(props) {
  const [contract, setContract] = useState([]);
  //TODO would be contract_id and the like.  const [contractID, setContractID] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showContract, setShowContract] = useState(false);

  useEffect(() => {
    onLoad();
  });

  function onLoad() {
    setContract(props.Contract);
    setIsLoading(false);
  }

  // function get_history() {
  //   Send.get("/ViewContractHistory?Contract_id=" + 851, this.state.props)
  //     .then(res => {
  //       console.log(res);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

  var cardClass =
    "card border-primary mb-3" + (showContract ? "cardContract" : null);

  return (
    !isLoading && (
      <div>
        <MDBContainer key={props.eventKeyIndex}>
          <Card
            className={cardClass}
            style={{
              padding: "10px",
              margin: "10px",
              marginRight: "0px",
              width: "278px"
            }}
          >
            {contract.map(
              (h, index) =>
                h[0] !== "DONOTSHOW" && (
                  <div key={index}>
                    {h[0] === "Contract No." ||
                    h[0] === "Company" ||
                    h[0] === "Start City" ? (
                      <>
                        <Card.Title>{h[0]}:</Card.Title>
                        <Card.Text>{h[1]}</Card.Text>
                        <hr />
                      </>
                    ) : (
                      <div hidden={!showContract}>
                        <Card.Title>{h[0]}:</Card.Title>
                        <Card.Text>{h[1]}</Card.Text>
                        <hr />
                      </div>
                    )}
                  </div>
                )
            )}
            <Link
              onClick={e => props.onClick(contract[16][1])}
              to="/contracts/trips"
              className="btn btn-primary"
            >
              View Trips
            </Link>
            {console.log(contract)}
            <Button
              hidden={showContract}
              className=" btn btn-primary"
              onClick={() => setShowContract(true)}
              data-target="#collapseExample"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              Show Contract
            </Button>
            <Button
              hidden={!showContract}
              className=" btn btn-primary"
              onClick={() => setShowContract(false)}
              data-target="#collapseExample"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              Hide Contract
            </Button>
          </Card>
        </MDBContainer>
      </div>
    )
  );
}

export default ContractCards;
