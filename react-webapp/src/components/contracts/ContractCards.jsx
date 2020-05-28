import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { MDBContainer } from "mdbreact";
import EditContractModal from "./EditContractModal";

function ContractCards(props) {
  const [contract, setContract] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showContract, setShowContract] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [accessLevel, setAccessLevel] = useState("None");
  //TODO would be contract_id and the like.  const [contractID, setContractID] = useState(0);

  useEffect(() => {
    onLoad();
  });

  function onLoad() {
    setAccessLevel(props.accessLevel);
    setContract(props.Contract);
    setIsLoading(false);
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
  // function get_history() {
  //   Send.get("/ViewContractHistory?Contract_id=" + 851, this.state.props)
  //     .then(res => {
  //       console.log(res);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

  var cardClass = "card border-primary mb-3" + (showContract ? "cardContract" : null);

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
              width: "278px",
            }}
          >
            {contract.map(
              (h, index) =>
                h.label !== null && (
                  <div key={index}>
                    {h.label === "Contract No." || h.label === "Company" || h.label === "Start City" ? (
                      <>
                        <Card.Title>{h.label}:</Card.Title>
                        <Card.Text>{h.value}</Card.Text>
                        <hr />
                      </>
                    ) : (
                      <div hidden={!showContract}>
                        <Card.Title>{h.label}:</Card.Title>
                        <Card.Text>{h.value}</Card.Text>
                        <hr />
                      </div>
                    )}
                  </div>
                )
            )}
            <Link onClick={(e) => props.setSelectedContract(contract[6].value)} to={`${props.url}/${contract[6].value}`} className="btn btn-primary">
              View Trips
            </Link>
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
            <Button onClick={openModal}>Edit</Button>
          </Card>
          <EditContractModal
            modalName={props.modalName}
            contract={contract}
            inputRestrictions={props.inputRestrictions}
            show={showModal}
            closeModal={closeModal}
            accessLevel={accessLevel}
            appProps={props.appProps}
            submitAction={(editContent) => {
              return props.submitAction(editContent);
            }}
          />
        </MDBContainer>
      </div>
    )
  );
}

export default ContractCards;
