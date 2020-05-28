import React, { useState, useEffect } from "react";
import { Row, FormGroup, Button, Container, Spinner } from "react-bootstrap";
import ContractCards from "./ContractCards";
import Select from "react-select";
import ContractTable from "./ContractTable";

function ContractData(props) {
  const [contractData, setContractData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setSearching] = useState(false);
  const [isGetAll, setGetAll] = useState(false);
  const [tableView, setTableView] = useState(false);
  const [contractSearch, setContractSearch] = useState(props.contractSearch);

  useEffect(() => {
    //Can put stuff that needs to happen on load here.
  }, []);

  function search() {
    setTableView(false);
    props
      .SearchFunction(contractSearch)
      .then((res) => {
        console.log(res);
        setContractData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function show_all() {
    setTableView(true);
    props
      .showAll()
      .then((res) => {
        setContractData(res.data);
        setIsLoading(false);
        setSearching(false);
        setGetAll(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function doSetContractSearch(newContract, keyValue) {
    let getValue = [];
    newContract !== null &&
      newContract.map((item, index) => {
        return getValue.push(item.label);
      });
    let tempCon = contractSearch;
    tempCon[keyValue] = getValue;
    setContractSearch(tempCon);
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

  function json_array(json) {
    var result = [];
    var keys = Object.keys(json);
    keys.forEach(function (key) {
      result.push([key, json[key]]);
    });
    return result;
  }

  return (
    <>
      <Container className="container-sm pl-5 pr-5 pt-2">
        <form onSubmit={handleSearch}>
          <Select
            autoFocus
            options={props.selectOptions}
            isMulti
            placeholder={"Search for Contracts by ID"}
            onChange={(x) => {
              doSetContractSearch(x, "external_contract_code");
            }}
            isLoading={isLoading & isSearching}
            isDisabled={isGetAll | (isSearching & isLoading)}
          />

          {json_array(contractSearch).map((item, index) => (
            /*ControlID must match useFormFields value*/

            <FormGroup key={"ContractSearch" + index} controlId={item[0]}></FormGroup>
          ))}

          {(isLoading & isSearching) | isGetAll ? (
            <Spinner animation="border" variant="primary" />
          ) : (
            <>
              <Button type="submit" disabled={isGetAll}>
                Search
              </Button>
              <Button
                disabled={isGetAll && isSearching}
                onClick={(e) => {
                  handleSearch(e, true);
                }}
              >
                Show All
              </Button>
            </>
          )}
        </form>
      </Container>
      <hr />
      {tableView
        ? !isLoading && <ContractTable url={props.url} setSelectedContract={props.setSelectedContract} contractData={contractData} />
        : !isLoading && (
            <div className="contract">
              <Row key="topRow" className="show-grid">
                {contractData.map((c, index) => (
                  <ContractCards
                    url={props.url}
                    setSelectedContract={props.setSelectedContract}
                    modalName={props.modalName}
                    key={index + "contract"}
                    appProps={props.appProps}
                    Contract={c}
                    eventKeyIndex={index}
                    submitAction={(editContract) => {
                      return props.contractEditSubmitAction(editContract);
                    }}
                    accessLevel={props.accessLevel}
                  />
                ))}
              </Row>
            </div>
          )}
    </>
  );
}

export default ContractData;
