import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import EditModal from "./EditModal";
import { MDBCard, MDBCardTitle, MDBCardText, MDBContainer } from "mdbreact";
import styled from "styled-components";

function Content(props) {
  const [content, setContent] = useState([]);
  const [contentID, setContentID] = useState(0); //TODO would be contract_id and the like.
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [accessLevel, setAccessLevel] = useState("None");

  useEffect(() => {
    onLoad();
  }, []);

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
  const Styles = styled.div`
    .card {
      padding: 10px;
      margin: 10px;
      margin-right: 0px;
      height: 1050px;
      width: 278px;
    }
    .card-body {
      padding: 15px;
      width: 250px;
    }
    .card-title {
      height: 20px;
    }
    .card-text {
      height: 15px;
      margin: 10px;
    }
  `;
  return (
    !isLoading && (
      <Styles>
        <MDBContainer key={props.eventKeyIndex}>
          <MDBCard>
            {content.map(
              (h, index) =>
                h[0] !== "DONOTSHOW" && (
                  <div key={index}>
                    <MDBCardTitle>{h[0]}:</MDBCardTitle>
                    <MDBCardText>{h[1]}</MDBCardText>
                    <hr />
                  </div>
                )
            )}
            <Button onClick={openModal}>Edit</Button>
          </MDBCard>
          <EditModal
            modalName="Set This Properly"
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
      </Styles>
    )
  );
}

export default Content;
