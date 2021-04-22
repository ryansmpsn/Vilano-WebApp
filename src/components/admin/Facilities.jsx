import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Row, Col, Jumbotron, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { useToasts } from "react-toast-notifications";
import Send from "../../libs/send";
import MaterialTable from "material-table";

function Facilities(props) {
  const { addToast } = useToasts();

  const [selectOptions, setSelectOptions] = useState(null);
  const [data, setData] = useState([
    {
      facility_name: "JUANA DIAZ",
      facility_code: "unknown",
      facility_subtpe: "unknown",
      address_1: "72 CALLE MUNOZ RIVERA",
      address_2: null,
      city_name: "Juana Diaz",
      state_province_code: "PR",
      zip_postal_code: "00795",
      zip_4: "9998",
    },
  ]);

  useEffect(() => {
    const onLoad = async () => {
      Send.get("/Facility/Dropdowns/All").then((res) => {
        setSelectOptions(res.data);
        console.log(res.data);
      });
      Send.get("/Facility/25").then((res) => {
        console.log(res);
      });
    };
    onLoad();
  }, []);

  return (
    <>
      <Jumbotron>
        <Row className=" mb-4 justify-content-md-center">
          <Col md="4">
            <Select
              options={selectOptions && selectOptions[2].options}
              placeholder={"Select Facility Region"}
              onChange={(x) => console.log("im clicked")}
              isLoading={selectOptions === null}
              isDisabled={selectOptions === null}
              menuPortalTarget={document.body}
              styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
            />
          </Col>
          <Col md="4">
            <Select
              autofocus
              options={selectOptions && selectOptions[0].options}
              placeholder={"Select Facility Type"}
              onChange={(x) => console.log("im clicked")}
              isLoading={selectOptions === null}
              isDisabled={selectOptions === null}
              menuPortalTarget={document.body}
              styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
            />
          </Col>
          <Col md="4">
            <Select
              options={selectOptions && selectOptions[1].options}
              placeholder={"Select Facility Sub-Type"}
              onChange={(x) => console.log("im clicked")}
              isLoading={selectOptions === null}
              isDisabled={selectOptions === null}
              menuPortalTarget={document.body}
              styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
            />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Button className="btn btn-sm " variant="outline-primary" onClick={() => console.log("im clicked")}>
            Search
          </Button>
        </Row>
      </Jumbotron>
      <MaterialTable
        title="Facilities"
        columns={[
          { title: "Facility Name", field: "facility_name" },
          { title: "Facility Code", field: "facility_code" },
          { title: "Facility Sub-Type", field: "facility_subtpe" },
          { title: "Address 1", field: "address_1" },
          { title: "Address 2", field: "address_2" },
          { title: "City", field: "city_name" },
          { title: "State", field: "state_province_code" },
          { title: "Zip Code", field: "zip_postal_code" },
          { title: "Zip-4", field: "zip_4" },
        ]}
        data={data}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                setData([...data, newData]);

                resolve();
              }, 1000);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);

                resolve();
              }, 1000);
            }),
          onRowDelete: (oldData) =>
            // set is active to null
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);

                resolve();
              }, 1000);
            }),
        }}
      />
    </>
  );
}

export default Facilities;
