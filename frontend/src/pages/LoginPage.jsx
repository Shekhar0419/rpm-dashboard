import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [mode, setMode] = useState("doctor");
  const [doctorEmail, setDoctorEmail] = useState("doctor@doc.com");
  const [doctorPassword, setDoctorPassword] = useState("12345");
  const [patientId, setPatientId] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleDoctorLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("/api/login/doctor", {
        email: doctorEmail,
        password: doctorPassword
      });
      if (res.data.ok) {
        navigate("/doctor");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const handlePatientLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("/api/login/patient", {
        patientId: patientId.trim()
      });
      if (res.data.ok) {
        navigate(`/patient/${patientId.trim()}`);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
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
          className={mode === "doctor" ? "tab active" : "tab"}
          onClick={() => {
            setMode("doctor");
            setError("");
          }}
        >
          Doctor Portal
        </button>
        <button
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
          <label>
            Doctor Email
            <input
              type="email"
              value={doctorEmail}
              onChange={(e) => setDoctorEmail(e.target.value)}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={doctorPassword}
              onChange={(e) => setDoctorPassword(e.target.value)}
            />
          </label>
          <button type="submit" className="btn primary">
            Login as Doctor
          </button>
        </form>
      ) : (
        <form className="form" onSubmit={handlePatientLogin}>
          <label>
            Patient ID
            <input
              type="text"
              placeholder="e.g., 8270"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
            />
          </label>
          <button type="submit" className="btn primary">
            Login as Patient
          </button>
        </form>
      )}

      {error && <p className="error-text">{error}</p>}

      <div className="login-hint">
        <p>
          <strong>Doctor demo credentials:</strong> doctor@doc.com / 12345
        </p>
        <p>
          <strong>Sample Patient IDs:</strong> 8270, 1860, 6390, 6191, 6734,
          7265, 1466, 5426, 6575, 9322, 2685, 1769, 7949, 3433, 6311, 6051, 7420
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
