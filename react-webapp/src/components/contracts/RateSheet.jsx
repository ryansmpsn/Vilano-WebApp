import React, { useState } from "react";
// import { useToasts } from "react-toast-notifications";
import Select from "react-select";
import { useFormFields } from "../../libs/hookslib";
import { MDBCard, MDBCardHeader, MDBCardBody, MDBContainer, MDBRow, MDBCol, MDBInput, MDBIcon, MDBBtn } from "mdbreact";

function RateSheet(props) {
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
    vehicle_cost: "",
    motor_vehicles: "",
    trailers: "",
    operational_cost2: "",
    taxes: "",
    vehicle_registration: "",
    miscellaneous: "",
    general_overhead: "",
    fuel: "",
    oil: "",
    insurance: "",
    road_taxes: "",
    tolls: "",
    total_fixed_and_operational_cost: "",
    straight_time: "",
    overtime: "",
    payroll_taxes: "",
    social_security: "",
    workman_compendation: "",
    federal_unemployment_comp: "",
    state_unemployment_comp: "",
    fringe_benefits: "",
    health_welfare: "",
    vacation: "",
    holiday: "",
    pension: "",
    total_operation_labor_cost: "",
    suppplier_wages_personal_driving_or_supervision: "",
    total_cost: "",
    return_on_investment: "",
    TOTAL_OFFER: "",
    equipment_realaignment_deadhead_portalmiles: "",
    plate_miles1: "",
    total_miles: "",
    DOT: "",
    plate_hours1: "",
    total_hours1: "",
  });
  async function handleSubmit(event) {
    console.log(fields);
    setSearching(true);
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
            </MDBRow>
            <MDBRow>
              <MDBCol md="6">
                <p className="h5 text-center mb-4">Data Column </p>
                <div className="grey-text">
                  <MDBInput label="Vehicle Cost" id="vehicle_cost" icon="envelope" group type="text" validate error="wrong" success="right" onChange={handleFieldChange} />
                  <MDBInput label="Motor Vehicles" id="motor_vehicles" icon="user" group type="text" validate error="wrong" success="right" onChange={handleFieldChange} />
                  <MDBInput label="Trailers" id="trailers" icon="envelope" group type="text" validate error="wrong" success="right" onChange={handleFieldChange} />
                  <MDBInput
                    label="Operational Cost (Repairs, repair labor, tires, etc.)"
                    id="operational_cost2"
                    icon="envelope"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    onChange={handleFieldChange}
                  />
                  <MDBInput label="Taxes" id="taxes" icon="envelope" group type="text" validate error="wrong" success="right" onChange={handleFieldChange} />
                  <MDBInput
                    label="Vehicle Registration"
                    id="vehicle_registration"
                    icon="envelope"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    onChange={handleFieldChange}
                  />
                  <MDBInput label="Miscellaneous" id="miscellaneous" icon="envelope" group type="text" validate error="wrong" success="right" onChange={handleFieldChange} />
                  <MDBInput label="General Overhead" id="general_overhead" icon="envelope" group type="text" validate error="wrong" success="right" onChange={handleFieldChange} />
                  <MDBInput label="Fuel (Miles per gallon)" id="fuel" icon="envelope" group type="text" validate error="wrong" success="right" onChange={handleFieldChange} />
                  <MDBInput label="Oil (Quarts)" id="oil" icon="envelope" group type="text" validate error="wrong" success="right" onChange={handleFieldChange} />
                  <MDBInput label="Insurance" id="insurance" icon="envelope" group type="text" validate error="wrong" success="right" onChange={handleFieldChange} />

                  <MDBInput label="Health & Welfare" id="health_welfare" icon="envelope" group type="text" validate error="wrong" success="right" onChange={handleFieldChange} />
                  <MDBInput label="Vacation" id="vacation" icon="envelope" group type="text" validate error="wrong" success="right" onChange={handleFieldChange} />
                  <MDBInput label="Holiday" id="holiday" icon="envelope" group type="text" validate error="wrong" success="right" onChange={handleFieldChange} />
                  <MDBInput label="Pension" id="pension" icon="envelope" group type="text" validate error="wrong" success="right" onChange={handleFieldChange} />
                  <MDBInput
                    label="Total Operation Labor Cost (Lines 12-15)"
                    id="total_operation_labor_cost"
                    icon="envelope"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    onChange={handleFieldChange}
                  />
                  <MDBInput
                    label="Suppplier's Wages (Personal Driving or Supervision)"
                    id="suppplier_wages_personal_driving_or_supervision"
                    icon="envelope"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    onChange={handleFieldChange}
                  />
                  <MDBInput
                    label="Total Cost (Lines 11, 16, & 17)"
                    id="total_cost"
                    icon="envelope"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    onChange={handleFieldChange}
                  />
                  <MDBInput
                    label="Return on Investment"
                    id="return_on_investment"
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
                  <MDBInput label="Road Taxes" id="road_taxes" icon="envelope" group type="text" validate error="wrong" success="right" onChange={handleFieldChange} />
                  <MDBInput label="Tolls" id="tolls" icon="user" group type="text" validate error="wrong" success="right" onChange={handleFieldChange} />
                  <MDBInput
                    label="Total Fixed and Operational Cost (Lines 1-10)"
                    id="total_fixed_and_operational_cost"
                    icon="envelope"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    onChange={handleFieldChange}
                  />
                  <MDBInput label="Straight Time" id="straight_time" icon="envelope" group type="text" validate error="wrong" success="right" onChange={handleFieldChange} />
                  <MDBInput label="Overtime" id="overtime" icon="envelope" group type="text" validate error="wrong" success="right" onChange={handleFieldChange} />
                  <MDBInput
                    label="Payroll Taxes (Itemized)"
                    id="payroll_taxes"
                    icon="envelope"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    onChange={handleFieldChange}
                  />
                  <MDBInput label="Social Security" id="social_security" icon="envelope" group type="text" validate error="wrong" success="right" onChange={handleFieldChange} />
                  <MDBInput
                    label="Workman's Compendation"
                    id="workman_compendation"
                    icon="envelope"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    onChange={handleFieldChange}
                  />
                  <MDBInput
                    label="Federal Unemployment Comp."
                    id="federal_unemployment_comp"
                    icon="envelope"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    onChange={handleFieldChange}
                  />
                  <MDBInput
                    label="State Unemployment Comp."
                    id="state_unemployment_comp"
                    icon="envelope"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    onChange={handleFieldChange}
                  />
                  <MDBInput label="Fringe Benefits" id="fringe_benefits" icon="envelope" group type="text" validate error="wrong" success="right" onChange={handleFieldChange} />

                  <MDBInput
                    label="TOTAL OFFER (Lines 18 & 19)"
                    id="TOTAL_OFFER"
                    icon="envelope"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    onChange={handleFieldChange}
                  />
                  <MDBInput
                    label="Equipment realaignment, Deadhead & Portal Miles"
                    id="equipment_realaignment_deadhead_portalmiles"
                    icon="envelope"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    onChange={handleFieldChange}
                  />
                  <MDBInput label="Plate Miles" id="plate_miles" icon="envelope" group type="text" validate error="wrong" success="right" onChange={handleFieldChange} />
                  <MDBInput label="Total Miles" id="total_miles" icon="envelope" group type="text" validate error="wrong" success="right" onChange={handleFieldChange} />
                  <MDBInput
                    label="U.S. DOT required vehicle Inspection, Equipment, realaignment, Deadhead  & Portal Hours "
                    id="DOT"
                    icon="envelope"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    onChange={handleFieldChange}
                  />
                  <MDBInput label="Plate Hours" id="plate_hours" icon="envelope" group type="text" validate error="wrong" success="right" onChange={handleFieldChange} />
                  <MDBInput label="Total Hours" id="total_hours" icon="envelope" group type="text" validate error="wrong" success="right" onChange={handleFieldChange} />
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

export default RateSheet;
