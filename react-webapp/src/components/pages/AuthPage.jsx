import React from "react";
import { MDBRow, MDBCol, MDBCard, MDBCardHeader, MDBCardBody, MDBIcon } from "mdbreact";
import { useAuth } from "../../auth";
import { Button } from "react-bootstrap";

function AuthPage() {
  const { setSession } = useAuth();
  function logOut() {
    setSession();
  }

  return (
    <MDBRow className="mb-4">
      <MDBCol xl="12" md="12" className="mb-r">
        <MDBCard className="cascading-admin-card">
          <MDBCardHeader>
            <div className="admin-up">
              <MDBIcon icon="exclamation-triangle" className="primary-color" />
            </div>
            <h1 className="m-3 text-center">Authorized Page</h1>
          </MDBCardHeader>
          <MDBCardBody>
            <div className="d-flex flex-column">Authorized Content</div>
            <Button onClick={logOut}> LogOut </Button>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
}

export default AuthPage;
