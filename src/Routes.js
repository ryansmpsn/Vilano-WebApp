import React from "react";
import Home from "./components/pages/HomePage";
import PrivateRoute from "./libs/PrivateRoute";
import { Route, Routes } from "react-router-dom";
import Login from "./components/pages/LoginPage";
import About from "./components/pages/AboutPage";
import Testpage from "./components/pages/TestPage";
import Claims from "./components/pages/forms/Claims";
import ProfilePage from "./components/pages/ProfilePage";
import BidDashboard from "./components/bids/BidDashboard";
import RequestReset from "./components/pages/RequestReset";
import NotFoundPage from "./components/pages/NotFoundPage";
import ResourcesPage from "./components/pages/ResourcesPage";
import AxiosTestPage from "./components/pages/AxiosTestPage";
import ResetPassword from "./components/pages/ResetPassword";
import ContractDashboard from "./components/contracts/ContractDashboard";
import AdministrationDashboard from "./components/admin/AdministrationDashboard";
import EmployeeManagement from "./components/admin/EmployeeManagement";

class Routing extends React.Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="dashboard" element={<Home />} />
        <Route path="login" element={<Login {...this.props} />} />
        <Route path="requestpasswordreset" element={<RequestReset {...this.props} />} />
        <Route path="resetpassword" element={<ResetPassword {...this.props} />} />
        <Route path="resources" element={<ResourcesPage {...this.props} />} />
        <Route path="about" element={<About />} />
        <Route path="claims" element={<Claims />} />
        <PrivateRoute path="axios" element={<AxiosTestPage {...this.props} />} />
        <PrivateRoute path="testpage" element={<Testpage {...this.props} />} />

        {/* Seems redundant to check if is authenticated here, but it prevents update during an existing state transision. */}
        {this.props.isAuthenticated && (
          <>
            <PrivateRoute path="contracts/*" element={<ContractDashboard {...this.props} />} />
            <PrivateRoute path="bids/*" element={<BidDashboard {...this.props} />} />
            <PrivateRoute path="profile" element={<ProfilePage {...this.props} />} />
            <PrivateRoute path="administration/*" element={<AdministrationDashboard {...this.props} />} />
            <PrivateRoute path="employee/*" element={<EmployeeManagement {...this.props} />} />
          </>
        )}
        {/* Catch all unmatched routes */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    );
  }
}

export default Routing;
