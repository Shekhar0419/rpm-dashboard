import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MetricCard from "../charts/MetricCard.jsx";
import LineChart from "../charts/LineChart.jsx";

const PatientDashboard = () => {
  const { patientId } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await axios.get(`/api/patients/${patientId}`);
        setPatient(res.data);
      } catch (err) {
        setError("Failed to load patient data");
      } finally {
        setLoading(false);
      }
    };
    fetchPatient();
  }, [patientId]);

  if (loading) return <p className="page">Loading patient data…</p>;
  if (error) return <p className="page error-text">{error}</p>;
  if (!patient) return <p className="page">No data for this patient.</p>;

  const { summary, records } = patient;

  // map timestamps to readable strings for charts
  const chartData = records.map((r) => ({
    ...r,
    tsLabel: new Date(r.timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    })
  }));

  return (
    <div className="page">
      <h1>Patient Portal – ID {patientId}</h1>
      <p className="page-subtitle">View your recent remote monitoring data.</p>

      <div className="metrics-row">
        <MetricCard
          title="Latest BP"
          value={`${summary.latest_systolic_bp}/${summary.latest_diastolic_bp}`}
          unit="mmHg"
        />
        <MetricCard
          title="Latest Heart Rate"
          value={summary.latest_heart_rate}
          unit="bpm"
        />
        <MetricCard
          title="Latest Temperature"
          value={summary.latest_temperature.toFixed(1)}
          unit="°C"
        />
        <MetricCard
          title="Device Battery"
          value={summary.latest_battery_level}
          unit="%"
          variant={summary.latest_battery_level < 30 ? "warning" : "success"}
        />
      </div>

      <div className="metrics-row">
        <MetricCard
          title="Avg Heart Rate"
          value={summary.avg_heart_rate.toFixed(1)}
          unit="bpm"
        />
        <MetricCard
          title="Avg Systolic BP"
          value={summary.avg_systolic_bp.toFixed(1)}
          unit="mmHg"
        />
        <MetricCard
          title="Avg Diastolic BP"
          value={summary.avg_diastolic_bp.toFixed(1)}
          unit="mmHg"
        />
        <MetricCard
          title="Latest Status"
          value={summary.latest_health_status}
          variant={summary.latest_health_status === "Healthy" ? "success" : "warning"}
        />
      </div>

      <div className="chart-grid">
        <LineChart
          title="Blood Pressure Trend"
          data={chartData}
          xKey="tsLabel"
          yKey="systolic_bp"
          y2Key="diastolic_bp"
          yLabel="mmHg"
        />
        <LineChart
          title="Heart Rate Trend"
          data={chartData}
          xKey="tsLabel"
          yKey="heart_rate"
          yLabel="bpm"
        />
        <LineChart
          title="Device Battery Trend"
          data={chartData}
          xKey="tsLabel"
          yKey="battery_level"
          yLabel="%"
        />
      </div>
    </div>
  );
};

export default PatientDashboard;
