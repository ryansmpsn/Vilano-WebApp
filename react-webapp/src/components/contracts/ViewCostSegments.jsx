import React, { useState } from "react";
// import { useToasts } from "react-toast-notifications";
import Select from "react-select";
import { MDBCard, MDBCardHeader, MDBCardBody, MDBContainer, MDBRow, MDBCol, MDBInput, MDBIcon, MDBBtn } from "mdbreact";
import { Button, Spinner } from "react-bootstrap";
import Send from "../../libs/send";
import UpsertCostSegment from "./UpsertCostSegment";

function CostSegment(props) {
  // const { addToast } = useToasts();
  const [isLoading, setIsLoading] = useState(false);
  const [costSegmentDropdowns, setCostSegmentDropdowns] = useState(null);
  const [isSearching, setSearching] = useState(false);
  const [contractSearch, setContractSearch] = useState(props.contractSearch);
  const [contractData, setContractData] = useState(null);
  const [contractCostSegments, setContractCostSegments] = useState(null);
  const [units, setUnits] = useState([
    {
      columnName: "annual_unit",
      id: "Vehicle Cost_Per_Year",
      inputType: "num",
      label: "Annual Miles",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "annual_unit",
      id: "Vehicle Cost2_Per_Year",
      inputType: "num",
      label: "Annual Miles",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "annual_unit",
      id: "Opertational Cost_Per_Year",
      inputType: "num",
      label: "Annual Miles",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "annual_unit",
      id: "Taxes_Per_Year",
      inputType: null,
      label: null,
      updatedValue: null,
      value: undefined,
      icon: null,
    },
    {
      columnName: "annual_unit",
      id: "Vehicle Registration_Per_Year",
      inputType: null,
      label: null,
      updatedValue: null,
      value: undefined,
      icon: null,
    },
    {
      columnName: "annual_unit",
      id: "Miscellaneous_Per_Year",
      inputType: null,
      label: null,
      updatedValue: null,
      value: undefined,
      icon: null,
    },
    {
      columnName: "annual_unit",
      id: "General Overhead_Per_Year",
      inputType: null,
      label: null,
      updatedValue: null,
      value: undefined,
      icon: null,
    },
    {
      columnName: "annual_unit",
      id: "Fuel_Per_Year",
      inputType: "num",
      label: "Gallons",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "annual_unit",
      id: "Oil_Per_Year",
      inputType: "num",
      label: "Quarts",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "annual_unit",
      id: "Insurance_Per_Year",
      inputType: null,
      label: null,
      updatedValue: null,
      value: undefined,
      icon: null,
    },
    {
      columnName: "annual_unit",
      id: "Road Taxes_Per_Year",
      inputType: null,
      label: null,
      updatedValue: null,
      value: undefined,
      icon: null,
    },
    {
      columnName: "annual_unit",
      id: "Tolls_Per_Year",
      inputType: "num",
      label: "Trips",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "annual_unit",
      id: "Total Fixed and Operational Cost_Per_Year",
      inputType: null,
      label: null,
      updatedValue: null,
      value: undefined,
      icon: null,
    },
    {
      columnName: "annual_unit",
      id: "Straight Time_Per_Year",
      inputType: "num",
      label: "Hours",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "annual_unit",
      id: "Overtime_Per_Year",
      inputType: "num",
      label: "Hours",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "annual_unit",
      id: "Payroll Taxes (Itemized) _Per_Year",
      inputType: null,
      label: null,
      updatedValue: null,
      value: undefined,
      icon: null,
    },
    {
      columnName: "annual_unit",
      id: "Social Security_Per_Year",
      inputType: "num",
      label: "Taxable Wages",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "annual_unit",
      id: "Workman's Compensation_Per_Year",
      inputType: "num",
      label: "Taxable Wages",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "annual_unit",
      id: "Federal Unemployment Comp._Per_Year",
      inputType: "num",
      label: "Taxable Wages",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "annual_unit",
      id: "State Unemployment Comp._Per_Year",
      inputType: "num",
      label: "Taxable Wages",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "annual_unit",
      id: "Fringe Benefits (Itemized)_Per_Year",
      inputType: null,
      label: null,
      updatedValue: null,
      value: undefined,
      icon: null,
    },
    {
      columnName: "annual_unit",
      id: "Health & Welfare_Per_Year",
      inputType: "num",
      label: "No. of Employees or Hours",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "annual_unit",
      id: "Vacation_Per_Year",
      inputType: "num",
      label: "No. of Employees or Hours",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "annual_unit",
      id: "Holiday_Per_Year",
      inputType: "num",
      label: "No. of Employees or Hours",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "annual_unit",
      id: "Pension_Per_Year",
      inputType: "num",
      label: "No. of Employees or Hours",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "annual_unit",
      id: "Total Operation Labor Cost_Per_Year",
      inputType: null,
      label: null,
      updatedValue: null,
      value: undefined,
      icon: null,
    },
    {
      columnName: "annual_unit",
      id: "Supplier's Wages_Per_Year",
      inputType: "num",
      label: "Hours",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "annual_unit",
      id: "Total Cost_Per_Year",
      inputType: null,
      label: null,
      updatedValue: null,
      value: undefined,
      icon: null,
    },
    {
      columnName: "annual_unit",
      id: "Return on Investment_Per_Year",
      inputType: null,
      label: null,
      updatedValue: null,
      value: undefined,
      icon: null,
    },
    {
      columnName: "annual_unit",
      id: "Total Offer_Per_Year",
      inputType: null,
      label: null,
      updatedValue: null,
      value: undefined,
      icon: null,
    },
  ]);
  const [unitCost, setUnitCost] = useState([
    {
      columnName: "unit_cost",
      id: "Vehicle Cost_Unit_Cost",
      inputType: "num",
      label: "Annual Miles",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "unit_cost",
      id: "Vehicle Cost2_Unit_Cost",
      inputType: "num",
      label: "Annual Miles",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "unit_cost",
      id: "Opertational Cost_Unit_Cost",
      inputType: "num",
      label: "Annual Miles",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "unit_cost",
      id: "Taxes_Unit_Cost",
      inputType: null,
      label: null,
      updatedValue: null,
      value: undefined,
      icon: null,
    },
    {
      columnName: "unit_cost",
      id: "Vehicle Registration_Unit_Cost",
      inputType: null,
      label: null,
      updatedValue: null,
      value: undefined,
      icon: null,
    },
    {
      columnName: "unit_cost",
      id: "Miscellaneous_Unit_Cost",
      inputType: null,
      label: null,
      updatedValue: null,
      value: undefined,
      icon: null,
    },
    {
      columnName: "unit_cost",
      id: "General Overhead_Unit_Cost",
      inputType: null,
      label: null,
      updatedValue: null,
      value: undefined,
      icon: null,
    },
    {
      columnName: "unit_cost",
      id: "Fuel_Unit_Cost",
      inputType: "num",
      label: "Per Gallon",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "unit_cost",
      id: "Oil_Unit_Cost",
      inputType: "num",
      label: "Per Quart",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "unit_cost",
      id: "Insurance_Unit_Cost",
      inputType: null,
      label: null,
      updatedValue: null,
      value: undefined,
      icon: null,
    },
    {
      columnName: "unit_cost",
      id: "Road Taxes_Unit_Cost",
      inputType: null,
      label: null,
      updatedValue: null,
      value: undefined,
      icon: null,
    },
    {
      columnName: "unit_cost",
      id: "Tolls_Unit_Cost",
      inputType: "num",
      label: "Per Trip",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "unit_cost",
      id: "Total Fixed and Operational Cost_Unit_Cost",
      inputType: null,
      label: null,
      updatedValue: null,
      value: undefined,
      icon: null,
    },
    {
      columnName: "unit_cost",
      id: "Straight Time_Unit_Cost",
      inputType: "num",
      label: "Per Hour",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "unit_cost",
      id: "Overtime_Unit_Cost",
      inputType: "num",
      label: "Per Hour",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "unit_cost",
      id: "Payroll Taxes (Itemized) _Unit_Cost",
      inputType: null,
      label: null,
      updatedValue: null,
      value: undefined,
      icon: null,
    },
    {
      columnName: "unit_cost",
      id: "Social Security_Unit_Cost",
      inputType: "num",
      label: "Unit Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "unit_cost",
      id: "Workman's Compensation_Unit_Cost",
      inputType: "num",
      label: "Unit Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "unit_cost",
      id: "Federal Unemployment Comp._Unit_Cost",
      inputType: "num",
      label: "Unit Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "unit_cost",
      id: "State Unemployment Comp._Unit_Cost",
      inputType: "num",
      label: "Unit Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "unit_cost",
      id: "Fringe Benefits (Itemized)_Unit_Cost",
      inputType: null,
      label: null,
      updatedValue: null,
      value: undefined,
      icon: null,
    },
    {
      columnName: "unit_cost",
      id: "Health & Welfare_Unit_Cost",
      inputType: "num",
      label: "Rate",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "unit_cost",
      id: "Vacation_Unit_Cost",
      inputType: "num",
      label: "Rate",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "unit_cost",
      id: "Holiday_Unit_Cost",
      inputType: "num",
      label: "Rate",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "unit_cost",
      id: "Pension_Unit_Cost",
      inputType: "num",
      label: "Rate",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "unit_cost",
      id: "Total Operation Labor Cost_Unit_Cost",
      inputType: null,
      label: null,
      updatedValue: null,
      value: undefined,
      icon: null,
    },
    {
      columnName: "unit_cost",
      id: "Supplier's Wages_Unit_Cost",
      inputType: "num",
      label: "Per Hour",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "unit_cost",
      id: "Total Cost_Unit_Cost",
      inputType: null,
      label: null,
      updatedValue: null,
      value: undefined,
      icon: null,
    },
    {
      columnName: "unit_cost",
      id: "Return on Investment_Unit_Cost",
      inputType: null,
      label: null,
      updatedValue: null,
      value: undefined,
      icon: null,
    },
    {
      columnName: "unit_cost",
      id: "Total Offer_Unit_Cost",
      inputType: null,
      label: null,
      updatedValue: null,
      value: undefined,
      icon: null,
    },
  ]);
  const [annualCost, setAnnualCost] = useState([
    {
      columnName: "annual_cost",
      id: "Vehicle Cost_Annual_Cost",
      inputType: "num",
      label: "Annual Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "annual_cost",
      id: "Vehicle Cost2_Annual_Cost",
      inputType: "num",
      label: "Annual Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "annual_cost",
      id: "Opertational Cost_Annual_Cost",
      inputType: "num",
      label: "Annual Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "annual_cost",
      id: "Taxes_Annual_Cost",
      inputType: null,
      label: "Annual Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "annual_cost",
      id: "Vehicle Registration_Annual_Cost",
      inputType: null,
      label: "Annual Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "annual_cost",
      id: "Miscellaneous_Annual_Cost",
      inputType: null,
      label: "Annual Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "annual_cost",
      id: "General Overhead_Annual_Cost",
      inputType: null,
      label: "Annual Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "annual_cost",
      id: "Fuel_Annual_Cost",
      inputType: "num",
      label: "Annual Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "annual_cost",
      id: "Oil_Annual_Cost",
      inputType: "num",
      label: "Annual Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "annual_cost",
      id: "Insurance_Annual_Cost",
      inputType: null,
      label: "Annual Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "annual_cost",
      id: "Road Taxes_Annual_Cost",
      inputType: null,
      label: "Annual Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "annual_cost",
      id: "Tolls_Annual_Cost",
      inputType: "num",
      label: "Annual Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "annual_cost",
      id: "Total Fixed and Operational Cost_Annual_Cost",
      inputType: null,
      label: "Annual Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "annual_cost",
      id: "Straight Time_Annual_Cost",
      inputType: "num",
      label: "Annual Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "annual_cost",
      id: "Overtime_Annual_Cost",
      inputType: "num",
      label: "Annual Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "annual_cost",
      id: "Payroll Taxes (Itemized) _Annual_Cost",
      inputType: null,
      label: null,
      updatedValue: null,
      value: undefined,
      icon: null,
    },
    {
      columnName: "annual_cost",
      id: "Social Security_Annual_Cost",
      inputType: "num",
      label: "Annual Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "annual_cost",
      id: "Workman's Compensation_Annual_Cost",
      inputType: "num",
      label: "Annual Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "annual_cost",
      id: "Federal Unemployment Comp._Annual_Cost",
      inputType: "num",
      label: "Annual Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "annual_cost",
      id: "State Unemployment Comp._Annual_Cost",
      inputType: "num",
      label: "Annual Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "annual_cost",
      id: "Fringe Benefits (Itemized)_Annual_Cost",
      inputType: null,
      label: null,
      updatedValue: null,
      value: undefined,
      icon: null,
    },
    {
      columnName: "annual_cost",
      id: "Health & Welfare_Annual_Cost",
      inputType: "num",
      label: "Annual Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "annual_cost",
      id: "Vacation_Annual_Cost",
      inputType: "num",
      label: "Annual Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "annual_cost",
      id: "Holiday_Annual_Cost",
      inputType: "num",
      label: "Annual Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "annual_cost",
      id: "Pension_Annual_Cost",
      inputType: "num",
      label: "Annual Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "annual_cost",
      id: "Total Operation Labor Cost_Annual_Cost",
      inputType: null,
      label: "Annual Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "annual_cost",
      id: "Supplier's Wages_Annual_Cost",
      inputType: "num",
      label: "Annual Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "annual_cost",
      id: "Total Cost_Annual_Cost",
      inputType: null,
      label: "Annual Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "annual_cost",
      id: "Return on Investment_Annual_Cost",
      inputType: null,
      label: "Annual Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "annual_cost",
      id: "Total Offer_Annual_Cost",
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
  const [remarkAnnualCost, setRemarkAnnualCost] = useState([
    {
      columnName: "Equipment Realignment, Deadhead & Portal Miles",
      inputType: "num",
      label: "Annual Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "Plate Miles",
      inputType: "num",
      label: "Annual Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "Total Miles",
      inputType: "num",
      label: "Annual Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "U.S. DOT required vehicle Inspection, Equipment, Realignment, Deadhead  & Portal Hours ",
      inputType: "num",
      label: "Annual Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "Plate Hours",
      inputType: "num",
      label: "Annual Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
    {
      columnName: "Total Hours",
      inputType: "num",
      label: "Annual Cost",
      updatedValue: null,
      value: undefined,
      icon: "dollar-sign",
    },
  ]);
  const [rateSheetData, setRateSheetData] = useState(null);

  async function handleSubmit() {
    setSearching(true);
    setIsLoading(true);
    // costSegment.push(units[index], unitCost[index], annualCost[index]), console.log(costSegment)
    // console.log(units[index], unitCost[index], annualCost[index])
  }

  function getSelectedContract() {
    setIsLoading(true);
    Send.get("/Contract/Dropdowns/ContractTest/Cached", props.appProps).then((res) => {
      setCostSegmentDropdowns(res.data[1].options);
    });
    props.setSelectedContractId(contractSearch);

    Send.get("/Contract/1/RateSheet", props.appProps).then((res) => {
      console.log(res);
      setContractCostSegments(res.data[0].pop());
      setContractData(res.data[0]);

      // let object = [];
      // this.state.editedFieldData.forEach((item) => {
      //   let data = item;

      //   this.state.contractData.forEach((c) => {
      //     if (c.columnName === item.columnName) {
      //       data.value = c.value;
      //       object.push(data);
      //     } else {
      //       console.log(c);
      //     }
      //   });
      //   data.value === null && object.push(data);
      // });
      // console.log(object);
      // this.setState({ editedFieldData: object });
      setIsLoading(false);
    });
  }

  function updateRateSheetData(x) {
    contractCostSegments.value.map((c, index) => c[1].value === x.label && setRateSheetData(c[3].value));

    let object = units;
    units.forEach((c, index) => rateSheetData !== null && (object[index].value = rateSheetData[index][4].value));
    setUnits(object);
    console.log("updating");
  }
  return (
    <MDBCard className="m-2">
      <MDBCardHeader>
        <h4>Add Cost Segment To A Contract</h4>
        <h5>
          <Select
            autoFocus
            options={props.selectOptions}
            placeholder={"Search for Contracts by ID"}
            onChange={(x) => {
              setContractSearch(x.value);
            }}
            isDisabled={isLoading}
          />
        </h5>
        {isLoading === true ? (
          <MDBContainer>
            <Spinner animation="border" variant="primary" />
          </MDBContainer>
        ) : (
          <h4>
            <Button type="button" onClick={getSelectedContract}>
              Search
            </Button>
          </h4>
        )}

        {contractCostSegments !== null && (
          <Select
            autoFocus
            options={costSegmentDropdowns}
            placeholder={"Select a Cost Segment to Update"}
            onChange={(x) => {
              updateRateSheetData(x);
            }}
            isDisabled={isLoading}
          />
        )}
      </MDBCardHeader>
      <UpsertCostSegment
        contractData={contractData}
        units={units}
        unitCost={unitCost}
        itemLabels={itemLabels}
        annualCost={annualCost}
        remarkAnnualCost={remarkAnnualCost}
        setUnits={setUnits}
        setUnitCost={setUnitCost}
        setAnnualCost={setAnnualCost}
        setRemarkAnnualCost={setRemarkAnnualCost}
      />
    </MDBCard>
  );
}

export default CostSegment;
