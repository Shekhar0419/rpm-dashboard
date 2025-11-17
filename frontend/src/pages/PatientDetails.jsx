import React from "react";
import { useParams } from "react-router-dom";
import PatientDashboard from "./PatientDashboard.jsx";

/**
 * Thin wrapper so that doctor view uses the same patient dashboard,
 * but with a different title in the navbar.
 */
const PatientDetails = () => {
  const { patientId } = useParams();

  return (
    <div className="page">
      <h1>Doctor View – Patient {patientId}</h1>
      <PatientDashboard />
    </div>
  );
};

export default PatientDetails;
