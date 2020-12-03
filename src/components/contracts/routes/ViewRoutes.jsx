import React from "react";
import { useParams } from "react-router-dom";
import { MDBCard, MDBCardHeader, MDBCardBody, MDBDataTable } from "mdbreact";

function ViewRoutes(props) {
  let { tripId } = useParams();
  const [datatable, setDatatable] = React.useState({
    columns: [
      {
        label: 'Driver',
        field: 'name',
        width: 150,
        attributes: {
          'aria-controls': 'DataTable',
          'aria-label': 'Name',
        },
      },
      {
        label: 'Position',
        field: 'position',
        width: 270,
      },
      {
        label: 'Facility',
        field: 'office',
        width: 200,
      },
      {
        label: 'Distance',
        field: 'distance',
        sort: 'asc',
        width: 50,
      },
      {
        label: 'Start date',
        field: 'date',
        sort: 'disabled',
        width: 150,
      },
      {
        label: 'Rate',
        field: 'salary',
        sort: 'asc',
        width: 80,
      },
    ],
    rows: [
      {
        name: 'Tiger Nixon',
        position: 'System Architect',
        office: 'Edinburgh',
        distance: '61 Miles',
        date: '2011/04/25',
        salary: '$32',
      },
      {
        name: 'Garrett Winters',
        position: 'Accountant',
        office: 'Tokyo',
        distance: '63 Miles',
        date: '2011/07/25',
        salary: '$17',
      },
      {
        name: 'Ashton Cox',
        position: 'Junior Technical Author',
        office: 'San Francisco',
        distance: '66 Miles',
        date: '2009/01/12',
        salary: '$8',
      },
      {
        name: 'Cedric Kelly',
        position: 'Senior Javascript Developer',
        office: 'Edinburgh',
        distance: '22 Miles',
        date: '2012/03/29',
        salary: '$43',
      },
      {
        name: 'Airi Satou',
        position: 'Accountant',
        office: 'Tokyo',
        distance: '33 Miles',
        date: '2008/11/28',
        salary: '$16',
      },
      {
        name: 'Brielle Williamson',
        position: 'Integration Specialist',
        office: 'New York',
        distance: '61 Miles',
        date: '2012/12/02',
        salary: '$37',
      },
      {
        name: 'Herrod Chandler',
        position: 'Sales Assistant',
        office: 'San Francisco',
        distance: '59 Miles',
        date: '2012/08/06',
        salary: '$13',
      },
      {
        name: 'Rhona Davidson',
        position: 'Integration Specialist',
        office: 'Tokyo',
        distance: '55 Miles',
        date: '2010/10/14',
        salary: '$32',
      },
      {
        name: 'Colleen Hurst',
        position: 'Javascript Developer',
        office: 'San Francisco',
        distance: '39 Miles',
        date: '2009/09/15',
        salary: '$20',
      },
      {
        name: 'Sonya Frost',
        position: 'Software Engineer',
        office: 'Edinburgh',
        distance: '23 Miles',
        date: '2008/12/13',
        salary: '$10',
      },
      {
        name: 'Jena Gaines',
        position: 'Office Manager',
        office: 'London',
        distance: '30 Miles',
        date: '2008/12/19',
        salary: '$9',
      },
      {
        name: 'Quinn Flynn',
        position: 'Support Lead',
        office: 'Edinburgh',
        distance: '22 Miles',
        date: '2013/03/03',
        salary: '$34',
      },
      {
        name: 'Charde Marshall',
        position: 'Regional Director',
        office: 'San Francisco',
        distance: '36 Miles',
        date: '2008/10/16',
        salary: '$47',
      },
      {
        name: 'Haley Kennedy',
        position: 'Senior Marketing Designer',
        office: 'London',
        distance: '43 Miles',
        date: '2012/12/18',
        salary: '$31',
      },
      {
        name: 'Tatyana Fitzpatrick',
        position: 'Regional Director',
        office: 'London',
        distance: '19 Miles',
        date: '2010/03/17',
        salary: '$38',
      },
      {
        name: 'Michael Silva',
        position: 'Marketing Designer',
        office: 'London',
        distance: '66 Miles',
        date: '2012/11/27',
        salary: '$19',
      },
      {
        name: 'Paul Byrd',
        position: 'Chief Financial Officer (CFO)',
        office: 'New York',
        distance: '64 Miles',
        date: '2010/06/09',
        salary: '$72',
      },
      {
        name: 'Gloria Little',
        position: 'Systems Administrator',
        office: 'New York',
        distance: '59 Miles',
        date: '2009/04/10',
        salary: '$23',
      },
      {
        name: 'Bradley Greer',
        position: 'Software Engineer',
        office: 'London',
        distance: '41 Miles',
        date: '2012/10/13',
        salary: '$13',
      },
      {
        name: 'Dai Rios',
        position: 'Personnel Lead',
        office: 'Edinburgh',
        distance: '35 Miles',
        date: '2012/09/26',
        salary: '$21',
      },
      {
        name: 'Jenette Caldwell',
        position: 'Development Lead',
        office: 'New York',
        distance: '30 Miles',
        date: '2011/09/03',
        salary: '$34',
      },
      {
        name: 'Yuri Berry',
        position: 'Chief Marketing Officer (CMO)',
        office: 'New York',
        distance: '40 Miles',
        date: '2009/06/25',
        salary: '$67',
      },
      {
        name: 'Caesar Vance',
        position: 'Pre-Sales Support',
        office: 'New York',
        distance: '21 Miles',
        date: '2011/12/12',
        salary: '$10',
      },
      {
        name: 'Doris Wilder',
        position: 'Sales Assistant',
        office: 'Sidney',
        distance: '23 Miles',
        date: '2010/09/20',
        salary: '$8',
      },
      {
        name: 'Angelica Ramos',
        position: 'Chief Executive Officer (CEO)',
        office: 'London',
        distance: '47 Miles',
        date: '2009/10/09',
        salary: '$34',
      },
      {
        name: 'Gavin Joyce',
        position: 'Developer',
        office: 'Edinburgh',
        distance: '42 Miles',
        date: '2010/12/22',
        salary: '$9',
      },
      {
        name: 'Jennifer Chang',
        position: 'Regional Director',
        office: 'Singapore',
        distance: '28 Miles',
        date: '2010/11/14',
        salary: '$35',
      },
      {
        name: 'Brenden Wagner',
        position: 'Software Engineer',
        office: 'San Francisco',
        distance: '28 Miles',
        date: '2011/06/07',
        salary: '$20',
      },
      {
        name: 'Fiona Green',
        position: 'Chief Operating Officer (COO)',
        office: 'San Francisco',
        distance: '48 Miles',
        date: '2010/03/11',
        salary: '$85',
      },
      {
        name: 'Shou Itou',
        position: 'Regional Marketing',
        office: 'Tokyo',
        distance: '20 Miles',
        date: '2011/08/14',
        salary: '$16',
      },
      {
        name: 'Michelle House',
        position: 'Integration Specialist',
        office: 'Sidney',
        distance: '37 Miles',
        date: '2011/06/02',
        salary: '$9',
      },
      {
        name: 'Suki Burks',
        position: 'Developer',
        office: 'London',
        distance: '53 Miles',
        date: '2009/10/22',
        salary: '$11',
      },
      {
        name: 'Prescott Bartlett',
        position: 'Technical Author',
        office: 'London',
        distance: '27 Miles',
        date: '2011/05/07',
        salary: '$14',
      },
      {
        name: 'Gavin Cortez',
        position: 'Team Leader',
        office: 'San Francisco',
        distance: '22 Miles',
        date: '2008/10/26',
        salary: '$23',
      },
      {
        name: 'Martena Mccray',
        position: 'Post-Sales support',
        office: 'Edinburgh',
        distance: '46 Miles',
        date: '2011/03/09',
        salary: '$32',
      },
      {
        name: 'Unity Butler',
        position: 'Marketing Designer',
        office: 'San Francisco',
        distance: '47 Miles',
        date: '2009/12/09',
        salary: '$8',
      },
      {
        name: 'Howard Hatfield',
        position: 'Office Manager',
        office: 'San Francisco',
        distance: '51 Miles',
        date: '2008/12/16',
        salary: '$16',
      },
      {
        name: 'Hope Fuentes',
        position: 'Secretary',
        office: 'San Francisco',
        distance: '41 Miles',
        date: '2010/02/12',
        salary: '$10',
      },
      {
        name: 'Vivian Harrell',
        position: 'Financial Controller',
        office: 'San Francisco',
        distance: '62 Miles',
        date: '2009/02/14',
        salary: '$45',
      },
      {
        name: 'Timothy Mooney',
        position: 'Office Manager',
        office: 'London',
        distance: '37 Miles',
        date: '2008/12/11',
        salary: '$13',
      },
      {
        name: 'Jackson Bradshaw',
        position: 'Director',
        office: 'New York',
        distance: '65 Miles',
        date: '2008/09/26',
        salary: '$64',
      },
      {
        name: 'Olivia Liang',
        position: 'Support Engineer',
        office: 'Singapore',
        distance: '64 Miles',
        date: '2011/02/03',
        salary: '$23',
      },
      {
        name: 'Bruno Nash',
        position: 'Software Engineer',
        office: 'London',
        distance: '38 Miles',
        date: '2011/05/03',
        salary: '$16',
      },
      {
        name: 'Sakura Yamamoto',
        position: 'Support Engineer',
        office: 'Tokyo',
        distance: '37 Miles',
        date: '2009/08/19',
        salary: '$13',
      },
      {
        name: 'Thor Walton',
        position: 'Developer',
        office: 'New York',
        distance: '61 Miles',
        date: '2013/08/11',
        salary: '$9',
      },
      {
        name: 'Finn Camacho',
        position: 'Support Engineer',
        office: 'San Francisco',
        distance: '47 Miles',
        date: '2009/07/07',
        salary: '$8',
      },
      {
        name: 'Serge Baldwin',
        position: 'Data Coordinator',
        office: 'Singapore',
        distance: '64 Miles',
        date: '2012/04/09',
        salary: '$13',
      },
      {
        name: 'Zenaida Frank',
        position: 'Software Engineer',
        office: 'New York',
        distance: '63 Miles',
        date: '2010/01/04',
        salary: '$12',
      },
      {
        name: 'Zorita Serrano',
        position: 'Software Engineer',
        office: 'San Francisco',
        distance: '56 Miles',
        date: '2012/06/01',
        salary: '$11',
      },
      {
        name: 'Jennifer Acosta',
        position: 'Junior Javascript Developer',
        office: 'Edinburgh',
        distance: '43 Miles',
        date: '2013/02/01',
        salary: '$7',
      },
      {
        name: 'Cara Stevens',
        position: 'Sales Assistant',
        office: 'New York',
        distance: '46 Miles',
        date: '2011/12/06',
        salary: '$14',
      },
      {
        name: 'Hermione Butler',
        position: 'Regional Director',
        office: 'London',
        distance: '47 Miles',
        date: '2011/03/21',
        salary: '$35',
      },
      {
        name: 'Lael Greer',
        position: 'Systems Administrator',
        office: 'London',
        distance: '21 Miles',
        date: '2009/02/27',
        salary: '$10',
      },
      {
        name: 'Jonas Alexander',
        position: 'Developer',
        office: 'San Francisco',
        distance: '30 Miles',
        date: '2010/07/14',
        salary: '$8',
      },
      {
        name: 'Shad Decker',
        position: 'Regional Director',
        office: 'Edinburgh',
        distance: '51 Miles',
        date: '2008/11/13',
        salary: '$18',
      },
      {
        name: 'Michael Bruce',
        position: 'Javascript Developer',
        office: 'Singapore',
        distance: '29 Miles',
        date: '2011/06/27',
        salary: '$18',
      },
      {
        name: 'Donna Snider',
        position: 'Customer Support',
        office: 'New York',
        distance: '27 Miles',
        date: '2011/01/25',
        salary: '$11',
      },
    ],
  });
  return (
    <MDBCard className="m-2">
      <MDBCardHeader>
        <h4>Routes</h4>
        <h4>Trip Selected: {props.selectedTrip}</h4>
        <h4>Trip Route Param: {tripId}</h4>
      </MDBCardHeader>
      <MDBCardBody>
      <MDBDataTable striped bordered hover responsive data={datatable} />
        <ul>
          <li>Arrival Time:</li>
          <li>Departure Time</li>
          <li>Facility ID</li>
          <li>start location? destination? Neither?</li>
        </ul>
      </MDBCardBody>
    </MDBCard>
  );
}

export default ViewRoutes;
