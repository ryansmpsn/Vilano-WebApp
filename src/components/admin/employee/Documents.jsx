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
  const [submissionJson, setSubmissionJson] = useState(null);

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

  function onFileTypeUpdate(e) {
    // Gather additional JSON from props and append them to The file type Array.
    let newFileData = [
      { columnName: "doc_type_id", inputType: null, label: null, updatedValue: null, value: null },
      { columnName: "doc_type_id", inputType: null, label: null, updatedValue: null, value: null },
    ];

    uploadData.forEach((object) => newFileData.push(object));
    newFileData[0].updatedValue = e.label;
    newFileData[1].updatedValue = e.value;
    setSubmissionJson(newFileData);
  }

  function onFileChange(e) {
    // Update Data based on file changes.
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
    formData.append("json", JSON.stringify(submissionJson));
    // Details of the upload file

    Send.post(endpoint, formData)
      .then((res) => {
        console.log("file uploaded Successfully", res);
        setIsSending(false);
      })
      .catch((err) => {
        console.log(err);
        setIsSending(false);

        console.log(err);
      });
  }

  function fileData() {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    if (selectedFile) {
      return (
        <div>
          <h2 className="mb-3">File Details:</h2>
          <p className="m-0">
            <b>File Name: </b>
            {selectedFile.name}
          </p>

          <p className="m-0">
            <b>File Type: </b>
            {selectedFile.type}
          </p>
          <p className="m-0">
            <b>Last Modified: </b>
            {selectedFile.lastModifiedDate.toLocaleDateString("en-US", options)}
          </p>
        </div>
      );
    }
  }

  return (
    <Modal show={showModal} onHide={closeModal} centered backdrop={"static"}>
      <Modal.Header closeButton>
        <h4>{modalName}</h4>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            <Col>
              <Form>
                <p className="text-muted">Select file type.</p>

                <Select autofocus placeholder={"File Description"} options={documentTypes} isDisabled={isLoading | isSending} isLoading={isLoading} onChange={(e) => onFileTypeUpdate(e)} />
                <p className="text-muted mt-3">Drag and drop file or browse computer to select a file.</p>
                <div className="input-group my-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroupFileAddon01">
                      <MDBIcon fas icon="file" />
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
          <Button className="btn-outline-info float-right" onClick={() => onFileUpload()} disabled={!selectedFile | !submissionJson}>
            Upload File
            <MDBIcon fas icon="upload" className="ml-1" />
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default Documents;

/*                Component Notes


               ** Required Functions **

function openModal() {
  setShowModal(true);
}
function closeModal() {
  setShowModal(false);
}


                ** Props **
 <Documents
   showModal={showModal}
   closeModal={closeModal}
   endpoint="/Employee/FileUpload"
   uploadData={[
     JSON Required For Endpoint ]}
   modalName="optional" 
                /> 
*/
