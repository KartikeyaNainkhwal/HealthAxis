<div align="center">

<br/>

# 🏥 HealthAxis

### **Full-Stack Healthcare Appointment Platform**
#### *Patients · Doctors · Admins — One Unified Ecosystem*

<br/>

[![Live Demo](https://img.shields.io/badge/🌐%20Live%20Demo-Visit%20App-4CAF50?style=for-the-badge&logoColor=white)](https://health-axis-five.vercel.app)
&nbsp;
[![Portfolio](https://img.shields.io/badge/👨‍💻%20Built%20By-KartikeyaNainkhwal-6C63FF?style=for-the-badge)](https://github.com/KartikeyaNainkhwal)
&nbsp;
[![Deployments](https://img.shields.io/badge/✅%20Deployments-17%20Live-00C896?style=for-the-badge)](#)
&nbsp;
[![Stack](https://img.shields.io/badge/Stack-MERN-FF6B35?style=for-the-badge&logo=mongodb&logoColor=white)](#)

<br/>

> 🏥 **HealthAxis** is a production-deployed, full-stack healthcare management system built with the MERN stack.
> It supports three distinct user roles — **Patients**, **Doctors**, and **Admins** — each with their own
> dedicated portal, real-time appointment management, and **Razorpay** payment integration.

<br/>

---

</div>

## 📌 Table of Contents

- [🌟 Overview](#-overview)
- [🚀 Live Deployments](#-live-deployments)
- [📸 Full Screenshot Gallery](#-full-screenshot-gallery)
  - [Patient Portal](#-patient-portal)
  - [Doctor Portal Sign-In & Admin Portal](#-doctor-portal-sign-in--admin-portal)
  - [Admin Panel](#️-admin-panel)
  - [Doctor Portal](#-doctor-portal)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [⚙️ Getting Started](#️-getting-started)
- [🔐 Environment Variables](#-environment-variables)
- [👨‍💻 Author](#-author)

---

## 🌟 Overview

**HealthAxis** is more than a booking app — it's a complete healthcare operations platform.

| What it solves | How |
|---|---|
| 🔍 Finding the right doctor | Browseable, filterable doctor directory |
| 📅 Booking appointments | Real-time slot selection with instant confirmation |
| 💳 Paying securely | Razorpay payment gateway — fully integrated |
| 👨‍⚕️ Doctor workflow | Personal dashboard, appointment management, profile editor |
| 🛡️ Clinic administration | Full admin panel — manage doctors, appointments & platform data |

Built for scale, deployed across **3 production environments**, and crafted with a pixel-perfect UI.

---

## 🚀 Live Deployments

| # | Environment | URL | Status |
|---|---|---|---|
| 1 | 🟢 Primary | [health-axis-five.vercel.app](https://health-axis-five.vercel.app) | **Live** |
| 2 | 🟢 Mirror | health-axis-kpth.vercel.app | **Live** |
| 3 | 🟢 Mirror | health-axis-1rmk.vercel.app | **Live** |

> 17 total deployments tracked — continuously iterated and improved.

---

## 📸 Full Screenshot Gallery

---

### 🙍 Patient Portal

> Everything a patient needs — from discovering doctors to managing their full health journey.

<br/>

![Patient Portal 1](screenshots/HealthAxis1.png)

<br/>

![Patient Portal 2](screenshots/HealthAxis2.png)

<br/>

![Patient Portal 3](screenshots/HealthAxis3.png)

<br/>

![Patient Portal 4](screenshots/HealthAxis4.png)

<br/>

![Patient Portal 5](screenshots/HealthAxis5.png)

<br/>

![Patient Portal 6](screenshots/HealthAxis6.png)

<br/>

![Patient Portal 7](screenshots/HealthAxis7.png)

<br/>

![Patient Portal 8](screenshots/HealthAxis8.png)

<br/>

![Patient Portal 9](screenshots/HealthAxis9.png)

<br/>

![Patient Portal 10](screenshots/HealthAxis10.png)

---

### 🔐 Doctor Portal Sign-In & Admin Portal

<br/>

![Doctor Sign-In](screenshots/HealthAxis11.png)

<br/>

![Admin Portal](screenshots/adminportal.png)

---

### 🛡️ Admin Panel

> Full operational control — manage every doctor, appointment, and platform setting.

<br/>

![Admin Panel 1](screenshots/HealthAxis12.png)

<br/>

![Admin Panel 2](screenshots/HealthAxis13.png)

<br/>

![Admin Panel 3](screenshots/HealthAxis14.png)

<br/>

![Admin Panel 4](screenshots/HealthAxis15.png)

<br/>

![Admin Panel 5](screenshots/HealthAxis16.png)

---

### 👨‍⚕️ Doctor Portal

> A dedicated workspace for doctors to manage their schedule, patients, and professional profile.

<br/>

![Doctor Portal 1](screenshots/HealthAxis17.png)

<br/>

![Doctor Portal 2](screenshots/HealthAxis18.png)

<br/>

![Doctor Portal 3](screenshots/HealthAxis19.png)

<br/>

![Doctor Portal 4](screenshots/HealthAxis20.png)

---

## ✨ Features

### 🙍 Patient Features
- ✅ Secure register & login with JWT authentication
- ✅ Browse and filter doctors by specialty
- ✅ Book appointments with real-time slot availability
- ✅ Pay for appointments via **Razorpay** payment gateway
- ✅ View and cancel upcoming/past appointments
- ✅ Edit personal profile and account details
- ✅ Fully mobile-responsive UI

### 👨‍⚕️ Doctor Features
- ✅ Dedicated doctor login and personal dashboard
- ✅ View and manage daily appointment schedule
- ✅ Accept or cancel patient bookings
- ✅ Edit professional profile — specialization, fees, bio, availability
- ✅ Upload and update profile picture via Cloudinary

### 🛡️ Admin Features
- ✅ Secure admin-only login
- ✅ Platform-wide dashboard with key operational stats
- ✅ Onboard new doctors with full profile setup
- ✅ View, edit, and remove doctors from the platform
- ✅ Monitor all appointments across all doctors
- ✅ Complete visibility into platform operations

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | React.js + Vite | Patient-facing UI |
| **Admin Panel** | React.js + Vite | Doctor & Admin portals |
| **Styling** | Tailwind CSS | Responsive, utility-first design |
| **Backend** | Node.js + Express.js | REST API server |
| **Database** | MongoDB + Mongoose | Data persistence |
| **Auth** | JWT + bcrypt | Secure role-based authentication |
| **Payments** | Razorpay | Appointment payment processing |
| **File Storage** | Cloudinary | Doctor profile image hosting |
| **Deployment** | Vercel | Frontend hosting (17 deployments) |

</div>

---

## 📁 Project Structure

```
HealthAxis/
│
├── 📁 frontend/                  # React app — Patient portal
│   └── src/
│       ├── pages/                # Home, Doctors, Booking, MyAppointments,
│       │                         # MyProfile, About, Contact
│       ├── components/           # Navbar, Footer, DoctorCard, etc.
│       └── context/              # Global state (AppContext)
│
├── 📁 admin/                     # React app — Doctor & Admin portals
│   └── src/
│       ├── pages/
│       │   ├── Admin/            # Dashboard, AddDoctor, DoctorsList, Appointments
│       │   └── Doctor/           # Dashboard, Appointments, Profile
│       └── components/           # Sidebar, Navbar
│
├── 📁 backend/                   # Node.js + Express REST API
│   ├── controllers/              # Auth, Doctor, Admin, Appointment logic
│   ├── models/                   # Mongoose schemas (User, Doctor, Appointment)
│   ├── routes/                   # API route definitions
│   ├── middleware/               # JWT auth guards, Multer file upload
│   └── server.js                 # App entry point
│
├── .gitignore
├── 📁 screenshots/              # App screenshots (1-20.png)
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

```bash
node --version    # v18 or higher required
npm --version     # v9 or higher required
```

You'll also need accounts on:
- [MongoDB Atlas](https://www.mongodb.com/atlas) — free tier works perfectly
- [Cloudinary](https://cloudinary.com) — for doctor image uploads
- [Razorpay](https://razorpay.com) — for payment integration

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/KartikeyaNainkhwal/HealthAxis.git
cd HealthAxis
```

### 2️⃣ Start the Backend

```bash
cd backend
npm install
npm start
# API running at http://localhost:4000
```

### 3️⃣ Start the Patient Frontend

```bash
cd frontend
npm install
npm run dev
# Running at http://localhost:5173
```

### 4️⃣ Start the Admin Panel

```bash
cd admin
npm install
npm run dev
# Running at http://localhost:5174
```

---

## 🔐 Environment Variables

Create a `.env` file inside the `/backend` directory:

```env
# ── Server ───────────────────────────────
PORT=4000

# ── MongoDB ──────────────────────────────
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/healthaxis

# ── Authentication ────────────────────────
JWT_SECRET=your_super_secret_jwt_key

# ── Admin Credentials ─────────────────────
ADMIN_EMAIL=admin@healthaxis.com
ADMIN_PASSWORD=your_admin_password

# ── Cloudinary (Image Uploads) ────────────
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_SECRET_KEY=your_api_secret

# ── Razorpay (Payments) ───────────────────
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

> ⚠️ **Never commit `.env` to version control.** Already covered in `.gitignore`.

---

## 🤝 Contributing

Contributions are welcome!

```bash
# 1. Fork this repo on GitHub
# 2. Create your feature branch
git checkout -b feature/your-feature-name

# 3. Make your changes and commit
git commit -m "feat: describe your feature"

# 4. Push to your fork
git push origin feature/your-feature-name

# 5. Open a Pull Request on GitHub
```

---

## 👨‍💻 Author

<div align="center">

<br/>

### Built with 💙 by **Kartikeya Nainkhwal**

*Full-Stack Developer · MERN Specialist · Available for Freelance*

<br/>

[![GitHub](https://img.shields.io/badge/GitHub-KartikeyaNainkhwal-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/KartikeyaNainkhwal)
&nbsp;&nbsp;
[![Live Project](https://img.shields.io/badge/🌐%20Live%20App-HealthAxis-4CAF50?style=for-the-badge)](https://health-axis-five.vercel.app)

<br/>

---

*If this project caught your eye, I'd love to collaborate.*
*Drop a ⭐ on the repo — and let's build something amazing together.* 🚀

<br/>

</div>
