import React, { Component } from "react";
import ContentList from "../ContentList";
import { Jumbotron, Button } from "react-bootstrap";
import { MDBCard, MDBCardHeader, MDBCardBody } from "mdbreact";

class BidContractManagement extends Component {
  state = {
    selectOptions: [],
    accessLevel: sessionStorage.getItem("Contracts")
  };
  render() {
    return (
      <MDBCard className="m-2">
        <MDBCardHeader>
          <h4>Contract Statistics</h4>
        </MDBCardHeader>
        <MDBCardBody>
          <Jumbotron>
            <ContentList
              selectOptions={this.state.selectOptions}
              contractID
              modalName="Edit Contract"
              accessLevel={this.state.accessLevel}
              contentEditSubmitAction={this.props.contentEditSubmitAction}
              SearchFunction={contractSearch => {
                return this.props.search(contractSearch);
              }}
              showAll={() => {
                return this.props.show_all();
              }}
              appProps={this.props}
              contentSearch={{
                external_contract_code: []
              }}
              getContracts={() => {
                return this.props.getContracts();
              }}
            />
          </Jumbotron>
        </MDBCardBody>
      </MDBCard>
    );
  }
}

export default BidContractManagement;
