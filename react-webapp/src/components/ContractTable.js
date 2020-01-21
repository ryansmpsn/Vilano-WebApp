import React, {useState} from "react";
import { Tabs, Tab, ListGroup, ListGroupItem, Panel, ButtonGroup, Button, Table, tbody, thead, PanelGroup} from "react-bootstrap";
//import "./Contract.css";
                        


function ContractInfo(props) {
console.log(props);
    return (
        <Table>
            <thead>
                <tr>
                    {props.info[1].map(h => { return (<th>{h}</th>)})}
                </tr>
            </thead>  
                                                                                    
            <tbody>
                {props.info[2].map(b => {
                    return (
                            <>
                            <tr>{b.map(bc =><td>{bc}</td>)}
                            
                            </tr>
                            <tr>
                                <td colSpan={b.length}>
                                <Panel>
                                    <Panel.Heading>
                                        
                                        <Panel.Toggle>
                                            ->
                                        </Panel.Toggle>
                                        
                                    </Panel.Heading>
                                    <Panel.Collapse>
                                        <Panel.Body collapsible>
                                            
                                        </Panel.Body>
                                    </Panel.Collapse>
                                </Panel>
                                </td>
                            </tr>
                            </>
                        );
                })}
            </tbody>
        </Table> 
    );  
}



export default ContractInfo;