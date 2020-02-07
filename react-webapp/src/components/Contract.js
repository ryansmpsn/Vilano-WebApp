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
//import "./Contract.css";

function Contract(props) {
  const [contract, setContract] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [accessLevel, setAccessLevel] = useState("None");

  useEffect(() => {
    onLoad();
  }, []);

  function onLoad() {
    setAccessLevel(sessionStorage.getItem("Contracts"));
    setContract(props.contract);
    setIsLoading(false);
  }

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  return (
    //<div className="contract">
    !isLoading && (
      <Col xs={6} md={3} key={props.eventKeyIndex}>
        <Button onClick={openModal}>
          {contract.map(
            (h, index) =>
              h[0] != "DONOTSHOW" && (
                <div key={index}>
                  <Label>{h[0]}</Label>
                  <Badge>{h[1]}</Badge>
                </div>
              )
          )}
        </Button>
        <EditModal
          modalName="Contract"
          content={contract}
          specialInput={props.specialInput}
          show={showModal}
          closeModal={closeModal}
          accessLevel={accessLevel}
        />
      </Col>
    )
    //</div>
  );
}

export default Contract;
