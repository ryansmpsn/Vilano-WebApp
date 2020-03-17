import React, { Component } from "react";
import { Jumbotron } from "react-bootstrap";
import { MDBCard, MDBCardHeader, MDBCardBody } from "mdbreact";
import ContentList from "./ContentList";

class ViewBids extends Component {
  state = {};
  render() {
    return (
      <MDBCard className="m-2">
        <MDBCardHeader>
          <h4>Contract Information</h4>
        </MDBCardHeader>
        <MDBCardBody>
          <Jumbotron>
            <ContentList
              onClick={this.props.onClick}
              selectOptions={this.props.selectOptions}
              contractID
              modalName="Edit Contract"
              accessLevel={this.props.accessLevel}
              contentEditSubmitAction={this.props.contentEditSubmitAction}
              SearchFunction={contractSearch => {
                return this.props.SearchFunction(contractSearch);
              }}
              showAll={this.props.showAll}
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

export default ViewBids;
