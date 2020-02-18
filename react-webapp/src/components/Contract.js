import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBContainer,
  MDBBtn
} from "mdbreact";
import EditModal from "./EditModal";
import styled from "styled-components";
import { Button } from "react-bootstrap";

const Styles = styled.div`
  .card {
    padding: 10px;
    margin: 10px;
    margin-right: 0px;
    height: 1050px;
    width: 270px;
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
  }
`;

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
    !isLoading && (
      <Styles>
        <MDBContainer>
          <MDBCard>
            {contract.map(
              (h, index) =>
                h[0] !== "DONOTSHOW" && (
                  <div key={index}>
                    <MDBCardTitle>{h[0]}:</MDBCardTitle>
                    <MDBCardText>{h[1]}</MDBCardText>
                    <hr />
                  </div>
                )
            )}
            <Button onClick={openModal}>Edit Contract</Button>
          </MDBCard>
          <EditModal
            modalName="Contract"
            content={contract}
            inputRestrictions={props.inputRestrictions}
            show={showModal}
            closeModal={closeModal}
            accessLevel={accessLevel}
          />
        </MDBContainer>
      </Styles>
    )
  );
}

export default Contract;
