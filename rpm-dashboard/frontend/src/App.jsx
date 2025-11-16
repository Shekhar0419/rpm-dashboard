import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import DoctorDashboard from "./pages/DoctorDashboard.jsx";
import PatientDashboard from "./pages/PatientDashboard.jsx";
import PatientDetails from "./pages/PatientDetails.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/doctor" element={<DoctorDashboard />} />
          <Route path="/doctor/:patientId" element={<PatientDetails />} />
          <Route path="/patient/:patientId" element={<PatientDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
