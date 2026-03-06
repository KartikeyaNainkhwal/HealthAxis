import React, { useContext, Suspense } from 'react'
import { DoctorContext } from './context/DoctorContext'
import { AdminContext } from './context/AdminContext'
import { Route, Routes, Navigate, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

// Lazy loading pages for better performance
const Dashboard = React.lazy(() => import('./pages/Admin/Dashboard'))
const AllAppointments = React.lazy(() => import('./pages/Admin/AllAppointments'))
const AddDoctor = React.lazy(() => import('./pages/Admin/AddDoctor'))
const DoctorsList = React.lazy(() => import('./pages/Admin/DoctorsList'))
const Login = React.lazy(() => import('./pages/Login'))
const DoctorAppointments = React.lazy(() => import('./pages/Doctor/DoctorAppointments'))
const DoctorDashboard = React.lazy(() => import('./pages/Doctor/DoctorDashboard'))
const DoctorProfile = React.lazy(() => import('./pages/Doctor/DoctorProfile'))

// Fallback loader component
const Loader = () => (
  <div className="flex items-center justify-center min-h-screen bg-background">
    <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
  </div>
)

const App = () => {
  const { dToken } = useContext(DoctorContext)
  const { aToken } = useContext(AdminContext)
  const location = useLocation()

  if (location.pathname === '/') {
    if (aToken) return <Navigate to="/admin-dashboard" replace />
    if (dToken) return <Navigate to="/doctor-dashboard" replace />
  }

  if (aToken) {
    return (
      <div className='bg-background min-h-screen'>
        <ToastContainer />
        <Navbar />
        <div className='flex items-start'>
          <Sidebar />
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/admin-dashboard" element={<Dashboard />} />
              <Route path="/all-appointments" element={<AllAppointments />} />
              <Route path="/add-doctor" element={<AddDoctor />} />
              <Route path="/doctor-list" element={<DoctorsList />} />
              <Route path="*" element={<Navigate to="/admin-dashboard" />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    )
  }

  if (dToken) {
    return (
      <div className='bg-background min-h-screen'>
        <ToastContainer />
        <Navbar />
        <div className='flex items-start'>
          <Sidebar />
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
              <Route path="/doctor-appointments" element={<DoctorAppointments />} />
              <Route path="/doctor-profile" element={<DoctorProfile />} />
              <Route path="*" element={<Navigate to="/doctor-dashboard" />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    )
  }

  return (
    <Suspense fallback={<Loader />}>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  )
}

export default App
