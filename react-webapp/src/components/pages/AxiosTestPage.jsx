import React, { useState } from "react";
import { MDBCard, MDBCardBody, MDBRow, MDBCol, MDBIcon, MDBCardText, MDBBadge, MDBCardHeader } from "mdbreact";
import { useToasts } from "react-toast-notifications";
import Send from "../../libs/send";
import { FormGroup, FormControl, Spinner, Button, Form, Row } from "react-bootstrap";
import { useFormFields } from "../../libs/hookslib";
import { faFileMedicalAlt } from "@fortawesome/free-solid-svg-icons";

function AxiosTestPage() {
  const { addToast } = useToasts();
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    endpoint: "",
    textData: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);

  function onGetRequest() {
    setIsLoading(true);

    if (fields.endpoint !== "") {
      Send.get(fields.endpoint)
        .then((res) => {
          console.log(res);
          setIsLoading(false);
        })
        .catch((err) => {
          addToast(err + ". Check the console for more information.", {
            appearance: "error",
            autoDismiss: true,
          });
          setIsLoading(false);

          console.log(err);
        });

      addToast("Endpoint Triggered. Check the console for the result.", {
        appearance: "info",
        autoDismiss: true,
      });
    } else {
      setIsLoading(false);

      addToast("Please enter an endpoint before triggering.", {
        appearance: "warning",
        autoDismiss: true,
      });
    }
  }
  function onPostRequest() {
    console.log(fields);
  }

  function onFileChange(e) {
    setSelectedFile(e.target.files[0]);
  }
  function onFileUpload() {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append("myFile", selectedFile, selectedFile.name);

    // Details of the uploaded file
    console.log(selectedFile);
    console.log(formData);
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
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  }

  return (
    <React.Fragment>
      <MDBRow className="mb-4">
        <MDBCol xl="12" md="12" className="mb-r">
          <MDBCard className="cascading-admin-card">
            <MDBCardHeader>
              <div className="admin-up">
                <MDBIcon icon="vials" className="primary-color" />
                <div className="data">
                  <MDBCardText>Endpoint / Axios Test Page</MDBCardText>
                  <h4>
                    <MDBBadge color="primary-color" pill></MDBBadge>
                  </h4>
                </div>
              </div>
            </MDBCardHeader>
            <MDBCardBody>
              <h2 className="m-3 ">Endpoint / Axios Test Page</h2>

              <Row className="justify-content-md-center">
                <MDBCol md="8">
                  <Form>
                    {isLoading ? (
                      <Spinner animation="border" variant="primary" />
                    ) : (
                      <>
                        <FormGroup controlId="endpoint">
                          <FormControl
                            autoFocus
                            placeholder="Enter an Endpoint to Test"
                            type="text"
                            value={fields.endpoint}
                            onChange={handleFieldChange}
                          />
                        </FormGroup>
                        <p className="text-muted">
                          <small>Example: "/Contract/Dropdowns/Contract/All"</small>
                        </p>
                        <FormControl
                          as="textarea"
                          placeholder="Data to be Submitted"
                          onChange={(e) => {
                            var specials = /[*|":<>[\]{}`\\()';@&$]/;
                          }}
                        />
                        <p className="text-muted">
                          <small>JSON / File(s)</small>
                        </p>
                        <Button className="btn-outline-info" onClick={() => onGetRequest()}>
                          Get
                          <MDBIcon fas icon="database" className="ml-1" />
                        </Button>
                        <Button className="btn-outline-info" onClick={() => onPostRequest()}>
                          Post
                          <MDBIcon far icon="paper-plane" className="ml-1" />
                        </Button>
                        <Button className="btn-outline-info float-right" onClick={() => onFileUpload()}>
                          Upload File
                          <MDBIcon fas icon="upload" className="ml-1" />
                        </Button>
                        <input type="file" onChange={(e) => onFileChange(e)} />

                        {fileData()}
                      </>
                    )}
                  </Form>
                </MDBCol>
              </Row>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </React.Fragment>
  );
}

export default AxiosTestPage;
