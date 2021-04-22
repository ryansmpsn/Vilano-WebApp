import React, { useEffect, useState } from "react";
import Send from "../../libs/send";
import DisplayEmployeeInfo from "../employee/sections/DisplayEmployeeInfo";

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

  return <DisplayEmployeeInfo employeeData={employeeData} profile isLoading={isLoading} />;
}

export default ProfilePage;
