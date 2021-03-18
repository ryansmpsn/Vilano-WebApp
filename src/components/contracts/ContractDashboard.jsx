import React, { Component } from "react";
import Routing from "./Router";
import Send from "../../libs/send";
import CountUp from "react-countup";
import { Card, Nav, NavItem, Row, Col, Badge, ListGroup, ListGroupItem } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";

class ContractDashboard extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      selectOptions: null,
      contractSearchCode: { external_contract_code: [] },
      contractProfile: null,
      isSearching: false,
      contentInputRestrictions: null,
      allContracts: null,
      allEmployees: null,
    };
  }
  setContractSearchCode = (e) => {
    return this.setState({ contractSearchCode: e });
  };
  search = (contractSearch) => {
    return Send.post("/Contract/Search", contractSearch, this.props);
  };

  getTrips = (e) => {
    this.setState({ isSearching: true });
    return Send.get(e, this.props).then((res) => {
      this.setState({ contractProfile: res.data[0] });
      this.setState({ isSearching: false });
    });
  };

  contractEditSubmitAction = (editContract) => {
    return Send.post("/Contract/Contract", editContract, this.props);
  };
  tripEditSubmitAction = (editTrip) => {
    this.setState({ isSearching: true });

    return Send.post("/Contract/ContractTrip", editTrip, this.props).then((res) => {
      this.setState({ isSearching: false });
    });
  };

  addSelectOption = (e) => {
    let options = this.state.selectOptions;
    let newOption = { label: e, value: options.length + 1 };
    options.push(newOption);
    this.setState({ selectOptions: options });
  };

  componentDidMount() {
    this._isMounted = true;

    const requestOne = Send.get("/Contract/Ids");
    const requestTwo = Send.get("/Contract/Dropdowns/Contract/All");
    const requestThree = Send.post("/Contract/Search", "", this.props);
    const requestFour = Send.get("/Employee/Dropdowns/Employee/All");

    axios
      .all([requestOne, requestTwo, requestThree, requestFour])
      .then(
        axios.spread((...responses) => {
          const responseOne = responses[0];
          const responseTwo = responses[1];
          const responseThree = responses[2];
          const responseFour = responses[3];

          let contractData = responseOne.data;
          let getSelectOptions = [];
          contractData.map((item, index) => {
            return getSelectOptions.push({
              label: item[1].value,
              value: item[0].value,
            });
          });

          if (this._isMounted) {
            this.setState({ selectOptions: getSelectOptions });
            this.setState({ contentInputRestrictions: responseTwo.data });
            this.setState({ allContracts: responseThree.data });
            this.setState({ allEmployees: responseFour.data });
          }
        })
      )
      .catch((errors) => {
        // react on errors
        console.log(errors);
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <>
        <Card className="cascading-admin-card mb-4">
          <Card.Header>
            <div className="admin-up ">
              <div className="fa">
                <div className="fas fa-file-contract " />
              </div>
              <Card className="w-25 ml-auto" style={{ marginTop: "-50px" }}>
                <Card.Header>Statistics</Card.Header>
                <Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>
                      Active Contracts
                      <Badge variant="primary" pill className="float-right">
                        <CountUp start={0} end={this.state.selectOptions ? this.state.selectOptions.length : 0} duration={5} />
                      </Badge>
                    </ListGroupItem>
                  </ListGroup>
                </Card.Body>
              </Card>
              <h2 className="text-center mb-5" style={{ marginTop: "-50px" }}>
                Contract Management
              </h2>
            </div>
          </Card.Header>
          {this.state.contractProfile !== null && (
            <Card.Body>
              <Row>
                {this.state.contractProfile.map(
                  (c, index) =>
                    c.label !== null &&
                    typeof c.value !== "object" && (
                      <Col md="2" key={c.label + index}>
                        <p className="h5 mb-1">{c.label}: </p>
                        <div className="text-muted">{c.value}</div>
                      </Col>
                    )
                )}
              </Row>
            </Card.Body>
          )}
        </Card>
        {/* 
        <Nav justify variant="tabs" defaultActiveKey="employee" className="pb-2 w-50 mx-auto my-3 ">
          <NavItem>
            <NavLink to="dashboard" activeClassName="text-primary border-top">
              Contracts
            </NavLink>
          </NavItem>
          {sessionStorage.getItem("/contract/analytics") >= 1 && (
            <NavItem>
              <NavLink to="analytics" activeClassName="text-primary border-top">
                Analytics
              </NavLink>
            </NavItem>
          )}
        </Nav> */}
        <Routing
          props={this.props}
          setContractSearchCode={this.setContractSearchCode}
          selectOptions={this.state.selectOptions}
          isSearching={this.state.isSearching}
          contractEditSubmitAction={this.contractEditSubmitAction}
          tripEditSubmitAction={this.tripEditSubmitAction}
          SearchFunction={(contractSearch) => {
            return this.search(contractSearch);
          }}
          showAll={() => {
            return this.show_all();
          }}
          appProps={this.props}
          contractSearch={this.state.contractSearchCode}
          // implement get contract feature to reload all contract data after an edit
          // getContracts={() => {
          //   return this.getContracts();
          // }}
          addSelectOption={this.addSelectOption}
          contentInputRestrictions={this.state.contentInputRestrictions}
          allContracts={this.state.allContracts}
          allEmployees={this.state.allEmployees}
        />
      </>
    );
  }
}

export default ContractDashboard;
