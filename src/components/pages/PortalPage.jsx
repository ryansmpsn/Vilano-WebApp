import React from "react";
import styled from "styled-components";
import geotabLogo from "../../img/logos/geotab.png";
import samsaraLogo from "../../img/logos/samsara2.png";
import smartdriveLogo from "../../img/logos/smartdrive.png";
import header from "../../img/vmsi_header.jpg";
import supportBkg from "../../img/map-image.png";
import fmcsaLogo from "../../img/logos/fmsca.jpg";
import jjkellerLogo from "../../img/logos/jjkeller.jpg";
import { BreadcrumbItem } from "react-bootstrap";
import { MDBContainer, MDBBreadcrumb } from "mdbreact";

function PortalPage() {
  const headers = [
    ["Corporate Contacts", "corporate"],
    ["Asset Management", "asset"],
    ["Payroll & Recruiting", "recruiting"],
    ["Human Resources", "hr"],
    ["Claims, Insurance, & Safety Training", "claims"],
    ["IT Support", "support"],
  ];
  const webLinks = [
    ["tablet-alt", "https://my.geotab.com/", <img className="img-fluid d-block mx-auto" src={geotabLogo} alt="" />],
    ["tablet-alt", "https://secure.smartdrive.net/login", <img className="img-fluid d-block mx-auto" src={smartdriveLogo} alt="" />],
    ["tablet-alt", "https://cloud.samsara.com/signin", <img className="img-fluid d-block mx-auto" src={samsaraLogo} alt="" />],
    ["link", "https://secure4.saashr.com/ta/6163332.login?rnd=NXP", "Benefits / Kronos Link"],
    ["link", "https://dashboard.tenstreet.com/", "Tenstreet Website"],
    ["link", "https://play.google.com/store/apps/details?id=com.mobile.tenstreet", "Tenstreet App"],
    ["heart", "https://play.google.com/store/apps/details?id=com.mobile.tenstreet.driverpulse&hl=en", "Tenstreet Driver Pulse"],
    ["tshirt", "https://sites.google.com/postalfleetsvs.com/wild-roots-shirt-co/Postal-Fleet-ShortSleeveTs", "T-Shirt Ordering"],
    ["hands-helping", "https://support.vilanosvs.com/", "It Support Center"],
  ];
  const corporateContacts = [
    ["list-ul", "https://docs.google.com/spreadsheets/d/1yZIhdj6XNdPOeI8YT8NCYtsSEzJE8Fjy2Ak3v44p4KY/edit#gid=1288118353", "Manager Contact List"],
    ["list-ul", "https://docs.google.com/spreadsheets/d/1EceSyhb7TvJ5WLMltMEggOV-hQ1NU2IfRYgPEkJfj18/edit#gid=0", "Corporate Office Extension & Direct Line List"],
    ["map-pin", "https://drive.google.com/open?id=1iBRuiGvapPYlkWsiNSgIKVWSrCoLNipG", "Postal Fleet Ryder Locations"],
    ["map-pin", "https://drive.google.com/open?id=1_4VwXucpoLCrsCzxeeg1msLw_kNkCByq", "The Stageline Co Ryder Locations"],
  ];
  const regulatory = [
    ["list-ul", "https://docs.google.com/spreadsheets/d/1oQxN4xEG4eKNEpkIxQEwBCLBWTHrLlq4wruGLNPnvS4/edit", "Equipment List 2020"],
    ["exclamation-circle", "https://sites.google.com/postalfleetsvs.com/vmsi/home", "Physical Damage - Incident Reference Report"],
    ["clock", "https://docs.google.com/spreadsheets/d/1qVkfgy29zEzUuya5inaACaK65JE5EfRDXPYUFFwUOBU/edit?ts=584045ce#gid=1967734421", "Floater Per Diem Schedule"],
    ["pencil-alt", "https://www.buyerquest.net/crownconnect/customer/account/login/", "Supply Ordering"],
  ];
  const recruiting = [
    ["folder-open", "https://docs.google.com/forms/d/e/1FAIpQLSe2SPzTen7bLAMXPmlr5DG4GdSs17bL7FGB4FU5MldHwo5pbQ/viewform", "Job Request Form"],
    ["check-square", "https://drive.google.com/file/d/1m7qgAy1Z2hLRMFvZOdSYUyh6niwlViXQ/view", "Orientaion Checklist"],
    ["folder-open", "'https://docs.wixstatic.com/ugd/ffaab1_950601c667d34fa7a13ba5711e673f5d.pdf", "Roadtest Form"],
    ["truck-moving", "https://drive.google.com/file/d/1Lb4ZDFbYIr5iTfyUpaWtXAwDXBNMBjBd/view", "The Stageline Company Driver Sheet"],
    ["truck-moving", "https://drive.google.com/file/d/1skHc4yNPS6uSTJ0HpxmzGsDf_ivk6-2L/view", "Postal Fleet Services, Inc. Driver Sheet"],
  ];
  const payroll = [
    ["pencil-alt", "https://drive.google.com/file/d/0BzQbmoWt8sMZSnpkVkZYbnFzamh3M1N3ak5hYlgxSmpDNjF3/view", "Driver Paperwork"],
    ["dollar-sign", "https://secure4.saashr.com/ta/6163332.login?rnd=NXP", "Paystubs, Direct Deposits, & W2's"],
    ["calendar-times", "https://drive.google.com/file/d/1LloLr3Sm-PNcBteoVNtcqyQ8AJEifsNL/view", "Payroll Dates for 2020"],
  ];
  const humanResources = [
    ["book", "https://secure4.saashr.com/ta/6163332.login?rnd=NXP", "Policy Manual"],
    ["exclamation-triangle", "https://drive.google.com/file/d/1zsNYyUt3Ly-2EU26BAKrR4_K4tSgI3m6/view", "Warning and Progressive Discipline Plan"],
    ["tree", "https://docs.google.com/document/d/1VwDelj_vXyu4-J0xU3zY_fL6ApRvaRpjP0JiY-Zy6S4/edit", "Vacation Request Form"],
  ];
  const claims = [
    ["exclamation-circle", "https://claims.vilanosvs.com/", "Auto Claim"],
    ["exclamation-circle", "https://drive.google.com/file/d/1P3oPlxa95kDHIjb0RDdvrlgKidq_Rr1F/view?usp=sharing", "Workers Comp Claim"],
    ["exclamation-circle", "https://drive.google.com/file/d/1ZL4G8b9wr9NhOAPbDaCU1VBgmdhCHCwm/view?usp=sharing", "Workers Comp Claim (Spanish)"],
    ["exclamation-circle", "https://drive.google.com/file/d/1_xgUITSf9s0U0Va-BogO8HTbY2X_9fsq/view", "Report Safety Hazard" + <br /> + "(USPS Facilities)"],
  ];
  const insurance = [
    ["shield-alt", "https://drive.google.com/drive/folders/17EorEXxbIkDmBbvzZhofhHwsu7bRRCxZ", "2019-2020 Insurance Cards for All States"],
    ["shield-alt", "https://drive.google.com/drive/folders/1rCbg0PLRIUtNqrQVBaQqIRMlkRUTfdK5", "2019-2020 Insurance Cards for Michigan"],
    ["shield-alt", "https://drive.google.com/drive/folders/1CF72WIGqY8j53uripOI23xwAMbITYRxm", "2019-2020 Insurance Cards for New Jersey"],
  ];
  const safetyTraining = [
    ["user-shield", "https://sites.google.com/postalfleetsvs.com/2018-required-driver-training/home", "2019 Safety Training"],
    ["id-badge", "https://drive.google.com/file/d/1eBZtWzC0y7W-MqsuTBAoCXGB6JNCkuCX/view", "Training Attendance Roster"],
    ["arrow-circle-up", "https://drive.google.com/drive/folders/17UOdyQai7Qc2TezRDAFxm6Jsvy5LzJoq", "Upload Training Documents"],
    ["folder-open", "https://docs.wixstatic.com/ugd/ffaab1_950601c667d34fa7a13ba5711e673f5d.pdf", "Roadtest Form"],
    ["redo", "https://docs.wixstatic.com/ugd/ffaab1_07fb616f25474e69a43777d7ae4b967a.pdf", "Probation & Re-Training (24MO)"],
    ["tv", "https://drive.google.com/drive/folders/1d-uDKsc-aZvYuFA9rmTv_XtcDgiL6GI1", "Smartdrive Training Material"],
    ["tv", "https://www.samsara.com/support/training", "Samsara Training Material"],
    ["tv", "https://drive.google.com/file/d/1Euu66xMZ-sVCI2oKeB_s5XjUGapY7X4K/view?usp=sharing", "ProTread Online Training"],
    ["tv", "https://sclsonline.com/", "National Interstate Risk Management Portal"],
  ];
  const geotab = [
    ["link", "https://www.geotab.com/how-to-guides/", "Geotab Training Material"],
    ["link", "https://drive.google.com/file/d/1L2apiFvbv6tl09VZYCv8o0io05CLOBS_/view", "Geotab Quick-Start Guide"],
    ["link", "https://docs.google.com/presentation/d/1nZBmUk4G2ZkTLJtCLjo8VtW7utFHxroQJmbi2gOWcSk/edit#slide=id.g3bf1e856c4_0_24", "Geotab: Change Time Zone"],
    ["link", "https://docs.google.com/presentation/d/15BFcViKEunMp5Swp_nd3ic3nIFIUD-xaQXiiQbfNIeo/edit#slide=id.g3bd0dcce6b_2_0", "Geotab: Correct/Edit HOS Logs"],
    ["link", "https://docs.google.com/presentation/d/1OvBMfRxKaZi2Kv97Eooj-p4X74p0BmiiIoo212EpDus/edit#slide=id.g3bd0f5c4e8_3_0", "Geotab: Download HOS"],
    ["link", "https://docs.google.com/presentation/d/1IYreOchAKcDKMEAHKLo5GlZfbddYjkBiijxQKfy3xoU/edit#slide=id.g3bf1e856c4_0_24", "Geotab: Log Off Duty"],
  ];

  return (
    <>
      <MDBContainer>
        <MDBBreadcrumb light color="aqua-gradient" className="position-fixed" style={{ marginTop: -112, zIndex: 9999, marginLeft: 65 }}>
          {headers.map((item, index) => (
            <BreadcrumbItem key={index} href={"#" + item[1]}>
              {item[0]}
            </BreadcrumbItem>
          ))}
        </MDBBreadcrumb>
      </MDBContainer>
      <PortalStyle>
        <header className="masthead">
          <div className="container-fluid">
            <div className="intro-text">
              <div className="intro-lead-in">Manager</div>
              <div className="intro-heading text-uppercase">Intranet Portal</div>
            </div>
          </div>
        </header>
        {/* WebLinks */}
        <section className="bg-light page-section" id="corporate">
          <div className="container-fluid">
            <div className="col-lg-12 text-center">
              <h3 className="section-subheading text-muted">Web Links</h3>
              <hr />
            </div>
            <div className="row text-center">
              {webLinks.map((content, index) => (
                <div key={index} className="col-md-3">
                  <span className="fa-stack fa-4x">
                    <i className="fas fa-circle fa-stack-2x text-primary" />
                    <i className={"fas fa-" + content[0] + " fa-stack-1x fa-inverse"} />
                  </span>
                  <button className="btn-hover" onClick={() => window.open(content[1], "_blank")}>
                    {content[2]}
                  </button>
                  <p>&nbsp;</p>
                </div>
              ))}
              <p>&nbsp;</p>
            </div>
            {/* Corporate Contacts */}
            <div className="row">
              <div className="col-lg-12 text-center">
                <h2 className="section-heading text-uppercase">Corporate Contacts</h2>
                <hr />
              </div>
            </div>
            <div className="row text-center">
              {corporateContacts.map((content, index) => (
                <div key={index} className="col-md-3">
                  <span className="fa-stack fa-4x">
                    <i className="fas fa-circle fa-stack-2x text-primary" />
                    <i className={"fas fa-" + content[0] + " fa-stack-1x fa-inverse"} />
                  </span>
                  <button className="btn-hover" onClick={() => window.open(content[1], "_blank")}>
                    {content[2]}
                  </button>
                  <p>&nbsp;</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Asset Management */}
        <section className="page-section" id="asset">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h2 className="section-heading text-uppercase">Asset Management</h2>
              </div>
            </div>
            <div className="col-lg-12 text-center">
              <hr />
              <h3 className="section-subheading text-muted">Regulatory</h3>
            </div>
            <div className="row text-center">
              {regulatory.map((content, index) => (
                <div key={index} className="col-md-3">
                  <span className="fa-stack fa-4x">
                    <i className="fas fa-circle fa-stack-2x text-primary" />
                    <i className={"fas fa-" + content[0] + " fa-stack-1x fa-inverse"} />
                  </span>
                  <button className="btn-hover" onClick={() => window.open(content[1], "_blank")}>
                    {content[2]}
                  </button>
                  <p>&nbsp;</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Recruiting & Payroll */}
        <section className="bg-light page-section" id="recruiting">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h2 className="section-subheading text-uppercase">Recruiting & Payroll</h2>
                <hr />
                <h3 className="section-subheading text-muted">Recruiting</h3>
              </div>
              <div className="row text-center">
                {recruiting.map((content, index) => (
                  <div key={index} className="col-md-3">
                    <span className="fa-stack fa-4x">
                      <i className="fas fa-circle fa-stack-2x text-primary" />
                      <i className={"fas fa-" + content[0] + " fa-stack-1x fa-inverse"} />
                    </span>
                    <button className="btn-hover" onClick={() => window.open(content[1], "_blank")}>
                      {content[2]}
                    </button>
                    <p>&nbsp;</p>
                  </div>
                ))}
              </div>
              <div className="col-lg-12 text-center">
                <hr />
                <h3 className="section-subheading text-muted">Payroll</h3>
              </div>
              <div className="row text-center">
                {payroll.map((content, index) => (
                  <div key={index} className="col-md-3">
                    <span className="fa-stack fa-4x">
                      <i className="fas fa-circle fa-stack-2x text-primary" />
                      <i className={"fas fa-" + content[0] + " fa-stack-1x fa-inverse"} />
                    </span>
                    <button className="btn-hover" onClick={() => window.open(content[1], "_blank")}>
                      {content[2]}
                    </button>
                    <p>&nbsp;</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* Human Resources */}
        <section className="page-section" id="hr">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h2 className="section-subheading text-uppercase">Human Resources</h2>
                <hr />
                <h3 className="section-subheading text-muted">Human Resources</h3>
              </div>
              <div className="row text-center">
                {humanResources.map((content, index) => (
                  <div key={index} className="col-md-3">
                    <span className="fa-stack fa-4x">
                      <i className="fas fa-circle fa-stack-2x text-primary" />
                      <i className={"fas fa-" + content[0] + " fa-stack-1x fa-inverse"} />
                    </span>
                    <button className="btn-hover" onClick={() => window.open(content[1], "_blank")}>
                      {content[2]}
                    </button>
                    <p>&nbsp;</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* Claims */}
        <section className="bg-light page-section" id="claims">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h2 className="section-subheading text-uppercase">Claims, Insurance, & Safety Training</h2>
                <hr />
                <h3 className="section-subheading text-muted">Claims</h3>
              </div>
              <div className="row text-center">
                {claims.map((content, index) => (
                  <div key={index} className="col-md-3">
                    <span className="fa-stack fa-4x">
                      <i className="fas fa-circle fa-stack-2x text-primary" />
                      <i className={"fas fa-" + content[0] + " fa-stack-1x fa-inverse"} />
                    </span>
                    <button className="btn-hover" onClick={() => window.open(content[1], "_blank")}>
                      {content[2]}
                    </button>
                    <p>&nbsp;</p>
                  </div>
                ))}
              </div>
              <div className="col-lg-12 text-center">
                <hr />
                <h3 className="section-subheading text-muted">Insurance</h3>
              </div>
              <div className="row text-center">
                {insurance.map((content, index) => (
                  <div key={index} className="col-md-3">
                    <span className="fa-stack fa-4x">
                      <i className="fas fa-circle fa-stack-2x text-primary" />
                      <i className={"fas fa-" + content[0] + " fa-stack-1x fa-inverse"} />
                    </span>
                    <button className="btn-hover" onClick={() => window.open(content[1], "_blank")}>
                      {content[2]}
                    </button>
                    <p>&nbsp;</p>
                  </div>
                ))}
              </div>
              <div className="col-lg-12 text-center">
                <hr />
                <h3 className="section-subheading text-muted">Safety Training</h3>
              </div>
              <div className="row text-center">
                {safetyTraining.map((content, index) => (
                  <div key={index} className="col-md-3">
                    <span className="fa-stack fa-4x">
                      <i className="fas fa-circle fa-stack-2x text-primary" />
                      <i className={"fas fa-" + content[0] + " fa-stack-1x fa-inverse"} />
                    </span>
                    <button className="btn-hover" onClick={() => window.open(content[1], "_blank")}>
                      {content[2]}
                    </button>
                    <p>&nbsp;</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-12 text-center">
              <hr />
              <h3 className="section-subheading text-muted">Regulatory Resources</h3>
            </div>
            <div className="row text-center">
              <div className="col-md-3 col-lg-6">
                <a href="https://www.fmcsa.dot.gov/" target="blank_">
                  <img className="img-fluid d-block mx-auto" src={fmcsaLogo} alt="" />
                </a>
              </div>
              <div className="col-md-3 col-lg-6">
                <a href="https://www.jjkellerlibrary.com/" target="blank_">
                  <img className="img-fluid d-block mx-auto" src={jjkellerLogo} alt="" />
                </a>
              </div>
            </div>
            <div className="col-lg-12 text-center">
              <hr />
              <h3 className="section-subheading text-muted">Geotab</h3>
            </div>
            <div className="row text-center">
              {geotab.map((content, index) => (
                <div key={index} className="col-md-3">
                  <span className="fa-stack fa-4x">
                    <i className="fas fa-circle fa-stack-2x text-primary" />
                    <i className={"fas fa-" + content[0] + " fa-stack-1x fa-inverse"} />
                  </span>
                  <button className="btn-hover" onClick={() => window.open(content[1], "_blank")}>
                    {content[2]}
                  </button>
                  <p>&nbsp;</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* IT Support */}
        <section className="page-section" id="support">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h2 className="section-heading text-uppercase">IT Support</h2>
                <h3 className="section-subheading text-muted">
                  Have a problem?
                  <a href="https://support.vilanosvs.com/"> Click Here </a>
                  to submit a ticket.
                </h3>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <a className="portfolio-link" href="https://docs.google.com/presentation/d/1QruyntVn79DxmfWlvWz4oED_RvVkyD8ZRDorj19NyZw/present?slide=id.g50f21e44ca_0_0" rel="noopener noreferrer" target="_blank">
                  <div className="portfolio-hover">
                    <div className="portfolio-hover-content">
                      <h3 className="section-subheading2 text-muted">How to Start TeamViewer</h3>
                    </div>
                  </div>
                  <img className="img-fluid" src="https://drive.google.com/thumbnail?authuser=0&amp;id=1QruyntVn79DxmfWlvWz4oED_RvVkyD8ZRDorj19NyZw&amp;sz=w1092-h555-p-k-nu" alt="" />
                </a>
              </div>
              <div className="col-lg-6">
                <a className="portfolio-link" href="https://docs.google.com/presentation/d/1yvBQ-VAGVMpY_n34fc10TZOKbEpiC0m36hz_SPOdyuI/present?slide=id.g5c9b2b8d06_0_8" rel="noopener noreferrer" target="_blank">
                  <div className="portfolio-hover">
                    <div className="portfolio-hover-content">
                      <h3 className="section-subheading2 text-muted">How To Add/Remove Email for Mobile Device</h3>
                    </div>
                  </div>
                  <img className="img-fluid" src="https://drive.google.com/thumbnail?authuser=0&amp;id=1yvBQ-VAGVMpY_n34fc10TZOKbEpiC0m36hz_SPOdyuI&amp;sz=w967-h614-p-k-nu" alt="" />
                </a>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 text-center">
                <h3 className="section-subheading text-muted">
                  <br />
                  Request Remote Support:
                  <br />
                  Call us (904)824-2007 ext.2100
                </h3>
              </div>
            </div>
          </div>
        </section>
      </PortalStyle>
    </>
  );
}

export default PortalPage;

const PortalStyle = styled.div`
  body {
    background-color: #f0f0f0;
    overflow-x: hidden;
    font-family: "Roboto Slab", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  }

  p {
    line-height: 1.75;
  }

  a {
    color: #0e6993;
  }

  a:hover {
    color: #0e6993;
  }

  button:hover {
    color: #0e6993;
  }

  .text-primary {
    color: #000000 !important;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 700;
    font-family: "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  }

  .page-section {
    padding: 100px 0;
  }

  .page-section h2.section-heading {
    font-size: 40px;
    margin-top: 0;
    margin-bottom: 15px;
  }

  .page-section h3.section-subheading {
    font-size: 25px;
    font-weight: 400;
    font-style: italic;
    margin-bottom: 75px;
    text-transform: none;
    font-family: "Droid Serif", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  }

  .page-section h3.section-subheading2 {
    font-size: 25px;
    font-weight: 400;
    font-style: italic;
    margin-bottom: 15px;
    margin-top: 20px;
    text-transform: none;
    font-family: "Droid Serif", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  }

  @media (min-width: 768px) {
    section {
      padding: 150px 0;
    }
  }

  ::-moz-selection {
    background: #0e6993;
    text-shadow: none;
  }

  ::selection {
    background: #0e6993;
    text-shadow: none;
  }

  img::-moz-selection {
    background: transparent;
  }

  img::selection {
    background: transparent;
  }

  img::-moz-selection {
    background: transparent;
  }

  .btn {
    font-family: "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    font-weight: 700;
  }

  .btn-hover {
    margin: 20px;
    width: 200px;
    height: 100px;
    background: none;
    border: 4px solid;
    color: #000000;
    font-weight: 700;
    cursor: pointer;
    font-size: 20px;
    position: relative;
  }

  .btn-hover::before,
  .btn-hover::after {
    content: "";
    position: absolute;
    width: 14px;
    height: 4px;
    background: #f0f0f0;
    transform: skewX(50deg);
    transition: 0.4s linear;
  }

  .btn-hover::before {
    top: -4px;
    left: 10%;
  }

  .btn-hover::after {
    bottom: -4px;
    right: 10%;
  }

  .btn-hover:hover::before {
    left: 80%;
  }

  .btn-hover:hover::after {
    right: 80%;
  }

  .btn-xl {
    font-size: 18px;
    padding: 20px 40px;
  }

  .btn-primary {
    background-color: #0e6993;
    border-color: #0e6993;
  }

  .btn-primary:active,
  .btn-primary:focus,
  .btn-primary:hover {
    background-color: #0e6993 !important;
    border-color: #0e6993 !important;
    color: white;
  }

  .btn-primary:active,
  .btn-primary:focus {
    box-shadow: 0 0 0 0.2rem rgba(254, 209, 55, 0.5) !important;
  }

  #mainNav {
    background-color: steelblue;
  }

  #mainNav .navbar-toggler {
    font-size: 12px;
    right: 0;
    padding: 13px;
    text-transform: uppercase;
    color: black;
    border: 0;
    background-color: white;
    font-family: "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  }

  #mainNav .navbar-brand {
    color: black;
    font-family: "Stardos Stencil", "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  }

  #mainNav .navbar-brand.active,
  #mainNav .navbar-brand:active,
  #mainNav .navbar-brand:focus,
  #mainNav .navbar-brand:hover {
    color: #0e6993;
  }

  #mainNav .navbar-nav .nav-item .nav-link {
    font-size: 90%;
    font-weight: 400;
    padding: 0.75em 0;
    letter-spacing: 1px;
    color: black;
    font-family: "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  }

  #mainNav .navbar-nav .nav-item .nav-link.active,
  #mainNav .navbar-nav .nav-item .nav-link:hover {
    color: #0e6993;
  }

  #mainNav .navImg {
    width: 200px;
    height: 200px;
  }

  @media (min-width: 992px) {
    #mainNav {
      padding-top: 25px;
      padding-bottom: 25px;
      transition: padding-top 0.3s, padding-bottom 0.3s;
      border: none;
      background-color: transparent;
    }
    #mainNav .navbar-brand {
      font-size: 1.75em;
      transition: all 0.3s;
    }
    #mainNav .navbar-nav .nav-item .nav-link {
      padding: 1.1em 1em !important;
    }
    #mainNav.navbar-shrink {
      padding-top: 0;
      padding-bottom: 0;
      background-color: #e0eaee;
      opacity: 99%;
    }
    #mainNav.navbar-shrink .navbar-brand {
      font-size: 1.25em;
      padding: 12px 0;
    }
    .btn-hover {
      margin: 20px;
      width: 300px;
      height: 80px;
    }
  }

  header.masthead {
    text-align: center;
    color: black;
    background-image: url(${header});
    background-repeat: no-repeat;
    background-attachment: scroll;
    background-position: center center;
    background-size: cover;
    height: 800px;
  }

  header.masthead .intro-text {
    padding-top: 150px;
    padding-bottom: 100px;
  }

  header.masthead .intro-text .intro-lead-in {
    font-size: 22px;
    font-style: italic;
    line-height: 22px;
    margin-bottom: 25px;
    font-family: "Droid Serif", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  }

  header.masthead .intro-text .intro-heading {
    font-size: 50px;
    font-weight: 700;
    line-height: 50px;
    margin-bottom: 25px;
    font-family: "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  }

  @media (min-width: 768px) {
    header.masthead .intro-text {
      padding-top: 300px;
      padding-bottom: 200px;
    }
    header.masthead .intro-text .intro-lead-in {
      font-size: 40px;
      font-style: italic;
      line-height: 40px;
      margin-bottom: 25px;
      font-family: "Droid Serif", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    }
    header.masthead .intro-text .intro-heading {
      font-size: 75px;
      font-weight: 700;
      line-height: 75px;
      margin-bottom: 50px;
      font-family: "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    }
  }

  .service-heading {
    margin: 15px 0;
    text-transform: none;
  }

  #portfolio .portfolio-item {
    right: 0;
    margin: 0 0 15px;
  }

  #portfolio .portfolio-item .portfolio-link {
    position: relative;
    display: block;
    max-width: 400px;
    margin: 0 auto;
    cursor: pointer;
  }

  #portfolio .portfolio-item .portfolio-link .portfolio-hover {
    position: absolute;
    width: 100%;
    height: 100%;
    transition: all ease 0.5s;
    opacity: 0;
    background: rgba(254, 209, 54, 0.9);
  }

  #portfolio .portfolio-item .portfolio-link .portfolio-hover:hover {
    opacity: 1;
  }

  #portfolio .portfolio-item .portfolio-link .portfolio-hover .portfolio-hover-content {
    font-size: 20px;
    position: absolute;
    top: 50%;
    width: 100%;
    height: 20px;
    margin-top: -12px;
    text-align: center;
    color: white;
  }

  #portfolio .portfolio-item .portfolio-link .portfolio-hover .portfolio-hover-content i {
    margin-top: -12px;
  }

  #portfolio .portfolio-item .portfolio-link .portfolio-hover .portfolio-hover-content h3,
  #portfolio .portfolio-item .portfolio-link .portfolio-hover .portfolio-hover-content h4 {
    margin: 0;
  }

  #portfolio .portfolio-item .portfolio-caption {
    max-width: 400px;
    margin: 0 auto;
    padding: 25px;
    text-align: center;
    background-color: #fff;
  }

  #portfolio .portfolio-item .portfolio-caption h4 {
    margin: 0;
    text-transform: none;
  }

  #portfolio .portfolio-item .portfolio-caption p {
    font-size: 16px;
    font-style: italic;
    margin: 0;
    font-family: "Droid Serif", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  }

  #portfolio * {
    z-index: 2;
  }

  @media (min-width: 767px) {
    #portfolio .portfolio-item {
      margin: 0 0 30px;
    }
  }

  .portfolio-modal .modal-dialog {
    margin: 1rem;
    max-width: 100vw;
  }

  .portfolio-modal .modal-content {
    padding: 100px 0;
    text-align: center;
  }

  .portfolio-modal .modal-content h2 {
    font-size: 3em;
    margin-bottom: 15px;
  }

  .portfolio-modal .modal-content p {
    margin-bottom: 30px;
  }

  .portfolio-modal .modal-content p.item-intro {
    font-size: 16px;
    font-style: italic;
    margin: 20px 0 30px;
    font-family: "Droid Serif", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  }

  .portfolio-modal .modal-content ul.list-inline {
    margin-top: 0;
    margin-bottom: 30px;
  }

  .portfolio-modal .modal-content img {
    margin-bottom: 30px;
  }

  .portfolio-modal .modal-content button {
    cursor: pointer;
  }

  .portfolio-modal .close-modal {
    position: absolute;
    top: 25px;
    right: 25px;
    width: 75px;
    height: 75px;
    cursor: pointer;
    background-color: transparent;
  }

  .portfolio-modal .close-modal:hover {
    opacity: 0.3;
  }

  .portfolio-modal .close-modal .lr {
    /* Safari and Chrome */
    z-index: 1051;
    width: 1px;
    height: 75px;
    margin-left: 35px;
    /* IE 9 */
    transform: rotate(45deg);
    background-color: #212529;
  }

  .portfolio-modal .close-modal .lr .rl {
    /* Safari and Chrome */
    z-index: 1052;
    width: 1px;
    height: 75px;
    /* IE 9 */
    transform: rotate(90deg);
    background-color: #212529;
  }

  .timeline {
    position: relative;
    padding: 0;
    list-style: none;
  }

  .timeline:before {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 40px;
    width: 2px;
    margin-left: -1.5px;
    content: "";
    background-color: #e9ecef;
  }

  .timeline > li {
    position: relative;
    min-height: 50px;
    margin-bottom: 50px;
  }

  .timeline > li:after,
  .timeline > li:before {
    display: table;
    content: " ";
  }

  .timeline > li:after {
    clear: both;
  }

  .timeline > li .timeline-panel {
    position: relative;
    float: right;
    width: 100%;
    padding: 0 20px 0 100px;
    text-align: left;
  }

  .timeline > li .timeline-panel:before {
    right: auto;
    left: -15px;
    border-right-width: 15px;
    border-left-width: 0;
  }

  .timeline > li .timeline-panel:after {
    right: auto;
    left: -14px;
    border-right-width: 14px;
    border-left-width: 0;
  }

  .timeline > li .timeline-image {
    position: absolute;
    z-index: 100;
    left: 0;
    width: 80px;
    height: 80px;
    margin-left: 0;
    text-align: center;
    color: white;
    border: 7px solid #e9ecef;
    border-radius: 100%;
    background-color: #0e6993;
  }

  .timeline > li .timeline-image h4 {
    font-size: 10px;
    line-height: 14px;
    margin-top: 12px;
  }

  .timeline > li.timeline-inverted > .timeline-panel {
    float: right;
    padding: 0 20px 0 100px;
    text-align: left;
  }

  .timeline > li.timeline-inverted > .timeline-panel:before {
    right: auto;
    left: -15px;
    border-right-width: 15px;
    border-left-width: 0;
  }

  .timeline > li.timeline-inverted > .timeline-panel:after {
    right: auto;
    left: -14px;
    border-right-width: 14px;
    border-left-width: 0;
  }

  .timeline > li:last-child {
    margin-bottom: 0;
  }

  .timeline .timeline-heading h4 {
    margin-top: 0;
    color: inherit;
  }

  .timeline .timeline-heading h4.subheading {
    text-transform: none;
  }

  .timeline .timeline-body > ul,
  .timeline .timeline-body > p {
    margin-bottom: 0;
  }

  @media (min-width: 768px) {
    .timeline:before {
      left: 50%;
    }
    .timeline > li {
      min-height: 100px;
      margin-bottom: 100px;
    }
    .timeline > li .timeline-panel {
      float: left;
      width: 41%;
      padding: 0 20px 20px 30px;
      text-align: right;
    }
    .timeline > li .timeline-image {
      left: 50%;
      width: 100px;
      height: 100px;
      margin-left: -50px;
    }
    .timeline > li .timeline-image h4 {
      font-size: 13px;
      line-height: 18px;
      margin-top: 16px;
    }
    .timeline > li.timeline-inverted > .timeline-panel {
      float: right;
      padding: 0 30px 20px 20px;
      text-align: left;
    }
  }

  @media (min-width: 992px) {
    .timeline > li {
      min-height: 150px;
    }
    .timeline > li .timeline-panel {
      padding: 0 20px 20px;
    }
    .timeline > li .timeline-image {
      width: 150px;
      height: 150px;
      margin-left: -75px;
    }
    .timeline > li .timeline-image h4 {
      font-size: 18px;
      line-height: 26px;
      margin-top: 30px;
    }
    .timeline > li.timeline-inverted > .timeline-panel {
      padding: 0 20px 20px;
    }
  }

  @media (min-width: 1200px) {
    .timeline > li {
      min-height: 170px;
    }
    .timeline > li .timeline-panel {
      padding: 0 20px 20px 100px;
    }
    .timeline > li .timeline-image {
      width: 170px;
      height: 170px;
      margin-left: -85px;
    }
    .timeline > li .timeline-image h4 {
      margin-top: 40px;
    }
    .timeline > li.timeline-inverted > .timeline-panel {
      padding: 0 100px 20px 20px;
    }
  }

  .team-member {
    margin-bottom: 50px;
    text-align: center;
  }

  .team-member img {
    width: 225px;
    height: 225px;
    border: 7px solid rgba(0, 0, 0, 0.1);
  }

  .team-member h4 {
    margin-top: 25px;
    margin-bottom: 0;
    text-transform: none;
  }

  .team-member p {
    margin-top: 0;
  }

  section#support {
    background-color: #212529;
    background-image: url(${supportBkg});
    background-repeat: no-repeat;
    background-position: center;
  }

  section#support .section-heading {
    color: #fff;
  }

  section#support .form-group {
    margin-bottom: 25px;
  }

  section#support .form-group input,
  section#support .form-group textarea {
    padding: 20px;
  }

  section#support .form-group input.form-control {
    height: auto;
  }

  section#support .form-group textarea.form-control {
    height: 248px;
  }

  section#support .form-control:focus {
    border-color: #0e6993;
    box-shadow: none;
  }

  section#support ::-webkit-input-placeholder {
    font-weight: 700;
    color: #ced4da;
    font-family: "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  }

  section#support :-moz-placeholder {
    font-weight: 700;
    color: #ced4da;
    font-family: "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  }

  section#support ::-moz-placeholder {
    font-weight: 700;
    color: #ced4da;
    font-family: "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  }

  section#support :-ms-input-placeholder {
    font-weight: 700;
    color: #ced4da;
    font-family: "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  }

  .footer {
    padding: 25px 0;
    text-align: center;
  }

  .footer span.copyright {
    font-size: 90%;
    line-height: 40px;
    text-transform: none;
    font-family: "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  }

  .footer ul.quicklinks {
    font-size: 90%;
    line-height: 20x;
    margin-bottom: 0;
    text-transform: none;
    font-family: "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  }

  ul.social-buttons {
    margin-bottom: 0;
  }

  ul.social-buttons li a {
    font-size: 20px;
    line-height: 50px;
    display: block;
    width: 50px;
    height: 50px;
    transition: all 0.3s;
    color: white;
    border-radius: 100%;
    outline: none;
    background-color: #212529;
  }

  ul.social-buttons li a:active,
  ul.social-buttons li a:focus,
  ul.social-buttons li a:hover {
    background-color: #0e6993;
  }

  button.signout {
    border-radius: 10px;
    width: 100px;
    padding: 0;
    margin: 0;
  }

  #mainNav .navbar-brand {
    font-size: 45px;
  }
`;
