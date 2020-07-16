import React from "react";
import PrivateRoute from "./libs/PrivateRoute";
import Home from "./components/pages/HomePage";
import { Route, Routes } from "react-router-dom";
import Login from "./components/pages/LoginPage";
import About from "./components/pages/AboutPage";
import Testpage from "./components/pages/TestPage";
import ProfilePage from "./components/pages/ProfilePage";
import BidDashboard from "./components/bids/BidDashboard";
import NotFoundPage from "./components/pages/NotFoundPage";
import EmployeePage from "./components/pages/EmployeePage";
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
        <Route path="resources" element={<ResourcesPage />} />
        <Route path="about" element={<About />} />
        <PrivateRoute path="contracts/*" element={<ContractDashboard />} />
        <PrivateRoute path="administration/*" element={<AdministrationDashboard />} />
        <PrivateRoute path="/bids/*" element={<BidDashboard />} />
        <PrivateRoute path="/axios" element={<AxiosTestPage />} />
        <PrivateRoute path="/testpage" element={<Testpage />} />
        <PrivateRoute path="/profile" element={<ProfilePage />} />
        <PrivateRoute path="/profiletest" element={<ProfilePageTesting />} />
        <PrivateRoute path="/employees" element={<EmployeePage />} />
        {/* Catch all unmatched routes */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    );
  }
}

export default Routing;
