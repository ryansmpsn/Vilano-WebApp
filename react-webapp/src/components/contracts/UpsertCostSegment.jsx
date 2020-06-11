import React from "react";
// import { useToasts } from "react-toast-notifications";
import { MDBCardBody, MDBContainer, MDBRow, MDBCol, MDBInput, MDBIcon, MDBBtn } from "mdbreact";

function UpsertCostSegment(props) {
  // const { addToast } = useToasts();
  // const [isLoading, setIsLoading] = useState(false);
  // const [dropdowns, setDropdowns] = useState(null);
  // const [isSearching, setSearching] = useState(false);
  // const [contractSearch, setContractSearch] = useState(props.contractSearch);
  // const [contractData, setContractData] = useState(props.contractData);
  // const [units, setUnits] = useState(props.units);

  function buildJsonObject() {
    console.log(props.remarkAnnualCost);

    // let costSegment = {};
    let jsonData = {};
    props.itemLabels.forEach(
      (c, index) => {
        var columnName = c.label;
        jsonData[columnName] = [props.units[index], props.unitCost[index], props.annualCost[index]];
      },

      console.log(jsonData)
    );
  }

  return (
    <MDBCardBody>
      <MDBContainer fluid>
        <MDBRow>
          {props.contractData !== null &&
            props.contractData.map(
              (c, index) =>
                c.label !== null && (
                  <MDBCol md="2" key={c.label + index}>
                    <p className="h5 mb-1">{c.label}: </p>
                    <div className="text-muted">{c.value}</div>
                  </MDBCol>
                )
            )}
        </MDBRow>
        <p className="h4 text-center mb-4">Remarks:</p>
        <div className="grey-text">
          <MDBRow>
            <MDBCol md="6">
              <div className="grey-text">
                {props.remarkAnnualCost.map(
                  (c, index) =>
                    index < 3 && (
                      <MDBInput
                        key={c.columnName}
                        label={c.columnName}
                        id={c.columnName}
                        value={c.updatedValue === null ? c.value : c.updatedValue}
                        placeholder={c.columnName}
                        icon={c.icon}
                        group
                        type="text"
                        validate
                        error="wrong"
                        success="right"
                        onChange={(e) => {
                          var object = props.remarkAnnualCost;
                          var specials = /[*|":<>[\]{}`\\()';@&$]/; //TODO setup global module to sanatize stuff.
                          object[index].updatedValue = e.target.value.replace(specials, "");
                          props.setRemarkAnnualCost(object);
                        }}
                      />
                    )
                )}
              </div>
            </MDBCol>
            <MDBCol md="6">
              <div className="grey-text">
                {props.remarkAnnualCost.map(
                  (c, index) =>
                    index > 2 && (
                      <MDBInput
                        key={c.columnName}
                        label={c.columnName}
                        id={c.columnName}
                        value={c.updatedValue === null ? c.value : c.updatedValue}
                        placeholder={c.columnName}
                        icon={c.icon}
                        group
                        type="text"
                        validate
                        error="wrong"
                        success="right"
                        onChange={(e) => {
                          var object = props.remarkAnnualCost;
                          var specials = /[*|":<>[\]{}`\\()';@&$]/; //TODO setup global module to sanatize stuff.
                          object[index].updatedValue = e.target.value.replace(specials, "");
                          props.setRemarkAnnualCost(object);
                        }}
                      />
                    )
                )}
              </div>
            </MDBCol>
          </MDBRow>
        </div>

        <p className="h4 text-center mb-4">Basis For Determining Cost</p>
        <div className="grey-text">
          {props.itemLabels.map((c, index) => (
            <MDBRow key={index}>
              <MDBCol md="3">
                {c.sub === null ? (
                  <div className=" text-center mb-5">
                    <h4 key={index + c.label}>{c.label}</h4>
                  </div>
                ) : (
                  <div key={index} className=" text-center mb-4">
                    <h4 key={index + c.label}>{c.label}</h4>
                    <small key={index + c.sub}>{c.sub}</small>
                  </div>
                )}
              </MDBCol>

              <MDBCol md="9">
                <MDBRow>
                  <MDBCol md="4">
                    <div className="grey-text">
                      {props.units[index].label !== null ? (
                        <MDBInput
                          label={props.units[index].label}
                          id={props.units[index].id}
                          value={props.units[index].value}
                          placeholder={props.units[index].value}
                          icon={props.units[index].icon}
                          group
                          type="text"
                          validate
                          error="wrong"
                          success="right"
                          onChange={(e) => {
                            var object = props.units;
                            var specials = /[*|":<>[\]{}`\\()';@&$]/; //TODO setup global module to sanatize stuff.
                            object[index].updatedValue = e.target.value.replace(specials, "");
                            props.setUnits(object);
                          }}
                        />
                      ) : (
                        <MDBInput disabled />
                      )}
                    </div>
                  </MDBCol>
                  <MDBCol md="4">
                    <div className="grey-text">
                      {props.unitCost[index].label !== null ? (
                        <MDBInput
                          label={props.unitCost[index].label}
                          id={props.unitCost[index].id}
                          value={props.unitCost[index].updatedValue === null ? props.unitCost[index].value : props.unitCost[index].updatedValue}
                          placeholder={props.unitCost[index].value}
                          icon={props.unitCost[index].icon}
                          group
                          type="text"
                          validate
                          error="wrong"
                          success="right"
                          onChange={(e) => {
                            var object = props.unitCost;
                            var specials = /[*|":<>[\]{}`\\()';@&$]/; //TODO setup global module to sanatize stuff.
                            object[index].updatedValue = e.target.value.replace(specials, "");
                            props.setUnitCost(object);
                          }}
                        />
                      ) : (
                        <MDBInput disabled />
                      )}
                    </div>
                  </MDBCol>
                  <MDBCol md="4">
                    <div className="grey-text">
                      {props.annualCost[index].label !== null ? (
                        <MDBInput
                          label={props.annualCost[index].label}
                          id={props.annualCost[index].id}
                          value={props.annualCost[index].updatedValue === null ? props.annualCost[index].value : props.annualCost[index].updatedValue}
                          placeholder={props.annualCost[index].value}
                          icon={props.annualCost[index].icon}
                          group
                          type="text"
                          validate
                          error="wrong"
                          success="right"
                          onChange={(e) => {
                            var object = props.annualCost;
                            var specials = /[*|":<>[\]{}`\\()';@&$]/; //TODO setup global module to sanatize stuff.
                            object[index].updatedValue = e.target.value.replace(specials, "");
                            props.setAnnualCost(object);
                          }}
                        />
                      ) : (
                        <MDBInput disabled />
                      )}
                    </div>
                  </MDBCol>
                </MDBRow>
              </MDBCol>
            </MDBRow>
          ))}
        </div>
        <MDBRow>
          <MDBCol md="12">
            <div className="text-center">
              <MDBBtn outline color="info" type="button" onClick={buildJsonObject}>
                Send
                <MDBIcon far icon="paper-plane" className="ml-1" />
              </MDBBtn>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBCardBody>
  );
}

export default UpsertCostSegment;
