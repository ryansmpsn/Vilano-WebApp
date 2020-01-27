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
        Send.post('/ViewContracts', '')
        .then(res => {
            console.log(res);
            var array = [];
            /*for (let index = 0; index < 3; index++) {
                array.push(res.data[0])
                
            }*/
            //setContractData(array);//res.data);
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

