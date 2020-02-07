import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Well,
  Overlay,
  Tooltip,
  Badge,
  Label
} from "react-bootstrap";
import EditModal from "./EditModal";
//import "./Contract.css";

function Contract(props) {
  const [contract, setContract] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [accessLevel, setAccessLevel] = useState("None");

  useEffect(() => {
    onLoad();
  }, []);

  function onLoad() {
    setAccessLevel(sessionStorage.getItem("Contracts"));
    setContract(props.contract);
    setIsLoading(false);
  }

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  return (
    //<div className="contract">
    !isLoading && (
      <Col xs={6} md={3} key={props.eventKeyIndex}>
        <Button onClick={openModal}>
          {contract.map(
            (h, index) =>
              h[0] != "DONOTSHOW" && (
                <div key={index}>
                  <Label>{h[0]}</Label>
                  <Badge>{h[1]}</Badge>
                </div>
              )
          )}
        </Button>
        <EditModal
          modalName="Contract"
          content={contract}
          specialInput={props.specialInput}
          show={showModal}
          closeModal={closeModal}
          accessLevel={accessLevel}
        />
      </Col>
    )
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
