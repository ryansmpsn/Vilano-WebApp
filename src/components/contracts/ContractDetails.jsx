import React, { useState, useEffect } from "react";
import CostSegmentData from "./costSegments/CostSegmentData";
import TripData from "./trips/TripData";
import { useNavigate, useParams } from "react-router";
import Send from "../../libs/send";
import ViewRoutes from "./routes/ViewRoutes";
import { Spinner } from "react-bootstrap";
import ContractCards from "./ContractCards";
import EmployeeContracts from "../employee/EmployeeContracts";

function ContractDetails(props) {
  let { contractId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [contract, setContract] = useState(null);

  console.log(props);
  useEffect(() => {
    if (contractId) {
      Send.get("/Contract/" + contractId).then((res) => {
        console.log(res.data[0]);
        setContract(res.data[0]);
        setIsLoading(false);
      });
    } else {
      // do something
      console.log("No ID");
    }
  }, [contractId]);

  return isLoading ? (
    <Spinner animation="border" variant="primary" />
  ) : (
    <>
      <h1 className="text-center">{contract[6].value} Details</h1>
      <hr />
      <ContractCards contract={contract} {...props} type="Contract" details />
      <h3>Employees</h3>
      <hr />
      <EmployeeContracts contract={contract} />
      <h3>Trips</h3>
      <hr />
      <TripData contractProfile={contract} {...props} />
      <h3>Rate Sheets</h3>
      <hr />
      {/* <CostSegmentData {...props} /> */}
      <h3>Routes</h3>
      <hr />
      <ViewRoutes {...props} />
    </>
  );
}

export default ContractDetails;
