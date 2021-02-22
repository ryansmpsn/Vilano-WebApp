import React, { useState } from "react";
import { Col, Row, Button, Container, Spinner, Jumbotron } from "react-bootstrap";
import ContractCards from "./ContractCards";
import Select from "react-select";
import ContractTable from "./ContractTable";
import UpsertContractModal from "./UpsertContractModal";
import Send from "../../libs/send";

function ContractData(props) {
  const [contractData, setContractData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setSearching] = useState(false);
  const [tableView, setTableView] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [bidOptions, setBidOptions] = useState(null);

  function search() {
    setTableView(false);
    props
      .SearchFunction(props.contractSearch)
      .then((res) => {
        setIsLoading(false);
        setSearching(false);
        setContractData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    if (sessionStorage.getItem("/bid") >= 3) {
      Send.get("/Bid/Dropdowns/BidNames/All").then((response) => {
        setBidOptions(response.data);
      });
    }
  }

  function doSetContractSearch(newContract, keyValue) {
    let getValue = [];
    newContract !== null &&
      newContract.map((item, index) => {
        return getValue.push(item.label);
      });
    let tempCon = props.contractSearch;
    tempCon[keyValue] = getValue;
    props.setContractSearchCode(tempCon);
  }

  function handleSearch(event) {
    event.preventDefault();
    setIsLoading(true);
    setSearching(true);
    search();
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
      <Container className="container-sm pl-5 pr-5">
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
                isLoading={(isLoading & isSearching) | (props.selectOptions === null)}
                isDisabled={(isSearching & isLoading) | (props.selectOptions === null)}
              />
              {isLoading & isSearching ? (
                <Spinner animation="border" variant="primary" />
              ) : (
                <Button type="submit" variant="outline-primary" disabled={props.contractSearch.external_contract_code.length === 0}>
                  Search
                </Button>
              )}
              <Button disabled={tableView} onClick={() => setTableView(true)} variant="outline-primary">
                Show All
              </Button>
              {sessionStorage.getItem("/contract") >= 3 && (
                <Button onClick={openModal} variant="outline-warning" className="float-right" disabled={props.contentInputRestrictions === null}>
                  Add Contract
                </Button>
              )}
            </form>
          </Col>
        </Row>
      </Container>
      <hr />
      {tableView ? (
        props.allContracts === null ? (
          <Spinner animation="border" variant="primary" />
        ) : (
          <ContractTable
            type={"Contract"}
            getTrips={props.getTrips}
            setSelectedContract={props.setSelectedContract}
            setSelectedContractId={props.setSelectedContractId}
            contractData={props.allContracts}
            inputRestrictions={props.contentInputRestrictions}
            submitAction={(editContract) => {
              return props.contractEditSubmitAction(editContract);
            }}
          />
        )
      ) : (
        !isLoading && (
          <div className="contract">
            <Row key="topRow" className="show-grid">
              {contractData !== [] &&
                contractData.map((c, index) => (
                  <ContractCards
                    key={index + "contract"}
                    type={"Contract"}
                    getTrips={props.getTrips}
                    setSelectedContract={props.setSelectedContract}
                    setSelectedContractId={props.setSelectedContractId}
                    Contract={c}
                    inputRestrictions={props.contentInputRestrictions}
                    submitAction={(editContract) => {
                      return props.contractEditSubmitAction(editContract);
                    }}
                    accessLevel={props.accessLevel}
                    bidOptions={bidOptions}
                  />
                ))}
            </Row>
          </div>
        )
      )}
      {props.contentInputRestrictions !== null && (
        <UpsertContractModal
          modalName={"New Contract"}
          contract={[
            { columnName: "contract_id", inputType: null, label: null, updatedValue: null, value: null },
            { columnName: "modified_by", inputType: null, label: null, updatedValue: null, value: null },
            { columnName: "employee_name", inputType: null, label: null, updatedValue: null, value: "" },
            { columnName: "is_active", inputType: "checkbox", label: null, updatedValue: null, value: 1 },
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
              label: null,
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
              label: null,
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
          inputRestrictions={props.contentInputRestrictions}
          show={showModal}
          closeModal={closeModal}
          accessLevel={props.accessLevel}
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
