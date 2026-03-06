import axios from 'axios'
import React, { useContext, useState } from 'react'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'

const Login = () => {

  const [state, setState] = useState('Admin')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const { setDToken } = useContext(DoctorContext)
  const { setAToken } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (state === 'Admin') {

      const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
      if (data.success) {
        setAToken(data.token)
        localStorage.setItem('aToken', data.token)
      } else {
        toast.error(data.message)
      }

    } else {

      const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
      if (data.success) {
        setDToken(data.token)
        localStorage.setItem('dToken', data.token)
      } else {
        toast.error(data.message)
      }

    }

  }

  return (
    <div className='min-h-screen bg-background flex items-center justify-center p-4'>
      <motion.form
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        onSubmit={onSubmitHandler}
      >
        <div className='flex flex-col gap-6 w-full max-w-md bg-white p-10 rounded-[2rem] shadow-premium border border-border-light'>
          <div className="text-center mb-2 flex flex-col items-center">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-sm mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="white" opacity="0.3" />
                <path d="M12 6v4H8v4h4v4h4v-4h4v-4h-4V6h-4z" fill="white" />
              </svg>
            </div>
            <h1 className='text-3xl font-bold text-secondary tracking-tight'>
              <span className='text-primary'>{state}</span> Portal
            </h1>
            <p className="text-text-muted mt-2 font-medium text-sm">Secure access for authorized personnel only</p>
          </div>

          <div className='w-full'>
            <label className="text-sm font-semibold text-secondary mb-2 block">Email Address</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className='w-full border border-border-light focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none rounded-xl p-3.5 bg-background focus:bg-white text-text-main font-medium'
              type="email"
              placeholder="admin@healio.in"
              required
            />
          </div>

          <div className='w-full'>
            <label className="text-sm font-semibold text-secondary mb-2 block">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className='w-full border border-border-light focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none rounded-xl p-3.5 bg-background focus:bg-white text-text-main font-medium'
              type="password"
              placeholder="••••••••"
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className='bg-primary hover:bg-primary-dark text-white font-bold w-full py-4 mt-2 rounded-xl text-base transition-colors shadow-lg shadow-primary/25'
          >
            Authenticate
          </motion.button>

          <div className="text-center mt-2">
            {state === 'Admin'
              ? <p className="text-text-muted text-sm font-medium">Doctor Access? <span onClick={() => setState('Doctor')} className='text-primary font-bold cursor-pointer hover:underline'>Switch Portal</span></p>
              : <p className="text-text-muted text-sm font-medium">Admin Access? <span onClick={() => setState('Admin')} className='text-primary font-bold cursor-pointer hover:underline'>Switch Portal</span></p>
            }
          </div>
        </div>
      </motion.form>
    </div>
  )
}

export default Login