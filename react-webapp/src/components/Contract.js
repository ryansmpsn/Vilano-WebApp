import React from "react";
import { Tabs, Tab, ListGroup, ListGroupItem, Panel} from "react-bootstrap";
//import "./Contract.css";
                        


function Contract(props) {
    console.log(props);
    return (
        //<div className="contract">
            <Panel eventKey={props.contract.contract_id}>
                <Panel.Heading>
                    <Panel.Title toggle>
                        Contract ID: {props.contract.contract_id}
                    </Panel.Title>
                </Panel.Heading>
                <Panel.Collapse>
                    <Panel.Body collapsible>
                        <Tabs>
                            {props.contract.contract_tabs.map((c, index) =>
                            <Tab eventKey={index} title={c.Name}>
                                <ListGroup>
                                    {c.Information.map(i => 
                                        <ListGroupItem header={i[0] + ": " + i[1]} />
                                    )}
                                </ListGroup>
                            </Tab>
                            )}
                        </Tabs>
                    </Panel.Body>
                </Panel.Collapse>
            </Panel>
        //</div>
    );  
}

export default Contract;