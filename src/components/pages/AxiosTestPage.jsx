import React, { useState } from "react";
import { useToasts } from "react-toast-notifications";
import Send from "../../libs/send";
import { FormGroup, FormControl, Spinner, Button, Form, Row, Col, Card, Badge } from "react-bootstrap";
import { useFormFields } from "../../libs/hookslib";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVials } from "@fortawesome/free-solid-svg-icons";

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
    if (fields.endpoint !== "") {
      Send.post(fields.endpoint, JSON.parse(fields.textData))
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

  function onFileChange(e) {
    setSelectedFile(e.target.files[0]);

    let someFileData = e.target.files[0];
    const formData = new FormData();

    // Update the formData object
    formData.append("myFile", someFileData, someFileData.name);

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

    // Details of the uploaded file
    console.log(selectedFile);
    console.log(formData.values);

    Send.post(fields.endpoint, formData)
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
    <React.Fragment>
      <Row className="mb-4">
        <Col xl="12" md="12" className="mb-r">
          <Card className="cascading-admin-card">
            <Card.Header>
              <div className="admin-up">
                <div className="fa">
                  <FontAwesomeIcon icon={faVials} className="" />
                </div>
                <div className="data">
                  <Card.Text>Endpoint / Axios Test Page</Card.Text>
                  <h4>
                    <Badge color="primary-color" pill></Badge>
                  </h4>
                </div>
              </div>
            </Card.Header>
            <Card.Body>
              <h2 className="m-3 ">Endpoint / Axios Test Page</h2>

              <Row className="justify-content-md-center">
                <Col md="8">
                  <Form>
                    {isLoading ? (
                      <Spinner animation="border" variant="primary" />
                    ) : (
                      <>
                        <FormGroup controlId="endpoint">
                          <FormControl autoFocus placeholder="Enter an Endpoint to Test" type="text" value={fields.endpoint} onChange={handleFieldChange} />
                        </FormGroup>
                        <p className="text-muted">
                          <small>Example: "/Contract/Dropdowns/Contract/All"</small>
                        </p>
                        <FormGroup controlId="textData">
                          <FormControl as="textarea" placeholder="Enter Data to be Submitted" value={fields.textData} onChange={handleFieldChange} />
                        </FormGroup>
                        <p className="text-muted">
                          <small>JSON / File(s)</small>
                        </p>
                        <Button className="btn-outline-info" onClick={() => onGetRequest()}>
                          Get
                          <div className="fas fa-database ml-1" />
                        </Button>
                        <Button className="btn-outline-info" onClick={() => onPostRequest()}>
                          Post
                          <div className=" far fa-paper-plane ml-1" />
                        </Button>
                        <Button className="btn-outline-info float-right" onClick={() => onFileUpload()}>
                          Upload File
                          <div className="fas fa-upload ml-1" />
                        </Button>
                        <input type="file" onChange={(e) => onFileChange(e)} />

                        {fileData()}
                      </>
                    )}
                  </Form>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default AxiosTestPage;
