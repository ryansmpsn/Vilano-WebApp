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
                                                                    <ContractTable info={i} />
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


            <Table>
                <thead>
                    <tr>
                        {contractData[0].view_Data.map((h, index) => { return (<th key={index}>{h[0]}</th>)})}
                    </tr>
                </thead> 
                </Table>