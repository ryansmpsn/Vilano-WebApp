import React, { useState } from "react";
import { Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBContainer, MDBIcon } from "mdbreact";
import DisplayContractEmployee from "./DisplayContractEmployees";
import ContractTable from "./ContractTable";
import { ListGroup } from "react-bootstrap";
import { ListGroupItem } from "react-bootstrap";
import Documents from "../Documents";

function DisplayEmployeeInfo(props) {
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
  return isLoading ? (
    <Spinner animation="border" variant="primary" className="mr-auto" />
  ) : (
    employeeData !== null && (
      <MDBContainer fluid className="mt-3">
        <Row>
          <Col lg="8">
            <MDBCard narrow className="cascading-admin-card">
              <div className="admin-up" style={{ marginRight: "10%" }}>
                <Button className="text-center blue-gradient" block>
                  Profile
                </Button>
              </div>
              <MDBCardBody className="text-center">
                <MDBRow>
                  {console.log(employeeData[0])}
                  {employeeData[0].value[0].map(
                    (c, index) =>
                      c.label !== null && (
                        <MDBCol size="3" key={index + "profile"}>
                          <MDBInput type="text" className="mt-0" label={c.label} value={c.updatedValue !== null ? c.updatedValue : ""} disabled></MDBInput>
                        </MDBCol>
                      )
                  )}
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </Col>

          <Col>
            <MDBCard narrow className="cascading-admin-card ">
              <div className="admin-up" style={{ marginRight: "10%" }}>
                <Button className="text-center blue-gradient" block>
                  Documents
                </Button>
              </div>
              <MDBCardBody className="text-center">
                {employeeData[6].value.length === 0 ? (
                  <p className="text-muted small">No Documents.</p>
                ) : (
                  // add document file type along with document file name
                  <ListGroup className="text-left  overflow-auto" style={{ height: "17em" }}>
                    {employeeData[6].value.map((c, index) => (
                      <ListGroupItem size="3" key={index + "document"} className="p-0 pl-2">
                        <div>
                          <small className="text-muted">{c[5].value}</small>
                          <p>{c[10].value}</p>
                        </div>
                      </ListGroupItem>
                    ))}
                  </ListGroup>
                )}

                <Button className="btn btn-sm btn-outline-info mt-3 mb-0" onClick={() => openModal()}>
                  Upload File
                  <MDBIcon fas icon="upload" className="ml-1" />
                </Button>
                {employeeDropdowns && (
                  <Documents
                    showModal={showModal}
                    closeModal={closeModal}
                    endpoint="/Employee/FileUpload"
                    fileTypes={employeeDropdowns[4].options}
                    uploadData={[
                      { columnName: "employee_id", inputType: null, label: null, updatedValue: null, value: employeeData[0].value[0][0].value },
                      { columnName: "first_name", inputType: null, label: null, updatedValue: null, value: employeeData[0].value[0][6].value },
                      { columnName: "last_name", inputType: null, label: null, updatedValue: null, value: employeeData[0].value[0][7].value },
                      // last 2 objects only for employee
                    ]}
                    modalName={"Upload Document to " + employeeData[0].value[0][6].value + " " + employeeData[0].value[0][7].value}
                  />
                )}
              </MDBCardBody>
            </MDBCard>
          </Col>
        </Row>

        <hr className="mt-5" />

        <h3 className="m-4 text-center">{employeeData[5].label}</h3>

        <Row className="justify-content-md-center">
          {employeeContracts.length + allModifiedContracts.length >= 10 ? (
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
              <DisplayContractEmployee contracts profile={profile} modified={false} contractEmployees={employeeContracts} employeeDropdowns={props.employeeDropdowns} editContract={props.editContract} />
              <DisplayContractEmployee
                contracts
                modified
                handleRoleSelect={(x, index) => props.handleRoleSelect(x, index)}
                contractEmployees={allModifiedContracts}
                employeeDropdowns={props.employeeDropdowns}
                setContractEmployees={props.setAllModifiedContracts}
              />
            </>
          )}
        </Row>
        {!profile && (
          <Row className="justify-content-center">
            <Button className="btn btn-sm " variant="outline-warning" onClick={() => props.saveContractToEmployee()}>
              save
            </Button>
          </Row>
        )}

        <MDBRow center>
          <MDBCol lg="12">
            <hr className="mt-5" />
            <h3 className="m-4 text-center">Additional Employee Information</h3>
          </MDBCol>
          {employeeData.map(
            (data, index) =>
              index > 0 &&
              index < 5 && (
                <MDBCol lg="6" key={index + "employeeData"} className="mb-2">
                  <Card>
                    <Card.Header>
                      <Button block className="winter-neva-gradient  text-center" eventKey={index}>
                        {data.label}
                      </Button>
                    </Card.Header>
                    <Card.Body>
                      <MDBRow>
                        {data.value.length !== 0 &&
                          data.value[0].map(
                            (c, index) =>
                              c.label !== null && (
                                <MDBCol md="6" key={index + "cData"}>
                                  <MDBInput type="text" label={c.label} value={c.updatedValue !== null ? c.updatedValue : ""} disabled></MDBInput>
                                </MDBCol>
                              )
                          )}
                      </MDBRow>
                    </Card.Body>
                  </Card>
                </MDBCol>
              )
          )}
        </MDBRow>
      </MDBContainer>
    )
  );
}

export default DisplayEmployeeInfo;
