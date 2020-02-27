import React, { useState, useEffect } from "react";
import ContentList from "../ContentList";
import Send from "../send";
import { Jumbotron } from "react-bootstrap";
import { MDBCard, MDBCardHeader } from "mdbreact";

function ContractPage(props) {
  const [accessLevel, setAccessLevel] = useState(
    sessionStorage.getItem("Contracts")
  );

  useEffect(() => {
    //onLoad();
  }, []);

  function search(contractSearch) {
    return Send.post("/ViewContracts", contractSearch, props);
  }

  function show_all() {
    return Send.post("/ViewContracts", "", props);
  }

  function contentEditSubmitAction(editContent) {
    return Send.post("/UpdateContract", editContent, props);
  }

  return (
    <Jumbotron>
      <MDBCard className="m-2">
        <MDBCardHeader>
          <h2 className="m-3">Contract Dashboard</h2>
          <h4>{sessionStorage.getItem("Contracts")}</h4>
        </MDBCardHeader>
      </MDBCard>

      <ContentList
        accessLevel={accessLevel}
        contentEditSubmitAction={contentEditSubmitAction}
        SearchFunction={contractSearch => {
          return search(contractSearch);
        }}
        showAll={() => {
          return show_all();
        }}
        appProps={props}
        contentSearch={{
          external_contract_code: ""
        }}
      />
    </Jumbotron>
  );
}

export default ContractPage;
