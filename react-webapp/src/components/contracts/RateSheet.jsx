import React, { useState } from "react";
// import { useToasts } from "react-toast-notifications";
import Select from "react-select";
import {
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBIcon,
  MDBBtn,
} from "mdbreact";

function RateSheet(props) {
  // const { addToast } = useToasts();
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setSearching] = useState(false);
  const [contractSearch, setContractSearch] = useState(props.contractSearch);
  const [units, setUnits] = useState([
    {
      columnName: "Vehicle Cost",
      inputType: "num",
      label: "Annual Miles",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "Vehicle Cost2",
      inputType: "num",
      label: "Annual Miles",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "Opertational Cost",
      inputType: "num",
      label: "Annual Miles",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "Taxes",
      inputType: null,
      label: null,
      updatedValue: null,
      value: undefined,
      icon: null,
    },
    {
      columnName: "Vehicle Registration",
      inputType: null,
      label: null,
      updatedValue: null,
      value: undefined,
      icon: null,
    },
    {
      columnName: "Miscellaneous",
      inputType: null,
      label: null,
      updatedValue: null,
      value: undefined,
      icon: null,
    },
    {
      columnName: "General Overhead",
      inputType: null,
      label: null,
      updatedValue: null,
      value: undefined,
      icon: null,
    },
    {
      columnName: "Fuel",
      inputType: "num",
      label: "Gallons",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "Oil",
      inputType: "num",
      label: "Quarts",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "Insurance",
      inputType: null,
      label: null,
      updatedValue: null,
      value: undefined,
      icon: null,
    },
    {
      columnName: "Road Taxes",
      inputType: null,
      label: null,
      updatedValue: null,
      value: undefined,
      icon: null,
    },
    {
      columnName: "Tolls",
      inputType: "num",
      label: "Trips",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "Total Fixed and Operational Cost",
      inputType: null,
      label: null,
      updatedValue: null,
      value: undefined,
      icon: null,
    },
    {
      columnName: "Straight Time",
      inputType: "num",
      label: "Hours",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "Overtime",
      inputType: "num",
      label: "Hours",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "Payroll Taxes (Itemized) ",
      inputType: null,
      label: null,
      updatedValue: null,
      value: undefined,
      icon: null,
    },
    {
      columnName: "Social Security",
      inputType: "num",
      label: "Taxable Wages",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "Workman's Compensation",
      inputType: "num",
      label: "Taxable Wages",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "Federal Unemployment Comp.",
      inputType: "num",
      label: "Taxable Wages",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "State Unemployment Comp.",
      inputType: "num",
      label: "Taxable Wages",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "Fringe Benefits (Itemized)",
      inputType: null,
      label: null,
      updatedValue: null,
      value: undefined,
      icon: null,
    },
    {
      columnName: "Health & Welfare",
      inputType: "num",
      label: "No. of Employees or Hours",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "Vacation",
      inputType: "num",
      label: "No. of Employees or Hours",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "Holiday",
      inputType: "num",
      label: "No. of Employees or Hours",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "Pension",
      inputType: "num",
      label: "No. of Employees or Hours",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "Total Operation Labor Cost",
      inputType: null,
      label: null,
      updatedValue: null,
      value: undefined,
      icon: null,
    },
    {
      columnName: "Supplier's Wages",
      inputType: "num",
      label: "Hours",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "Total Cost",
      inputType: null,
      label: null,
      updatedValue: null,
      value: undefined,
      icon: null,
    },
    {
      columnName: "Return on Investment",
      inputType: null,
      label: null,
      updatedValue: null,
      value: undefined,
      icon: null,
    },
    {
      columnName: "Total Offer",
      inputType: null,
      label: null,
      updatedValue: null,
      value: undefined,
      icon: null,
    },
  ]);
  const [unitCost, setUnitCost] = useState([
    {
      columnName: "Vehicle Cost1",
      inputType: "num",
      label: "Annual Miles",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "Vehicle Cost21",
      inputType: "num",
      label: "Annual Miles",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "Opertational Cost1",
      inputType: "num",
      label: "Annual Miles",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "Taxes1",
      inputType: null,
      label: null,
      updatedValue: null,
      value: undefined,
      icon: null,
    },
    {
      columnName: "Vehicle Registration1",
      inputType: null,
      label: null,
      updatedValue: null,
      value: undefined,
      icon: null,
    },
    {
      columnName: "Miscellaneous1",
      inputType: null,
      label: null,
      updatedValue: null,
      value: undefined,
      icon: null,
    },
    {
      columnName: "General Overhead1",
      inputType: null,
      label: null,
      updatedValue: null,
      value: undefined,
      icon: null,
    },
    {
      columnName: "Fuel1",
      inputType: "num",
      label: "Per Gallon",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "Oil1",
      inputType: "num",
      label: "Per Quart",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "Insurance1",
      inputType: null,
      label: null,
      updatedValue: null,
      value: undefined,
      icon: null,
    },
    {
      columnName: "Road Taxes1",
      inputType: null,
      label: null,
      updatedValue: null,
      value: undefined,
      icon: null,
    },
    {
      columnName: "Tolls1",
      inputType: "num",
      label: "Per Trip",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "Total Fixed and Operational Cost1",
      inputType: null,
      label: null,
      updatedValue: null,
      value: undefined,
      icon: null,
    },
    {
      columnName: "Straight Time1",
      inputType: "num",
      label: "Per Hour",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "Overtime1",
      inputType: "num",
      label: "Per Hour",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "Payroll Taxes (Itemized) 1",
      inputType: null,
      label: null,
      updatedValue: null,
      value: undefined,
      icon: null,
    },
    {
      columnName: "Social Security1",
      inputType: "num",
      label: "Unit Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "Workman's Compensation1",
      inputType: "num",
      label: "Unit Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "Federal Unemployment Comp.1",
      inputType: "num",
      label: "Unit Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "State Unemployment Comp.1",
      inputType: "num",
      label: "Unit Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "Fringe Benefits (Itemized)1",
      inputType: null,
      label: null,
      updatedValue: null,
      value: undefined,
      icon: null,
    },
    {
      columnName: "Health & Welfare1",
      inputType: "num",
      label: "Rate",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "Vacation1",
      inputType: "num",
      label: "Rate",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "Holiday1",
      inputType: "num",
      label: "Rate",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "Pension1",
      inputType: "num",
      label: "Rate",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "Total Operation Labor Cost1",
      inputType: null,
      label: null,
      updatedValue: null,
      value: undefined,
      icon: null,
    },
    {
      columnName: "Supplier's Wages1",
      inputType: "num",
      label: "Per Hour",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "Total Cost1",
      inputType: null,
      label: null,
      updatedValue: null,
      value: undefined,
      icon: null,
    },
    {
      columnName: "Return on Investment1",
      inputType: null,
      label: null,
      updatedValue: null,
      value: undefined,
      icon: null,
    },
    {
      columnName: "Total Offer1",
      inputType: null,
      label: null,
      updatedValue: null,
      value: undefined,
      icon: null,
    },
  ]);
  const [annualCost, setAnnualCost] = useState([
    {
      columnName: "Vehicle Cost23",
      inputType: "num",
      label: "Annual Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "Vehicle Cost22",
      inputType: "num",
      label: "Annual Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "Opertational Cost2",
      inputType: "num",
      label: "Annual Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "Taxes2",
      inputType: null,
      label: "Annual Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "Vehicle Registration2",
      inputType: null,
      label: "Annual Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "Miscellaneous2",
      inputType: null,
      label: "Annual Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "General Overhead2",
      inputType: null,
      label: "Annual Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "Fuel2",
      inputType: "num",
      label: "Annual Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "Oil2",
      inputType: "num",
      label: "Annual Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "Insurance2",
      inputType: null,
      label: "Annual Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "Road Taxes2",
      inputType: null,
      label: "Annual Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "Tolls2",
      inputType: "num",
      label: "Annual Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "Total Fixed and Operational Cost2",
      inputType: null,
      label: "Annual Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "Straight Time2",
      inputType: "num",
      label: "Annual Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "Overtime2",
      inputType: "num",
      label: "Annual Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "Payroll Taxes (Itemized) 2",
      inputType: null,
      label: null,
      updatedValue: null,
      value: undefined,
      icon: null,
    },
    {
      columnName: "Social Security2",
      inputType: "num",
      label: "Annual Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "Workman's Compensation2",
      inputType: "num",
      label: "Annual Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "Federal Unemployment Comp.2",
      inputType: "num",
      label: "Annual Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "State Unemployment Comp.2",
      inputType: "num",
      label: "Annual Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "Fringe Benefits (Itemized)2",
      inputType: null,
      label: null,
      updatedValue: null,
      value: undefined,
      icon: null,
    },
    {
      columnName: "Health & Welfare2",
      inputType: "num",
      label: "Annual Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "Vacation2",
      inputType: "num",
      label: "Annual Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "Holiday2",
      inputType: "num",
      label: "Annual Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "Pension2",
      inputType: "num",
      label: "Annual Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "Total Operation Labor Cost2",
      inputType: null,
      label: "Annual Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "Supplier's Wages2",
      inputType: "num",
      label: "Annual Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "Total Cost2",
      inputType: null,
      label: "Annual Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "Return on Investment2",
      inputType: null,
      label: "Annual Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "Total Offer2",
      inputType: null,
      label: "Annual Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
  ]);
  const itemLabels = [
    { label: "Vehicle Cost", sub: "Motor Vehicles" },
    { label: "Vehicle Cost", sub: "Trailers" },
    { label: "Opertational Cost", sub: "(Repairs, repair labor, tires, etc.)" },
    { label: "Taxes", sub: null },
    { label: "Vehicle Registration", sub: null },
    { label: "Miscellaneous", sub: null },
    { label: "General Overhead", sub: null },
    { label: "Fuel", sub: "(Miles Per Gallon)" },
    { label: "Oil", sub: "(Quarts)" },
    { label: "Insurance", sub: null },
    { label: "Road Taxes", sub: null },
    { label: "Tolls", sub: null },
    { label: "Total Fixed and Operational Cost", sub: "(Cost Lines 1-10)" },
    { label: "Straight Time", sub: null },
    { label: "Overtime", sub: null },
    { label: "Payroll Taxes (Itemized) ", sub: null },
    { label: "Social Security", sub: null },
    { label: "Workman's Compensation", sub: null },
    { label: "Federal Unemployment Comp.", sub: null },
    { label: "State Unemployment Comp.", sub: null },
    { label: "Fringe Benefits (Itemized)", sub: null },
    { label: "Health & Welfare", sub: null },
    { label: "Vacation", sub: null },
    { label: "Holiday", sub: null },
    { label: "Pension", sub: null },
    { label: "Total Operation Labor Cost", sub: "(Lines 12-15)" },
    { label: "Supplier's Wages", sub: "(Personal Driving or Supervision)" },
    { label: "Total Cost", sub: "(lines 11, 16 & 17)" },
    { label: "Return on Investment", sub: null },
    { label: "Total Offer", sub: "(Lines 18 & 19)" },
  ];

  async function handleSubmit(event) {
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
        <MDBContainer fluid>
          <form onSubmit={handleSubmit}>
            <MDBRow>
              <MDBCol md="6">
                <p className="h5 text-center mb-4">Selected Contract Data </p>
                <div className="grey-text">
                  <MDBInput
                    label="Road Taxess"
                    id="road_taxess"
                    icon="envelope"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                  />
                </div>
              </MDBCol>
              <MDBCol md="6">
                <p className="h5 text-center mb-4">Selected Contract Data </p>
                <div className="grey-text">
                  <MDBInput
                    label="Road Taxes"
                    id="road_taxes"
                    icon="envelope"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                  />
                </div>
              </MDBCol>
            </MDBRow>
            <p className="h4 text-center mb-4">Basis For Determining Cost</p>
            <div className="grey-text">
              {itemLabels.map((c, index) => (
                <MDBRow key={index}>
                  <MDBCol md="3">
                    {c.sub === null ? (
                      <div className=" text-center mb-5">
                        <h4 key={index + c.label}>{c.label}</h4>
                      </div>
                    ) : (
                      <div key={index} className=" text-center mb-4">
                        <h4 key={index + c.label}>{c.label}</h4>
                        <small key={index + c.sub}>{c.sub}</small>
                      </div>
                    )}
                  </MDBCol>

                  <MDBCol md="9">
                    <MDBRow>
                      <MDBCol md="4">
                        <div className="grey-text">
                          {units[index].label !== null ? (
                            <MDBInput
                              key={units[index].columnName}
                              label={units[index].label}
                              id={units[index].columnName}
                              value={
                                units[index].updatedValue === null
                                  ? units[index].value
                                  : units[index].updatedValue
                              }
                              placeholder={units[index].value}
                              icon={units[index].icon}
                              group
                              type="text"
                              validate
                              error="wrong"
                              success="right"
                              onChange={(e) => {
                                var object = units;
                                var specials = /[*|":<>[\]{}`\\()';@&$]/; //TODO setup global module to sanatize stuff.
                                object[
                                  index
                                ].updatedValue = e.target.value.replace(
                                  specials,
                                  ""
                                );
                                setUnits(object);
                              }}
                            />
                          ) : (
                            <MDBInput key={units[index].columnName} disabled />
                          )}
                        </div>
                      </MDBCol>
                      <MDBCol md="4">
                        <div className="grey-text">
                          {unitCost[index].label !== null ? (
                            <MDBInput
                              key={unitCost[index].columnName}
                              label={unitCost[index].label}
                              id={unitCost[index].columnName}
                              value={
                                unitCost[index].updatedValue === null
                                  ? unitCost[index].value
                                  : unitCost[index].updatedValue
                              }
                              placeholder={unitCost[index].value}
                              icon={unitCost[index].icon}
                              group
                              type="text"
                              validate
                              error="wrong"
                              success="right"
                              onChange={(e) => {
                                var object = unitCost;
                                var specials = /[*|":<>[\]{}`\\()';@&$]/; //TODO setup global module to sanatize stuff.
                                object[
                                  index
                                ].updatedValue = e.target.value.replace(
                                  specials,
                                  ""
                                );
                                setUnitCost(object);
                              }}
                            />
                          ) : (
                            <MDBInput key={units[index].columnName} disabled />
                          )}
                        </div>
                      </MDBCol>
                      <MDBCol md="4">
                        <div className="grey-text">
                          {annualCost[index].label !== null ? (
                            <MDBInput
                              key={annualCost[index].columnName}
                              label={annualCost[index].label}
                              id={annualCost[index].columnName}
                              value={
                                annualCost[index].updatedValue === null
                                  ? annualCost[index].value
                                  : annualCost[index].updatedValue
                              }
                              placeholder={annualCost[index].value}
                              icon={annualCost[index].icon}
                              group
                              type="text"
                              validate
                              error="wrong"
                              success="right"
                              onChange={(e) => {
                                var object = annualCost;
                                var specials = /[*|":<>[\]{}`\\()';@&$]/; //TODO setup global module to sanatize stuff.
                                object[
                                  index
                                ].updatedValue = e.target.value.replace(
                                  specials,
                                  ""
                                );
                                setAnnualCost(object);
                              }}
                            />
                          ) : (
                            <MDBInput
                              key={annualCost[index].columnName}
                              disabled
                            />
                          )}
                        </div>
                      </MDBCol>
                    </MDBRow>
                  </MDBCol>
                </MDBRow>
              ))}
            </div>
            <MDBRow>
              <MDBCol md="12">
                <div className="text-center">
                  <MDBBtn
                    outline
                    color="info"
                    type="button"
                    onClick={handleSubmit}
                  >
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
