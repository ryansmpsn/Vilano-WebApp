import React, { useState, useEffect } from "react";
import CostSegmentData from "./costSegments/CostSegmentData";
import TripData from "./trips/TripData";
import { useParams } from "react-router";
import Send from "../../libs/send";
// import ViewRoutes from "./routes/ViewRoutes";
import { Spinner, Tooltip, OverlayTrigger } from "react-bootstrap";
import ContractCards from "./ContractCards";
import EmployeeContracts from "../employee/EmployeeContracts";
import { Link } from "react-router-dom";

function ContractDetails(props) {
  let { contractId } = useParams();
  let { type } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    if (contractId) {
      Send.get(`/${type}/` + contractId).then((res) => {
        setContract(res.data[0]);
        setIsLoading(false);
      });
    } else {
      // do something
      console.log("No ID");
    }
  }, [contractId, type]);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Back to All {type}s
    </Tooltip>
  );

  return isLoading ? (
    <Spinner animation="border" variant="primary" />
  ) : (
    <>
      <Link to={`/${type}s`}>
        <OverlayTrigger placement="right" delay={{ show: 250, hide: 400 }} overlay={renderTooltip}>
          <h4 style={{ width: "30px" }}>
            <div className="fa">
              <div className="fas fa-arrow-circle-left" />
            </div>
          </h4>
        </OverlayTrigger>
      </Link>
      <h1 className="text-center">{type === "Contract" ? contract[6].value : contract[10].value} Details</h1>
      <hr />
      <ContractCards contract={contract} {...props} details />
      {type === "Contract" && (
        <>
          <h3>Employees</h3>
          <hr />
          <EmployeeContracts contract={contract} employeeDropdowns={props.allEmployees} />
        </>
      )}
      <h3>Trips</h3>
      <hr />
      <TripData contractProfile={contract} trips={type === "Contract" ? contract[28].value : contract[33].value} setContract={setContract} selectedContractId={contractId} {...props} />
      <h3>Cost Segments</h3>
      <hr />
      <CostSegmentData details contract={contract} {...props} selectedContractId={contractId} rateSheets={type === "Contract" ? contract[29].value : contract[34].value} />
      {/* <h3>Routes</h3>
      <hr />
      <ViewRoutes {...props} /> */}
    </>
  );
}

export default ContractDetails;
