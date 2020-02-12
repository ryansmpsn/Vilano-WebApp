import React, { useState, useEffect } from "react";
import { useFormFields } from "./../libs/hookslib";
import {
  Tabs,
  Tab,
  ListGroup,
  ListGroupItem,
  PanelGroup,
  Table,
  Grid,
  Row,
  FormGroup,
  ControlLabel,
  FormControl,
  Button
} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import Contract from "./../components/Contract";
import Send from "./../components/send";

function ContractList(props) {
  const [contractData, setContractData] = useState([]);
  const [inputRestrictions, setInputRestrictions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setSearching] = useState(false);
  const [isGetAll, setGetAll] = useState(false);
  const [contractSearch, setContractSearch] = useFormFields({
    external_contract_code: ""
  });
  //const [showContracts, setShowContracts] = useState(false);

  useEffect(() => {
    //onLoad();
  }, []);
  function validateSearch() {
    return contractSearch.external_contract_code.length > 0;
  }

  function search() {
    Send.post("/ViewContracts", contractSearch, props)
      .then(res => {
        setContractData(JSON.parse(res.data.contracts));
        setInputRestrictions(res.data.restricted_input);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function show_all() {
    Send.post("/ViewContracts", "", props)
      .then(res => {
        setContractData(JSON.parse(res.data.contracts));
        setInputRestrictions(res.data.restricted_input);
        setIsLoading(false);
        setSearching(false);
        setGetAll(false);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleSearch(event, all = false) {
    event.preventDefault();
    setIsLoading(true);
    if (!all) {
      setSearching(true);
      search();
    } else {
      show_all();
      setGetAll(true);
    }
  }

  return (
    <>
      <form onSubmit={handleSearch}>
        {/*ControlID must match useFormFields value!!!*/}
        <FormGroup controlId="external_contract_code">
          <FormControl
            autoFocus
            type="text"
            placeholder="Search for contract by ID"
            value={contractSearch.external_contract_code.replace(
              /[*|\":<>[\]{}`\\()';@&$]/,
              ""
            )}
            onChange={setContractSearch}
          />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          isLoading={isLoading && isSearching}
          disabled={!validateSearch() || isGetAll}
        >
          Search
        </LoaderButton>
        <LoaderButton
          block
          bsSize="large"
          isLoading={isLoading && isGetAll}
          disabled={isGetAll || isSearching}
          onClick={e => {
            console.log(e);
            handleSearch(e, true);
          }}
        >
          Show All
        </LoaderButton>
      </form>
      <br />
      {!isLoading && (
        <div className="contract">
          <Grid>
            <Row key="topRow" className="show-grid">
              {contractData.map((c, index) => (
                <Contract
                  key={index}
                  appProps={props}
                  contract={c}
                  inputRestrictions={inputRestrictions}
                  eventKeyIndex={index}
                />
              ))}
            </Row>
          </Grid>
        </div>
      )}
    </>
  );
}

export default ContractList;
