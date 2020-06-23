import React, { useState } from "react";
import { useToasts } from "react-toast-notifications";
import { MDBCardBody, MDBContainer, MDBRow, MDBCol, MDBInput, MDBIcon, MDBBtn } from "mdbreact";
import { Spinner } from "react-bootstrap";

function UpsertCostSegment(props) {
  const { addToast } = useToasts();
  const [submitting, setSubmitting] = useState(false);

  function buildJsonObject() {
    setSubmitting(true);
    let rateSheetItems = [];
    props.units.forEach((c, index) => {
      var rateArray = [];
      rateArray.push({ rate_item_code: props.units[index].rateItemCode }, c, props.unitCost[index], props.annualCost[index]);
      rateSheetItems.push(rateArray);
    });
    props.remarkAnnualCost.forEach((c, index) => {
      var rateArray = [];
      rateArray.push({ rate_item_code: props.remarkAnnualCost[index].rateItemCode }, c);
      rateSheetItems.push(rateArray);
    });
    let costSegment = [
      { columnName: "cost_segment", updatedValue: props.selectedCostSegment },
      { columnName: "vw_contract_rate_sheet_items", value: rateSheetItems },
    ];
    let jsonData = props.contractData;
    jsonData.push({
      columnName: "vw_contract_rate_sheet_segment",
      inputType: null,
      label: "Cost Segment",
      updatedValue: null,
      value: costSegment,
    });

    props.submitAction(jsonData).then((res) => {
      addToast("Rate Sheet Submitted Successfully!", {
        appearance: "success",
        autoDismiss: true,
      });
      setSubmitting(false);
    });
  }

  return (
    <MDBCardBody>
      <MDBContainer fluid>
        <MDBRow>
          {props.contractData !== null &&
            props.contractData.map(
              (c, index) =>
                !Array.isArray(c.value) &&
                c.label !== null && (
                  <MDBCol md="2" key={c.label + index}>
                    <p className="h5 mb-1">{c.label}: </p>
                    <div className="text-muted">{c.value}</div>
                  </MDBCol>
                )
            )}
        </MDBRow>
        <p className="h4 text-center mb-4">Remarks:</p>
        <div className="grey-text">
          <MDBRow>
            <MDBCol md="6">
              <div className="grey-text">
                {props.remarkAnnualCost.map(
                  (c, index) =>
                    index < 3 && (
                      <MDBInput
                        key={c.label + index}
                        label={c.label}
                        id={c.label}
                        value={c.updatedValue === null ? (c.value === null ? "" : c.value) : c.updatedValue}
                        placeholder={c.value}
                        icon={c.icon}
                        group
                        type="text"
                        validate
                        error="wrong"
                        success="right"
                        onChange={(e) => {
                          var object = props.remarkAnnualCost;
                          var specials = /[*|":<>[\]{}`\\()';@&$]/; //TODO setup global module to sanatize stuff.
                          object[index].updatedValue = e.target.value.replace(specials, "");
                          props.setRemarkAnnualCost(object);
                        }}
                      />
                    )
                )}
              </div>
            </MDBCol>
            <MDBCol md="6">
              <div className="grey-text">
                {props.remarkAnnualCost.map(
                  (c, index) =>
                    index > 2 && (
                      <MDBInput
                        key={c.label + index}
                        label={c.label}
                        id={c.label}
                        value={c.updatedValue === null ? (c.value === null ? "" : c.value) : c.updatedValue}
                        placeholder={c.value}
                        icon={c.icon}
                        group
                        type="text"
                        validate
                        error="wrong"
                        success="right"
                        onChange={(e) => {
                          var object = props.remarkAnnualCost;
                          var specials = /[*|":<>[\]{}`\\()';@&$]/; //TODO setup global module to sanatize stuff.
                          object[index].updatedValue = e.target.value.replace(specials, "");
                          props.setRemarkAnnualCost(object);
                        }}
                      />
                    )
                )}
              </div>
            </MDBCol>
          </MDBRow>
        </div>

        <p className="h4 text-center mb-4">Basis For Determining Cost</p>
        <div className="grey-text">
          {props.itemLabels.map((c, index) => (
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
                      {props.units[index].label !== null ? (
                        <MDBInput
                          label={props.units[index].label}
                          id={props.units[index].id}
                          value={
                            props.units[index].updatedValue === null ? props.units[index].value : props.units[index].updatedValue
                          }
                          placeholder={props.units[index].value}
                          icon={props.units[index].icon}
                          group
                          type="text"
                          validate
                          error="wrong"
                          success="right"
                          onChange={(e) => {
                            var object = props.units;
                            var specials = /[*|":<>[\]{}`\\()';@&$]/; //TODO setup global module to sanatize stuff.
                            object[index].updatedValue = e.target.value.replace(specials, "");
                            props.setUnits(object);
                          }}
                        />
                      ) : (
                        <MDBInput disabled />
                      )}
                    </div>
                  </MDBCol>
                  <MDBCol md="4">
                    <div className="grey-text">
                      {props.unitCost[index].label !== null ? (
                        <MDBInput
                          label={props.unitCost[index].label}
                          id={props.unitCost[index].id}
                          value={
                            props.unitCost[index].updatedValue === null
                              ? props.unitCost[index].value
                              : props.unitCost[index].updatedValue
                          }
                          placeholder={props.unitCost[index].value}
                          icon={props.unitCost[index].icon}
                          group
                          type="text"
                          validate
                          error="wrong"
                          success="right"
                          onChange={(e) => {
                            var object = props.unitCost;
                            var specials = /[*|":<>[\]{}`\\()';@&$]/; //TODO setup global module to sanatize stuff.
                            object[index].updatedValue = e.target.value.replace(specials, "");
                            props.setUnitCost(object);
                          }}
                        />
                      ) : (
                        <MDBInput disabled />
                      )}
                    </div>
                  </MDBCol>
                  <MDBCol md="4">
                    <div className="grey-text">
                      {props.annualCost[index].label !== null ? (
                        <MDBInput
                          label={props.annualCost[index].label}
                          id={props.annualCost[index].id}
                          value={
                            props.annualCost[index].updatedValue === null
                              ? props.annualCost[index].value
                              : props.annualCost[index].updatedValue
                          }
                          placeholder={props.annualCost[index].value}
                          icon={props.annualCost[index].icon}
                          group
                          type="text"
                          validate
                          error="wrong"
                          success="right"
                          onChange={(e) => {
                            var object = props.annualCost;
                            var specials = /[*|":<>[\]{}`\\()';@&$]/; //TODO setup global module to sanatize stuff.
                            object[index].updatedValue = e.target.value.replace(specials, "");
                            props.setAnnualCost(object);
                          }}
                        />
                      ) : (
                        <MDBInput disabled />
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
              {submitting ? (
                <MDBContainer>
                  <Spinner animation="border" variant="primary" />
                </MDBContainer>
              ) : (
                <MDBBtn outline color="info" type="button" onClick={buildJsonObject}>
                  Send
                  <MDBIcon far icon="paper-plane" className="ml-1" />
                </MDBBtn>
              )}
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBCardBody>
  );
}

export default UpsertCostSegment;
