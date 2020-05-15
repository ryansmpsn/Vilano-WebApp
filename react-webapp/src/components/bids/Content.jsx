import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import EditModal from "./EditModal";
import { MDBContainer } from "mdbreact";

function Content(props) {
  const [content, setContent] = useState([]);
  //TODO would be contract_id and the like.  const [contentID, setContentID] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [accessLevel, setAccessLevel] = useState("None");
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    onLoad();
  });

  function onLoad() {
    setAccessLevel(props.accessLevel);
    setContent(props.Content);
    setIsLoading(false);
  }

  // function get_history() {
  //   Send.get("/ViewContentHistory?Content_id=" + 851, this.state.props)
  //     .then(res => {
  //       console.log(res);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

  function openModal() {
    setShowModal(true);
    window.location.hash = "edit";
    console.log(window.location.hash);
  }

  function closeModal() {
    window.history.replaceState(null, null, " ");
    setShowModal(false);
  }

  var cardClass =
    "card border-primary mb-3" + (showContent ? "cardContent" : null);

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
            {content.map(
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
                      <div hidden={!showContent}>
                        <Card.Title>{h[0]}:</Card.Title>
                        <Card.Text>{h[1]}</Card.Text>
                        <hr />
                      </div>
                    )}
                  </div>
                )
            )}
            <Link
              onClick={e => props.setSelectedContract(content[16][1])}
              to="/bids/trips"
              className="btn btn-primary"
            >
              View Trips
            </Link>
            <Button
              hidden={showContent}
              className=" btn btn-primary"
              onClick={() => setShowContent(true)}
              data-target="#collapseExample"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              Show Contract
            </Button>
            <Button
              hidden={!showContent}
              className=" btn btn-primary"
              onClick={() => setShowContent(false)}
              data-target="#collapseExample"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              Hide Contract
            </Button>
            <Button onClick={openModal}>Edit</Button>
          </Card>
          <EditModal
            modalName={props.modalName}
            content={content}
            inputRestrictions={props.inputRestrictions}
            show={showModal}
            closeModal={closeModal}
            accessLevel={accessLevel}
            appProps={props.appProps}
            submitAction={editContent => {
              return props.submitAction(editContent);
            }}
          />
        </MDBContainer>
      </div>
    )
  );
}

export default Content;
