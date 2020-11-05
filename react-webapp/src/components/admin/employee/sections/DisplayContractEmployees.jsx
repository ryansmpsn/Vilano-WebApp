import React from "react";
import { FormCheck, Button, Card, Col, Row } from "react-bootstrap";
import Select from "react-select";
import { useNavigate } from "react-router";

function DisplayContractEmployee(props) {
  let navigate = useNavigate();

  const contractEmployees = props.contractEmployees;
  const customStyles = {
    control: (base) => ({
      ...base,
      height: 35,
      minHeight: 35,
    }),
  };

  function searchEmployee(x) {
    navigate("/administration/employee/" + x);
  }
  return (
    contractEmployees !== null &&
    contractEmployees.map((employee, index) => (
      <Col md="3" key={"dataCol" + index}>
        <Card className="mb-3" border={props.modified ? "warning" : employee[7].value === "true" ? "info" : "light"}>
          <Card.Header>{employee[1].value + " " + employee[2].value}</Card.Header>
          <Card.Body style={{ lineHeight: 0.89 }}>
            {employee.map(
              (content, arrayIndex) =>
                content.label !== null &&
                ((props.modified && content.inputType === "select" && (
                  <Row key={"employeeContent" + arrayIndex}>
                    <Col md="3" className="mt-2 pr-0">
                      <Card.Text>{content.label}:</Card.Text>
                    </Col>
                    <Col>
                      <Select
                        className="mt-2"
                        options={props.employeeDropdowns[3].options}
                        onChange={(x) => props.handleRoleSelect(x, index)}
                        styles={customStyles}
                      />
                    </Col>
                  </Row>
                )) ||
                  (props.modified && content.inputType === "checkbox" && (
                    <FormCheck
                      key={"employeeContent" + arrayIndex}
                      id={content.columnName}
                      label={<Card.Text className="m-0">{content.label}</Card.Text>}
                      type="checkbox"
                      onChange={() => {
                        var object = [...contractEmployees];
                        object[index][arrayIndex].value = !content.value;
                        props.setContractEmployees(object);
                      }}
                      checked={content.value}
                    />
                  )) || (
                    <Card.Text key={"employeeContent" + arrayIndex}>
                      {content.label}: {content.value}
                    </Card.Text>
                  ))
            )}
          </Card.Body>
          <Card.Footer>
            <Button className="btn btn-sm" variant="outline-info" onClick={() => searchEmployee(employee[0].value)}>
              view profile
            </Button>
            {!props.modified ? (
              <Button className="btn btn-sm float-right" variant="outline-warning" onClick={() => console.log("remove this emp")}>
                edit
              </Button>
            ) : (
              <Button className="btn btn-sm float-right" variant="outline-danger" onClick={() => console.log("remove this emp")}>
                remove
              </Button>
            )}
          </Card.Footer>
        </Card>
      </Col>
    ))
  );
}

export default DisplayContractEmployee;
