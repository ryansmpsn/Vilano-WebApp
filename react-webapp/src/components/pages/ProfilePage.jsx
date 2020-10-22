import React, { Component } from "react";
import { Card, Accordion, Button } from "react-bootstrap";
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBContainer } from "mdbreact";
import Send from "../../libs/send";

class ProfilePage extends Component {
  state = { employeeProfile: null, employeeData: null };

  componentDidMount() {
    this._isMounted = true;

    return Send.get("/Employee/Profile/" + sessionStorage.getItem("IDSession"), this.props)
      .then((res) => {
        const data = [res.data[0][1], res.data[0][2], res.data[0][3]];
        // const profile = res.data[0][0].value[0];
        this.setState({ employeeData: data });
        // this.setState({ employeeProfile: profile });
      })
      .catch((err) => {
        console.log("cathing errors from profile page");
        console.log(err);
      });
  }

  render() {
    const { employeeProfile, employeeData } = this.state;
    return (
      <MDBContainer fluid>
        <MDBRow center>
          <MDBCol lg="6" className="mb-4 mt-5">
            <MDBCard narrow className="cascading-admin-card">
              <div className="admin-up" style={{ marginRight: "10%" }}>
                <Button icon="money-bill-alt" className="mdb-color lighten-3 text-center" block>
                  Profile
                </Button>
              </div>
              <MDBCardBody className="text-center">
                <MDBRow>
                  {console.log(employeeData)}
                  {employeeProfile !== null &&
                    employeeProfile.map(
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
            <Accordion defaultActiveKey={0}>
              {employeeData !== null &&
                employeeData.map((data, index) => (
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
                ))}
            </Accordion>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default ProfilePage;
