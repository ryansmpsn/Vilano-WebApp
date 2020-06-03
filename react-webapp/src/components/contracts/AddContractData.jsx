import React, { useState } from "react";
// import { useToasts } from "react-toast-notifications";
import Select from "react-select";
import { MDBCard, MDBCardHeader, MDBCardBody, MDBContainer, MDBRow, MDBCol, MDBInput, MDBIcon, MDBBtn } from "mdbreact";
import { Button } from "react-bootstrap";
export default class AddContractData extends React.Component {
  // const { addToast } = useToasts();
  constructor(props) {
    super(props);
    this.state = {
      contractSearch: props.contractSearch,
      fieldData: [
        { columnName: "contract_test_id", inputType: null, label: null, updatedValue: null, value: null },
        { columnName: "modified_timestamp", inputType: null, label: "Modified At", updatedValue: null, value: null },
        { columnName: "modified_by", inputType: null, label: "modified_by", updatedValue: null, value: null },
        { columnName: "contract_id", inputType: null, label: "contract_id", updatedValue: null, value: 853 },
        { columnName: "external_contract_code", inputType: null, label: "external_contract_code", updatedValue: null, value: "Test006" },
        { columnName: "begin_contract_date", inputType: null, label: "begin_contract_date", updatedValue: null, value: "2020-01-10" },
        { columnName: "end_contract_date", inputType: null, label: "end_contract_date", updatedValue: null, value: "2020-01-04" },
        { columnName: "origin_facility_id", inputType: null, label: "origin_facility_id", updatedValue: null, value: 1 },
        { columnName: "destination_facility_id", inputType: null, label: "destination_facility_id", updatedValue: null, value: 1 },
        { columnName: "company_id", inputType: null, label: null, updatedValue: 2, value: null },
        { columnName: "cost_segment_id", inputType: null, label: null, updatedValue: 1, value: null },
        { columnName: "plate_miles", inputType: "num", label: "Plate Miles", updatedValue: 2128612.9, value: null },
        { columnName: "dh_portal_miles", inputType: "num", label: "Dead Head & Portal Miles", updatedValue: 87208.15, value: null },
        { columnName: "annual_miles", inputType: "num", label: "Annual Total Miles", updatedValue: 2215821.05, value: null },
        { columnName: "plate_hours", inputType: "num", label: "Plate Hours", updatedValue: 54936, value: null },
        { columnName: "misc_hours", inputType: "num", label: "Inspection, Equipment, Deadhead, Portal Hours", updatedValue: 4306, value: null },
        { columnName: "annual_hours", inputType: "num", label: "Annual Total Hours", updatedValue: 59242, value: null },
        { columnName: "plate_gallons", inputType: "num", label: "Plate Gallons", updatedValue: 367454.51, value: null },
        { columnName: "dh_portal_gallons", inputType: "num", label: "Dead Head & Portal Gallons", updatedValue: null, value: null },
        { columnName: "annual_gallons", inputType: "num", label: "Annual Total Gallons", updatedValue: 367454.51, value: null },
        { columnName: "vehicle_type_id", inputType: null, label: null, updatedValue: 16, value: null },
        { columnName: "num_vehicle", inputType: "num", label: "Number of Vehicles", updatedValue: 24, value: null },
        { columnName: "trailer_type", inputType: "select", label: "Trailer Type", updatedValue: "NEW Dry Van 53'", value: null },
        { columnName: "trailer_type_id", inputType: null, label: null, updatedValue: 5, value: null },
        { columnName: "num_trailer", inputType: "num", label: "Number of Trailers", updatedValue: 31, value: null },
        { columnName: "total_trips", inputType: "num", label: "Total Number of Trips", updatedValue: 66, value: null },
        { columnName: "total_fix_oc_cost", inputType: "num", label: "Total Fixed & Operational Costs", updatedValue: 2435407.34, value: null },
        { columnName: "total_op_labor_cost", inputType: "num", label: "Total Operation Labor Costs", updatedValue: 1894943.86, value: null },
        { columnName: "total_revenue", inputType: "num", label: "Total Revenue (Offer)", updatedValue: 4395756.32, value: null },
      ],
      editedFieldData: [
        { columnName: "contract_test_id", inputType: null, label: null, updatedValue: null, value: null },
        { columnName: "modified_timestamp", inputType: null, label: "Modified At", updatedValue: null, value: null },
        { columnName: "modified_by", inputType: null, label: "modified_by", updatedValue: null, value: null },
        { columnName: "contract_id", inputType: null, label: "contract_id", updatedValue: null, value: 853 },
        { columnName: "external_contract_code", inputType: null, label: "external_contract_code", updatedValue: null, value: "Test006" },
        { columnName: "begin_contract_date", inputType: null, label: "begin_contract_date", updatedValue: null, value: "2020-01-10" },
        { columnName: "end_contract_date", inputType: null, label: "end_contract_date", updatedValue: null, value: "2020-01-04" },
        { columnName: "origin_facility_id", inputType: null, label: "origin_facility_id", updatedValue: null, value: 1 },
        { columnName: "destination_facility_id", inputType: null, label: "destination_facility_id", updatedValue: null, value: 1 },
        { columnName: "company_id", inputType: null, label: null, updatedValue: null, value: null },
        { columnName: "cost_segment_id", inputType: null, label: null, updatedValue: null, value: null },
        { columnName: "plate_miles", inputType: "num", label: "Plate Miles", updatedValue: null, value: null },
        { columnName: "dh_portal_miles", inputType: "num", label: "Dead Head & Portal Miles", updatedValue: null, value: null },
        { columnName: "annual_miles", inputType: "num", label: "Annual Total Miles", updatedValue: null, value: null },
        { columnName: "plate_hours", inputType: "num", label: "Plate Hours", updatedValue: null, value: null },
        { columnName: "misc_hours", inputType: "num", label: "Inspection, Equipment, Deadhead, Portal Hours", updatedValue: null, value: null },
        { columnName: "annual_hours", inputType: "num", label: "Annual Total Hours", updatedValue: null, value: null },
        { columnName: "plate_gallons", inputType: "num", label: "Plate Gallons", updatedValue: null, value: null },
        { columnName: "dh_portal_gallons", inputType: "num", label: "Dead Head & Portal Gallons", updatedValue: null, value: null },
        { columnName: "annual_gallons", inputType: "num", label: "Annual Total Gallons", updatedValue: null, value: null },
        { columnName: "vehicle_type_id", inputType: null, label: null, updatedValue: null, value: null },
        { columnName: "num_vehicle", inputType: "num", label: "Number of Vehicles", updatedValue: null, value: null },
        { columnName: "trailer_type", inputType: "select", label: "Trailer Type", updatedValue: null, value: null },
        { columnName: "trailer_type_id", inputType: null, label: null, updatedValue: null, value: null },
        { columnName: "num_trailer", inputType: "num", label: "Number of Trailers", updatedValue: null, value: null },
        { columnName: "total_trips", inputType: "num", label: "Total Number of Trips", updatedValue: null, value: null },
        { columnName: "total_fix_oc_cost", inputType: "num", label: "Total Fixed & Operational Costs", updatedValue: null, value: null },
        { columnName: "total_op_labor_cost", inputType: "num", label: "Total Operation Labor Costs", updatedValue: null, value: null },
        { columnName: "total_revenue", inputType: "num", label: "Total Revenue (Offer)", updatedValue: null, value: null },
      ],
    };
  }
  has_changed() {
    var hasChanged = false;
    var object = this.state.fieldData;
    object.forEach((item) => {
      if (item.updatedValue !== null && item.updatedValue !== item.value) {
        hasChanged = true;
      }
    });
    // add notification for upated Contract
    return hasChanged;
  }
  update_fieldData(newFieldData) {
    var object = this.state.fieldData;

    object.forEach((item) => {
      let data = item;
      item.updatedValue = null;
      newFieldData.forEach((c) => {
        if (c.columnName === data.columnName) data.value = c.value;
      });

      item = data;
    });
  }
  set_variable_id(object, variable_key, value) {
    var variable = variable_key.substring(0, variable_key.lastIndexOf("_")) + "_id";
    var set = false;
    object.forEach((item) => {
      if (item.columnName === variable) {
        item.updatedValue = value;
        set = true;
      }
    });
    if (set === false) {
      object.push([null, value, variable, "", "None"]);
    }
    return object;
  }

  handleSubmit() {
    // navigate to "viewCost Data"
    console.log("submitted");
  }
  render() {
    return (
      <MDBCard className="m-2">
        <MDBCardHeader>
          <h4>Add New Contract</h4>
          <h5>
            <Select autoFocus options={this.props.selectOptions} isMulti placeholder={"Search for Contracts by ID"} onChange={console.log("changed")} />
          </h5>
          <h4>
            <Button type="submit">Search</Button>
          </h4>
        </MDBCardHeader>
        <MDBCardBody>
          <MDBContainer>
            <form onSubmit={this.handleSubmit}>
              <MDBRow>
                <MDBCol md="6">
                  <p className="h5 text-center mb-4">Data Column</p>

                  <div className="grey-text">
                    {this.state.editedFieldData.map(
                      (c, index) =>
                        c.label !== null && (
                          <MDBInput
                            label={c.label}
                            id={c.index}
                            value={c.updatedValue}
                            icon="user"
                            group
                            type="text"
                            validate
                            error="wrong"
                            success="right"
                            onChange={(e) => {
                              var object = this.state.editedFieldData;
                              var specials = /[*|":<>[\]{}`\\()';@&$]/; //TODO setup global module to sanatize stuff.
                              object[index].updatedValue = e.target.value.replace(specials, "");
                              this.setState({ editContract: object });
                            }}
                            placeholder={c.value}
                          />
                        )
                    )}
                  </div>
                </MDBCol>
                <MDBCol md="12">
                  <div className="text-center">
                    <MDBBtn outline color="info" type="submit" onClick={this.handleSubmit}>
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
}
