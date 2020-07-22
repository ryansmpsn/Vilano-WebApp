import React, { useState } from "react";
import UpsertContractModal from "./UpsertContractModal";
import { MDBBtn } from "mdbreact";

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
      <MDBBtn outline color="warning" className="float-right" onClick={openModal}>
        Edit Contract
      </MDBBtn>
      <UpsertContractModal
        modalName={"Edit Contract"}
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
