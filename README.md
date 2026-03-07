<div align="center">

<img src="https://img.shields.io/badge/HealthAxis-Platform-blue?style=for-the-badge&logo=heart&logoColor=white" alt="HealthAxis" />

# 🏥 HealthAxis

### *Your Complete Healthcare Ecosystem — Patients, Doctors & Admins, United.*

[![Live Demo](https://img.shields.io/badge/🌐%20Live%20Demo-health--axis--five.vercel.app-4CAF50?style=for-the-badge)](https://health-axis-five.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-KartikeyaNainkhwal-181717?style=for-the-badge&logo=github)](https://github.com/KartikeyaNainkhwal/HealthAxis)
![Deployments](https://img.shields.io/badge/Deployments-13%20%E2%9C%85-success?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Production%20Live-brightgreen?style=for-the-badge)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Live Demo](#-live-demo)
- [Screenshots](#-screenshots)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Contributing](#-contributing)

---

## 🌟 Overview

**HealthAxis** is a full-stack, production-ready healthcare management platform that seamlessly connects **patients**, **doctors**, and **administrators** in one unified ecosystem.

Whether you're booking a doctor's appointment, managing a medical practice, or overseeing an entire clinic's operations — HealthAxis handles it all with a clean, modern UI and a powerful backend.

> 💡 Built and deployed end-to-end by [KartikeyaNainkhwal](https://github.com/KartikeyaNainkhwal) — currently live across **3 production deployments**.

---

## 🌐 Live Demo

| Deployment | URL | Status |
|---|---|---|
| 🟢 Primary | [health-axis-five.vercel.app](https://health-axis-five.vercel.app) | Live |
| 🟢 Mirror 1 | health-axis-kpth.vercel.app | Live |
| 🟢 Mirror 2 | health-axis-1rmk.vercel.app | Live |

---

## 📸 Screenshots

### 🏠 Patient-Facing Pages

<table>
  <tr>
    <td align="center"><strong>🏠 Home / About</strong></td>
    <td align="center"><strong>👨‍⚕️ Browse Doctors</strong></td>
  </tr>
  <tr>
    <td><img src="about.png" alt="About Page" width="100%"/></td>
    <td><img src="doctors.png" alt="Doctors Listing" width="100%"/></td>
  </tr>
  <tr>
    <td align="center"><strong>📅 Book Appointment</strong></td>
    <td align="center"><strong>📬 Contact Us</strong></td>
  </tr>
  <tr>
    <td><img src="booking.png" alt="Booking Page" width="100%"/></td>
    <td><img src="contact.png" alt="Contact Page" width="100%"/></td>
  </tr>
</table>

---

### 👨‍⚕️ Doctor Portal

<table>
  <tr>
    <td align="center"><strong>📊 Doctor Dashboard</strong></td>
    <td align="center"><strong>📋 My Appointments</strong></td>
  </tr>
  <tr>
    <td><img src="doctor-dashboard.png" alt="Doctor Dashboard" width="100%"/></td>
    <td><img src="doctor-appointment.png" alt="Doctor Appointments" width="100%"/></td>
  </tr>
  <tr>
    <td align="center" colspan="2"><strong>👤 Doctor Profile</strong></td>
  </tr>
  <tr>
    <td colspan="2" align="center"><img src="doctor-profile.png" alt="Doctor Profile" width="50%"/></td>
  </tr>
</table>

---

### 🛡️ Admin Panel

<table>
  <tr>
    <td align="center"><strong>🔐 Admin Login</strong></td>
    <td align="center"><strong>📊 Admin Dashboard</strong></td>
  </tr>
  <tr>
    <td><img src="admin-login.png" alt="Admin Login" width="100%"/></td>
    <td><img src="admin-dashboard.png" alt="Admin Dashboard" width="100%"/></td>
  </tr>
  <tr>
    <td align="center"><strong>➕ Add New Doctor</strong></td>
    <td align="center"><strong>📋 Doctors List</strong></td>
  </tr>
  <tr>
    <td><img src="admin-add-doctor.png" alt="Add Doctor" width="100%"/></td>
    <td><img src="admin-doctors-list.png" alt="Doctors List" width="100%"/></td>
  </tr>
  <tr>
    <td align="center" colspan="2"><strong>🗓️ All Appointments</strong></td>
  </tr>
  <tr>
    <td colspan="2" align="center"><img src="admin-appointments.png" alt="Admin Appointments" width="50%"/></td>
  </tr>
</table>

---

## ✨ Features

### 👤 For Patients
- 🔍 **Browse & Search Doctors** — Filter by specialty, availability, and more
- 📅 **Online Appointment Booking** — Real-time slot selection and confirmation
- 🏠 **About & Contact Pages** — Informative, clean UI for trust-building
- 📱 **Fully Responsive** — Works seamlessly on mobile, tablet, and desktop

### 👨‍⚕️ For Doctors
- 📊 **Personal Dashboard** — Overview of today's schedule and stats
- 📋 **Appointment Management** — View, accept, or cancel patient appointments
- 👤 **Profile Management** — Update specialization, fees, availability, and bio

### 🛡️ For Admins
- 🔐 **Secure Admin Login** — Protected admin-only entry point
- 📊 **Admin Dashboard** — Bird's-eye view of platform activity
- ➕ **Add / Manage Doctors** — Onboard new doctors with full profile setup
- 📋 **Doctors Directory** — Full list with edit/delete capabilities
- 🗓️ **Appointments Overview** — Monitor all appointments across all doctors

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React.js, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB |
| **Auth** | JWT (JSON Web Tokens) |
| **File Uploads** | Cloudinary |
| **Deployment** | Vercel (Frontend) |
| **Version Control** | Git & GitHub |

---

## 📁 Project Structure

```
HealthAxis/
│
├── 📁 frontend/          # React.js Patient-facing app
│   ├── src/
│   │   ├── pages/        # Home, Doctors, Booking, Contact, About
│   │   ├── components/   # Navbar, Footer, DoctorCard, etc.
│   │   └── context/      # Global state (AppContext)
│
├── 📁 admin/             # React.js Admin & Doctor portal
│   ├── src/
│   │   ├── pages/        # Dashboard, DoctorsList, AddDoctor, Appointments
│   │   └── components/   # Sidebar, Navbar, etc.
│
├── 📁 backend/           # Node.js + Express REST API
│   ├── routes/           # Auth, Doctor, Admin, Appointment routes
│   ├── models/           # Mongoose schemas
│   ├── controllers/      # Business logic
│   └── middleware/       # Auth guards, file upload
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v18+`
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account (for image uploads)

### 1. Clone the Repository

```bash
git clone https://github.com/KartikeyaNainkhwal/HealthAxis.git
cd HealthAxis
```

### 2. Setup Backend

```bash
cd backend
npm install
# Add your .env file (see Environment Variables below)
npm start
```

### 3. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

### 4. Setup Admin Panel

```bash
cd admin
npm install
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file in the `/backend` directory:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_api_secret
ADMIN_EMAIL=admin@healthaxis.com
ADMIN_PASSWORD=your_admin_password
```

> ⚠️ **Never commit your `.env` file.** It's already covered in `.gitignore`.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 👨‍💻 Author

<div align="center">

**Kartikeya Nainkhwal**

[![GitHub](https://img.shields.io/badge/GitHub-KartikeyaNainkhwal-181717?style=for-the-badge&logo=github)](https://github.com/KartikeyaNainkhwal)

*Built with ❤️ — transforming how healthcare connects with technology.*

</div>

---

<div align="center">

⭐ **If you found this project helpful, please consider giving it a star!** ⭐

</div>
