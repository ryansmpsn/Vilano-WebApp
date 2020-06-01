import React, { Component } from "react";
import { MDBCard, MDBCardBody, MDBRow, MDBCol, MDBIcon, MDBCardText, MDBBadge } from "mdbreact";
import Select, { createFilter } from "react-select";
import Send from "../../libs/send";
import MenuList from "../../libs/OptimizedSelect";
import { Form } from "react-bootstrap";

class AxiosTestPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "none",
    };
  }

  componentDidMount() {
    Send.get("/Contract/Dropdowns/All", this.props).then((res) => {
      this.setState({ display: res.data[0].options });
      console.log(this.state.display);
    });
  }

  render() {
    return (
      <React.Fragment>
        <MDBRow className="mb-4">
          <MDBCol xl="12" md="12" className="mb-r">
            <MDBCard className="cascading-admin-card">
              <div className="admin-up">
                <MDBIcon icon="file-invoice-dollar" className="primary-color" />
                <div className="data">
                  <MDBCardText>Endpoint / Axios Test Page</MDBCardText>
                  <h4>
                    <MDBBadge color="primary-color" pill></MDBBadge>
                  </h4>
                </div>
              </div>
              <MDBCardBody>
                <h2 className="m-3 ">Endpoint / Axios Test Page</h2>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>

        <div>Current Facilities: &nbsp;</div>
        <Form.Control as="select">
          {this.state.display !== "none" &&
            this.state.display.map((c, index) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
        </Form.Control>
        <Select components={{ MenuList }} options={this.state.display} filterOption={createFilter({ ignoreAccents: false })} />
      </React.Fragment>
    );
  }
}
export default AxiosTestPage;
