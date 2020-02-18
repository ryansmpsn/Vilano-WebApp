import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Well,
  Overlay,
  Tooltip,
  Badge,
  Label
} from "react-bootstrap";
import EditModal from "./EditModal";
import Send from "./send";
//import "./Content.css";

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

  return (
    !isLoading && (
      <Col xs={6} md={3} key={props.eventKeyIndex}>
        <Button onClick={openModal}>
          {content.map(
            (h, index) =>
              h[0] !== "DONOTSHOW" && (
                <div key={index}>
                  <Label>{h[0]}</Label>
                  <Badge>{h[1]}</Badge>
                </div>
              )
          )}
        </Button>
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
      </Col>
    )
  );
}

export default Content;
