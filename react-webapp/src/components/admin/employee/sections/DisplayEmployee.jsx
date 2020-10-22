import React from "react";
import { Card, Accordion, Button } from "react-bootstrap";
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBContainer } from "mdbreact";

function DisplayEmployee(props) {
  const employeeData = props.employeeData;

  return (
    employeeData !== null && (
      <MDBContainer fluid>
        <MDBRow center>
          <MDBCol lg="6" className="mb-4 mt-5">
            <MDBCard narrow className="cascading-admin-card">
              <div className="admin-up" style={{ marginRight: "10%" }}>
                <Button className="mdb-color lighten-3 text-center" block>
                  Profile
                </Button>
              </div>
              <MDBCardBody className="text-center">
                <MDBRow>
                  {console.log(employeeData)}
                  {employeeData[0].value.length !== 0 &&
                    employeeData[0].value[0].map(
                      (c, index) =>
                        c.label !== null && (
                          <MDBCol md="4" key={index + "profile"}>
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
          <MDBCol lg="6">
            <Accordion defaultActiveKey={1}>
              {employeeData !== null &&
                employeeData.map(
                  (data, index) =>
                    index !== 0 && (
                      <Card key={index + "employeeData"}>
                        <Card.Header>
                          <Accordion.Toggle as={Button} block className="mdb-color lighten-3 text-center" eventKey={index}>
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

export default DisplayEmployee;
