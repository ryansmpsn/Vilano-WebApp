import React, { useState } from "react";
import UpsertContractModal from "./UpsertContractModal";
import { Button } from "react-bootstrap";

function EditContractTable(props) {
  const [showModal, setShowModal] = useState(false);

  function openModal() {
    setShowModal(true);
    window.location.hash = "edit";
  }

  function closeModal() {
    window.history.replaceState(null, null, " ");
    setShowModal(false);
  }

  return (
    <>
      <Button className="btn-sm btn-outline-warning float-right" onClick={openModal}>
        Edit {props.type}
      </Button>
      <UpsertContractModal
        modalName={"Edit " + props.type}
        contract={props.contract}
        inputRestrictions={props.inputRestrictions}
        show={showModal}
        closeModal={closeModal}
        accessLevel={props.accessLevel}
        appProps={props.appProps}
        submitAction={(editContent) => {
          return props.submitAction(editContent);
        }}
      />
    </>
  );
}

export default EditContractTable;
