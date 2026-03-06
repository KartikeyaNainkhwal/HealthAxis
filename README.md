<div align="center">

<img src="https://img.shields.io/badge/HealthAxis-Full--Stack_Healthcare_Platform-0D7377?style=for-the-badge" />

<br/>

# 🏥 HealthAxis

### Premium Full-Stack Healthcare Appointment Platform

> A production-grade healthcare system that connects **patients, doctors, and administrators** in one seamless digital ecosystem.

⚡ **Built by Kartikeya Nainkhwal — Full Stack Developer specializing in scalable SaaS platforms.**

<br/>

[![React](https://img.shields.io/badge/React-61DAFB?style=flat-square\&logo=react\&logoColor=black)]()
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square\&logo=node.js\&logoColor=white)]()
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square\&logo=mongodb\&logoColor=white)]()
[![Express](https://img.shields.io/badge/Express-000000?style=flat-square\&logo=express\&logoColor=white)]()
[![Tailwind](https://img.shields.io/badge/TailwindCSS-38B2AC?style=flat-square\&logo=tailwind-css\&logoColor=white)]()
[![Razorpay](https://img.shields.io/badge/Razorpay-02042B?style=flat-square\&logo=razorpay)]()

<br/>

🌐 **Live Demo:** *(Add after deployment)*
📂 **Repository:** [GitHub](https://github.com/KartikeyaNainkhwal/HealthAxis)
📹 **Demo Video:** Coming Soon

</div>

---

# ✨ Overview

**HealthAxis** is a full-stack healthcare platform designed to replicate real-world hospital and clinic systems.

The platform enables:

• Patients to **discover doctors and book appointments**
• Doctors to **manage appointments and write digital prescriptions**
• Admins to **control the entire system and monitor analytics**

This project demonstrates how to build a **production-ready SaaS platform** with authentication, payments, dashboards, notifications, and real business logic.

---
# 📸 Application Screenshots

Below are some key interfaces of **HealthAxis**.

---

### 🏠 Home Page

![Home Page](./screenshots/home.png)

---

### 🔎 Find Doctors

![Find Doctors](./screenshots/doctors.png)

---

### 📅 Appointment Booking

![Book Appointment](./screenshots/booking.png)

---

### 💳 Payment Integration

![Payment](./screenshots/payment.png)

---

### 👤 Patient Dashboard

![Patient Dashboard](./screenshots/patient-dashboard.png)

---

### 👨‍⚕️ Doctor Dashboard

![Doctor Dashboard](./screenshots/doctor-dashboard.png)

---

### 🛡️ Admin Panel

![Admin Panel](./screenshots/admin-dashboard.png)

---


# 💼 Business Use Cases

HealthAxis can power real businesses like:

• Private clinics
• Multi-doctor hospitals
• Telemedicine startups
• Healthcare marketplaces
• Medical appointment platforms
• Healthcare SaaS products

This architecture can also be adapted to build:

• Salon booking systems
• Hotel booking platforms
• Consulting marketplaces
• Service provider platforms

---

# 🧩 Core Features

## 👤 Patient Portal

Patients can:

• Search doctors by **speciality and availability**
• Book appointments with **real-time slot validation**
• Make **secure payments via Razorpay**
• View appointment history
• Download digital prescriptions
• Leave **verified doctor reviews**

Other features include:

• Email OTP verification
• Google OAuth login
• Profile management
• Appointment cancellation with automated refunds

---

## 👨‍⚕️ Doctor Dashboard

Doctors have a dedicated dashboard where they can:

• View upcoming appointments
• Accept or cancel bookings
• Write **digital prescriptions**
• Monitor their appointment statistics
• Manage profile and availability

The dashboard also provides **analytics such as:**

• Total patients
• Total revenue
• Appointment trends

---

## 🛡️ Admin Panel

Admins control the entire platform.

Admin capabilities include:

• Add or remove doctors
• View all users and appointments
• Manage payments and refunds
• Monitor system analytics
• Control platform operations

This demonstrates **role-based SaaS architecture**.

---

# 💳 Payment System

HealthAxis integrates with **Razorpay** for secure transactions.

Features include:

• Secure payment verification
• Automated refund system
• Transaction tracking

### Refund Logic

| Time Before Appointment | Refund      |
| ----------------------- | ----------- |
| More than 24 hours      | 100% Refund |
| 12 – 24 hours           | 50% Refund  |
| Less than 12 hours      | No Refund   |

---

# ⭐ Doctor Reviews System

After a completed appointment:

• Patients receive a **review request email**
• They can leave a **1-5 star rating**
• Reviews appear on the doctor's public profile

This creates **real social proof** and trust in the platform.

---

# 📩 Notification System

HealthAxis includes a full notification pipeline:

• Email notifications using Nodemailer
• WhatsApp notifications using Twilio
• Booking confirmations
• Appointment reminders
• Review request emails

---

# 📊 Analytics Dashboard

The system includes analytics such as:

• Total appointments
• Total revenue
• Daily appointment trends
• Doctor performance insights

Charts are implemented using **Recharts**.

---

# 🔐 Security Features

Security is a major part of the platform.

Implemented protections include:

• JWT authentication
• Password hashing with bcrypt
• Role-based access control
• Protected API routes
• Secure payment verification

---

# 🛠 Tech Stack

### Frontend

• React
• Vite
• TailwindCSS
• Framer Motion
• React Router

### Backend

• Node.js
• Express
• MongoDB
• Mongoose

### Authentication

• JWT
• bcrypt
• Google OAuth

### Integrations

• Razorpay (payments)
• Cloudinary (file storage)
• Nodemailer (email)
• Twilio (WhatsApp notifications)

### Deployment

• Vercel / Render / Node server

---

# 📂 Project Architecture

```
HealthAxis
│
├── frontend
│   ├── components
│   ├── pages
│   └── context
│
├── admin
│   ├── admin dashboard
│   ├── doctor dashboard
│   └── analytics
│
└── backend
    ├── controllers
    ├── models
    ├── routes
    └── middlewares
```

---

# 🚀 Installation

### Clone Repository

```
git clone https://github.com/KartikeyaNainkhwal/HealthAxis.git
cd HealthAxis
```

---

### Backend Setup

```
cd backend
npm install
```

Create `.env`

```
MONGODB_URI=
JWT_SECRET=

CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_SECRET_KEY=

RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

EMAIL_FROM=
SMTP_USER=
SMTP_PASS=

GOOGLE_CLIENT_ID=
```

Run backend

```
npm run server
```

---

### Frontend Setup

```
cd frontend
npm install
npm run dev
```

---

### Admin Panel

```
cd admin
npm install
npm run dev
```

---

# 🌐 Local URLs

Patient Website

```
http://localhost:5173
```

Admin Panel

```
http://localhost:5174
```

Backend API

```
http://localhost:4000
```

---

# 🧠 Real Problems Solved

Many healthcare platforms struggle with:

• Appointment double booking
• Poor admin control
• No doctor analytics
• Complicated payment handling

HealthAxis solves this with:

• Real-time slot validation
• Role-based dashboards
• Automated payment logic
• Verified review system

---

# 🚀 What I Can Build For Clients

Using this architecture I can build:

• Healthcare platforms
• SaaS web applications
• Appointment booking systems
• Admin dashboards
• Marketplace platforms
• Payment integrated systems
• Startup MVP products

---

# 🤝 Open for Freelance Work

I specialize in building **full-stack SaaS platforms and modern web applications.**

Services I offer:

• Full-stack MERN development
• Startup MVP development
• SaaS platforms
• Dashboard systems
• Payment integrations
• API development

If you're building a **startup or scalable web platform**, feel free to reach out.

📩 **Email:** [kartikeyak@iitbhilai.ac.in](mailto:kartikeyanainkhwal@gmail.com)

---

<div align="center">

⭐ If you found this project interesting, consider starring the repository.

Built with ❤️ by **Kartikeya Nainkhwal**

</div>