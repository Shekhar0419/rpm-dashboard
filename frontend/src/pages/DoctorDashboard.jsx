import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MetricCard from "../charts/MetricCard.jsx";
import { API } from "../config.js";

const DoctorDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setError("");

        const res = await axios.get(`${API}/api/patients`);

        setPatients(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to load patients:", err);

        setError(
          err.response?.data?.message ||
            "Failed to load patient data."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const total = patients.length;

  const unhealthy = patients.filter(
    (patient) =>
      patient.last_health_status === "Unhealthy"
  ).length;

  const avgHr =
    patients.reduce(
      (sum, patient) =>
        sum + Number(patient.avg_heart_rate || 0),
      0
    ) / (patients.length || 1);

  return (
    <div className="page">
      <h1>Doctor Portal</h1>

      <p className="page-subtitle">
        Overview of all remotely monitored patients from your dataset.
      </p>

      <div className="metrics-row">
        <MetricCard
          title="Total Patients"
          value={total}
          subtitle="From current CSV"
        />

        <MetricCard
          title="Unhealthy Patients"
          value={unhealthy}
          variant={unhealthy > 0 ? "warning" : "success"}
          subtitle="Based on latest reading"
        />

        <MetricCard
          title="Avg Heart Rate"
          value={avgHr.toFixed(1)}
          unit="bpm"
          subtitle="Across all patients"
        />
      </div>

      {loading ? (
        <p>Loading patients...</p>
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : patients.length === 0 ? (
        <p>No patient records were found.</p>
      ) : (
        <div className="card">
          <div className="card-header">
            <h3>Patient List</h3>

            <p>
              Click a Patient ID to open detailed health trends.
            </p>
          </div>

          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Patient ID</th>
                  <th>Last Status</th>
                  <th>Last BP (Sys/Dia)</th>
                  <th>Last HR</th>
                  <th>Battery</th>
                  <th>Readings</th>
                </tr>
              </thead>

              <tbody>
                {patients.map((patient) => (
                  <tr key={patient.patient_id}>
                    <td>
                      <button
                        type="button"
                        className="link-button"
                        onClick={() =>
                          navigate(
                            `/doctor/${patient.patient_id}`
                          )
                        }
                      >
                        {patient.patient_id}
                      </button>
                    </td>

                    <td>{patient.last_health_status}</td>

                    <td>
                      {patient.last_systolic_bp}/
                      {patient.last_diastolic_bp}
                    </td>

                    <td>
                      {patient.last_heart_rate} bpm
                    </td>

                    <td>
                      {patient.last_battery_level}%
                    </td>

                    <td>{patient.readings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;