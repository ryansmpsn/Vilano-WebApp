import React, { useEffect, useState } from "react";
import Send from "../../libs/send";
import axios from "axios";
import CountUp from "react-countup";
import { Routes, Route, Navigate, NavLink } from "react-router-dom";
import { Badge, Card, ListGroup, ListGroupItem, Nav, NavItem } from "react-bootstrap";
import Facilities from "./Facilities";

function AdminDashboard(props) {
  useEffect(() => {
    const onLoad = async () => {
      //   const requestOne = Send.get("/Employee/Dropdowns/Employee/All");
      //   const requestTwo = Send.get("/Contract/Ids");
      // const requestThree = Send.get("/Facility/Active");

      axios
        .all([])
        .then(
          axios.spread((...responses) => {
            // const responseOne = responses[0];
            // const responseTwo = responses[1];
            // const responseThree = responses[2];
          })
        )
        .catch((errors) => {
          // react on errors
          console.log(errors);
        });
    };
    onLoad();
  }, []);

  return (
    <>
      <Card className="cascading-admin-card mb-4">
        <Card.Header>
          <div className="admin-up">
            <div className="fa">
              <div className="fas fa-shield-alt" />
            </div>
          </div>
          <h2 className="mb-5 text-center" style={{ marginTop: "-50px" }}>
            Administration & Application Management
          </h2>
        </Card.Header>
      </Card>
      <Nav justify variant="tabs" defaultActiveKey="employee" className="pb-2 w-50 mx-auto my-3 ">
        <NavItem>
          <NavLink to="facilities" activeClassName="text-primary border-top">
            Facilities
          </NavLink>
        </NavItem>
        {/* <NavItem>
          <NavLink to="assignment" activeClassName="text-primary border-top">
            Contracts
          </NavLink>
        </NavItem> */}
      </Nav>

      <Routes>
        <Route path="facilities" element={<Facilities />} />

        <Navigate from="/administration" to="/administration/facilities" />
      </Routes>
    </>
  );
}

export default AdminDashboard;
