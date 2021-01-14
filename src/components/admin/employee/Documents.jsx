import { MDBIcon } from "mdbreact";
import React, { useState } from "react";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import Select from "react-select";
import Send from "../../../libs/send";
import DocumentModal from "./sections/DocumentModal";

function Documents(props) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFileData, setUploadedFileData] = useState([
    { columnName: "doc_type_id", inputType: null, label: null, updatedValue: null, value: 19 },
    { columnName: "employee_id", inputType: null, label: null, updatedValue: null, value: sessionStorage.getItem("IDSession") },
    { columnName: "first_name", inputType: null, label: null, updatedValue: null, value: "Noah" },
    { columnName: "last_name", inputType: null, label: null, updatedValue: null, value: "West" },
  ]);
  const [showModal, setShowModal] = useState(false);

  function openModal() {
    setShowModal(true);
    window.location.hash = "edit";
  }

  function closeModal() {
    window.history.replaceState(null, null, " ");
    setShowModal(false);
  }
  function onFileChange(e) {
    setSelectedFile(e.target.files[0]);

    let someFileData = e.target.files[0];
    const formData = new FormData();

    // Update the formData object
    formData.append(uploadedFileData, someFileData);

    // Details of the uploaded file
    console.log(someFileData);
    for (var key of formData.entries()) {
      console.log(key[0] + ", " + key[1]);
    }
  }
  function onFileUpload() {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append("myFile", selectedFile, selectedFile.name);
    formData.append("json", JSON.stringify(uploadedFileData));
    // Details of the uploaded file
    console.log(selectedFile);
    console.log(uploadedFileData);

    Send.post("/Employee/FileUpload", formData)
      .then((res) => {
        console.log(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);

        console.log(err);
      });
  }

  function fileData() {
    if (selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {selectedFile.name}</p>
          <p>File Type: {selectedFile.type}</p>
          <p>
            Last Modified:
            {selectedFile.lastModifiedDate.toDateString()}
          </p>
        </div>
      );
    } else {
      return (
        <div className="float-right">
          <br />
          <h4>Choose a file before pressing the Upload button.</h4>
        </div>
      );
    }
  }

  return (
    <Container>
      {console.log(uploadedFileData)}
      <Row>
        <Col className="text-center">
          <h1>Documents</h1>
        </Col>
      </Row>
      <Row>
        <Col lg="6">
          {/* <Select
            autoFocus
            options={props.employeeDropdowns[4].options}
            placeholder={"Document Type"}
            onChange={(x) => {
              setUploadedFileData(
                { columnName: "document_type_id", inputType: null, label: null, updatedValue: null, value: 19 },
                { columnName: "employee_id", inputType: null, label: null, updatedValue: null, value: sessionStorage.getItem("IDSession") }
              );
            }}
            isLoading={isLoading}
          /> */}
        </Col>
      </Row>

      <Row>
        <Col>
          <Button className="btn-outline-info" onClick={() => openModal()}>
            Upload File
            <MDBIcon fas icon="upload" className="ml-1" />
          </Button>
        </Col>
      </Row>
      <DocumentModal modalName={"Employee Document Upload"} show={showModal} closeModal={closeModal} />
    </Container>
  );
}

export default Documents;
