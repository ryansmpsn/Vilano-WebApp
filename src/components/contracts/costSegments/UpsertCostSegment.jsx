import React, { useState } from "react";
import { useToasts } from "react-toast-notifications";
import { Card, Container, Row, Col, Form } from "react-bootstrap";
import { Spinner, Button } from "react-bootstrap";

function UpsertCostSegment(props) {
  const { addToast } = useToasts();
  const [submitting, setSubmitting] = useState(false);

  function buildJsonObject(event) {
    event.preventDefault();
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

    let JSONData = props.contractData;

    if (props.type === "Contract") {
      let costSegment = [
        { columnName: "cost_segment", updatedValue: props.selectedCostSegment },
        { columnName: "vw_contract_rate_sheet_items", value: rateSheetItems },
      ];

      JSONData.push({
        columnName: "vw_contract_rate_sheet_segment",
        inputType: null,
        label: "Cost Segment",
        updatedValue: null,
        value: costSegment,
      });
    }
    if (props.type === "Bid") {
      let costSegment = [
        { columnName: "cost_segment", updatedValue: props.selectedCostSegment },
        { columnName: "vw_contract_bid_rate_sheet_items", value: rateSheetItems },
      ];

      JSONData.push({
        columnName: "vw_contract_bid_rate_sheet_segment",
        inputType: null,
        label: "Cost Segment",
        updatedValue: null,
        value: [costSegment],
      });
    }

    props.submitAction(JSONData).then((res) => {
      addToast("Rate Sheet Submitted Successfully!", {
        appearance: "success",
        autoDismiss: true,
      });
      setSubmitting(false);
    });
  }

  return (
    <Card.Body>
      <Container fluid>
        <form onSubmit={buildJsonObject}>
          <Row>
            {props.contractData !== null &&
              props.contractData.map(
                (c, index) =>
                  !Array.isArray(c.value) &&
                  c.label !== null && (
                    <Col md="2" key={c.label + index}>
                      <p className="h5 mb-1">{c.label}: </p>
                      <div className="text-muted">{c.value}</div>
                    </Col>
                  )
              )}
          </Row>
          <p className="h4 text-center mb-4">Remarks:</p>
          <div className="grey-text">
            <Row>
              <Col md="6">
                {props.remarkAnnualCost.map(
                  (c, index) =>
                    index < 3 && (
                      <Form.Group key={c.label + index}>
                        <div className={"mr-2 fas fa-" + c.icon} />
                        <Form.Label>{c.label}</Form.Label>
                        <Form.Control
                          id={c.label}
                          value={c.updatedValue === null ? (c.value === null ? "" : c.value) : c.updatedValue}
                          placeholder={c.value}
                          type="number"
                          max="999999999999.99"
                          min="0"
                          step="0.01"
                          error="wrong"
                          success="right"
                          onChange={(e) => {
                            var object = props.remarkAnnualCost;
                            var specials = /[*|":<>[\]{}`\\()';@&$]/; //TODO setup global module to sanatize stuff.
                            object[index].updatedValue = e.target.value.replace(specials, "");
                            props.setRemarkAnnualCost(object);
                          }}
                        />
                      </Form.Group>
                    )
                )}
              </Col>
              <Col md="6">
                {props.remarkAnnualCost.map(
                  (c, index) =>
                    index > 2 && (
                      <Form.Group key={c.label + index}>
                        <div className={"mr-2 fas fa-" + c.icon} />
                        <Form.Label>{c.label}</Form.Label>
                        <Form.Control
                          key={c.label + index}
                          id={c.label}
                          value={c.updatedValue === null ? (c.value === null ? "" : c.value) : c.updatedValue}
                          placeholder={c.value}
                          type="number"
                          max="99999999999.99"
                          min="0"
                          step="0.01"
                          error="wrong"
                          success="right"
                          onChange={(e) => {
                            var object = props.remarkAnnualCost;
                            var specials = /[*|":<>[\]{}`\\()';@&$]/; //TODO setup global module to sanatize stuff.
                            object[index].updatedValue = e.target.value.replace(specials, "");
                            props.setRemarkAnnualCost(object);
                          }}
                        />
                      </Form.Group>
                    )
                )}
              </Col>
            </Row>
          </div>

          <p className="h4 text-center mb-4">Basis For Determining Cost</p>
          <div className="grey-text">
            {props.itemLabels.map((c, index) => (
              <Row key={index}>
                <Col md="3">
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
                </Col>

                <Col md="9">
                  <Row>
                    <Col md="4">
                      {props.units[index].label !== null ? (
                        <Form.Group>
                          <div className={"mr-2 fas fa-" + props.units[index].icon} />
                          <Form.Label>{props.units[index].label}</Form.Label>
                          <Form.Control
                            id={props.units[index].id}
                            value={props.units[index].updatedValue === null ? props.units[index].value : props.units[index].updatedValue}
                            placeholder={props.units[index].value}
                            type="number"
                            max="99999999999.999"
                            min="0"
                            step="0.001"
                            error="wrong"
                            success="right"
                            onChange={(e) => {
                              var object = props.units;
                              var specials = /[*|":<>[\]{}`\\()';@&$]/; //TODO setup global module to sanatize stuff.
                              object[index].updatedValue = e.target.value.replace(specials, "");
                              props.setUnits(object);
                            }}
                          />
                        </Form.Group>
                      ) : (
                        <>__</>
                      )}
                    </Col>
                    <Col md="4">
                      {props.unitCost[index].label !== null ? (
                        <Form.Group>
                          <div className={"mr-2 fas fa-" + props.unitCost[index].icon} />
                          <Form.Label>{props.unitCost[index].label}</Form.Label>
                          <Form.Control
                            id={props.unitCost[index].id}
                            value={props.unitCost[index].updatedValue === null ? props.unitCost[index].value : props.unitCost[index].updatedValue}
                            placeholder={props.unitCost[index].value}
                            type="number"
                            max="999999999.99999"
                            min="0"
                            step="0.00001"
                            error="wrong"
                            success="right"
                            onChange={(e) => {
                              var object = props.unitCost;
                              var specials = /[*|":<>[\]{}`\\()';@&$]/; //TODO setup global module to sanatize stuff.
                              object[index].updatedValue = e.target.value.replace(specials, "");
                              props.setUnitCost(object);
                            }}
                          />
                        </Form.Group>
                      ) : (
                        <>__</>
                      )}
                    </Col>
                    <Col md="4">
                      {props.annualCost[index].label !== null ? (
                        <Form.Group>
                          <div className={"mr-2 fas fa-" + props.annualCost[index].icon} />
                          <Form.Label>{props.annualCost[index].label}</Form.Label>
                          <Form.Control
                            id={props.annualCost[index].id}
                            value={props.annualCost[index].updatedValue === null ? props.annualCost[index].value : props.annualCost[index].updatedValue}
                            placeholder={props.annualCost[index].value}
                            type="number"
                            max="999999999999.99"
                            min="0"
                            step="0.01"
                            error="wrong"
                            success="right"
                            onChange={(e) => {
                              var object = props.annualCost;
                              var specials = /[*|":<>[\]{}`\\()';@&$]/; //TODO setup global module to sanatize stuff.
                              object[index].updatedValue = e.target.value.replace(specials, "");
                              props.setAnnualCost(object);
                            }}
                          />
                        </Form.Group>
                      ) : (
                        <>__</>
                      )}
                    </Col>
                  </Row>
                </Col>
              </Row>
            ))}
          </div>
          <Row>
            <Col md="12">
              <div className="text-center">
                {sessionStorage.getItem("/contract/ratesheets") >= 3 &&
                  (submitting ? (
                    <Container>
                      <Spinner animation="border" variant="primary" />
                    </Container>
                  ) : (
                    <Button className="btn-outline-info" type="submit">
                      Save
                      <div className="far fa-paper-plane ml-1" />
                    </Button>
                  ))}
              </div>
            </Col>
          </Row>
        </form>
      </Container>
    </Card.Body>
  );
}

export default UpsertCostSegment;
