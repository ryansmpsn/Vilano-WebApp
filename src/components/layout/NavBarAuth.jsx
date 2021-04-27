import React, { useState } from "react";
import { useAuth } from "../../auth";
import { NavLink } from "react-router-dom";
import { Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import { IconButton } from "@material-ui/core";
import Documents from "../util/Documents";

function NavBarAuth(props) {
  const { setSession } = useAuth();
  const [showDocumentModal, setShowDocumentModal] = useState(false);

  const renderTooltip = (props) => (
    <Tooltip id="upload-document-tooltip" {...props}>
      Upload File
    </Tooltip>
  );

  function logOut() {
    setSession();
    sessionStorage.clear();
    props.setIsAuthenticated(false);
  }

  function openDocumentModal() {
    setShowDocumentModal(true);
  }
  function closeDocumentModal() {
    setShowDocumentModal(false);
  }
  return props.isAuthenticated ? (
    <>
      <OverlayTrigger placement="left" delay={{ show: 250, hide: 400 }} overlay={renderTooltip}>
        <div className="m-3">
          <IconButton size="small" onClick={openDocumentModal} className="black-text">
            <div className="fas fa-upload" />
          </IconButton>
        </div>
      </OverlayTrigger>
      {sessionStorage.getItem("/profile") >= 3 && (
        <NavLink to="/profile" className="mr-2">
          <Button variant="outline-dark">
            <div className="fas fa-user mr-2" />
            Profile
          </Button>
        </NavLink>
      )}
      <NavLink onClick={logOut} to="/">
        <Button variant="outline-dark">
          Logout
          <div className="fas fa-sign-out-alt ml-2" />
        </Button>
      </NavLink>
      <Documents
        showModal={showDocumentModal}
        closeModal={closeDocumentModal}
        endpoint="/FileUpload"
        fileTypeOptions={[
          { value: "hcr", label: "HCR" },
          { value: "dro", label: "DRO" },
          { value: "cds", label: "CDS" },
        ]}
        payrollOptions={[
          { value: "1", label: "Option 1" },
          { value: "2", label: "Option 2" },
          { value: "3", label: "Option 3" },
        ]}
        uploadData={null}
        modalName="File Uploader"
        payroll
      />
    </>
  ) : (
    <NavLink to="/Login">
      <Button variant="outline-dark">
        Login
        <div className="fas fa-sign-in-alt ml-2" />
      </Button>
    </NavLink>
  );
}
export default NavBarAuth;
