import React from "react";
import { Tabs, Tab, ListGroup, ListGroupItem, Panel, ButtonGroup, Button, Table, tbody, thead, PanelGroup} from "react-bootstrap";
//import "./Contract.css";
                        


function Contract(props) {
    //const [contract, setContract] = useState([]);
    //console.log(props);
/*

    useEffect(() => {
        onLoad();
    }, contract);

    function onLoad() {
        Send.post('/ViewContracts', '')
        .then(res => {
            console.log(res);
            setContracts(res.data.data);
        }).catch(err => {
            console.log(err);
        })
    }*/

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
                        {/*<Tabs>*/}
                            {props.contract.contract_tabs.map((c, index) =>
                            /*<Tab eventKey={index} title={c.Name}>*/
                                <ListGroup>
                                    <PanelGroup>
                                        {c.Information.map(i => {
                                            if (i.length <= 2) {
                                                return (
                                                    <ListGroupItem>
                                                        
                                                            <Panel>
                                                                <Panel.Heading>
                                                                    <Panel.Title toggle>
                                                                        {i[0] + ": " + i[1]}
                                                                    </Panel.Title>
                                                                </Panel.Heading>
                                                            </Panel>
                                                    </ListGroupItem>)
                                                    //<ListGroupItem header={i[0] + ": " + i[1]} />)
                                            } else if (i.length >= 3) { 
                                                return (
                                                    <ListGroupItem>
                                                        
                                                            <Panel>
                                                                <Panel.Heading>
                                                                    <Panel.Title toggle>
                                                                        {" - " + i[0]}
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
                                                                    
                                                                </Panel.Body>
                                                            </Panel>
                                                        
                                                    </ListGroupItem>
                                                    );
                                            }
                                        }
                                        )}
                                    </PanelGroup>
                                </ListGroup>
                            /*</Tab>*/
                            )}
                        {/*</Tabs>*/}
                    </Panel.Body>
                </Panel.Collapse>
            </Panel>
        //</div>
    );  
}

export default Contract;