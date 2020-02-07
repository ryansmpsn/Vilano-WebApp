import React, { useState, useEffect } from "react";
import {
  Tabs,
  Tab,
  ListGroup,
  ListGroupItem,
  PanelGroup,
  Table,
  Grid,
  Row
} from "react-bootstrap";
import Contract from "./../components/Contract";
import Send from "./../components/send";

function ContractList(props) {
  const [contractData, setContractData] = useState([]);
  const [inputRestrictions, setInputRestrictions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onLoad();
  }, []);

  function onLoad() {
    Send.post("/ViewContracts", "", props)
      .then(res => {
        console.log(res);
        setContractData(JSON.parse(res.data.contracts));
        setInputRestrictions(JSON.parse(res.data.restricted_input));
        console.log(inputRestrictions);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    !isLoading && (
      <div className="contract">
        <Grid>
          <Row key="topRow" className="show-grid">
            {contractData.map((c, index) => (
              <Contract
                key={index}
                appProps={props}
                contract={c}
                specialInputs={inputRestrictions}
                eventKeyIndex={index}
              />
            ))}
          </Row>
        </Grid>
      </div>
    )
  );
}

export default ContractList;
