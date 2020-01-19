import React, {useState, useEffect}  from "react";
import { Tabs, Tab, ListGroup, ListGroupItem, PanelGroup} from "react-bootstrap";
import Contract from "./../components/Contract";
import Send from "./../components/send";


function ContractList(props) {
    const [contracts, setContracts] = useState([]);
    const [idFilter, setIdFilter] = useState("");
    useEffect(() => {
        onLoad();
    }, contracts);

    function onLoad() {
        Send.post('/ViewContracts', '')
        .then(res => {
            console.log(res);
            setContracts(res.data.data);
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <div className="contract">
            
                <PanelGroup accordion>
                    {contracts.map((c, index) => 
                        //<ListGroupItem>
                        <Contract appProps={props} contract={c} eventKeyIndex={index}/>
                        //</ListGroupItem>
                    )}
                </PanelGroup>
            
        </div>
    );  
}

export default ContractList;

