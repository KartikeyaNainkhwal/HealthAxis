import React, { useEffect } from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import axios from 'axios'

const AllAppointments = () => {

  const { aToken, appointments, cancelAppointment, getAllAppointments, backendUrl } = useContext(AdminContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  return (
    <div className='p-6 md:p-10 bg-[#F8FAFC] min-h-[calc(100vh-73px)] w-full'>

      <div className="mb-8">
        <h1 className='text-3xl font-black text-secondary tracking-tight'>All Appointments</h1>
        <p className="text-text-muted font-medium mt-1.5">Manage and track all patient bookings across the platform.</p>
      </div>

      <div className='bg-white border border-border rounded-3xl overflow-hidden shadow-sm'>

        {/* Superior Table Header */}
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_2.5fr_1fr_1fr] items-center py-4 px-8 border-b border-border bg-background'>
          <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">#</p>
          <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Patient Info</p>
          <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Age</p>
          <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Schedule</p>
          <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Doctor</p>
          <p className="text-[10px] font-black uppercase tracking-widest text-text-muted">Amount</p>
          <p className="text-[10px] font-black uppercase tracking-widest text-text-muted text-right">Status / Action</p>
        </div>

        {/* Table Body */}
        <div className="max-h-[70vh] overflow-y-auto w-full no-scrollbar relative">
          {appointments.length === 0 ? (
            <div className="p-16 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-secondary">No Appointments</h3>
              <p className="text-text-muted text-sm mt-1">There are currently no bookings in the system.</p>
            </div>
          ) : (
            <AnimatePresence>
              {appointments.map((item, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2, delay: index * 0.02 }}
                  className='flex flex-wrap text-sm justify-between max-sm:gap-4 max-sm:p-6 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_2.5fr_1fr_1fr] items-center text-secondary py-4 px-8 border-b border-border/50 hover:bg-[#F8FAFC] transition-colors group'
                  key={item._id || index}
                >
                  <p className='max-sm:hidden text-text-muted font-bold text-xs'>{index + 1}</p>

                  {/* Patient Info */}
                  <div className='flex items-center gap-3 w-full sm:w-auto'>
                    <div className="w-10 h-10 rounded-full bg-primary/5 border border-border shrink-0 overflow-hidden">
                      <img src={item?.userData?.image || ''} className='w-full h-full object-cover' alt="" />
                    </div>
                    <div>
                      <p className="font-bold text-secondary">{item?.userData?.name || 'Unknown Patient'}</p>
                      {/* Only show email if available, otherwise just nice styling */}
                      {item?.userData?.email && <p className="text-xs text-text-muted">{item.userData.email}</p>}
                    </div>
                  </div>

                  <p className='max-sm:hidden font-medium text-slate-500 bg-white border border-border px-2 py-1 rounded-lg w-fit text-xs'>
                    {calculateAge(item?.userData?.dob)} yrs
                  </p>

                  {/* Schedule */}
                  <div className="w-full sm:w-auto mt-2 sm:mt-0">
                    <p className="font-bold text-secondary flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-primary/70" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      {slotDateFormat(item.slotDate)}
                    </p>
                    <p className="text-text-muted text-xs font-bold pl-5 mt-0.5">{item.slotTime}</p>
                  </div>

                  {/* Doctor */}
                  <div className='flex items-center gap-3 w-full sm:w-auto mt-2 sm:mt-0'>
                    <div className="w-8 h-8 rounded-full bg-primary-bg overflow-hidden shrink-0 border border-border">
                      <img src={item?.docData?.image || ''} className='w-full h-full object-cover object-top' alt="" />
                    </div>
                    <p className="font-bold text-secondary text-sm">Dr. {item?.docData?.name?.replace('Dr. ', '') || 'Unknown'}</p>
                  </div>

                  {/* Amount */}
                  <p className="w-full sm:w-auto mt-2 sm:mt-0">
                    <span className="font-black text-secondary bg-green-50 text-green-700 px-2 py-1 rounded-lg border border-green-200">{currency}{item.amount}</span>
                  </p>

                  {/* Action / Status */}
                  <div className="mt-4 sm:mt-0 w-full sm:w-auto flex justify-end">
                    {item.cancelled ? (
                      <span className='px-3 py-1.5 bg-red-100/50 text-red-600 font-bold text-[10px] uppercase tracking-widest rounded-full flex items-center gap-1.5 w-max'>
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> Cancelled
                      </span>
                    ) : item.isCompleted ? (
                      <span className='px-3 py-1.5 bg-green-100/50 text-green-600 font-bold text-[10px] uppercase tracking-widest rounded-full flex items-center gap-1.5 w-max'>
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Completed
                      </span>
                    ) : (
                      <button
                        onClick={() => cancelAppointment(item._id)}
                        className='group flex items-center justify-center w-8 h-8 rounded-full bg-white border border-border hover:bg-red-50 hover:border-red-200 transition-colors tooltip relative'
                        title="Cancel Appointment"
                      >
                        <svg className="w-4 h-4 text-text-muted group-hover:text-red-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>

    </div>
  )
}

export default AllAppointments