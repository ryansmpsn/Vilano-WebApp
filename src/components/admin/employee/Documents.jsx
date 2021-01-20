import { MDBIcon } from "mdbreact";
import React, { useState, useEffect } from "react";
import { Row, Col, Container, Form, Button, Modal, Spinner } from "react-bootstrap";
import Select from "react-select";
import Send from "../../../libs/send";
import { useToasts } from "react-toast-notifications";

function Documents(props) {
  let { modalName, showModal, closeModal, endpoint, uploadData } = props;
  const { addToast } = useToasts();

  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [documentTypes, setDocumentTypes] = useState(null);
  const [uploadedFileData, setUploadedFileData] = useState([
    { columnName: "doc_type_id", inputType: null, label: null, updatedValue: null, value: 19 },
    { columnName: "employee_id", inputType: null, label: null, updatedValue: null, value: sessionStorage.getItem("IDSession") },
    { columnName: "first_name", inputType: null, label: null, updatedValue: null, value: "Noah" },
    { columnName: "last_name", inputType: null, label: null, updatedValue: null, value: "West" },
    // last 2 objects only for employee
  ]);

  useEffect(() => {
    const onLoad = async () => {
      setIsLoading(true);

      Send.get("/Employee/Dropdowns/Employee/All").then((res) => {
        setIsLoading(false);
        setDocumentTypes(res.data[4].options);
      });
    };

    onLoad();
  }, []);

  function onFileChange(e) {
    setSelectedFile(e.target.files[0]);

    let someFileData = e.target.files[0];
    const formData = new FormData();

    // Update the formData object
    formData.append(uploadData, someFileData);
  }
  function onFileUpload() {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append("myFile", selectedFile, selectedFile.name);
    formData.append("json", JSON.stringify(uploadData));
    // Details of the uploaded file
    console.log(selectedFile);
    console.log(uploadData);

    Send.post(endpoint, formData)
      .then((res) => {
        console.log(res);
        setIsSending(false);
      })
      .catch((err) => {
        console.log(err);
        setIsSending(false);

        console.log(err);
      });
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
    <Modal show={showModal} onHide={closeModal} centered backdrop={"static"}>
      <Modal.Header closeButton>{modalName}</Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col>
              <Form>
                <p>Drag and drop file or browse computer to select a file.</p>
                <Select autofocus placeholder={"File Description"} options={documentTypes} isDisabled={isLoading | isSending} isLoading={isLoading} />
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

export default Documents;
