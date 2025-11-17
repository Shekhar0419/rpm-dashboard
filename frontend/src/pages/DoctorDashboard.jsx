import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MetricCard from "../charts/MetricCard.jsx";

const DoctorDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get("/api/patients");
        setPatients(res.data);
      } catch (err) {
        setError("Failed to load patients");
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  const total = patients.length;
  const unhealthy = patients.filter(
    (p) => p.last_health_status === "Unhealthy"
  ).length;
  const avgHr =
    patients.reduce((sum, p) => sum + (p.avg_heart_rate || 0), 0) /
    (patients.length || 1);

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
      ) : (
        <div className="card">
          <div className="card-header">
            <h3>Patient List</h3>
            <p>Click a Patient ID to open detailed health trends.</p>
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
                {patients.map((p) => (
                  <tr key={p.patient_id}>
                    <td>
                      <button
                        className="link-button"
                        onClick={() => navigate(`/doctor/${p.patient_id}`)}
                      >
                        {p.patient_id}
                      </button>
                    </td>
                    <td>{p.last_health_status}</td>
                    <td>
                      {p.last_systolic_bp}/{p.last_diastolic_bp}
                    </td>
                    <td>{p.last_heart_rate} bpm</td>
                    <td>{p.last_battery_level}%</td>
                    <td>{p.readings}</td>
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
