# 🏥 Remote Patient Monitoring Platform

<p align="center">
  <strong>AI-Enabled Healthcare Monitoring Platform</strong>
</p>

<p align="center">
A full-stack healthcare monitoring application that enables clinicians and patients to monitor vital signs, review historical health data, visualize trends, and improve remote patient care through an intuitive web interface.
</p>

<p align="center">

<img src="https://img.shields.io/badge/React-Frontend-61DAFB?logo=react&logoColor=black" />

<img src="https://img.shields.io/badge/Vite-Build-646CFF?logo=vite&logoColor=white" />

<img src="https://img.shields.io/badge/Node.js-Backend-339933?logo=node.js&logoColor=white" />

<img src="https://img.shields.io/badge/Express.js-API-black?logo=express" />

<img src="https://img.shields.io/badge/CSV-Healthcare%20Data-blue" />

<img src="https://img.shields.io/badge/License-MIT-green" />

</p>

---

# 🚀 Live Demo

### 🌐 Frontend

https://rpm-frontend.onrender.com/

### 💻 GitHub Repository

https://github.com/Shekhar0419/rpm-dashboard

> **Note:** The application is deployed on Render. If the backend has been idle, the first request may take 30–60 seconds while the service wakes up on the free hosting tier.


---

# 📖 Overview

Remote Patient Monitoring (RPM) Platform is a full-stack healthcare application designed to help healthcare professionals remotely monitor patient health information through interactive dashboards and visual analytics.

The application demonstrates a modern healthcare workflow where clinicians can review patient information, monitor vital signs, visualize historical trends, and analyze patient health data from a centralized dashboard.

The platform provides separate interfaces for healthcare providers and patients while offering an intuitive workflow for reviewing patient records and monitoring key physiological measurements.

---

# ✨ Key Features

## 👨‍⚕️ Doctor Dashboard

Healthcare professionals can:

- View all registered patients
- Search patient records
- Review patient health metrics
- Open detailed patient profiles
- Monitor vital-sign trends
- Navigate through healthcare analytics

---

## 👤 Patient Dashboard

Patients can access:

- Blood Pressure
- Heart Rate
- Blood Glucose
- Oxygen Saturation
- Historical health information
- Personal health dashboard

---

## 📊 Healthcare Analytics

The application visualizes patient information through interactive charts including:

- Blood Pressure Trends
- Heart Rate Trends
- Blood Glucose Monitoring
- Oxygen Saturation
- Historical Measurements

---

## 📁 Patient Profiles

Each patient page includes:

- Patient Information
- Medical Measurements
- Historical Records
- Health Trends
- Clinical Overview

---

## 🔐 Authentication

The platform includes separate authentication workflows for:

- Doctor Login
- Patient Login

---

# 🏗 System Architecture

The Remote Patient Monitoring Platform follows a client-server architecture that separates the user interface from the healthcare data services.

```text
                    Remote Patient Monitoring Platform

                            React + Vite Frontend
                                     │
                                     │ HTTP Requests
                                     ▼
                        Node.js + Express Backend API
                                     │
                                     │
                 ┌───────────────────┴───────────────────┐
                 │                                       │
                 ▼                                       ▼
          Healthcare CSV Dataset                 Authentication
          Patient Vital Records                  Doctor & Patient Login
                 │
                 ▼
        Patient Analytics & Charts
                 │
                 ▼
          Doctor Dashboard
          Patient Dashboard
          Patient Details
```

---

# 🛠 Technology Stack

## Frontend

- React
- Vite
- JavaScript
- HTML5
- CSS3

---

## Backend

- Node.js
- Express.js
- REST API

---

## Data Processing

- CSV Dataset
- JavaScript
- Data Parsing

---

## Data Visualization

- Interactive Charts
- Metric Cards
- Patient Analytics

---

## Development Tools

- Git
- GitHub
- VS Code
- Render

---

# 📂 Project Structure

```text
rpm-dashboard
│
├── backend
│   ├── server.js
│   ├── package.json
│   ├── patient_data.csv
│   ├── uploads/
│   └── ...
│
├── frontend
│   ├── src
│   │
│   ├── pages
│   │   ├── LoginPage.jsx
│   │   ├── DoctorDashboard.jsx
│   │   ├── PatientDashboard.jsx
│   │   └── PatientDetails.jsx
│   │
│   ├── charts
│   │   ├── LineChart.jsx
│   │   └── MetricCard.jsx
│   │
│   ├── components
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── ...
│
├── docs
│   └── screenshots
│
└── README.md
```

---

# ⚙ Installation

Clone the repository.

```bash
git clone https://github.com/Shekhar0419/rpm-dashboard.git
```

Open the project.

```bash
cd rpm-dashboard
```

---

# 📦 Install Backend

```bash
cd backend

npm install
```

Start backend.

```bash
npm start
```

---

# 📦 Install Frontend

Open another terminal.

```bash
cd frontend

npm install
```

Run React.

```bash
npm run dev
```

The frontend will be available at

```
http://localhost:5173
```

---

# 🔐 Authentication

The platform contains two independent login workflows.

### Doctor

- Secure login
- View all patients
- Patient analytics
- Health monitoring
- Dashboard

---

### Patient

- Personal dashboard
- Health measurements
- Historical trends
- Patient profile

---

# 📊 Healthcare Dashboard

The dashboard provides clinicians with a centralized view of patient health information including:

- Blood Pressure
- Heart Rate
- Blood Glucose
- Oxygen Saturation
- Historical Trends
- Patient Analytics
- Clinical Monitoring

---

# 📈 Patient Monitoring Workflow

```text
Patient

↓

Health Measurements

↓

CSV Dataset

↓

Express Backend

↓

React Dashboard

↓

Doctor Review

↓

Patient Details

↓

Healthcare Analytics
```

---

# 📸 Application Screenshots

The following screenshots demonstrate the complete Remote Patient Monitoring workflow, from user authentication through patient monitoring and healthcare analytics.

---

## Login

The application provides secure authentication for healthcare professionals and patients through dedicated login portals.

<p align="center">
  <img src="docs/screenshots/login.png" width="1000" alt="Login Page"/>
</p>

---

## Doctor Dashboard

The Doctor Dashboard provides clinicians with a centralized overview of remotely monitored patients, current health status, vital signs, and patient summaries.

<p align="center">
  <img src="docs/screenshots/doctor-dashboard.png" width="1000" alt="Doctor Dashboard"/>
</p>

---

## Patient Dashboard

The Patient Dashboard enables patients to review their latest health measurements, historical trends, and personal monitoring information in an easy-to-understand interface.

<p align="center">
  <img src="docs/screenshots/patient-dashboard.png" width="1000" alt="Patient Dashboard"/>
</p>

---

## Healthcare Analytics

Interactive visualizations display trends in blood pressure, heart rate, temperature, and device battery level, helping clinicians monitor patient health over time.

<p align="center">
  <img src="docs/screenshots/charts.png" width="1000" alt="Healthcare Analytics"/>
</p>

---

---

# 🚀 Deployment

## Frontend

https://rpm-frontend.onrender.com/

---

## Source Code

https://github.com/Shekhar0419/rpm-dashboard

---

# 🔮 Future Enhancements

Future improvements planned for the platform include:

- Real-time IoT device integration
- Electronic Health Record (EHR) integration
- Secure cloud database storage
- Role-based authorization
- JWT authentication
- Email and SMS notifications
- Predictive healthcare analytics
- AI-powered patient risk prediction
- Telemedicine integration
- Mobile application support
- HIPAA-compliant security enhancements
- Healthcare report generation

---

# 💻 Development Workflow

```text
Patient Data
      │
      ▼
CSV Dataset
      │
      ▼
Express Backend
      │
      ▼
REST APIs
      │
      ▼
React Frontend
      │
      ▼
Healthcare Dashboard
      │
      ▼
Doctor & Patient Monitoring
```

---

# 🤝 Contributing

Contributions, suggestions, and feature requests are welcome.

If you have ideas to improve the project, feel free to fork the repository and submit a pull request.

---

# 👨‍💻 Author

## Shekhar Jampula

**AI Engineer | Machine Learning Engineer | Applied AI**

🎓 Master of Science in Computer and Information Sciences  
Saint Louis University

### Connect with me

- **GitHub:** https://github.com/Shekhar0419
- **LinkedIn:** https://www.linkedin.com/in/shekhar-jampula-b586383b8

---

# 📄 License

This project is licensed under the MIT License.

See the `LICENSE` file for additional information.

---

<p align="center">

Built with ❤️ using React, Vite, Node.js, Express.js, and modern healthcare analytics.

</p>
