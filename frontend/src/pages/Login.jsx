import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { GoogleLogin } from '@react-oauth/google'

const TRUST_POINTS = [
  { icon: "✓", text: "Verified & board-certified doctors" },
  { icon: "✓", text: "Instant booking & confirmations" },
  { icon: "✓", text: "Secure payments via Razorpay" },
  { icon: "✓", text: "Real-time slot availability" },
]

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext)
  const [state, setState] = useState('Login') // 'Login', 'Sign Up', 'Verify'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })
        if (data.success) {
          toast.success(data.message)
          setState('Verify')
        } else { toast.error(data.message) }
      } else if (state === 'Login') {
        const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else if (data.unverified) {
          toast.warning(data.message)
          setState('Verify')
        } else { toast.error(data.message) }
      } else if (state === 'Verify') {
        const { data } = await axios.post(backendUrl + '/api/user/verify-email', { email, code })
        if (data.success) {
          toast.success(data.message)
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else { toast.error(data.message) }
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message;
      toast.error(errorMsg);
    }

    finally { setLoading(false) }
  }

  const resendVerification = async () => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/resend-code', { email })
      if (data.success) toast.success(data.message)
      else toast.error(data.message)
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message;
      toast.error(errorMsg);
    }
  }

  const onGoogleSuccess = async (response) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/google-login', { credential: response.credential })
      if (data.success) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
        toast.success("Hassle-free login successful")
      } else { toast.error(data.message) }
    } catch (err) { toast.error("Google authentication failed") }
  }

  useEffect(() => {
    if (token) navigate('/')
  }, [token, navigate])

  return (
    <div className="min-h-[85vh] flex">
      {/* Left — Brand Panel */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] bg-gradient-to-br from-secondary to-[#1a3450] p-14 text-white">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="white" opacity="0.3" />
              <path d="M12 6v4H8v4h4v4h4v-4h4v-4h-4V6h-4z" fill="white" />
            </svg>
          </div>
          <span className="text-lg font-bold tracking-tight text-white">HealthAxis</span>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-4xl font-bold leading-tight">
              Your health,<br />
              <span className="text-primary-light">in expert hands.</span>
            </h2>
            <p className="text-white/60 mt-4 text-base leading-relaxed">
              Connect with verified, board-certified specialists and manage your health appointments — all in one place.
            </p>
          </div>

          <ul className="space-y-3">
            {TRUST_POINTS.map((tp) => (
              <li key={tp.text} className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-primary/30 flex items-center justify-center text-primary-light text-xs font-bold shrink-0">
                  {tp.icon}
                </span>
                <span className="text-sm text-white/75 font-medium">{tp.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-white/30">© {new Date().getFullYear()} HealthAxis. Developed by Kartikeya Nainkhwal.</p>
      </div>

      {/* Right — Form Panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-background">
        <motion.div
          key={state}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="w-full max-w-md"
        >
          {state !== 'Verify' && (
            <div className="flex bg-white rounded-xl border border-border p-1 mb-8 shadow-card">
              {['Login', 'Sign Up'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setState(tab)}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${state === tab ? 'bg-primary text-white shadow-sm' : 'text-text-muted hover:text-secondary'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          )}

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-secondary">
              {state === 'Sign Up' ? 'Create your account' : state === 'Verify' ? 'Verify your email' : 'Welcome back'}
            </h1>
            <p className="text-text-muted text-sm mt-1.5 line-clamp-2">
              {state === 'Sign Up'
                ? 'Start booking appointments with top doctors.'
                : state === 'Verify'
                  ? `We've sent a 6-digit code to ${email}.`
                  : 'Log in to manage your health appointments.'}
            </p>
          </div>

          <form onSubmit={onSubmitHandler} className="space-y-5">
            <AnimatePresence mode="wait">
              {state === 'Sign Up' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-5"
                >
                  <div>
                    <label className="input-label">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="John Doe"
                      required
                      className="input-base"
                    />
                  </div>
                </motion.div>
              )}

              {state === 'Verify' ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  key="verify"
                >
                  <label className="input-label">Verification Code</label>
                  <input
                    type="text"
                    maxLength={6}
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    placeholder="Enter 6-digit code"
                    required
                    className="input-base text-center text-2xl tracking-[0.5em] font-bold"
                  />
                  <div className="mt-4 flex justify-between items-center px-1">
                    <button type="button" onClick={() => setState('Sign Up')} className="text-xs font-semibold text-text-muted hover:text-primary">Change Email</button>
                    <button type="button" onClick={resendVerification} className="text-xs font-semibold text-primary hover:underline">Resend Code</button>
                  </div>
                </motion.div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} key="auth" className="space-y-5">
                  <div>
                    <label className="input-label">Email address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="input-base"
                    />
                  </div>

                  <div>
                    <label className="input-label">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="input-base"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3.5 text-base mt-2 shadow-primary"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Processing...
                </span>
              ) : (
                state === 'Sign Up' ? 'Create Account' : state === 'Verify' ? 'Verify Code' : 'Log In'
              )}
            </button>

            {state !== 'Verify' && (
              <>
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border"></div></div>
                  <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-text-muted font-bold tracking-widest">Or continue with</span></div>
                </div>

                <div className="flex justify-center">
                  <GoogleLogin
                    onSuccess={onGoogleSuccess}
                    onError={() => toast.error("Google authentication failed")}
                    theme="outline"
                    shape="circle"
                    width="100%"
                  />
                </div>
              </>
            )}
          </form>

          {state !== 'Verify' && (
            <p className="text-center text-sm text-text-muted mt-8">
              {state === 'Sign Up'
                ? <>Already have an account? <button onClick={() => setState('Login')} className="text-primary font-semibold hover:underline">Log in</button></>
                : <>Don't have an account? <button onClick={() => setState('Sign Up')} className="text-primary font-semibold hover:underline">Sign up free</button></>
              }
            </p>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default Login
