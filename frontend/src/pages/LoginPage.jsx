import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API } from "../config.js";

const LoginPage = () => {
  const [mode, setMode] = useState("doctor");
  const [doctorEmail, setDoctorEmail] = useState("doctor@doc.com");
  const [doctorPassword, setDoctorPassword] = useState("12345");
  const [patientId, setPatientId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleDoctorLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(`${API}/api/login/doctor`, {
        email: doctorEmail.trim(),
        password: doctorPassword,
      });

      if (res.data.ok) {
        navigate("/doctor");
      } else {
        setError(res.data.message || "Login failed");
      }
    } catch (err) {
      console.error("Doctor login failed:", err);

      setError(
        err.response?.data?.message ||
          "Unable to connect to the backend."
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePatientLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const cleanPatientId = patientId.trim();

      const res = await axios.post(`${API}/api/login/patient`, {
        patientId: cleanPatientId,
      });

      if (res.data.ok) {
        navigate(`/patient/${cleanPatientId}`);
      } else {
        setError(res.data.message || "Login failed");
      }
    } catch (err) {
      console.error("Patient login failed:", err);

      setError(
        err.response?.data?.message ||
          "Unable to connect to the backend."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card login-card">
      <div className="card-header">
        <h2>Welcome to Remote Patient Monitoring</h2>
        <p>Select your portal and sign in.</p>
      </div>

      <div className="tab-toggle">
        <button
          type="button"
          className={mode === "doctor" ? "tab active" : "tab"}
          onClick={() => {
            setMode("doctor");
            setError("");
          }}
        >
          Doctor Portal
        </button>

        <button
          type="button"
          className={mode === "patient" ? "tab active" : "tab"}
          onClick={() => {
            setMode("patient");
            setError("");
          }}
        >
          Patient Portal
        </button>
      </div>

      {mode === "doctor" ? (
        <form className="form" onSubmit={handleDoctorLogin}>
          <label htmlFor="doctor-email">
            Doctor Email
          </label>

          <input
            id="doctor-email"
            name="doctorEmail"
            type="email"
            value={doctorEmail}
            onChange={(e) => setDoctorEmail(e.target.value)}
            required
          />

          <label htmlFor="doctor-password">
            Password
          </label>

          <input
            id="doctor-password"
            name="doctorPassword"
            type="password"
            value={doctorPassword}
            onChange={(e) => setDoctorPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="btn primary"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Login as Doctor"}
          </button>
        </form>
      ) : (
        <form className="form" onSubmit={handlePatientLogin}>
          <label htmlFor="patient-id">
            Patient ID
          </label>

          <input
            id="patient-id"
            name="patientId"
            type="text"
            placeholder="e.g., 8270"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            required
          />

          <button
            type="submit"
            className="btn primary"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Login as Patient"}
          </button>
        </form>
      )}

      {error && (
        <p className="error-text" role="alert">
          {error}
        </p>
      )}

      <div className="login-hint">
        <p>
          <strong>Doctor demo credentials:</strong>{" "}
          doctor@doc.com / 12345
        </p>

        <p>
          <strong>Sample Patient IDs:</strong>{" "}
          8270, 1860, 6390, 6191, 6734, 7265, 1466, 5426,
          6575, 9322, 2685, 1769, 7949, 3433, 6311, 6051,
          7420
        </p>
      </div>
    </div>
  );
};

export default LoginPage;