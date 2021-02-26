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

  function updateBorder(x) {
    if (x[9].updatedValue === false) {
      return "danger";
    }
    if (props.modified) {
      return "warning";
    }

    if (x[7].updatedValue === "true") {
      return "info";
    } else return "light";
  }
  return (
    contractEmployees !== null &&
    contractEmployees.map((employee, index) => (
      <Col md="3" key={"dataCol" + index}>
        <Card className="mb-3" border={updateBorder(employee)}>
          <Card.Header>{props.contracts ? `Contract Number: ${employee[4].updatedValue} ` : employee[1].updatedValue + " " + employee[2].updatedValue}</Card.Header>
          <Card.Body style={{ lineHeight: 0.89 }}>
            {employee.map(
              (content, arrayIndex) =>
                content.label !== null &&
                ((props.modified && content.label === "Role" && (
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
                        isDisabled={props.contracts ? !employee[2].updatedValue : !employee[9].updatedValue}
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
                        object[index][arrayIndex].updatedValue = !content.updatedValue;
                        props.setContractEmployees(object);
                      }}
                      checked={content.updatedValue === true || content.updatedValue === "true"}
                      disabled={props.contracts ? !employee[2].updatedValue : !employee[9].updatedValue}
                    />
                  )) || (
                    <Card.Text key={"employeeContent" + arrayIndex}>
                      {content.label}: {content.updatedValue}
                    </Card.Text>
                  ))
            )}
          </Card.Body>
          <Card.Footer>
            {!props.contracts && (
              <Button className="btn btn-sm" variant="outline-info" onClick={() => searchEmployee(employee[0].updatedValue)}>
                view profile
              </Button>
            )}

            {!props.profile &&
              (!props.modified ? (
                <Button className="btn btn-sm float-right" variant="outline-primary" onClick={() => props.editContract(employee, index)}>
                  edit
                </Button>
              ) : (
                // TODO add remove Button to set active to false
                <Button className="btn btn-sm float-right" variant="outline-danger" onClick={() => props.removeEmployee(index)} disabled={props.contracts ? !employee[2].updatedValue : !employee[9].updatedValue}>
                  remove
                </Button>
              ))}
          </Card.Footer>
        </Card>
      </Col>
    ))
  );
}

export default DisplayContractEmployee;
