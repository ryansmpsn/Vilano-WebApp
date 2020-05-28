import React, { useState } from "react";
// import { useToasts } from "react-toast-notifications";
import Select from "react-select";
import { useFormFields } from "../../libs/hookslib";
import { MDBCard, MDBCardHeader, MDBCardBody, MDBContainer, MDBRow, MDBCol, MDBInput, MDBIcon, MDBBtn } from "mdbreact";

function AddContractData(props) {
  // const { addToast } = useToasts();
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setSearching] = useState(false);
  const [contractSearch, setContractSearch] = useState(props.contractSearch);
  const [fields, handleFieldChange] = useFormFields({
    solicitation_number: "",
    date_of_solicitation: "",
    contract_number: "",
    begin_contract_term: "",
    end_contract_term: "",
    city_state_1: "",
    city_state_2: "",
    offerors_name: "",
    portal_miles: "",
    plate_miles: "",
    total_annual_miles: "",
    portal_hours: "",
    plate_hours: "",
    total_hours: "",
    cost_segment: "",
    gallons: "",
    gallons_price: "",
    trips: "",
    trip_price: "",
    operation_cost: "",
    labor_cost: "",
    total_offer: "",
  });
  async function handleSubmit(event) {
    console.log(fields);
    event.preventDefault();
    setIsLoading(true);
    console.log(isLoading);
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
  return (
    <MDBCard className="m-2">
      <MDBCardHeader>
        <h4>Add New Contract</h4>
        <h5>
          <Select
            autoFocus
            options={props.selectOptions}
            isMulti
            placeholder={"Search for Contracts by ID"}
            onChange={(x) => {
              doSetContractSearch(x, "external_contract_code");
            }}
            isLoading={isLoading & isSearching}
            isDisabled={isSearching & isLoading}
          />
        </h5>
      </MDBCardHeader>
      <MDBCardBody>
        <MDBContainer>
          <form onSubmit={handleSubmit}>
            <MDBRow>
              <MDBCol md="6">
                <p className="h5 text-center mb-4">Data Column</p>
                <div className="grey-text">
                  <MDBInput label="Solicitaion Number" id="solicitation_number" icon="user" group type="text" validate error="wrong" success="right" onChange={handleFieldChange} />
                  <MDBInput
                    label="Date of Solicitation"
                    id="date_of_solicitation"
                    icon="calendar"
                    group
                    type="datepicker"
                    validate
                    error="wrong"
                    success="right"
                    onChange={handleFieldChange}
                  />
                  <MDBInput label="Contract Number" id="contract_number" icon="envelope" group type="text" validate error="wrong" success="right" onChange={handleFieldChange} />
                  <MDBInput
                    label="Begin Contract Term"
                    id=" begin_contract_term"
                    icon="envelope"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    onChange={handleFieldChange}
                  />
                  <MDBInput
                    label="End Contract Term"
                    id="end_contract_term"
                    icon="envelope"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    onChange={handleFieldChange}
                  />
                  <MDBInput label="City & State" id="city_state_1" icon="envelope" group type="text" validate error="wrong" success="right" onChange={handleFieldChange} />
                  <MDBInput label="City & State" id=" city_state_2" icon="envelope" group type="text" validate error="wrong" success="right" onChange={handleFieldChange} />
                  <MDBInput label="Offeror's Name" id="offerors_name" icon="envelope" group type="text" validate error="wrong" success="right" onChange={handleFieldChange} />
                  <MDBInput
                    label="Dead Head & Portal Miles"
                    id="portal_miles"
                    icon="envelope"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    onChange={handleFieldChange}
                  />
                  <MDBInput label="Plate Miles" id="plate_miles" icon="envelope" group type="text" validate error="wrong" success="right" onChange={handleFieldChange} />
                  <MDBInput
                    label="Annual Total Miles"
                    id="total_annual_miles"
                    icon="envelope"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    onChange={handleFieldChange}
                  />
                </div>
              </MDBCol>
              <MDBCol md="6">
                <p className="h5 text-center mb-4">Data Column </p>
                <div className="grey-text">
                  <MDBInput
                    label="Inspection, Equipment, Deadhead, Portal Hours"
                    id="portal_hours"
                    icon="envelope"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    onChange={handleFieldChange}
                  />
                  <MDBInput label="Total Offer" id="total_offer" icon="user" group type="text" validate error="wrong" success="right" onChange={handleFieldChange} />
                  <MDBInput label="Plate Hours" id="plate_hours" icon="envelope" group type="text" validate error="wrong" success="right" onChange={handleFieldChange} />
                  <MDBInput label="Total Hours" id="total_hours" icon="envelope" group type="text" validate error="wrong" success="right" onChange={handleFieldChange} />
                  <MDBInput label="Cost Segment" id="cost_segment" icon="envelope" group type="text" validate error="wrong" success="right" onChange={handleFieldChange} />
                  <MDBInput label="Gallons" id="gallons" icon="envelope" group type="text" validate error="wrong" success="right" onChange={handleFieldChange} />
                  <MDBInput label="Price Per" id="gallons_price" icon="envelope" group type="text" validate error="wrong" success="right" onChange={handleFieldChange} />
                  <MDBInput label="Trips" id="trips" icon="envelope" group type="text" validate error="wrong" success="right" onChange={handleFieldChange} />
                  <MDBInput label="Per Trip" id="trip_price" icon="envelope" group type="text" validate error="wrong" success="right" onChange={handleFieldChange} />
                  <MDBInput
                    label="Total Fixed and Operational Cost"
                    id="operation_cost"
                    icon="envelope"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    onChange={handleFieldChange}
                  />
                  <MDBInput
                    label="Total Operation Labor Cost"
                    id="labor_cost"
                    icon="envelope"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    onChange={handleFieldChange}
                  />
                </div>
              </MDBCol>
              <MDBCol md="12">
                <div className="text-center">
                  <MDBBtn outline color="info" type="submit">
                    Send
                    <MDBIcon far icon="paper-plane" className="ml-1" />
                  </MDBBtn>
                </div>
              </MDBCol>
            </MDBRow>
          </form>
        </MDBContainer>
      </MDBCardBody>
    </MDBCard>
  );
}

export default AddContractData;
