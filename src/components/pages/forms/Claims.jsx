import React from "react";
import {
  Row,
  Col,
  Card,
  Form,
  FormGroup,
  FormLabel,
  Button,
} from "react-bootstrap";
function NewPageTemplate() {
  return (
    <Card>
      <Card.Header>
        <h3 className="m-2 text-center">Vehicle Incident Report</h3>
      </Card.Header>
      <Card.Body className="text-center">
        <Form.Group>
          <Form.Label className="border border-dark w-75">
            This is an on-the-job injury not involving a motor vehicle crash. I
            am a current lead driver, supervisor, manager, or a company agent
            for one of the following companys: Postal Fleet Services, Inc., The
            Stageline Company, and or Omega Mile.
          </Form.Label>
          <Form.Group controlId="terms">
            <Form.Check
              type="checkbox"
              label="I Agree to the Terms and Conditions."
            />
          </Form.Group>
          <p className="text-muted">
            <small>
              DISCLAIMER: We are not obligated to follow-up and or contact
              non-employees as described above.
            </small>
          </p>
          <hr />
          <Form.Row>
            <Form.Group as={Col} md={6} sm={12} controlId="lastName">
              <Form.Label>First Name</Form.Label>
              <Form.Control placeholder="First Name" />
            </Form.Group>

            <Form.Group as={Col} md={6} sm={12} controlId="firstName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control placeholder="Last Name" />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md={4} sm={12} controlId="companyName">
              <Form.Label>Company Name</Form.Label>
              <Form.Control as="select" defaultValue="Postal Fleet Services">
                <option>Postal Fleet Services</option>
                <option>The Stageline Company</option>
                <option>Omega Mile</option>
                <option>R.W. Byrd</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} md={4} sm={12} controlId="contractNumber">
              <Form.Label>Contract Number</Form.Label>
              <Form.Control as="select" defaultValue="A1A">
                <option>A1A</option>
                <option>B2B</option>
                <option>C3C</option>
                <option>D4D</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} md={4} sm={12} controlId="tripNumber">
              <Form.Label>Trip Number</Form.Label>
              <Form.Control as="select" defaultValue="Trip 1">
                <option>Trip 1</option>
                <option>Trip 2</option>
                <option>Trip 3</option>
                <option>Trip 4</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <fieldset className="text-left" as={Col} md={6} sm={12}>
              <Form.Group as={Row}>
                <Form.Label as="legend" column sm={8}>
                  Did the Company Driver Receive a Citation?
                </Form.Label>
                <Col sm={2}>
                  <Form.Check
                    type="radio"
                    label="Yes"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios1"
                  />
                  <Form.Check
                    type="radio"
                    label="No"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios2"
                  />
                  <Form.Check
                    type="radio"
                    label="Unknown"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios3"
                  />
                </Col>
              </Form.Group>
            </fieldset>
            <Form.Group
              controlId="injury"
              className="text-left"
              as={Col}
              md={2}
              sm={12}
            >
              <Form.Check type="checkbox" label="Injury?" />
            </Form.Group>
            <Form.Group
              controlId="fatality"
              className="text-left"
              as={Col}
              md={2}
              sm={12}
            >
              <Form.Check type="checkbox" label="Fatality?" />
            </Form.Group>
            <Form.Group
              controlId="towAway"
              className="text-left"
              as={Col}
              md={2}
              sm={12}
            >
              <Form.Check type="checkbox" label="Tow-Away?" />
            </Form.Group>
          </Form.Row>
          <div className="m-3 text-left">
            <b>
              If you answered yes to any of the above questions, please contact
              the Safety Director Immediatly 904-824-2007 (Follow Prompts if
              Afterhours)
            </b>
            <h4 className="text-center">
              Post Accident Drug & Alcohol Testing
            </h4>
            <p>§382.303 Post-accident testing.</p>
            (a) As soon as practicable following an occurrence involving a
            commercial motor vehicle operating on a public road in commerce,
            each employer shall test for alcohol for each of its surviving
            drivers:
            <p></p>
            <p>
              (1) Who was performing safety-sensitive functions with respect to
              the vehicle, if the accident involved the loss of human life; or
            </p>
            <p>
              (2) Who receives a citation within 8 hours of the occurrence under
              State or local law for a moving traffic violation arising from the
              accident, if the accident involved:
            </p>
            <p>
              (i) Bodily injury to any person who, as a result of the injury,
              immediately receives medical treatment away from the scene of the
              accident; or
            </p>
            <p>
              (ii) One or more motor vehicles incurring disabling damage as a
              result of the accident, requiring the motor vehicle to be
              transported away from the scene by a tow truck or other motor
              vehicle.
            </p>
            <p>
              (b) As soon as practicable following an occurrence involving a
              commercial motor vehicle operating on a public road in commerce,
              each employer shall test for controlled substances for each of its
              surviving drivers:
            </p>
            <p>
              (1) Who was performing safety-sensitive functions with respect to
              the vehicle, if the accident involved the loss of human life; or
            </p>
            <p>
              (2) Who receives a citation within thirty-two hours of the
              occurrence under State or local law for a moving traffic violation
              arising from the accident, if the accident involved:
            </p>
            <p>
              (i) Bodily injury to any person who, as a result of the injury,
              immediately receives medical treatment away from the scene of the
              accident; or
            </p>
            <p>
              (ii) One or more motor vehicles incurring disabling damage as a
              result of the accident, requiring the motor vehicle to be
              transported away from the scene by a tow truck or other motor
              vehicle.
            </p>
            <p>
              (c) The following table notes when a post-accident test is
              required to be conducted by paragraphs (a)(1), (a)(2), (b)(1), and
              (b)(2) of this section:
            </p>
            <p>
              (d)(1) Alcohol tests. If a test required by this section is not
              administered within two hours following the accident, the employer
              shall prepare and maintain on file a record stating the reasons
              the test was not promptly administered. If a test required by this
              section is not administered within eight hours following the
              accident, the employer shall cease attempts to administer an
              alcohol test and shall prepare and maintain the same record.
              Records shall be submitted to the FMCSA upon request.
            </p>
            <p>
              (2) Controlled substance tests. If a test required by this section
              is not administered within 32 hours following the accident, the
              employer shall cease attempts to administer a controlled
              substances test, and prepare and maintain on file a record stating
              the reasons the test was not promptly administered. Records shall
              be submitted to the FMCSA upon request.
            </p>
          </div>

          {/* <Row>
              <Form.Row>
    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label>Email</Form.Label>
      <Form.Control type="email" placeholder="Enter email" />
    </Form.Group>

    <Form.Group as={Col} controlId="formGridPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" />
    </Form.Group>
  </Form.Row>
        </Row> */}
          <Button>Submit</Button>
        </Form.Group>
      </Card.Body>
    </Card>
  );
}

export default NewPageTemplate;
