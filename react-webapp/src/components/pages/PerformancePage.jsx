import React from "react";
import { MDBRow, MDBCol, MDBCard, MDBCardHeader, MDBCardBody, MDBIcon } from "mdbreact";
import { Button } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";

function PerformancePage() {
  const { addToast } = useToasts();
  return (
    <MDBRow className="mb-4">
      <MDBCol xl="12" md="12" className="mb-r">
        <MDBCard className="cascading-admin-card">
          <MDBCardHeader>
            <div className="admin-up">
              <MDBIcon icon="chart-line" className="primary-color" />
            </div>
            <h1 className="m-3 text-center">Performance</h1>
          </MDBCardHeader>
          <MDBCardBody>
            <div className="d-flex flex-column">Performance Content</div>
            <Button
              onClick={() =>
                addToast("Message Here", {
                  appearance: "warning",
                  autoDismiss: true,
                })
              }
            >
              Add Toast
            </Button>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
}

export default PerformancePage;
