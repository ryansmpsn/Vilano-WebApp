import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./libs/PrivateRoute";
import Home from "./components/pages/HomePage";
import Login from "./components/pages/LoginPage";
import About from "./components/pages/AboutPage";
import PayrollPage from "./components/pages/PayrollPage";
import ProfilePage from "./components/pages/ProfilePage";
import Testpage from "./components/pages/TestPage";
import NotFoundPage from "./components/pages/NotFoundPage";
import ContractDashboard from "./components/contracts/ContractDashboard";
import PerformancePage from "./components/pages/PerformancePage";
import FinancialsPage from "./components/pages/FinancialsPage";
import ResourcesPage from "./components/pages/ResourcesPage";
import SubcontractorPage from "./components/pages/SubcontractorPage";
import AxiosTestPage from "./components/pages/AxiosTestPage";

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
        {/* <PrivateRoute path="/bids" element={<BidDashboard />} /> */}
        <PrivateRoute path="/axios" element={<AxiosTestPage />} />
        <PrivateRoute path="/testpage" element={<Testpage />} />
        <PrivateRoute path="/payroll" element={<PayrollPage />} />
        <PrivateRoute path="/performance" element={<PerformancePage />} />
        <PrivateRoute path="/financials" element={<FinancialsPage />} />
        <PrivateRoute path="/subcontractor" element={<SubcontractorPage />} />
        <PrivateRoute path="/profile" element={<ProfilePage />} />
        {/* Catch all unmatched routes */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    );
  }
}

export default Routing;
