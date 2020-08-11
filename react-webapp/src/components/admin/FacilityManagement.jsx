import React from "react";
import { MDBRow, MDBCol, MDBCard, MDBCardHeader, MDBCardBody, MDBIcon } from "mdbreact";
import { Row, Col, Button } from "react-bootstrap";
import Select from "react-select";

function FacilityManagement() {
  return (
    <MDBRow className="mb-4">
      <MDBCol xl="12" md="12" className="mb-r">
        <MDBCard className="cascading-admin-card">
          <MDBCardHeader>
            <div className="admin-up">
              <MDBIcon icon="building" className="primary-color" />
            </div>
            <h1 className="m-3 text-center">Facility Management</h1>
          </MDBCardHeader>
          <MDBCardBody>
            <Row className="justify-content-md-center">
              <Col lg="4">
                <Select
                  autoFocus
                  options={[]}
                  isMulti
                  placeholder={"Select First Parameter to Seach Facilities"}
                  onChange={(x) => {
                    console.log(x);
                  }}
                />
                <Button type="submit" disabled>
                  Search
                </Button>
              </Col>
              <Col lg="4">
                {/* Sort by Type, State, Region, */}
                <Select
                  autoFocus
                  options={[]}
                  isMulti
                  placeholder={"Select Second Parameter to Seach Facilities"}
                  onChange={(x) => {
                    console.log(x);
                  }}
                />
              </Col>
            </Row>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
}

export default FacilityManagement;
