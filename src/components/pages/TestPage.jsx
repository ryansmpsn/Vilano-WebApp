import React, { useState } from "react";
import { Jumbotron, Container, Row, Col, ProgressBar, Table, Button } from "react-bootstrap";
import styled from "styled-components";
import ModalSection from "./sections/ModalSection";
import AdminCardSection1 from "./sections/AdminCardSection1";
import AdminCardSection2 from "./sections/AdminCardSection2";
import ChartSection1 from "./sections/ChartSection1";
import ChartSection2 from "./sections/ChartSection2";
// import MapsPage from "./MapsPage";
const Styles = styled.div`
  .col {
    background-color: grey;
    border: 3pt solid black;
    margin: 5px;
  }
`;

function TestPage() {
  const [toggler, setToggler] = useState(null);
  return (
    <Styles>
      <div>
        <h4> some text here:</h4>
        {toggler === 1 && <p>this is rendered when var = 1</p>}
        {toggler === 2 && <p> this is when var = 2</p>}
        <Button onClick={() => setToggler(1)}> click to toggle</Button>
      </div>
      <Jumbotron>
        <h1 className="display-1 text-center">This is the Testing Page</h1>
        <br />
        <hr />
        <h1 className="display-2">Testing page text: Display-2</h1>
        <h1 className="display-3">Testing page text: Display-3</h1>
        <h1 className="display-4">Testing page text: Display-4</h1>
        <h1>Testing page text: Heading h1.</h1>
        <h2>Testing page text: Heading h2.</h2>
        <h3>Testing page text: Heading h3.</h3>
        <h4>Testing page text: Heading h4.</h4>
        <h5>Testing page text: Heading h5.</h5>
        <h6>Testing page text: Heading h6.</h6>
        <hr />
        <br />
        <h1>Inline Text Elements: </h1>
        <br />
        <p className="lead">
          Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus.
        </p>
        <p>
          You can use the mark tag to <mark>highlight</mark> text.
        </p>
        <p>
          <del>This line of text is meant to be treated as deleted text.</del>
        </p>
        <p>
          <s>This line of text is meant to be treated as no longer accurate.</s>
        </p>
        <p>
          <ins>This line of text is meant to be treated as an addition to the document.</ins>
        </p>
        <p>
          <u>This line of text will render as underlined</u>
        </p>
        <p>
          <small>This line of text is meant to be treated as fine print.</small>
        </p>
        <p>
          <strong>This line rendered as bold text.</strong>
        </p>
        <p>
          <em>This line rendered as italicized text.</em>
        </p>
        <div className="row">
          <div className="col-2 text-truncate">Praeterea iter est quasdam res quas ex communi.</div>
        </div>
        <span className="d-inline-block text-truncate">Praeterea iter est quasdam res quas ex communi.</span>
        <p className="text-lowercase">Lowercased text.</p>
        <p className="text-uppercase">Uppercased text.</p>
        <p className="text-capitalize">CapiTaliZed text.</p>
        <p className="font-weight-bold">Bold text.</p>
        <p className="font-weight-normal">Normal weight text.</p>
        <p className="font-weight-light">Light weight text.</p>
        <p className="font-italic">Italic text.</p>
      </Jumbotron>

      <Container>
        <h1>Alerts:</h1>
        <div className="alert alert-primary" role="alert">
          This is a primary alert with
          <a href="/testpage" className="alert-link">
            an example link
          </a>
          . Give it a click if you like.
        </div>
        <div className="alert alert-secondary" role="alert">
          This is a secondary alert with
          <a href="/testpage" className="alert-link">
            an example link
          </a>
          . Give it a click if you like.
        </div>
        <div className="alert alert-success" role="alert">
          This is a success alert with
          <a href="/testpage" className="alert-link">
            an example link
          </a>
          . Give it a click if you like.
        </div>
        <div className="alert alert-danger" role="alert">
          This is a danger alert with
          <a href="/testpage" className="alert-link">
            an example link
          </a>
          . Give it a click if you like.
        </div>
        <div className="alert alert-warning" role="alert">
          This is a warning alert with
          <a href="/testpage" className="alert-link">
            an example link
          </a>
          . Give it a click if you like.
        </div>
        <div className="alert alert-info" role="alert">
          This is a info alert with
          <a href="/testpage" className="alert-link">
            an example link
          </a>
          . Give it a click if you like.
        </div>
        <div className="alert alert-light" role="alert">
          This is a light alert with
          <a href="/testpage" className="alert-link">
            an example link
          </a>
          . Give it a click if you like.
        </div>
        <div className="alert alert-dark" role="alert">
          This is a dark alert with
          <a href="/testpage" className="alert-link">
            an example link
          </a>
          . Give it a click if you like.
        </div>
        <h1>Pill Badges</h1>
        <span className="badge badge-pill badge-primary">Primary</span>
        <span className="badge badge-pill badge-secondary">Secondary</span>
        <span className="badge badge-pill badge-success">Success</span>
        <span className="badge badge-pill badge-danger">Danger</span>
        <span className="badge badge-pill badge-warning">Warning</span>
        <span className="badge badge-pill badge-info">Info</span>
        <span className="badge badge-pill badge-light">Light</span>
        <span className="badge badge-pill badge-dark">Dark</span>
        <h1>Loaders</h1>
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-border text-success" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-border text-danger" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-border text-warning" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-border text-info" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-grow text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-grow text-success" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-grow text-danger" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-grow text-warning" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-grow text-info" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <h1>Progress Bars</h1>
        <div className="progress">
          <div
            className="progress-bar bg-success"
            role="progressbar"
            style={{ width: 25 }}
            aria-valuenow="25"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
        <div className="progress">
          <div
            className="progress-bar bg-info"
            role="progressbar"
            style={{ width: 50 }}
            aria-valuenow="50"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
        <div className="progress">
          <div
            className="progress-bar bg-warning"
            role="progressbar"
            style={{ width: 75 }}
            aria-valuenow="75"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
        <div className="progress">
          <div
            className="progress-bar bg-danger"
            role="progressbar"
            style={{ width: 100 }}
            aria-valuenow="100"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
        <div className="progress">
          <div
            className="progress-bar bg-success"
            role="progressbar"
            style={{ width: 25 }}
            aria-valuenow="25"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
        <div className="progress">
          <div
            className="progress-bar bg-info"
            role="progressbar"
            style={{ width: 50 }}
            aria-valuenow="50"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
        <div className="progress">
          <div
            className="progress-bar bg-warning"
            role="progressbar"
            style={{ width: 75 }}
            aria-valuenow="75"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
        <div className="progress">
          <div
            className="progress-bar bg-danger"
            role="progressbar"
            style={{ width: 100 }}
            aria-valuenow="100"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
        <h2>Striped</h2>
        <div>
          <ProgressBar striped variant="success" now={40} />
          <ProgressBar striped variant="info" now={20} />
          <ProgressBar striped variant="warning" now={60} />
          <ProgressBar striped variant="danger" now={80} />
        </div>
        <h2> animated stripes</h2>
        <div className="progress">
          <div
            className="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            aria-valuenow="75"
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: 75 }}
          ></div>
        </div>
        <hr />
        <br />
      </Container>
      <AdminCardSection1 />
      <AdminCardSection2 />
      <ChartSection2 />
      <ChartSection1 />
      <ModalSection />
      {/*<MapsPage />*/}
      <Container>
        <h1>This is the Grid System</h1>
        <h3> Auto Layout Grids:</h3>
        <Row>
          <Col>1 of 2</Col>
          <Col>2 of 2</Col>
        </Row>
        <Row>
          <Col>1 of 3</Col>
          <Col>2 of 3</Col>
          <Col>3 of 3</Col>
        </Row>
        <h3> Setting Column Width:</h3>
        <Row>
          <Col>1 of 3</Col>
          <Col xs={6}>2 of 3 (wider)</Col>
          <Col>3 of 3</Col>
        </Row>
        <Row>
          <Col>1 of 3</Col>
          <Col xs={5}>2 of 3 (wider)</Col>
          <Col>3 of 3</Col>
        </Row>
        <h3>Variable Width Content</h3>
        <Row className="justify-content-md-center">
          <Col xs lg="2">
            1 of 3
          </Col>
          <Col md="auto">Variable width content</Col>
          <Col xs lg="2">
            3 of 3
          </Col>
        </Row>
        <Row>
          <Col>1 of 3</Col>
          <Col md="auto">Variable width content</Col>
          <Col xs lg="2">
            3 of 3
          </Col>
        </Row>
        <h3>Responsive Grids</h3>
        <Row>
          <Col sm={8}>sm=8</Col>
          <Col sm={4}>sm=4</Col>
        </Row>
        <Row>
          <Col sm>sm=true</Col>
          <Col sm>sm=true</Col>
          <Col sm>sm=true</Col>
        </Row>
      </Container>
      <h1>This an example of Tables</h1>
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
      <h1>Table Head Options</h1>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
      <h1>Striped Rows</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
      <h1>Bordered Table</h1>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td colSpan="2">Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
      <h1>Hoverable Rows</h1>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td colSpan="2">Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
      <table className="table table-hover table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td colSpan="2">Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
      <h1>Responsive Table</h1>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Table heading</th>
            <th>Table heading</th>
            <th>Table heading</th>
            <th>Table heading</th>
            <th>Table heading</th>
            <th>Table heading</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
          </tr>
        </tbody>
      </Table>
    </Styles>
  );
}

export default TestPage;
