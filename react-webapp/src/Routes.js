import React from "react";
import Home from "./components/pages/HomePage";
import PrivateRoute from "./libs/PrivateRoute";
import { Route, Routes } from "react-router-dom";
import Login from "./components/pages/LoginPage";
import About from "./components/pages/AboutPage";
import Testpage from "./components/pages/TestPage";
import ProfilePage from "./components/pages/ProfilePage";
import BidDashboard from "./components/bids/BidDashboard";
import NotFoundPage from "./components/pages/NotFoundPage";
import ResourcesPage from "./components/pages/ResourcesPage";
import AxiosTestPage from "./components/pages/AxiosTestPage";
import ContractDashboard from "./components/contracts/ContractDashboard";
import ProfilePageTesting from "./components/employees/ProfilePageTesting";
import AdministrationDashboard from "./components/admin/AdministrationDashboard";

class Routing extends React.Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="dashboard" element={<Home />} />
        <Route path="login" element={<Login {...this.props} />} />
        <Route path="resources" element={<ResourcesPage {...this.props} />} />
        <Route path="about" element={<About />} />
        <PrivateRoute path="/axios" element={<AxiosTestPage {...this.props} />} />
        <PrivateRoute path="/testpage" element={<Testpage {...this.props} />} />
        {/* Seems redundant to check if is authenticated here, but it prevents update during an existing state transision. */}
        {this.props.isAuthenticated && (
          <>
            <PrivateRoute path="contracts/*" element={<ContractDashboard {...this.props} />} />
            <PrivateRoute path="administration/*" element={<AdministrationDashboard {...this.props} />} />
            <PrivateRoute path="/bids/*" element={<BidDashboard {...this.props} />} />
            <PrivateRoute path="/profile" element={<ProfilePage {...this.props} />} />
            <PrivateRoute path="/profiletest" element={<ProfilePageTesting {...this.props} />} />
          </>
        )}
        {/* Catch all unmatched routes */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    );
  }
}

export default Routing;
