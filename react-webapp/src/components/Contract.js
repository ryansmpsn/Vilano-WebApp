import React from "react";
import { Tabs, Tab, ListGroup, ListGroupItem, Panel, ButtonGroup, Button, Table, tbody, thead} from "react-bootstrap";
//import "./Contract.css";
                        


function Contract(props) {
    console.log(props);
    return (
        //<div className="contract">
            <Panel eventKey={props.eventKeyIndex}>
                <Panel.Heading>
                    <Panel.Title toggle>
                       
                            <Table striped bordered condensed hover>
                                <tbody>
                                    <tr>
                                    {props.contract.contract_header.map(h =><td>{h[0] + ": " + h[1]}</td>)} 
                                    </tr>
                                </tbody>
                            </Table>
                           

                        
                    </Panel.Title>
                </Panel.Heading>
                <Panel.Collapse>
                    <Panel.Body collapsible>
                        <Tabs>
                            {props.contract.contract_tabs.map((c, index) =>
                            <Tab eventKey={index} title={c.Name}>
                                <ListGroup>
                                    {c.Information.map(i => {
                                        if (i[2] === 'undefined') {
                                            return (<ListGroupItem header={i[0] + ": " + i[1]} />)
                                        } else {
                                            console.log("WAT!!!");
                                            return (
                                                <ListGroupItem header={i[0]}>
                                                    <Panel>
                                                        <Panel.Heading>
                                                            <Panel.Title toggle>
                                                                {i[0]}
                                                            </Panel.Title>
                                                        </Panel.Heading>
                                                        <Panel.Body collapsible>
                                                            <Table>
                                                                <thead>
                                                                    <tr>
                                                                        {i[1].map(h => { return (<th>{h}</th>)})}
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {i[2].map(b => {
                                                                        return (
                                                                        <td>
                                                                            {b.map(bc => <tr>{bc}</tr>)}    
                                                                        </td>
                                                                        );
                                                                    })}
                                                                </tbody>
                                                            </Table>
                                                        </Panel.Body>
                                                    </Panel>
                                                </ListGroupItem>
                                                );
                                        }
                                    }
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