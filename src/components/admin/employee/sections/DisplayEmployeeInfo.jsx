import React from "react";
import { Row, Card, Accordion, Button, Spinner } from "react-bootstrap";
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBContainer } from "mdbreact";
import DisplayContractEmployee from "./DisplayContractEmployees";
import ContractTable from "./ContractTable";

function DisplayEmployeeInfo(props) {
  let { employeeData, employeeContracts, allModifiedContracts, isLoading, profile } = props;

  if (profile && !isLoading) {
    employeeContracts = employeeData[5].value;
    allModifiedContracts = [];
  }
  return isLoading ? (
    <Spinner animation="border" variant="primary" className="mr-auto" />
  ) : (
    employeeData !== null && (
      <MDBContainer fluid>
        <MDBRow center>
          <MDBCol>
            <hr className="mt-5" />
            <h3 className="m-4 text-center">{employeeData[5].label}</h3>
          </MDBCol>
        </MDBRow>
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
              <DisplayContractEmployee
                contracts
                profile={profile}
                modified={false}
                contractEmployees={employeeContracts}
                employeeDropdowns={props.employeeDropdowns}
                editContract={props.editContract}
              />
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
        <hr className="mt-5" />
        <MDBRow center>
          <MDBCol lg="10" className="mb-4 mt-5">
            <MDBCard narrow className="cascading-admin-card">
              <div className="admin-up" style={{ marginRight: "10%" }}>
                <Button className="text-center blue-gradient" block>
                  Profile
                </Button>
              </div>
              <MDBCardBody className="text-center">
                <MDBRow>
                  {employeeData[0].value[0].map(
                    (c, index) =>
                      c.label !== null && (
                        <MDBCol size="3" key={index + "profile"}>
                          <MDBInput
                            type="text"
                            label={c.label}
                            value={c.updatedValue !== null ? c.updatedValue : ""}
                            disabled
                          ></MDBInput>
                        </MDBCol>
                      )
                  )}
                </MDBRow>
                {/* <MDBRow center>
                  <MDBBtn color="info" rounded size="sm">
                    Update Account
                  </MDBBtn>
                </MDBRow> */}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
        <MDBRow center>
          <MDBCol>
            <hr className="mt-5" />
            <h3 className="m-4 text-center">Additional Employee Information</h3>
          </MDBCol>
        </MDBRow>
        <MDBRow center>
          <MDBCol lg="6">
            <Accordion defaultActiveKey={1}>
              {employeeData.map(
                (data, index) =>
                  index > 0 &&
                  index < 3 && (
                    <Card key={index + "employeeData"}>
                      <Card.Header>
                        <Accordion.Toggle as={Button} block className="winter-neva-gradient text-center" eventKey={index}>
                          {data.label}
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey={index}>
                        <Card.Body>
                          <MDBRow>
                            {data.value.length !== 0 &&
                              data.value[0].map(
                                (c, index) =>
                                  c.label !== null && (
                                    <MDBCol md="4" key={index + "cData"}>
                                      <MDBInput
                                        type="text"
                                        label={c.label}
                                        value={c.updatedValue !== null ? c.updatedValue : ""}
                                        disabled
                                      ></MDBInput>
                                    </MDBCol>
                                  )
                              )}
                          </MDBRow>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  )
              )}
            </Accordion>
          </MDBCol>
          <MDBCol lg="6">
            <Accordion defaultActiveKey={1}>
              {employeeData.map(
                (data, index) =>
                  index > 2 &&
                  index < 5 && (
                    <Card key={index + "employeeData"}>
                      <Card.Header>
                        <Accordion.Toggle as={Button} block className="winter-neva-gradient  text-center" eventKey={index}>
                          {data.label}
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey={index}>
                        <Card.Body>
                          <MDBRow>
                            {data.value.length !== 0 &&
                              data.value[0].map(
                                (c, index) =>
                                  c.label !== null && (
                                    <MDBCol md="6" key={index + "cData"}>
                                      <MDBInput
                                        type="text"
                                        label={c.label}
                                        value={c.updatedValue !== null ? c.updatedValue : ""}
                                        disabled
                                      ></MDBInput>
                                    </MDBCol>
                                  )
                              )}
                          </MDBRow>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  )
              )}
            </Accordion>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    )
  );
}

export default DisplayEmployeeInfo;
