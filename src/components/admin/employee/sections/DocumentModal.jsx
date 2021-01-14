import React, { useState } from "react";
import Select from "react-select";
import DatePicker from "react-date-picker";
import { useToasts } from "react-toast-notifications";
import { Modal, Spinner, Row, Col, Button, FormControl, FormLabel, Form, Container } from "react-bootstrap";
import { MDBIcon } from "mdbreact";
import Send from "../../../../libs/send";

function DocumentModal(props) {
  const { addToast } = useToasts();
  const [isSending, setIsSending] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFileData, setUploadedFileData] = useState([
    { columnName: "doc_type_id", inputType: null, label: null, updatedValue: null, value: 19 },
    { columnName: "employee_id", inputType: null, label: null, updatedValue: null, value: sessionStorage.getItem("IDSession") },
    { columnName: "first_name", inputType: null, label: null, updatedValue: null, value: "Noah" },
    { columnName: "last_name", inputType: null, label: null, updatedValue: null, value: "West" },
  ]);

  function onFileUpload() {
    addToast("You have submitted the document but the endpoint is not created yet.", {
      appearance: "success",
      autoDismiss: true,
      autoDismissTimeout: 3000,
    });
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
  function fileData() {
    if (selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>
            <b>File Name: </b>
            {selectedFile.name}
          </p>

          <p>
            <b>File Type: </b>
            {selectedFile.type}
          </p>
          <p>
            <b>Last Modified: </b>
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
    <Modal show={props.show} onHide={props.closeModal} centered backdrop={"static"}>
      <Modal.Header closeButton>{props.modalName}</Modal.Header>

      <Modal.Body>
        <Container>
          <Row>
            <Col>
              <Form>
                <p>Drag and drop file or browse computer to select a file.</p>
                <div className="input-group my-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroupFileAddon01">
                      Upload
                    </span>
                  </div>
                  <div className="custom-file">
                    <input type="file" className="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01" onChange={(e) => onFileChange(e)} />
                    <label className="custom-file-label" htmlFor="inputGroupFile01">
                      Choose file
                    </label>
                  </div>
                </div>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col> {fileData()}</Col>
          </Row>
        </Container>
      </Modal.Body>

      <Modal.Footer>
        {isSending ? (
          <Spinner animation="border" variant="primary" />
        ) : (
          <Button className="btn-outline-info float-right" onClick={() => onFileUpload()}>
            Upload File
            <MDBIcon fas icon="upload" className="ml-1" />
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default DocumentModal;
