import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'

const Sidebar = () => {
  const { dToken } = useContext(DoctorContext)
  const { aToken } = useContext(AdminContext)

  const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-3.5 py-3 px-4 mx-3 rounded-xl cursor-pointer font-semibold transition-all duration-200 ${isActive
      ? 'bg-primary-bg text-primary shadow-sm'
      : 'text-text-muted hover:bg-background hover:text-secondary'
    }`;

  return (
    <div className='min-h-[calc(100vh-73px)] w-[80px] md:w-64 bg-white border-r border-border pt-6 shrink-0 flex flex-col'>
      <div className='flex-1'>
        <p className="hidden md:block px-6 text-xs font-bold tracking-widest text-text-muted uppercase mb-4">Main Menu</p>

        {aToken && <ul className='flex flex-col gap-1.5'>
          <NavLink to={'/admin-dashboard'} className={navLinkClasses}>
            <img className='w-5 h-5 opacity-80' src={assets.home_icon} alt='' />
            <p className='hidden md:block'>Dashboard</p>
          </NavLink>
          <NavLink to={'/all-appointments'} className={navLinkClasses}>
            <img className='w-5 h-5 opacity-80' src={assets.appointment_icon} alt='' />
            <p className='hidden md:block'>Appointments</p>
          </NavLink>
          <NavLink to={'/add-doctor'} className={navLinkClasses}>
            <img className='w-5 h-5 opacity-80' src={assets.add_icon} alt='' />
            <p className='hidden md:block'>Add Doctor</p>
          </NavLink>
          <NavLink to={'/doctor-list'} className={navLinkClasses}>
            <img className='w-5 h-5 opacity-80' src={assets.people_icon} alt='' />
            <p className='hidden md:block'>Doctors List</p>
          </NavLink>
        </ul>}

        {dToken && <ul className='flex flex-col gap-1.5'>
          <NavLink to={'/doctor-dashboard'} className={navLinkClasses}>
            <img className='w-5 h-5 opacity-80' src={assets.home_icon} alt='' />
            <p className='hidden md:block'>Dashboard</p>
          </NavLink>
          <NavLink to={'/doctor-appointments'} className={navLinkClasses}>
            <img className='w-5 h-5 opacity-80' src={assets.appointment_icon} alt='' />
            <p className='hidden md:block'>Appointments</p>
          </NavLink>
          <NavLink to={'/doctor-profile'} className={navLinkClasses}>
            <img className='w-5 h-5 opacity-80' src={assets.people_icon} alt='' />
            <p className='hidden md:block'>Profile</p>
          </NavLink>
        </ul>}
      </div>
    </div>
  )
}

export default Sidebar