import React, { useState } from "react";
import Select from "react-select";
import Send from "../../libs/send";
import DatePicker from "react-date-picker";
import { useToasts } from "react-toast-notifications";
import { Modal, Spinner, Col, Button, FormControl, FormLabel, Form } from "react-bootstrap";

function FinalizeBidModal(props) {
  const { addToast } = useToasts();
  const [isSending, setIsSending] = useState(false);
  const [toggler, setToggler] = useState(null);

  const [date, setDate] = useState(
    new Date(new Date().getUTCMonth() + 1 + "/" + new Date().getUTCDate() + "/" + new Date().getUTCFullYear())
  );
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

  function handleSubmit() {
    setIsSending(true);
    var finalBid;
    if (toggler === 1) {
      finalBid = awardedFinalBid;
    } else finalBid = deniedFinalBid;

    Send.post("/Bid/BidFinal", finalBid)
      .then((res) => {
        setIsSending(false);
        addToast("Bid successfully finalized.", {
          appearance: "success",
          autoDismiss: true,
          autoDismissTimeout: 3000,
        });
        props.closeModal();
      })
      .catch((err) => {
        setIsSending(false);
      });
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
      </Modal.Body>
      {toggler !== null && (
        <Modal.Footer>
          {isSending ? <Spinner animation="border" variant="primary" /> : <Button onClick={() => handleSubmit()}> Save </Button>}
        </Modal.Footer>
      )}
    </Modal>
  );
}

export default FinalizeBidModal;
