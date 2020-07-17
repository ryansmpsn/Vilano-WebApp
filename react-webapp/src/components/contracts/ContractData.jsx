import React, { useState } from "react";
import { Col, Row, Button, Container, Spinner, Jumbotron } from "react-bootstrap";
import ContractCards from "./ContractCards";
import Select from "react-select";
import ContractTable from "./ContractTable";
import UpsertContractModal from "./UpsertContractModal";

function ContractData(props) {
  const [contractData, setContractData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setSearching] = useState(false);
  const [isGetAll, setGetAll] = useState(false);
  const [tableView, setTableView] = useState(false);
  const [contractSearch] = useState(props.contractSearch);
  const [contentInputRestrictions, setContentInputRestrictions] = useState([]);
  const [showModal, setShowModal] = useState(false);

  function search() {
    setTableView(false);
    props
      .SearchFunction(contractSearch)
      .then((res) => {
        setContractData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    props.getSelectOptions().then((res) => {
      setContentInputRestrictions(res.data);
      setIsLoading(false);
    });
  }

  function show_all() {
    setTableView(true);
    props
      .showAll()
      .then((res) => {
        setContractData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    props.getSelectOptions().then((res) => {
      setContentInputRestrictions(res.data);
      setSearching(false);
      setGetAll(false);
    });
  }
  function addContract() {
    setIsLoading(true);
    setSearching(true);
    props.getSelectOptions().then((res) => {
      setContentInputRestrictions(res.data);
      setIsLoading(false);
      setSearching(false);
      openModal();
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
    props.setContractSearchCode(tempCon);
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

  function openModal() {
    setShowModal(true);
    window.location.hash = "edit";
  }

  function closeModal() {
    window.history.replaceState(null, null, " ");
    setShowModal(false);
  }

  return (
    <Jumbotron>
      <Container className="container-sm pl-5 pr-5 pt-2">
        <Row className="justify-content-md-center">
          <Col lg="6">
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
              {(isLoading & isSearching) | isGetAll ? (
                <Spinner animation="border" variant="primary" />
              ) : (
                <>
                  <Button type="submit" disabled={isGetAll || contractSearch.external_contract_code.length === 0}>
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
                  <Button onClick={addContract} variant="outline-warning">
                    Add Contract
                  </Button>
                </>
              )}
            </form>
          </Col>
        </Row>
      </Container>
      <hr />
      {tableView
        ? !isLoading && (
            <ContractTable
              url={props.url}
              setSelectedContract={props.setSelectedContract}
              contractData={contractData}
              setSelectedContractId={props.setSelectedContractId}
              getTrips={props.getTrips}
            />
          )
        : !isLoading && (
            <div className="contract">
              <Row key="topRow" className="show-grid">
                {contractData !== [] &&
                  contractData.map((c, index) => (
                    <ContractCards
                      url={props.url}
                      getTrips={props.getTrips}
                      setSelectedContract={props.setSelectedContract}
                      setSelectedContractId={props.setSelectedContractId}
                      key={index + "contract"}
                      appProps={props.appProps}
                      inputRestrictions={contentInputRestrictions}
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
      {!isLoading && (
        <UpsertContractModal
          modalName={"New Contract"}
          contract={[
            { columnName: "contract_id", inputType: null, label: null, updatedValue: null, value: null },
            { columnName: "modified_by", inputType: null, label: null, updatedValue: null, value: null },
            { columnName: "employee_name", inputType: null, label: "Last Modified By", updatedValue: null, value: "" },
            { columnName: "is_active", inputType: "select", label: "Active", updatedValue: null, value: 1 },
            { columnName: "company_id", inputType: null, label: null, updatedValue: null, value: 1 },
            {
              columnName: "company_name",
              inputType: "select",
              label: "Company",
              updatedValue: null,
              value: "",
            },
            { columnName: "external_contract_code", inputType: "text", label: "Contract No.", updatedValue: "", value: "" },
            { columnName: "solicitation_number", inputType: "text", label: "Solicitation No.", updatedValue: "", value: "" },
            { columnName: "admin_facility_id", inputType: null, label: null, updatedValue: null, value: null },
            {
              columnName: "admin_facility_name",
              inputType: "select",
              label: "Administration Office",
              updatedValue: null,
              value: "",
            },
            { columnName: "contract_type_id", inputType: null, label: null, updatedValue: null, value: 1 },
            {
              columnName: "contract_type_code",
              inputType: "select",
              label: "Contract Type Code",
              updatedValue: null,
              value: "",
            },
            {
              columnName: "contract_type_name",
              inputType: null,
              label: "Contract Type Name",
              updatedValue: null,
              value: "",
            },
            { columnName: "contract_division_id", inputType: null, label: null, updatedValue: null, value: 1 },
            {
              columnName: "contract_division_code",
              inputType: "select",
              label: "Division Code",
              updatedValue: null,
              value: "",
            },
            {
              columnName: "contract_division_name",
              inputType: null,
              label: "Division Name",
              updatedValue: null,
              value: "",
            },
            { columnName: "status_id", inputType: null, label: null, updatedValue: null, value: 12 },
            {
              columnName: "status_value",
              inputType: "select",
              label: "Contract Status",
              updatedValue: null,
              value: "",
            },
            { columnName: "origin_facility_id", inputType: null, label: null, updatedValue: null, value: null },
            {
              columnName: "origin_facility_name",
              inputType: "select",
              label: "Origination",
              updatedValue: null,
              value: "",
            },
            { columnName: "origin_state_name", inputType: null, label: "Origin State", updatedValue: null, value: "" },
            { columnName: "destination_facility_id", inputType: null, label: null, updatedValue: null, value: null },
            {
              columnName: "destination_facility_name",
              inputType: "select",
              label: "Destination",
              updatedValue: null,
              value: "",
            },
            {
              columnName: "destination_state_name",
              inputType: null,
              label: "Destination State",
              updatedValue: null,
              value: "",
            },
            {
              columnName: "solicitation_date",
              inputType: "date",
              label: "Date of Solicitation",
              updatedValue: null,
              value: "2020-01-29",
            },
            {
              columnName: "begin_contract_date",
              inputType: "date",
              label: "Begin Contract Term",
              updatedValue: null,
              value: "2020-02-27",
            },
            {
              columnName: "end_contract_date",
              inputType: "date",
              label: "End Contract Term",
              updatedValue: null,
              value: "2020-01-03",
            },
            { columnName: "modified_timestamp", inputType: null, label: "Last Modified", updatedValue: null, value: "" },
          ]}
          inputRestrictions={contentInputRestrictions}
          show={showModal}
          closeModal={closeModal}
          accessLevel={props.accessLevel}
          appProps={props.appProps}
          submitAction={(editContract) => {
            return props.contractEditSubmitAction(editContract);
          }}
          addSelectOption={(option) => {
            return props.addSelectOption(option);
          }}
        />
      )}
    </Jumbotron>
  );
}

export default ContractData;
