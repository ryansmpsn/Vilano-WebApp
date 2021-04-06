import React, { useState, useEffect } from "react";
import Send from "../../libs/send";
import { useParams } from "react-router";
import { Spinner } from "react-bootstrap";
import TripData from "../contracts/trips/TripData";
import ContractCards from "../contracts/ContractCards";
import CostSegmentData from "../contracts/costSegments/CostSegmentData";

function BidDetails(props) {
  let { bidId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [bid, setBid] = useState(null);

  useEffect(() => {
    if (bidId) {
      Send.get("/Bid/" + bidId).then((res) => {
        setBid(res.data[0]);
        console.log(res.data[0]);
        setIsLoading(false);
      });
    } else {
      // do something
      console.log("No ID");
    }
  }, [bidId]);

  return isLoading ? (
    <Spinner animation="border" variant="primary" />
  ) : (
    <>
      <h1 className="text-center">{bid[10].value} Details</h1>
      <hr />
      <ContractCards contract={bid} {...props} type="Bid" details />

      <h3>Trips</h3>
      <hr />
      <TripData contractProfile={bid} trips={bid[33].value} setContract={setBid} {...props} bid />
      <h3>Cost Segments</h3>
      <hr />
      <CostSegmentData details type="Bid" bid={bid} {...props} selectedContractId={bidId} rateSheets={bid[34].value} />
      {/* <h3>Routes</h3>
      <hr />
      <ViewRoutes {...props} /> */}
    </>
  );
}

export default BidDetails;
