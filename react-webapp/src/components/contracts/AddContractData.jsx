import React, { useState } from "react";
// import { useToasts } from "react-toast-notifications";
import Select from "react-select";
import { MDBCard, MDBCardHeader, MDBCardBody, MDBContainer, MDBRow, MDBCol, MDBInput, MDBIcon, MDBBtn } from "mdbreact";
import { Button } from "react-bootstrap";
import Send from "../../libs/send";
import { Redirect } from "react-router-dom";

export default class AddContractData extends React.Component {
  // const { addToast } = useToasts();
  constructor(props) {
    super(props);
    this.state = {
      contractSearch: 1,
      contractData: null,
      search: false,
      editedFieldData: [
        { columnName: "contract_test_id", inputType: null, label: null, updatedValue: null, value: null },
        { columnName: "modified_timestamp", inputType: null, label: "Modified At", updatedValue: null, value: null },
        { columnName: "modified_by", inputType: null, label: "modified_by", updatedValue: null, value: null },
        { columnName: "contract_id", inputType: null, label: "contract_id", updatedValue: null, value: null },
        { columnName: "external_contract_code", inputType: null, label: "external_contract_code", updatedValue: null, value: null },
        { columnName: "begin_contract_date", inputType: null, label: "begin_contract_date", updatedValue: null, value: null },
        { columnName: "end_contract_date", inputType: null, label: "end_contract_date", updatedValue: null, value: null },
        { columnName: "origin_facility_id", inputType: null, label: "origin_facility_id", updatedValue: null, value: null },
        { columnName: "destination_facility_id", inputType: null, label: "destination_facility_id", updatedValue: null, value: null },
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
    this.updateEditData = this.updateEditData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  async handleSubmit() {
    // navigate to "viewCost Data"
    let output = this.state.editedFieldData;
    console.log(output);

    Send.post("/Contract/ContractTest", this.state.editedFieldData, this.props.appProps).then((res) => {
      console.log(res);

      window.location.href = "/contract/costdata";
    });
  }

  updateEditData() {
    console.log("Searching...");
    this.props.setSelectedContractId(this.state.contractSearch);

    Send.get("/Contract/" + this.state.contractSearch, this.props.appProps).then((res) => {
      this.setState({ search: true });
      this.setState({ contractData: res.data[0] });
      let object = [];
      this.state.editedFieldData.forEach((item) => {
        let data = item;

        this.state.contractData.forEach((c) => {
          if (c.columnName === item.columnName) {
            data.value = c.value;
            object.push(data);
          } else {
            console.log(c);
          }
        });
        data.value === null && object.push(data);
      });
      console.log(object);
      this.setState({ editedFieldData: object });
    });
  }
  handleRedirect() {
    return <Redirect to="/contracts/costdata" />;
  }

  render() {
    return (
      <MDBCard className="m-2">
        <MDBCardHeader>
          <h4>Add New Contract</h4>
          <form onSubmit={this.handleSubmit}>
            <h5>
              <Select
                autoFocus
                options={this.props.selectOptions}
                placeholder={"Search for Contracts by ID"}
                onChange={(x) => {
                  this.setState({ contractSearch: x.value });
                }}
              />
            </h5>
            <h4>
              <Button type="button" onClick={this.updateEditData}>
                Search
              </Button>
            </h4>
          </form>
        </MDBCardHeader>
        <MDBCardBody>
          <MDBContainer>
            <form onSubmit={this.handleSubmit}>
              {" "}
              {this.state.search ? (
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
                              value={c.updatedValue === null ? c.value : c.updatedValue}
                              icon="user"
                              group
                              type="text"
                              validate
                              error="wrong"
                              success="right"
                              disabled={c.value !== null}
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
                      <MDBBtn outline color="info" type="button" onClick={this.handleSubmit}>
                        Send
                        <MDBIcon far icon="paper-plane" className="ml-1" />
                      </MDBBtn>
                    </div>
                  </MDBCol>
                </MDBRow>
              ) : (
                <MDBRow>
                  <MDBCol md="6">
                    <p className="h5 text-center mb-4">Search for a contract to add a cost segment</p>
                  </MDBCol>
                </MDBRow>
              )}
            </form>
          </MDBContainer>
        </MDBCardBody>
      </MDBCard>
    );
  }
}
