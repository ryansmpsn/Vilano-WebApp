import React from "react";
import { Card, Row, Col } from "react-bootstrap";

function ViewRateSheets(props) {
  let { rateSheets } = props;
  return (
    <>
      {rateSheets.map((segment, index) => (
        <Card className={"mb-3 "} key={index}>
          {console.log(segment)}
          <Card.Header>
            <h4 className="float-left">
              {segment[1].label}: {segment[1].value}
            </h4>
            <h5 className=" m-0 mr-2 float-right">
              {segment[2].label}: {segment[2].value}
            </h5>
          </Card.Header>
          <Card.Body>
            <Row>
              {segment[3].value.map(
                (c, index) =>
                  c[6].value !== null && (
                    <Col md="2" key={index + "body"}>
                      <p className="mx-0 my-2 border-bottom overflow-hidden" style={{ textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {c[3].value} : <br />
                        <small className="text-muted m-0 ">{c[6].value ? c[6].value.toLocaleString() : " -"}</small>
                      </p>
                    </Col>
                  )
              )}
            </Row>
          </Card.Body>
        </Card>
      ))}
    </>
  );
}

export default ViewRateSheets;
