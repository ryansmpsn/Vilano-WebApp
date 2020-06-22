import React, { Component } from "react";
import Select from "react-select";
import { MDBCard, MDBCardHeader, MDBContainer, MDBCardBody } from "mdbreact";
import { Button, Spinner } from "react-bootstrap";
import Send from "../../../libs/send";
import UpsertCostSegment from "./UpsertCostSegment";

class CostSegmentData extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      settingData: false,
      isLoading: false,
      costSegmentDropdowns: null,
      isSearching: false,
      contractSearch: this.props.contractSearch,
      contractData: null,
      contractCostSegments: null,
      selectedCostSegment: "",
      rateSheetData: null,
      units: [
        {
          rateItemCode: "vc_1",
          columnName: "annual_unit",
          inputType: null,
          label: null,
          updatedValue: null,
          value: null,
        },
        {
          rateItemCode: "mv_1",
          columnName: "annual_unit",
          id: "Vehicle Cost_Per_Year",
          inputType: "num",
          label: "Annual Miles",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "tr_1",
          columnName: "annual_unit",
          id: "Vehicle Cost2_Per_Year",
          inputType: "num",
          label: "Annual Miles",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "oc_1",
          columnName: "annual_unit",
          id: "Opertational Cost_Per_Year",
          inputType: "num",
          label: "Annual Miles",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "tx_2",
          columnName: "annual_unit",
          id: "Taxes_Per_Year",
          inputType: null,
          label: null,
          updatedValue: null,
          value: undefined,
          icon: null,
        },
        {
          rateItemCode: "vr_3",
          columnName: "annual_unit",
          id: "Vehicle Registration_Per_Year",
          inputType: null,
          label: null,
          updatedValue: null,
          value: undefined,
          icon: null,
        },
        {
          rateItemCode: "ms_4",
          columnName: "annual_unit",
          id: "Miscellaneous_Per_Year",
          inputType: null,
          label: null,
          updatedValue: null,
          value: undefined,
          icon: null,
        },
        {
          rateItemCode: "go_5",
          columnName: "annual_unit",
          id: "General Overhead_Per_Year",
          inputType: null,
          label: null,
          updatedValue: null,
          value: undefined,
          icon: null,
        },
        {
          rateItemCode: "fu_6",
          columnName: "annual_unit",
          id: "Fuel_Per_Year",
          inputType: "num",
          label: "Gallons",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "oi_7",
          columnName: "annual_unit",
          id: "Oil_Per_Year",
          inputType: "num",
          label: "Quarts",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "in_8",
          columnName: "annual_unit",
          id: "Insurance_Per_Year",
          inputType: null,
          label: null,
          updatedValue: null,
          value: undefined,
          icon: null,
        },
        {
          rateItemCode: "rt_9",
          columnName: "annual_unit",
          id: "Road Taxes_Per_Year",
          inputType: null,
          label: null,
          updatedValue: null,
          value: undefined,
          icon: null,
        },
        {
          rateItemCode: "tl_10",
          columnName: "annual_unit",
          id: "Tolls_Per_Year",
          inputType: "num",
          label: "Trips",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "fo_11",
          columnName: "annual_unit",
          id: "Total Fixed and Operational Cost_Per_Year",
          inputType: null,
          label: null,
          updatedValue: null,
          value: undefined,
          icon: null,
        },
        {
          rateItemCode: "st_12",
          columnName: "annual_unit",
          id: "Straight Time_Per_Year",
          inputType: "num",
          label: "Hours",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "ot_13",
          columnName: "annual_unit",
          id: "Overtime_Per_Year",
          inputType: "num",
          label: "Hours",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "pt_14",
          columnName: "annual_unit",
          id: "Payroll Taxes (Itemized) _Per_Year",
          inputType: null,
          label: null,
          updatedValue: null,
          value: undefined,
          icon: null,
        },
        {
          rateItemCode: "ss_14",
          columnName: "annual_unit",
          id: "Social Security_Per_Year",
          inputType: "num",
          label: "Taxable Wages",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "wc_14",
          columnName: "annual_unit",
          id: "Workman's Compensation_Per_Year",
          inputType: "num",
          label: "Taxable Wages",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "fc_14",
          columnName: "annual_unit",
          id: "Federal Unemployment Comp._Per_Year",
          inputType: "num",
          label: "Taxable Wages",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "su_14",
          columnName: "annual_unit",
          id: "State Unemployment Comp._Per_Year",
          inputType: "num",
          label: "Taxable Wages",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "fb_15",
          columnName: "annual_unit",
          id: "Fringe Benefits (Itemized)_Per_Year",
          inputType: null,
          label: null,
          updatedValue: null,
          value: undefined,
          icon: null,
        },
        {
          rateItemCode: "hw_15",
          columnName: "annual_unit",
          id: "Health & Welfare_Per_Year",
          inputType: "num",
          label: "No. of Employees or Hours",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "va_15",
          columnName: "annual_unit",
          id: "Vacation_Per_Year",
          inputType: "num",
          label: "No. of Employees or Hours",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "ho_15",
          columnName: "annual_unit",
          id: "Holiday_Per_Year",
          inputType: "num",
          label: "No. of Employees or Hours",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "ps_15",
          columnName: "annual_unit",
          id: "Pension_Per_Year",
          inputType: "num",
          label: "No. of Employees or Hours",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "ol_16",
          columnName: "annual_unit",
          id: "Total Operation Labor Cost_Per_Year",
          inputType: null,
          label: null,
          updatedValue: null,
          value: undefined,
          icon: null,
        },
        {
          rateItemCode: "sw_17",
          columnName: "annual_unit",
          id: "Supplier's Wages_Per_Year",
          inputType: "num",
          label: "Hours",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "tc_18",
          columnName: "annual_unit",
          id: "Total Cost_Per_Year",
          inputType: null,
          label: null,
          updatedValue: null,
          value: undefined,
          icon: null,
        },
        {
          rateItemCode: "ri_19",
          columnName: "annual_unit",
          id: "Return on Investment_Per_Year",
          inputType: null,
          label: null,
          updatedValue: null,
          value: undefined,
          icon: null,
        },
        {
          rateItemCode: "to_20",
          columnName: "annual_unit",
          id: "Total Offer_Per_Year",
          inputType: null,
          label: null,
          updatedValue: null,
          value: undefined,
          icon: null,
        },
      ],
      unitCost: [
        {
          rateItemCode: "vc_1",
          columnName: "unit_cost",
          inputType: null,
          label: null,
          updatedValue: null,
          value: null,
        },
        {
          rateItemCode: "mv_1",
          columnName: "unit_cost",
          id: "Vehicle Cost_Unit_Cost",
          inputType: "num",
          label: "Rate Per Mile",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "tr_2",
          columnName: "unit_cost",
          id: "Vehicle Cost2_Unit_Cost",
          inputType: "num",
          label: "Rate Per Mile",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "oc_1",
          columnName: "unit_cost",
          id: "Opertational Cost_Unit_Cost",
          inputType: "num",
          label: "Rate Per Mile",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "tx_2",
          columnName: "unit_cost",
          id: "Taxes_Unit_Cost",
          inputType: null,
          label: null,
          updatedValue: null,
          value: undefined,
          icon: null,
        },
        {
          rateItemCode: "vr_3",
          columnName: "unit_cost",
          id: "Vehicle Registration_Unit_Cost",
          inputType: null,
          label: null,
          updatedValue: null,
          value: undefined,
          icon: null,
        },
        {
          rateItemCode: "ms_4",
          columnName: "unit_cost",
          id: "Miscellaneous_Unit_Cost",
          inputType: null,
          label: null,
          updatedValue: null,
          value: undefined,
          icon: null,
        },
        {
          rateItemCode: "go_5",
          columnName: "unit_cost",
          id: "General Overhead_Unit_Cost",
          inputType: null,
          label: null,
          updatedValue: null,
          value: undefined,
          icon: null,
        },
        {
          rateItemCode: "fu_6",
          columnName: "unit_cost",
          id: "Fuel_Unit_Cost",
          inputType: "num",
          label: "Per Gallon",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "oi_7",
          columnName: "unit_cost",
          id: "Oil_Unit_Cost",
          inputType: "num",
          label: "Per Quart",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "in_8",
          columnName: "unit_cost",
          id: "Insurance_Unit_Cost",
          inputType: null,
          label: null,
          updatedValue: null,
          value: undefined,
          icon: null,
        },
        {
          rateItemCode: "rt_9",
          columnName: "unit_cost",
          id: "Road Taxes_Unit_Cost",
          inputType: null,
          label: null,
          updatedValue: null,
          value: undefined,
          icon: null,
        },
        {
          rateItemCode: "tl_10",
          columnName: "unit_cost",
          id: "Tolls_Unit_Cost",
          inputType: "num",
          label: "Per Trip",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "fo_11",
          columnName: "unit_cost",
          id: "Total Fixed and Operational Cost_Unit_Cost",
          inputType: null,
          label: null,
          updatedValue: null,
          value: undefined,
          icon: null,
        },
        {
          rateItemCode: "st_12",
          columnName: "unit_cost",
          id: "Straight Time_Unit_Cost",
          inputType: "num",
          label: "Per Hour",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "ot_13",
          columnName: "unit_cost",
          id: "Overtime_Unit_Cost",
          inputType: "num",
          label: "Per Hour",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "pt_14",
          columnName: "unit_cost",
          id: "Payroll Taxes (Itemized) _Unit_Cost",
          inputType: null,
          label: null,
          updatedValue: null,
          value: undefined,
          icon: null,
        },
        {
          rateItemCode: "ss_14",
          columnName: "unit_cost",
          id: "Social Security_Unit_Cost",
          inputType: "num",
          label: "Unit Cost",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "wc_14",
          columnName: "unit_cost",
          id: "Workman's Compensation_Unit_Cost",
          inputType: "num",
          label: "Unit Cost",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "fc_14",
          columnName: "unit_cost",
          id: "Federal Unemployment Comp._Unit_Cost",
          inputType: "num",
          label: "Unit Cost",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "su_14",
          columnName: "unit_cost",
          id: "State Unemployment Comp._Unit_Cost",
          inputType: "num",
          label: "Unit Cost",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "fb_15",
          columnName: "unit_cost",
          id: "Fringe Benefits (Itemized)_Unit_Cost",
          inputType: null,
          label: null,
          updatedValue: null,
          value: undefined,
          icon: null,
        },
        {
          rateItemCode: "hw_15",
          columnName: "unit_cost",
          id: "Health & Welfare_Unit_Cost",
          inputType: "num",
          label: "Rate",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "va_15",
          columnName: "unit_cost",
          id: "Vacation_Unit_Cost",
          inputType: "num",
          label: "Rate",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "ho_15",
          columnName: "unit_cost",
          id: "Holiday_Unit_Cost",
          inputType: "num",
          label: "Rate",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "ps_15",
          columnName: "unit_cost",
          id: "Pension_Unit_Cost",
          inputType: "num",
          label: "Rate",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "ol_16",
          columnName: "unit_cost",
          id: "Total Operation Labor Cost_Unit_Cost",
          inputType: null,
          label: null,
          updatedValue: null,
          value: undefined,
          icon: null,
        },
        {
          rateItemCode: "sw_17",
          columnName: "unit_cost",
          id: "Supplier's Wages_Unit_Cost",
          inputType: "num",
          label: "Per Hour",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "tc_18",
          columnName: "unit_cost",
          id: "Total Cost_Unit_Cost",
          inputType: null,
          label: null,
          updatedValue: null,
          value: undefined,
          icon: null,
        },
        {
          rateItemCode: "ri_19",
          columnName: "unit_cost",
          id: "Return on Investment_Unit_Cost",
          inputType: null,
          label: null,
          updatedValue: null,
          value: undefined,
          icon: null,
        },
        {
          rateItemCode: "to_20",
          columnName: "unit_cost",
          id: "Total Offer_Unit_Cost",
          inputType: null,
          label: null,
          updatedValue: null,
          value: undefined,
          icon: null,
        },
      ],
      annualCost: [
        {
          rateItemCode: "vc_1",
          columnName: "annual_cost",
          inputType: null,
          label: null,
          updatedValue: null,
          value: null,
        },
        {
          rateItemCode: "mv_1",
          columnName: "annual_cost",
          id: "Vehicle Cost_Annual_Cost",
          inputType: "num",
          label: "Annual Cost",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "tr_1",
          columnName: "annual_cost",
          id: "Vehicle Cost2_Annual_Cost",
          inputType: "num",
          label: "Annual Cost",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "oc_1",
          columnName: "annual_cost",
          id: "Opertational Cost_Annual_Cost",
          inputType: "num",
          label: "Annual Cost",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "tx_2",
          columnName: "annual_cost",
          id: "Taxes_Annual_Cost",
          inputType: null,
          label: "Annual Cost",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "vr_3",
          columnName: "annual_cost",
          id: "Vehicle Registration_Annual_Cost",
          inputType: null,
          label: "Annual Cost",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "ms_4",
          columnName: "annual_cost",
          id: "Miscellaneous_Annual_Cost",
          inputType: null,
          label: "Annual Cost",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "go_5",
          columnName: "annual_cost",
          id: "General Overhead_Annual_Cost",
          inputType: null,
          label: "Annual Cost",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "fu_6",
          columnName: "annual_cost",
          id: "Fuel_Annual_Cost",
          inputType: "num",
          label: "Annual Cost",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "oi_7",
          columnName: "annual_cost",
          id: "Oil_Annual_Cost",
          inputType: "num",
          label: "Annual Cost",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "in_8",
          columnName: "annual_cost",
          id: "Insurance_Annual_Cost",
          inputType: null,
          label: "Annual Cost",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "rt_9",
          columnName: "annual_cost",
          id: "Road Taxes_Annual_Cost",
          inputType: null,
          label: "Annual Cost",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "tl_10",
          columnName: "annual_cost",
          id: "Tolls_Annual_Cost",
          inputType: "num",
          label: "Annual Cost",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "fo_11",
          columnName: "annual_cost",
          id: "Total Fixed and Operational Cost_Annual_Cost",
          inputType: null,
          label: "Annual Cost",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "st_12",
          columnName: "annual_cost",
          id: "Straight Time_Annual_Cost",
          inputType: "num",
          label: "Annual Cost",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "ot_13",
          columnName: "annual_cost",
          id: "Overtime_Annual_Cost",
          inputType: "num",
          label: "Annual Cost",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "pt_14",
          columnName: "annual_cost",
          id: "Payroll Taxes (Itemized) _Annual_Cost",
          inputType: null,
          label: null,
          updatedValue: null,
          value: undefined,
          icon: null,
        },
        {
          rateItemCode: "ss_14",
          columnName: "annual_cost",
          id: "Social Security_Annual_Cost",
          inputType: "num",
          label: "Annual Cost",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "wc_14",
          columnName: "annual_cost",
          id: "Workman's Compensation_Annual_Cost",
          inputType: "num",
          label: "Annual Cost",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "fc_14",
          columnName: "annual_cost",
          id: "Federal Unemployment Comp._Annual_Cost",
          inputType: "num",
          label: "Annual Cost",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "su_14",
          columnName: "annual_cost",
          id: "State Unemployment Comp._Annual_Cost",
          inputType: "num",
          label: "Annual Cost",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "fb_15",
          columnName: "annual_cost",
          id: "Fringe Benefits (Itemized)_Annual_Cost",
          inputType: null,
          label: null,
          updatedValue: null,
          value: undefined,
          icon: null,
        },
        {
          rateItemCode: "hw_15",
          columnName: "annual_cost",
          id: "Health & Welfare_Annual_Cost",
          inputType: "num",
          label: "Annual Cost",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "va_15",
          columnName: "annual_cost",
          id: "Vacation_Annual_Cost",
          inputType: "num",
          label: "Annual Cost",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "ho_15",
          columnName: "annual_cost",
          id: "Holiday_Annual_Cost",
          inputType: "num",
          label: "Annual Cost",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "ps_15",
          columnName: "annual_cost",
          id: "Pension_Annual_Cost",
          inputType: "num",
          label: "Annual Cost",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "ol_16",
          columnName: "annual_cost",
          id: "Total Operation Labor Cost_Annual_Cost",
          inputType: null,
          label: "Annual Cost",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "sw_17",
          columnName: "annual_cost",
          id: "Supplier's Wages_Annual_Cost",
          inputType: "num",
          label: "Annual Cost",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "tc_18",
          columnName: "annual_cost",
          id: "Total Cost_Annual_Cost",
          inputType: null,
          label: "Annual Cost",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "ri_19",
          columnName: "annual_cost",
          id: "Return on Investment_Annual_Cost",
          inputType: null,
          label: "Annual Cost",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "to_20",
          columnName: "annual_cost",
          id: "Total Offer_Annual_Cost",
          inputType: null,
          label: "Annual Cost",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
      ],
      itemLabels: [
        { label: "Vehicle Cost", sub: null },
        { label: "Vehicle Cost", sub: "Motor Vehicles" },
        { label: "Vehicle Cost", sub: "Trailers" },
        {
          label: "Opertational Cost",
          sub: "(Repairs, repair labor, tires, etc.)",
        },
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
      ],
      remarkAnnualCost: [
        {
          rateItemCode: "dm_21",
          label: "Equipment Realignment, Deadhead & Portal Miles",
          inputType: "num",
          columnName: "annual_cost",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "pm_21",
          label: "Plate Miles",
          inputType: "num",
          columnName: "annual_cost",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "tm_21",
          label: "Total Miles",
          inputType: "num",
          columnName: "annual_cost",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "dh_22",
          label: "U.S. DOT required vehicle Inspection, Equipment, Realignment, Deadhead  & Portal Hours ",
          inputType: "num",
          columnName: "annual_cost",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "ph_22",
          label: "Plate Hours",
          inputType: "num",
          columnName: "annual_cost",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
        {
          rateItemCode: "th_22",
          label: "Total Hours",
          inputType: "num",
          columnName: "annual_cost",
          updatedValue: null,
          value: undefined,
          icon: "dollar-sign",
        },
      ],
    };
    this.getSelectedContract = this.getSelectedContract.bind(this);
    this.updateRateSheetData = this.updateRateSheetData.bind(this);
    this.setCostSegmentdata = this.setCostSegmentdata.bind(this);
  }
  setUnits = (e) => {
    return this.setState({ units: e });
  };
  setUnitCost = (e) => {
    return this.setState({ unitCost: e });
  };
  setAnnualCost = (e) => {
    return this.setState({ annualCost: e });
  };
  setRemarkAnnualCost = (e) => {
    return this.setState({ remarkAnnualCost: e });
  };

  componentDidMount() {
    this._isMounted = true;
    if (this.props.contractProfile !== null) {
      this.setState({ isLoading: true });

      Send.get("/Contract/Dropdowns/CostSegment/All", this.props.appProps).then((res) => {
        this.setState({ costSegmentDropdowns: res.data[0].options });
      });

      Send.get("/Contract/" + this.props.selectedContractId + "/RateSheet", this.props.appProps).then((res) => {
        console.log(res.data);

        this.setState({ contractCostSegments: res.data[0].pop() });
        this.setState({ contractData: res.data[0] });
        this.setState({ isLoading: false });
      });
    }
  }

  getSelectedContract() {
    this.setState({ isLoading: true });

    this.props.getTrips("/Contract/" + this.state.contractSearch);

    Send.get("/Contract/Dropdowns/CostSegment/All", this.props.appProps).then((res) => {
      this.setState({ costSegmentDropdowns: res.data[0].options });
    });
    this.props.setSelectedContractId(this.state.contractSearch);

    Send.get("/Contract/" + this.state.contractSearch + "/RateSheet", this.props.appProps).then((res) => {
      console.log(res.data);

      this.setState({ contractCostSegments: res.data[0].pop() });
      this.setState({ contractData: res.data[0] });
      this.setState({ isLoading: false });
    });
  }

  updateRateSheetData(x) {
    this.setState({ settingData: false });
    this.setState({ selectedCostSegment: x.label });

    for (var i = 0; i < this.state.contractCostSegments.value.length; i++) {
      if (this.state.contractCostSegments.value[i][1].value === x.label) {
        this.setState({ rateSheetData: this.state.contractCostSegments.value[i][3].value });
        break;
      } else {
        this.setState({ rateSheetData: null });
      }
    }
  }

  setCostSegmentdata() {
    if (this.state.rateSheetData !== null) {
      let unitsObject = this.state.units;
      unitsObject.forEach(
        (c, index) =>
          this.state.rateSheetData.map((x) => c.rateItemCode === x[2].value && (unitsObject[index].value = x[4].value)),
        this.setState({ units: unitsObject })
      );

      let unitCostObject = this.state.unitCost;
      unitCostObject.forEach(
        (c, index) =>
          this.state.rateSheetData.map((x) => c.rateItemCode === x[2].value && (unitCostObject[index].value = x[5].value)),
        this.setState({ unitCost: unitCostObject })
      );

      let annualCostObject = this.state.annualCost;
      annualCostObject.forEach(
        (c, index) =>
          this.state.rateSheetData.map((x) => c.rateItemCode === x[2].value && (annualCostObject[index].value = x[6].value)),
        this.setState({ annualCost: annualCostObject })
      );

      let remarkObject = this.state.remarkAnnualCost;
      remarkObject.forEach(
        (c, index) =>
          this.state.rateSheetData.map((x) => c.rateItemCode === x[2].value && (remarkObject[index].value = x[6].value)),
        this.setState({ remarkAnnualCost: remarkObject })
      );
    } else {
      let unitsObject = this.state.units;
      unitsObject.forEach((c, index) => {
        unitsObject[index].value = "";
        unitsObject[index].updatedValue = "";
        this.setState({ units: unitsObject });
      });

      let unitCostObject = this.state.unitCost;
      unitCostObject.forEach((c, index) => {
        unitCostObject[index].value = "";
        unitCostObject[index].updatedValue = "";
        this.setState({ unitCost: unitCostObject });
      });

      let annualCostObject = this.state.annualCost;
      annualCostObject.forEach((c, index) => {
        annualCostObject[index].value = "";
        annualCostObject[index].updatedValue = "";
        this.setState({ annualCost: annualCostObject });
      });

      let remarkObject = this.state.remarkAnnualCost;
      remarkObject.forEach((c, index) => {
        remarkObject[index].value = "";
        remarkObject[index].updatedValue = "";
        this.setState({ remarkAnnualCost: remarkObject });
      });
    }
    this.setState({ settingData: true });
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <MDBCard className="m-2">
        <MDBCardHeader>
          <h5>
            <Select
              options={this.props.selectOptions}
              placeholder={"Search for Contracts by ID"}
              onChange={(x) => {
                this.setState({ costSegmentDropdowns: null });
                this.setState({ settingData: false });
                this.setState({ contractSearch: x.value });
              }}
              isDisabled={this.state.isLoading}
              defaultInputValue={this.props.selectedContract}
            />
          </h5>
          {this.state.isLoading === true ? (
            <MDBContainer>
              <Spinner animation="border" variant="primary" />
            </MDBContainer>
          ) : (
            <>
              <h4>
                <Button type="button" onClick={this.getSelectedContract}>
                  Search
                </Button>
              </h4>
              {this.state.costSegmentDropdowns !== null && (
                <>
                  <Select
                    autoFocus
                    options={this.state.costSegmentDropdowns}
                    placeholder={"Select a Cost Segment to Update"}
                    onChange={(x) => {
                      this.updateRateSheetData(x);
                    }}
                    isDisabled={this.state.isLoading}
                  />
                  <h4>
                    <Button type="button" onClick={this.setCostSegmentdata}>
                      Select Cost Segment
                    </Button>
                  </h4>
                </>
              )}
            </>
          )}
        </MDBCardHeader>

        {!this.state.settingData ? (
          <MDBCardBody>
            <MDBContainer>Please select a contract to add or update cost segment information.</MDBContainer>
          </MDBCardBody>
        ) : (
          <UpsertCostSegment
            props={this.props}
            contractData={this.state.contractData}
            units={this.state.units}
            unitCost={this.state.unitCost}
            itemLabels={this.state.itemLabels}
            annualCost={this.state.annualCost}
            remarkAnnualCost={this.state.remarkAnnualCost}
            contractCostSegments={this.state.contractCostSegments}
            selectedCostSegment={this.state.selectedCostSegment}
            setUnits={this.setUnits}
            setUnitCost={this.setUnitCost}
            setAnnualCost={this.setAnnualCost}
            setRemarkAnnualCost={this.setRemarkAnnualCost}
          />
        )}
      </MDBCard>
    );
  }
}

export default CostSegmentData;
