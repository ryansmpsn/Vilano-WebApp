import React, { useState } from "react";
import { Modal, Row, Col, Button, FormControl, FormLabel, Form } from "react-bootstrap";
import Select from "react-select";
import DatePicker from "react-date-picker";

function FinalizeBidModal(props) {
  const [date, setDate] = useState(
    new Date(new Date().getUTCMonth() + 1 + "/" + new Date().getUTCDate() + "/" + new Date().getUTCFullYear())
  );
  const [toggler, setToggler] = useState(null);
  const [awardedFinalBid, setAwardedFinalBid] = useState([
    // {
    //   columnName: "contract_bid_final_id",
    //   updatedValue: 10,
    // },
    {
      columnName: "contract_bid_id",
      updatedValue: props.contract[0].value,
    },
    {
      columnName: "status_id",
      updatedValue: 17,
    },
    {
      columnName: "effective_date",
      updatedValue: new Date(new Date().getUTCMonth() + 1 + "/" + new Date().getUTCDate() + "/" + new Date().getUTCFullYear()),
    },
  ]);

  const [deniedFinalBid, setDeniedFinalBid] = useState([
    {
      columnName: "contract_bid_id",
      updatedValue: props.contract[0].value,
    },
    {
      columnName: "status_id",
      updatedValue: 20,
    },
    {
      columnName: "bid_loss_type_id",
      updatedValue: null,
    },
    {
      columnName: "bid_loss_reason",
      updatedValue: "",
    },
  ]);

  function getInfo() {
    if (awardedFinalBid[1].updatedValue === 17) {
      console.log(awardedFinalBid);
    } else console.log(deniedFinalBid);
  }
  return (
    <Modal show={props.show} onHide={props.closeModal} centered>
      <Modal.Header closeButton> Finalize Bid: {props.contract[10].value}</Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Row className="justify-content-md-center">
            <Form.Group as={Col} md="8">
              <FormLabel>Bid Status: </FormLabel>
              <Select
                options={props.bidOptions[0].options}
                onChange={(x) => {
                  x.value === 17 && setToggler(1);
                  x.value === 20 && setToggler(0);
                }}
              />
            </Form.Group>

            {toggler === 1 && (
              <Form.Group as={Col} md="8">
                <FormLabel>Effective Date: </FormLabel>
                <DatePicker
                  onChange={(e) => {
                    var object = awardedFinalBid;
                    var date = new Date(e);
                    var return_date = date.getUTCFullYear() + "-" + (date.getUTCMonth() + 1) + "-" + date.getUTCDate();
                    object[2].updatedValue = return_date;
                    setAwardedFinalBid(object);
                    setDate(date);
                  }}
                  value={date}
                />
              </Form.Group>
            )}
            {toggler === 0 && (
              <>
                <Form.Group as={Col} md="8">
                  <FormLabel>Bid Loss Type: </FormLabel>

                  <Select
                    options={props.bidOptions[1].options}
                    onChange={(x) => {
                      let object = deniedFinalBid;
                      object[2].updatedValue = x.value;
                      setDeniedFinalBid(object);
                    }}
                  />
                </Form.Group>
                <Form.Group as={Col} md="8">
                  <FormLabel>Reason(s) for losing the bid: </FormLabel>
                  <FormControl
                    as="textarea"
                    onChange={(e) => {
                      var object = deniedFinalBid;
                      var specials = /[*|":<>[\]{}`\\()';@&$]/;
                      object[3].updatedValue = e.target.value.replace(specials, "");
                      setDeniedFinalBid(object);
                    }}
                  />
                </Form.Group>
              </>
            )}
          </Form.Row>
        </Form>

        {console.log(props)}
      </Modal.Body>
      {toggler !== null && (
        <Modal.Footer>
          <Button onClick={getInfo}> Send</Button>
        </Modal.Footer>
      )}
    </Modal>
  );
}

export default FinalizeBidModal;
