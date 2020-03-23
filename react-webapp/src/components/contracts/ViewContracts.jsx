import React, { Component } from "react";
import { Jumbotron } from "react-bootstrap";
import { MDBCard, MDBCardHeader, MDBCardBody } from "mdbreact";
import ContractData from "./ContractData";

class ViewContracts extends Component {
  state = {};
  render() {
    return (
      <MDBCard className="m-2">
        <MDBCardHeader>
          <h4>Contract Information</h4>
        </MDBCardHeader>
        <MDBCardBody>
          <Jumbotron>
            <ContractData
              url={this.props.url}
              setSelectedContract={this.props.setSelectedContract}
              selectOptions={this.props.selectOptions}
              contractID
              accessLevel={this.props.accessLevel}
              contractEditSubmitAction={this.props.contractEditSubmitAction}
              SearchFunction={contractSearch => {
                return this.props.SearchFunction(contractSearch);
              }}
              showAll={this.props.showAll}
              appProps={this.props}
              contractSearch={{
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

export default ViewContracts;
