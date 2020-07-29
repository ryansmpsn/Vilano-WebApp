import React, { useState } from "react";
import { MDBCard, MDBCardBody, MDBRow, MDBCol, MDBIcon, MDBCardText, MDBBadge, MDBCardHeader, MDBBtn } from "mdbreact";
import { useToasts } from "react-toast-notifications";
import Send from "../../libs/send";
import { FormGroup, FormControl, Spinner } from "react-bootstrap";
import { useFormFields } from "../../libs/hookslib";

function AxiosTestPage() {
  const { addToast } = useToasts();
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    endpoint: "",
  });

  function clickMe() {
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

              <MDBRow className="mb-4">
                <MDBCol xl="6" md="6" className="mb-r">
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
                        <small>example: "/Contract/Dropdowns/Contract/All"</small>
                      </p>
                      <MDBBtn outline color="info" onClick={() => clickMe()}>
                        Send
                        <MDBIcon far icon="paper-plane" className="ml-1" />
                      </MDBBtn>
                    </>
                  )}
                </MDBCol>
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </React.Fragment>
  );
}

export default AxiosTestPage;
