import React, {useState, useEffect}  from "react";
import { Tabs, Tab, ListGroup, ListGroupItem, PanelGroup, Table, Grid, Row} from "react-bootstrap";
import Contract from "./../components/Contract";
import Send from "./../components/send";


function ContractList(props) {
    const [contractData, setContractData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        onLoad();
    }, []);

    function onLoad() {
        Send.post('/ViewContracts', '', true)
        .then(res => {
            setContractData(res.data);
            setIsLoading(false);
        }).catch(err => {
            console.log(err);
        });

    }

    return (
        !isLoading && (<div className="contract">

           
            <Grid>
            <Row key="topRow" className="show-grid">
                {contractData.map((c, index) => 
                    <Contract key={index} appProps={props} contract={c} eventKeyIndex={index}/>
                )}
            </Row>
            </Grid>

        </div>)
    );  
}

export default ContractList;

