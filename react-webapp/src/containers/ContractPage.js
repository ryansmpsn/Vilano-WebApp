import React, { useState, useEffect } from "react";
import ContentList from "./ContentList";
import Send from "./../components/send";

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
  );
}

export default ContractPage;
