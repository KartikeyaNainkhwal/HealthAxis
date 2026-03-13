import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { useNavigate, useLocation } from 'react-router-dom'

const Navbar = () => {
  const { dToken, setDToken } = useContext(DoctorContext)
  const { aToken, setAToken } = useContext(AdminContext)
  const navigate = useNavigate()
  const location = useLocation()

  const logout = () => {
    navigate('/')
    dToken && setDToken('')
    dToken && localStorage.removeItem('dToken')
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
  }

  const goToUserPanel = () => {
    const frontendUrl = import.meta.env.VITE_FRONTEND_URL || 'http://localhost:5173'
    window.location.href = frontendUrl
  }

  const isOnDashboard =
    location.pathname === '/admin-dashboard' ||
    location.pathname === '/doctor-dashboard'

  return (
    <div className='flex justify-between items-center px-6 md:px-10 py-3.5 border-b border-border bg-white sticky top-0 z-50 shadow-sm'>
      <div className='flex items-center gap-4 text-xs font-semibold'>

        {/* Text Logo */}
        <div
          onClick={() => navigate('/')}
          className="cursor-pointer flex items-center gap-2.5"
        >
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="white" opacity="0.3" />
              <path d="M12 6v4H8v4h4v4h4v-4h4v-4h-4V6h-4z" fill="white" />
            </svg>
          </div>
          <span className="text-lg font-bold text-secondary tracking-tight">HealthAxis</span>
        </div>

        {/* Role Label */}
        <p className='border border-primary/20 bg-primary-bg text-primary px-3 py-1 rounded-full uppercase tracking-widest text-[10px] font-bold'>
          {aToken ? 'Admin' : 'Doctor'}
        </p>

        {/* User Panel Button */}
        {isOnDashboard && (
          <button
            onClick={goToUserPanel}
            className='hidden sm:block ml-2 text-primary hover:text-primary-dark transition-colors px-4 py-1.5 rounded-full text-xs font-bold border border-primary/20 hover:bg-primary-bg'
          >
            User Panel ↗
          </button>
        )}
      </div>

      {/* Logout */}
      <button
        onClick={logout}
        className='btn-secondary btn-sm flex items-center gap-2'
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        Logout
      </button>
    </div>
  )
}

export default Navbar
