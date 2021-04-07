import React, { useState } from "react";
import { Row, Col, Card, Button, Spinner, Container, ListGroup, ListGroupItem, Form } from "react-bootstrap";
import DisplayContractEmployee from "./DisplayContractEmployees";
import ContractTable from "./ContractTable";

import Documents from "../../util/Documents";
import { useToasts } from "react-toast-notifications";
import Send from "../../../libs/send";

function DisplayEmployeeInfo(props) {
  const { addToast } = useToasts();

  let { employeeData, employeeContracts, employeeDropdowns, allModifiedContracts, isLoading, profile } = props;
  const [showModal, setShowModal] = useState(false);

  if (profile && !isLoading) {
    employeeContracts = employeeData[5].value;
    allModifiedContracts = [];
  }

  function openModal() {
    setShowModal(true);
  }
  function closeModal() {
    setShowModal(false);
  }
  function openLink(x) {
    const newWindow = window.open("https://" + x, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  }
  function accessFile(fileData) {
    addToast("Checking your permissions for this file.", {
      appearance: "info",
      autoDismiss: true,
      autoDismissTimeout: 3000,
    });

    Send.get("/Employee/FileDownloadLink/" + fileData[11].updatedValue + "/" + fileData[9].updatedValue).then((result) => {
      openLink(result.data.share_link);
      addToast("File access granted.", {
        appearance: "success",
        autoDismiss: true,
        autoDismissTimeout: 3000,
      });
    });
  }

  return isLoading ? (
    <Spinner animation="border" variant="primary" className="mr-auto" />
  ) : (
    employeeData !== null && (
      <Container fluid className="mt-3">
        <Row>
          <Col lg="8">
            <Card className="cascading-admin-card" style={{ minHeight: "20em" }}>
              <div className="admin-up" style={{ marginRight: "10%" }}>
                <Button className="text-center blue-gradient" block>
                  Profile
                </Button>
              </div>
              <Card.Body>
                <Row>
                  {employeeData[0].value[0].map(
                    (c, index) =>
                      c.label !== null && (
                        <Col md="3" key={index + "profile"}>
                          <Form.Group>
                            <Form.Label>{c.label}:</Form.Label>
                            <Form.Text>{c.updatedValue !== null ? c.updatedValue : ""}</Form.Text>
                            {/* <Form.Control type="text" className="mt-0" value= disabled /> */}
                          </Form.Group>
                        </Col>
                      )
                  )}
                </Row>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card className="cascading-admin-card ">
              <div className="admin-up" style={{ marginRight: "10%" }}>
                <Button className="text-center blue-gradient" block>
                  Documents
                </Button>
              </div>
              <Card.Body className="text-center">
                {employeeData[6].value.length === 0 ? (
                  <p className="text-muted small">No Documents.</p>
                ) : (
                  // add document file type along with document file name
                  <ListGroup className="text-left  overflow-auto" style={{ height: "14em" }}>
                    {employeeData[6].value.map((c, index) => (
                      <ListGroupItem size="3" key={index + "document"} className="p-0 pl-2" action onClick={() => accessFile(c)}>
                        <div>
                          <small className="text-muted">{c[5].value}</small>
                          <p>{c[10].value}</p>
                        </div>
                      </ListGroupItem>
                    ))}
                  </ListGroup>
                )}
                {!profile && (
                  <Button className="btn btn-sm btn-outline-info mt-3 mb-0" onClick={() => openModal()}>
                    Upload File
                    <div className="fas fa-upload ml-1" />
                  </Button>
                )}
                {employeeDropdowns && (
                  <Documents
                    showModal={showModal}
                    closeModal={closeModal}
                    endpoint="/Employee/FileUpload"
                    fileTypes={employeeDropdowns[4].options}
                    uploadData={[
                      { columnName: "employee_id", inputType: null, label: null, updatedValue: employeeData[0].value[0][0].value, value: employeeData[0].value[0][0].value },
                      { columnName: "first_name", inputType: null, label: null, updatedValue: employeeData[0].value[0][6].value, value: employeeData[0].value[0][6].value },
                      { columnName: "last_name", inputType: null, label: null, updatedValue: employeeData[0].value[0][7].value, value: employeeData[0].value[0][7].value },
                      // last 2 objects only for employee
                    ]}
                    modalName={"Upload Document to " + employeeData[0].value[0][6].value + " " + employeeData[0].value[0][7].value}
                  />
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <hr className="mt-5" />

        {employeeContracts.length + allModifiedContracts.length >= 4 ? (
          <ContractTable
            profile={profile}
            editContract={props.editContract}
            contractData={employeeContracts}
            handleRoleSelect={(x, index) => props.handleRoleSelect(x, index)}
            modifiedContractData={allModifiedContracts}
            employeeDropdowns={props.employeeDropdowns}
            setContractEmployees={props.setAllModifiedContracts}
          />
        ) : (
          <>
            <Row className="justify-content-md-center">
              <DisplayContractEmployee contracts profile={profile} modified={false} contractEmployees={employeeContracts} employeeDropdowns={props.employeeDropdowns} editContract={props.editContract} />
              <DisplayContractEmployee
                contracts
                modified
                handleRoleSelect={(x, index) => props.handleRoleSelect(x, index)}
                contractEmployees={allModifiedContracts}
                employeeDropdowns={props.employeeDropdowns}
                setContractEmployees={props.setAllModifiedContracts}
                removeEmployee={props.removeContract}
              />
            </Row>
            {!profile && (
              <Row className="justify-content-center">
                <Button className="btn btn-sm " variant="outline-primary" onClick={() => props.saveContractToEmployee()}>
                  save
                </Button>
              </Row>
            )}
          </>
        )}

        <Row>
          <Col lg="12">
            <hr className="mt-5" />
            <h3 className="m-4 text-center">Additional Employee Information</h3>
          </Col>
          {employeeData.map(
            (data, index) =>
              index > 0 &&
              index < 5 && (
                <Col lg="6" key={index + "employeeData"} className="mb-2">
                  <Card>
                    <Card.Header>
                      <Button block className="blue-gradient  text-center">
                        {data.label}
                      </Button>
                    </Card.Header>
                    <Card.Body>
                      <Row>
                        {data.value.length !== 0 &&
                          data.value[0].map(
                            (c, index) =>
                              c.label !== null && (
                                <Col md="6" key={index + "cData"}>
                                  <Form.Group>
                                    <Form.Label>{c.label}</Form.Label>
                                    <Form.Control type="text" value={c.updatedValue !== null ? c.updatedValue : ""} disabled />
                                  </Form.Group>
                                </Col>
                              )
                          )}
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              )
          )}
        </Row>
      </Container>
    )
  );
}

export default DisplayEmployeeInfo;
