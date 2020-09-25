import React, { useState } from "react";
import { Col, Row, Button, Container, Spinner, Jumbotron } from "react-bootstrap";
import Select from "react-select";
import ContractCards from "../contracts/ContractCards";
import ContractTable from "../contracts/ContractTable";
import UpsertContractModal from "../contracts/UpsertContractModal";

function BidData(props) {
  const [bidData, setBidData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setSearching] = useState(false);
  const [isGetAll, setGetAll] = useState(false);
  const [tableView, setTableView] = useState(false);
  const [bidSearch] = useState(props.bidSearch);
  const [contentInputRestrictions, setContentInputRestrictions] = useState([]);
  const [showModal, setShowModal] = useState(false);

  function search() {
    setTableView(false);
    props
      .SearchFunction(bidSearch)
      .then((res) => {
        console.log(res.data);
        setBidData(res.data);
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
        setBidData(res.data);
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
  function addBid() {
    setIsLoading(true);
    setSearching(true);
    props.getSelectOptions().then((res) => {
      setContentInputRestrictions(res.data);
      setIsLoading(false);
      setSearching(false);
      openModal();
    });
  }

  function doSetBidSearch(newBid, keyValue) {
    let getValue = [];
    newBid !== null &&
      newBid.map((item, index) => {
        return getValue.push(item.label);
      });
    let tempCon = bidSearch;
    tempCon[keyValue] = getValue;
    props.setBidSearchCode(tempCon);
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
                placeholder={"Search for Bids by ID"}
                onChange={(x) => {
                  doSetBidSearch(x, "bid_name");
                }}
                isLoading={isLoading & isSearching}
                isDisabled={isGetAll | (isSearching & isLoading)}
              />
              {(isLoading & isSearching) | isGetAll ? (
                <Spinner animation="border" variant="primary" />
              ) : (
                <>
                  <Button type="submit" disabled={isGetAll || bidSearch.bid_name === 0}>
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
                  {sessionStorage.getItem("/bid") >= 3 && (
                    <Button onClick={addBid} variant="outline-warning">
                      Add Bid
                    </Button>
                  )}
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
              type={"Bid"}
              getTrips={props.getTrips}
              setSelectedContract={props.setSelectedBid}
              setSelectedContractId={props.setSelectedBidId}
              contractData={bidData}
              inputRestrictions={contentInputRestrictions}
              submitAction={(editBid) => {
                return props.bidEditSubmitAction(editBid);
              }}
            />
          )
        : !isLoading && (
            <div className="bid">
              <Row key="topRow" className="show-grid">
                {bidData !== [] &&
                  bidData.map((c, index) => (
                    <ContractCards
                      key={index + "bid"}
                      type={"Bid"}
                      getTrips={props.getTrips}
                      setSelectedContract={props.setSelectedBid}
                      setSelectedContractId={props.setSelectedBidId}
                      Contract={c}
                      inputRestrictions={contentInputRestrictions}
                      submitAction={(editBid) => {
                        return props.bidEditSubmitAction(editBid);
                      }}
                      accessLevel={props.accessLevel}
                    />
                  ))}
              </Row>
            </div>
          )}
      {!isLoading && (
        <UpsertContractModal
          modalName={"New Bid"}
          contract={[
            { columnName: "contract_bid_id", inputType: null, label: null, updatedValue: null, value: null },
            { columnName: "is_active", inputType: null, label: null, updatedValue: 1, value: 1 },
            { columnName: "company_id", inputType: null, label: null, updatedValue: null, value: 1 },
            {
              columnName: "company_name",
              inputType: "select",
              label: "Company",
              updatedValue: null,
              value: "",
            },
            { columnName: "contract_id", inputType: null, label: null, updatedValue: null, value: null },
            { columnName: "usps_contract_id", inputType: null, label: null, updatedValue: null, value: null },
            { columnName: "bid_type_id", inputType: null, label: null, updatedValue: null, value: null },
            { columnName: "bid_type_value", inputType: "select", label: "Bid Type", updatedValue: null, value: "" },
            { columnName: "external_contract_code", inputType: "text", label: "Contract Number", updatedValue: "", value: "" },
            { columnName: "solicitation_number", inputType: "text", label: "Solicitation No.", updatedValue: "", value: "" },
            {
              columnName: "bid_name",
              inputType: "text",
              label: "Bid Name",
              updatedValue: null,
              value: "",
            },
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
              label: "Bid Type Code",
              updatedValue: null,
              value: "",
            },
            {
              columnName: "contract_type_name",
              inputType: null,
              label: "Bid Type Name",
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
              label: "Bid Status",
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
              label: "Begin Bid Term",
              updatedValue: null,
              value: "2020-02-27",
            },
            {
              columnName: "end_contract_date",
              inputType: "date",
              label: "End Bid Term",
              updatedValue: null,
              value: "2020-01-03",
            },
            { columnName: "modified_timestamp", inputType: null, label: "Last Modified", updatedValue: null, value: "" },
            { columnName: "modified_by", inputType: null, label: null, updatedValue: null, value: null },
            { columnName: "employee_name", inputType: null, label: "Last Modified By", updatedValue: null, value: "" },
          ]}
          inputRestrictions={contentInputRestrictions}
          show={showModal}
          closeModal={closeModal}
          accessLevel={props.accessLevel}
          submitAction={(editBid) => {
            return props.bidEditSubmitAction(editBid);
          }}
          addSelectOption={(option) => {
            return props.addSelectOption(option);
          }}
        />
      )}
    </Jumbotron>
  );
}

export default BidData;
