import React, { useState, useEffect } from "react";
import CostSegmentData from "./costSegments/CostSegmentData";
import TripData from "./trips/TripData";
import { useParams } from "react-router";
import Send from "../../libs/send";
// import ViewRoutes from "./routes/ViewRoutes";
import { Spinner } from "react-bootstrap";
import ContractCards from "./ContractCards";
import EmployeeContracts from "../employee/EmployeeContracts";

function ContractDetails(props) {
  let { contractId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    if (contractId) {
      Send.get("/Contract/" + contractId).then((res) => {
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
      <EmployeeContracts contract={contract} employeeDropdowns={props.allEmployees} />
      <h3>Trips</h3>
      <hr />
      <TripData contractProfile={contract} trips={contract[28].value} setContract={setContract} selectedContractId={contractId} {...props} />
      <h3>Cost Segments</h3>
      <hr />
      <CostSegmentData details contract={contract} type="Contract" {...props} selectedContractId={contractId} rateSheets={contract[29].value} />
      {/* <h3>Routes</h3>
      <hr />
      <ViewRoutes {...props} /> */}
    </>
  );
}

export default ContractDetails;
