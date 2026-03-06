import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Lazy load route components for better initial load performance
const Home = React.lazy(() => import('./pages/Home'))
const Doctors = React.lazy(() => import('./pages/Doctors'))
const Login = React.lazy(() => import('./pages/Login'))
const About = React.lazy(() => import('./pages/About'))
const Contact = React.lazy(() => import('./pages/Contact'))
const MyProfile = React.lazy(() => import('./pages/MyProfile'))
const MyAppointment = React.lazy(() => import('./pages/MyAppointment'))
const Appointment = React.lazy(() => import('./pages/Appointment'))

// Simple fallback loader specifically for frontend routes
const Loader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
  </div>
)

const App = () => {
  return (
    <div className='min-h-screen'>
      <ToastContainer />
      <Navbar />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/doctors' element={<Doctors />} />
          <Route path='/doctors/:speciality' element={<Doctors />} />
          <Route path='/login' element={<Login />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/my-profile' element={<MyProfile />} />
          <Route path='/my-appointments' element={<MyAppointment />} />
          <Route path='/appointment/:docId' element={<Appointment />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  )
}

export default App
