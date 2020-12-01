import React, { useEffect, useState } from "react";
import Send from "../../libs/send";
import DisplayEmployeeInfo from "../admin/employee/sections/DisplayEmployeeInfo";
import { MDBRow, MDBCol, MDBCard, MDBCardHeader, MDBCardBody, MDBIcon } from "mdbreact";

function ProfilePage(props) {
  const [employeeData, setEmployeeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    Send.get("/Employee/Profile/" + sessionStorage.getItem("IDSession"), props).then((res) => {
      setEmployeeData(res.data[0]);
      setIsLoading(false);
    });
  }, [props]);

  return (
    <MDBRow className="mb-4">
      <MDBCol xl="12" md="12" className="mb-r">
        <MDBCard className="cascading-admin-card">
          <MDBCardHeader>
            <div className="admin-up">
              <MDBIcon icon="user-alt" className="primary-color" />
            </div>
            <h1 className="m-3 text-center">Your Profile</h1>
          </MDBCardHeader>
          <MDBCardBody>
            <DisplayEmployeeInfo employeeData={employeeData} profile isLoading={isLoading} />
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
}

export default ProfilePage;
