import React, { useContext, useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { motion, AnimatePresence } from 'framer-motion'

const TABS = ['All', 'Upcoming', 'Completed', 'Cancelled']

const months = [" ", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const formatDate = (slotDate) => {
  if (!slotDate) return '';
  const [day, month, year] = slotDate.split('_')
  return `${day} ${months[Number(month)]} ${year}`
}

const StatusBadge = ({ item }) => {
  if (item.isCompleted) return <span className="bg-green-100/80 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 w-max"><span className="w-1.5 h-1.5 rounded-full bg-green-600 block" />Completed</span>
  if (item.cancelled) return <span className="bg-red-100/80 text-red-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 w-max"><span className="w-1.5 h-1.5 rounded-full bg-red-600 block" />Cancelled</span>
  if (item.payment) return <span className="bg-blue-100/80 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 w-max"><span className="w-1.5 h-1.5 rounded-full bg-blue-600 block" />Paid Online</span>
  return <span className="bg-amber-100/80 text-amber-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 w-max"><span className="w-1.5 h-1.5 rounded-full bg-amber-600 block" />Action Required</span>
}

const CardSkeleton = () => (
  <div className="bg-white border border-border rounded-3xl p-6 animate-pulse flex flex-col md:flex-row gap-6 items-start">
    <div className="w-24 h-24 sm:w-28 sm:h-28 bg-border/40 rounded-2xl shrink-0" />
    <div className="flex-1 space-y-4 py-2 w-full">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <div className="h-5 w-48 bg-border/60 rounded" />
          <div className="h-4 w-32 bg-border/40 rounded" />
        </div>
        <div className="h-6 w-24 bg-border/40 rounded-full" />
      </div>
      <div className="h-4 w-64 bg-border/30 rounded mt-4" />
      <div className="flex gap-3 pt-2">
        <div className="h-10 w-28 bg-border/30 rounded-xl" />
        <div className="h-10 w-28 bg-border/30 rounded-xl" />
      </div>
    </div>
  </div>
)

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext)
  const navigate = useNavigate()
  const [appointments, setAppointments] = useState([])
  const [payingId, setPayingId] = useState(null)
  const [cancellingId, setCancellingId] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('All')

  // Review Modal State
  const [reviewingAppt, setReviewingAppt] = useState(null)
  const [rating, setRating] = useState(5)
  const [reviewText, setReviewText] = useState('')
  const [isSubmittingReview, setIsSubmittingReview] = useState(false)

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
      if (data.success) setAppointments(data.appointments.reverse())
      else toast.error(data.message)
    } catch (e) { toast.error(e.message) }
    finally { setIsLoading(false) }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      setCancellingId(appointmentId)
      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      }
      else toast.error(data.message)
    } catch (e) { toast.error(e.message) }
    finally { setCancellingId(null) }
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      description: 'HealthAxis Appointment Payment',
      order_id: order.id,
      handler: async (response) => {
        try {
          const { data } = await axios.post(backendUrl + '/api/user/verifyRazorpay', { razorpay_order_id: response.razorpay_order_id }, { headers: { token } })
          if (data.success) { toast.success('Payment successful!'); setPayingId(null); getUserAppointments() }
          else toast.error(data.message)
        } catch (e) { toast.error(e.message) }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.on('payment.failed', function (response) {
      toast.error("Payment failed or cancelled.")
      setPayingId(null)
    });
    rzp.open()
  }

  const appointmentRazorpay = async (appointmentId) => {
    try {
      setPayingId(appointmentId)
      const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } })
      if (data.success) initPay(data.order)
      else { toast.error(data.message); setPayingId(null) }
    } catch (e) { toast.error(e.message); setPayingId(null) }
  }

  const submitReview = async (e) => {
    e.preventDefault();
    if (!reviewingAppt) return;

    setIsSubmittingReview(true);
    try {
      const { data } = await axios.post(backendUrl + '/api/review/submit', {
        docId: reviewingAppt.docId,
        appointmentId: reviewingAppt._id,
        rating,
        reviewText
      }, { headers: { token } });

      if (data.success) {
        toast.success(data.message);
        setReviewingAppt(null);
        setRating(5);
        setReviewText('');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsSubmittingReview(false);
    }
  }

  useEffect(() => { if (token) getUserAppointments() }, [token])

  const filtered = useMemo(() => {
    if (activeTab === 'All') return appointments
    if (activeTab === 'Upcoming') return appointments.filter(a => !a.cancelled && !a.isCompleted)
    if (activeTab === 'Completed') return appointments.filter(a => a.isCompleted)
    if (activeTab === 'Cancelled') return appointments.filter(a => a.cancelled)
    return appointments
  }, [appointments, activeTab])

  const counts = useMemo(() => ({
    All: appointments.length,
    Upcoming: appointments.filter(a => !a.cancelled && !a.isCompleted).length,
    Completed: appointments.filter(a => a.isCompleted).length,
    Cancelled: appointments.filter(a => a.cancelled).length,
  }), [appointments])

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header Dashboard */}
      <header className="bg-white border-b border-border sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-6 lg:px-10 py-8">
          <h1 className="text-3xl font-black tracking-tight text-secondary">My Appointments</h1>
          <p className="text-text-muted mt-1.5 font-medium">Track your upcoming visits and medical history.</p>

          {/* SaaS Tabs */}
          <div className="flex items-center gap-2 mt-8 overflow-x-auto no-scrollbar border-b text-sm">
            {TABS.map(tab => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-5 py-3 font-bold transition-colors whitespace-nowrap flex items-center gap-2 ${isActive ? 'text-primary' : 'text-text-muted hover:text-secondary'
                    }`}
                >
                  {tab}
                  {counts[tab] > 0 && (
                    <span className={`inline-flex items-center justify-center min-w-[24px] h-6 px-1.5 rounded-full text-xs box-border ${isActive ? 'bg-primary/10 text-primary' : 'bg-background text-text-muted'
                      }`}>
                      {counts[tab]}
                    </span>
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full"
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </header>

      {/* Main Content List */}
      <main className="max-w-5xl mx-auto px-6 lg:px-10 py-10">
        {isLoading ? (
          <div className="space-y-6">
            {[1, 2, 3].map(i => <CardSkeleton key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-border shadow-sm rounded-3xl p-16 text-center mt-4"
          >
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-black text-secondary tracking-tight">No appointments {activeTab !== 'All' ? `in "${activeTab}"` : 'found'}</h3>
            <p className="text-text-muted mt-2 font-medium max-w-sm mx-auto">
              {activeTab === 'All'
                ? "You haven't booked any healthcare appointments yet."
                : `You currently have zero ${activeTab.toLowerCase()} appointments.`}
            </p>
            <button onClick={() => navigate('/doctors')} className="mt-8 bg-secondary hover:bg-secondary-light text-white px-8 py-3 rounded-xl font-bold transition-all shadow-sm">
              Find a Doctor
            </button>
          </motion.div>
        ) : (
          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, index) => (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white border border-border rounded-3xl overflow-hidden shadow-sm hover:shadow-card transition-all group"
                >
                  <div className="flex flex-col md:flex-row p-6 md:p-8 gap-6 md:gap-8 items-start">

                    {/* Doctor Image & Profile Info Left */}
                    <div className="flex gap-5 w-full md:w-auto md:min-w-[300px]">
                      <div className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-2xl overflow-hidden bg-primary-bg border border-border relative">
                        <img
                          src={item.docData.image}
                          alt={item.docData.name}
                          className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex flex-col flex-1">
                        <h3 className="font-extrabold text-secondary text-xl line-clamp-1">{item.docData.name}</h3>
                        <p className="text-primary font-bold text-sm mt-0.5">{item.docData.speciality}</p>

                        <div className="mt-auto pt-4 flex items-start gap-2 text-text-muted text-sm font-medium">
                          <svg className="w-4 h-4 shrink-0 mt-0.5 text-primary/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="line-clamp-2 leading-snug">{item.docData.address.line1}<br />{item.docData.address.line2}</span>
                        </div>
                      </div>
                    </div>

                    {/* Divider Line */}
                    <div className="hidden md:block w-px self-stretch bg-border/60"></div>

                    {/* Appointment Details Right */}
                    <div className="flex flex-col flex-1 w-full justify-between h-full min-h-[112px]">
                      <div className="flex flex-wrap items-start justify-between gap-4 w-full">
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-bold tracking-widest text-text-muted">Appointment Schedule</label>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            </div>
                            <span className="font-extrabold text-secondary text-base">{formatDate(item.slotDate)}</span>
                            <span className="text-border">|</span>
                            <span className="font-bold text-secondary text-base">{item.slotTime}</span>
                          </div>
                        </div>
                        <StatusBadge item={item} />
                      </div>

                      {/* Action Buttons Container */}
                      <div className="flex flex-wrap items-center gap-3 mt-6">
                        {!item.cancelled && !item.isCompleted && (
                          <>
                            {!item.payment && (
                              <button
                                onClick={() => appointmentRazorpay(item._id)}
                                disabled={payingId === item._id}
                                className="bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-xl font-bold shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed min-w-[140px]"
                              >
                                {payingId === item._id ? (
                                  <><svg className="w-5 h-5 animate-spin text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg> Processing</>
                                ) : (
                                  <>💳 Pay Online</>
                                )}
                              </button>
                            )}
                            <button
                              onClick={() => cancelAppointment(item._id)}
                              disabled={cancellingId === item._id}
                              className="bg-white border hover:border-red-200 hover:bg-red-50 text-red-600 px-5 py-2.5 rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {cancellingId === item._id ? 'Cancelling...' : 'Cancel specific slot'}
                            </button>
                          </>
                        )}

                        {item.isCompleted && (
                          <>
                            <button
                              onClick={() => { setReviewingAppt(item); setRating(5); setReviewText(''); }}
                              className="bg-white border border-border hover:border-amber-300 hover:bg-amber-50 text-amber-700 px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm flex items-center gap-2"
                            >
                              ⭐ Write Review
                            </button>

                            {item.prescription && (
                              <a
                                href={`${backendUrl}/api/prescription/download/${item._id}`}
                                target="_blank"
                                rel="noreferrer"
                                className="bg-teal-50 border border-teal-200 text-teal-800 hover:bg-teal-100 px-5 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2"
                              >
                                <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                Rx Download
                              </a>
                            )}
                          </>
                        )}
                      </div>

                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      {/* Modern App Review Modal */}
      <AnimatePresence>
        {reviewingAppt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-y-auto w-full h-full">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setReviewingAppt(null)}
              className="absolute inset-0 bg-secondary/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden relative z-10 my-8"
            >
              {/* Header */}
              <div className="p-6 border-b border-border bg-[#F8FAFC] flex justify-between items-center">
                <h2 className="text-xl font-black text-secondary">Rate your experience</h2>
                <button onClick={() => setReviewingAppt(null)} className="w-8 h-8 bg-white border border-border rounded-full flex items-center justify-center text-text-muted hover:text-red-500 transition-colors shadow-sm">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={submitReview} className="p-8">

                {/* Doctor Card Profile */}
                <div className="flex items-center gap-4 mb-8 bg-white border border-border p-4 rounded-2xl shadow-sm">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-primary-bg shrink-0 mask mask-squircle">
                    <img src={reviewingAppt.docData.image} alt="Doctor" className="w-full h-full object-cover object-top" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-secondary text-lg">Dr. {reviewingAppt.docData.name}</h3>
                    <p className="text-sm text-primary font-bold">{reviewingAppt.docData.speciality}</p>
                    <p className="text-xs text-text-muted font-medium mt-0.5">{formatDate(reviewingAppt.slotDate)}</p>
                  </div>
                </div>

                <div className="mb-8 text-center bg-background rounded-2xl p-6 border border-border">
                  <label className="block text-sm font-bold uppercase tracking-widest text-text-muted mb-4">Patient Rating</label>
                  <div className="flex justify-center gap-3" onMouseLeave={() => setRating(rating)}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className={`text-4xl transition-all transform ${rating >= star ? 'text-[#F59E0B] scale-110 drop-shadow-md' : 'text-gray-200 hover:text-gray-300 hover:scale-105'}`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <label className="block text-sm font-bold text-secondary mb-2">Written review (optional)</label>
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Did the doctor explain things clearly? How was the clinic staff?"
                    className="w-full border border-border focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none rounded-2xl p-4 bg-background focus:bg-white text-secondary font-medium resize-none h-32"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-2">
                  <button type="button" onClick={() => setReviewingAppt(null)} className="px-6 py-3.5 rounded-xl font-bold bg-white border hover:bg-background text-secondary transition-colors w-full sm:w-auto">Keep hidden</button>
                  <button type="submit" disabled={isSubmittingReview} className="flex-1 bg-primary hover:bg-primary-hover text-white py-3.5 rounded-xl font-bold shadow-md shadow-primary/20 transition-all disabled:opacity-70 flex items-center justify-center gap-2">
                    {isSubmittingReview ? <><span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> Submitting...</> : 'Publish Review'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MyAppointments
