import React from "react";
import { Tabs, Tab, ListGroup, ListGroupItem, Panel, ButtonGroup, Button, Table, tbody, thead, PanelGroup} from "react-bootstrap";
import ContractTable from "./ContractTable";
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
            </Panel>
        //</div>
    );  
}

export default Contract;


/*
{
  "data": [
    {
      "contract_header": [
        [
          "HCR Number",
          "1S3L5"
        ],
        [
          "Company Name",
          "PFS"
        ],
        [
          "Administration Office",
          "Address At Address Rd"
        ]
      ],
      "contract_tabs": [
        {
          "Name": "Gas Miles and Maintenance",
          "Information": [
            [
              "Second Table same info different columnnames",
              [
                "PIN",
                "Animaniac Character",
                "Fake PhoneNumber"
              ],
              [
                [
                  1245,
                  "Yacko",
                  23409583240
                ],
                [
                  2344,
                  "Wacko",
                  242553240
                ],
                [
                  5353,
                  "Dot",
                  23409583240
                ]
              ]
            ],
            [
              "Gas",
              23
            ],
            [
              "Miles",
              32
            ],
            [
              "A Table",
              [
                "ID",
                "Name",
                "Some Number"
              ],
              [
                [
                  1245,
                  "Yacko",
                  23409583240
                ],
                [
                  2344,
                  "Wacko",
                  242553240
                ],
                [
                  5353,
                  "Dot",
                  23409583240
                ]
              ]
            ],
            [
              "Maintenance",
              5
            ]
          ]
        },
        {
          "Name": "Income, Start, and End",
          "Information": [
            [
              "Income",
              119000
            ],
            [
              "Start",
              "1/2/2020"
            ],
            [
              "End",
              "11/30/2020"
            ]
          ]
        }
      ]
    },
    {
      "contract_tabs": [
        {
          "Name": "Gas Miles and Maintenance",
          "Information": [
            [
              "Gas",
              23
            ],
            [
              "Miles",
              32
            ],
            [
              "Maintenance",
              5
            ]
          ]
        },
        {
          "Name": "Income, Start, and End",
          "Information": [
            [
              "Income",
              19000
            ],
            [
              "Start",
              "1/2/2020"
            ],
            [
              "End",
              "1/30/2020"
            ]
          ]
        }
      ],
      "contract_header": [
        [
          "HCR Number",
          "4P2F3"
        ],
        [
          "Company Name",
          "PFS"
        ],
        [
          "Administration Office",
          "Address At Address Rd"
        ]
      ]
    },
    {
      "contract_tabs": [
        {
          "Name": "Gas Miles and Maintenance",
          "Information": [
            [
              "Gas",
              230
            ],
            [
              "Miles",
              333
            ],
            [
              "Maintenance",
              52
            ]
          ]
        },
        {
          "Name": "Income, Start, and End",
          "Information": [
            [
              "Income",
              1219000
            ],
            [
              "Start",
              "1/2/2020"
            ],
            [
              "End",
              "12/20/2020"
            ]
          ]
        }
      ],
      "contract_header": [
        [
          "ID Number",
          "2S5R2"
        ],
        [
          "Company Name",
          "Vilano"
        ],
        [
          "Administration Office",
          "Address At Addresses Rd"
        ]
      ]
    }
  ]
}      

*/