import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import csvParser from "csv-parser";
import { fileURLToPath } from "url";

// -------------------------
// FIX 1: Proper __dirname for ES Modules
// -------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// -------------------------
// FIX 2: CORS CONFIG (only once, no duplicates)
// -------------------------
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

// -------------------------
// FIX 3: Correct CSV Path
// -------------------------
const DATA_PATH = path.join(__dirname, "data", "patient_data.csv");

let records = [];
let patientsIndex = new Map();

function loadCsv() {
  records = [];
  patientsIndex.clear();

  return new Promise((resolve, reject) => {
    fs.createReadStream(DATA_PATH)
      .pipe(csvParser())
      .on("data", (row) => {
        // Normalize types
        const rec = {
          patient_id: row.patient_id,
          timestamp: new Date(row.timestamp),
          sensor_id: Number(row.sensor_id),
          sensor_type: row.sensor_type,
          temperature: Number(row.temperature),
          systolic_bp: Number(row.systolic_bp),
          diastolic_bp: Number(row.diastolic_bp),
          heart_rate: Number(row.heart_rate),
          device_battery: Number(row.device_battery),
          target_bp: Number(row.target_bp),
          target_hr: Number(row.target_hr),
          target_health_status: row.target_health_status,
          battery_level: Number(row.battery_level),
        };

        records.push(rec);

        if (!patientsIndex.has(rec.patient_id)) {
          patientsIndex.set(rec.patient_id, []);
        }
        patientsIndex.get(rec.patient_id).push(rec);
      })
      .on("end", () => {
        // Sort patient data
        for (const list of patientsIndex.values()) {
          list.sort((a, b) => a.timestamp - b.timestamp);
        }
        console.log("Loaded records:", records.length);
        resolve();
      })
      .on("error", (err) => reject(err));
  });
}

// -------------------------
// AUTH ROUTES
// -------------------------
app.post("/api/login/doctor", (req, res) => {
  const { email, password } = req.body;

  if (email === "doctor@doc.com" && password === "12345") {
    return res.json({ ok: true, role: "doctor" });
  }
  return res.status(401).json({ ok: false, message: "Invalid doctor credentials" });
});

app.post("/api/login/patient", (req, res) => {
  const { patientId } = req.body;

  if (!patientId) {
    return res.status(400).json({ ok: false, message: "patientId is required" });
  }

  if (patientsIndex.has(String(patientId))) {
    return res.json({ ok: true, role: "patient" });
  }

  return res.status(404).json({ ok: false, message: "Patient not found" });
});

// -------------------------
// DATA ROUTES
// -------------------------
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", records: records.length });
});

app.get("/api/patients", (req, res) => {
  const list = [];

  for (const [patient_id, recs] of patientsIndex.entries()) {
    const latest = recs[recs.length - 1];

    const avgHr =
      recs.reduce((sum, r) => sum + r.heart_rate, 0) / (recs.length || 1);

    list.push({
      patient_id,
      last_timestamp: latest.timestamp,
      last_health_status: latest.target_health_status,
      last_systolic_bp: latest.systolic_bp,
      last_diastolic_bp: latest.diastolic_bp,
      last_heart_rate: latest.heart_rate,
      last_battery_level: latest.battery_level,
      avg_heart_rate: Number(avgHr.toFixed(1)),
      readings: recs.length,
    });
  }

  res.json(list);
});

app.get("/api/patients/:id", (req, res) => {
  const id = String(req.params.id);
  const recs = patientsIndex.get(id);

  if (!recs || recs.length === 0) {
    return res.status(404).json({ message: "Patient not found" });
  }

  const latest = recs[recs.length - 1];

  const avgHr =
    recs.reduce((sum, r) => sum + r.heart_rate, 0) / (recs.length || 1);
  const avgSys =
    recs.reduce((sum, r) => sum + r.systolic_bp, 0) / (recs.length || 1);
  const avgDia =
    recs.reduce((sum, r) => sum + r.diastolic_bp, 0) / (recs.length || 1);

  res.json({
    patient_id: id,
    records: recs,
    summary: {
      latest_timestamp: latest.timestamp,
      latest_health_status: latest.target_health_status,
      latest_systolic_bp: latest.systolic_bp,
      latest_diastolic_bp: latest.diastolic_bp,
      latest_heart_rate: latest.heart_rate,
      latest_temperature: latest.temperature,
      latest_battery_level: latest.battery_level,
      avg_heart_rate: Number(avgHr.toFixed(1)),
      avg_systolic_bp: Number(avgSys.toFixed(1)),
      avg_diastolic_bp: Number(avgDia.toFixed(1)),
    },
  });
});

// -------------------------
// START SERVER
// -------------------------
const PORT = process.env.PORT || 5000;

loadCsv()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Backend running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to load CSV:", err);
    process.exit(1);
  });
