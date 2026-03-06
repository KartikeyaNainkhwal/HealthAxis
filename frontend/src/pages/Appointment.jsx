import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import { toast } from 'react-toastify'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'

const Appointment = () => {
    const { docId } = useParams()
    const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext)
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
    const navigate = useNavigate()

    const [docInfo, setDocInfo] = useState(null)
    const [docSlots, setDocSlots] = useState([])
    const [slotIndex, setSlotIndex] = useState(0)
    const [slotTime, setSlotTime] = useState('')
    const [reviews, setReviews] = useState([])
    const [reportFile, setReportFile] = useState(null)  // Optional report file
    const [isBooking, setIsBooking] = useState(false)

    const fetchDocInfo = async () => {
        const docInfo = doctors.find(doc => doc._id === docId)
        setDocInfo(docInfo)
    }

    const fetchReviews = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/review/doctor/' + docId)
            if (data.success) {
                setReviews(data.reviews)
            }
        } catch (error) {
            console.error("Error fetching reviews:", error)
        }
    }

    const getAvailableSlots = async () => {
        setDocSlots([])

        // getting current date
        let today = new Date()

        for (let i = 0; i < 7; i++) {
            // getting date with index 
            let currentDate = new Date(today)
            currentDate.setDate(today.getDate() + i)

            // setting end time of the date with index
            let endTime = new Date()
            endTime.setDate(today.getDate() + i)
            endTime.setHours(21, 0, 0, 0)

            // setting hours 
            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            } else {
                currentDate.setHours(10)
                currentDate.setMinutes(0)
            }

            let timeSlots = []

            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

                let day = currentDate.getDate()
                let month = currentDate.getMonth() + 1
                let year = currentDate.getFullYear()

                const slotDate = day + "_" + month + "_" + year
                const slotTime = formattedTime

                const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true

                if (isSlotAvailable) {
                    // add slot to array
                    timeSlots.push({
                        datetime: new Date(currentDate),
                        time: formattedTime
                    })
                }

                // Increment current time by 30 minutes
                currentDate.setMinutes(currentDate.getMinutes() + 30)
            }

            setDocSlots(prev => ([...prev, timeSlots]))
        }
    }

    const bookAppointment = async () => {
        if (!token) {
            toast.warning('Login to book appointment')
            return navigate('/login')
        }
        if (!slotTime) return toast.warning('Please select a time slot')

        try {
            setIsBooking(true)
            const date = docSlots[slotIndex][0].datetime
            let day = date.getDate()
            let month = date.getMonth() + 1
            let year = date.getFullYear()
            const slotDate = day + "_" + month + "_" + year

            // Step 1: Optional report upload
            let reportUrl = null
            let reportName = null
            if (reportFile) {
                const formData = new FormData()
                formData.append('report', reportFile)
                const uploadRes = await axios.post(backendUrl + '/api/user/upload-report', formData, {
                    headers: { token, 'Content-Type': 'multipart/form-data' }
                })
                if (uploadRes.data.success) {
                    reportUrl = uploadRes.data.reportUrl
                    reportName = uploadRes.data.reportName
                } else {
                    toast.error('Report upload failed. Please try again.')
                    setIsBooking(false)
                    return
                }
            }

            // Step 2: Book appointment
            const { data } = await axios.post(backendUrl + '/api/user/book-appointment',
                { docId, slotDate, slotTime, reportUrl, reportName },
                { headers: { token } }
            )
            if (data.success) {
                toast.success(data.message)
                getDoctorsData()
                navigate('/my-appointments')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setIsBooking(false)
        }
    }

    useEffect(() => {
        fetchDocInfo()
        fetchReviews()
    }, [doctors, docId])

    useEffect(() => {
        getAvailableSlots()
    }, [docInfo])

    return docInfo && (
        <div className="min-h-screen bg-background">
            {/* Header / Breadcrumb area */}
            <div className="bg-white border-b border-border">
                <div className="max-w-7xl mx-auto px-6 md:px-10 py-8">
                    <div className="flex items-center gap-2 text-sm text-text-muted mb-4">
                        <span className="cursor-pointer hover:text-primary transition-colors" onClick={() => navigate('/')}>Home</span>
                        <span>/</span>
                        <span className="cursor-pointer hover:text-primary transition-colors" onClick={() => navigate('/doctors')}>Doctors</span>
                        <span>/</span>
                        <span className="text-secondary font-semibold">{docInfo.name}</span>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 md:px-10 py-10">
                <div className="flex flex-col lg:flex-row gap-10">

                    {/* Left: Doctor Profile Card */}
                    <div className="flex-1">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-3xl border border-border overflow-hidden shadow-card"
                        >
                            <div className="flex flex-col md:flex-row">
                                {/* Doctor Image */}
                                <div className="md:w-72 bg-primary-bg overflow-hidden border-r border-border">
                                    <img
                                        src={docInfo.image}
                                        alt={docInfo.name}
                                        className="w-full h-full object-cover object-top"
                                    />
                                </div>

                                {/* Doctor Details */}
                                <div className="flex-1 p-8 sm:p-10">
                                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                                        <div>
                                            <h1 className="text-3xl font-bold text-secondary flex items-center gap-2">
                                                {docInfo.name}
                                                <img src={assets.verified_icon} className="w-6 h-6" alt="" />
                                            </h1>
                                            <div className="flex items-center gap-2 mt-2">
                                                <span className="bg-primary-bg text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                                    {docInfo.speciality}
                                                </span>
                                                <span className="text-text-muted text-sm border-l border-border pl-3">
                                                    {docInfo.experience} Experience
                                                </span>
                                            </div>
                                        </div>
                                        <div className="bg-background px-5 py-3 rounded-2xl border border-border">
                                            <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">Appointment Fee</p>
                                            <p className="text-2xl font-bold text-secondary">{currencySymbol}{docInfo.fees}</p>
                                        </div>
                                    </div>

                                    {/* About */}
                                    <div className="mt-8">
                                        <h3 className="text-sm font-bold text-secondary uppercase tracking-widest flex items-center gap-2 mb-3">
                                            About Specialty
                                            <img src={assets.info_icon} className="w-3.5 h-3.5 opacity-40" alt="" />
                                        </h3>
                                        <p className="text-text-main leading-relaxed max-w-2xl text-[15px]">
                                            {docInfo.about}
                                        </p>
                                    </div>

                                    {/* Stats / Badges */}
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-10 pt-8 border-t border-border">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-primary-bg flex items-center justify-center text-primary">
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Verified</p>
                                                <p className="text-xs font-bold text-secondary truncate">Clinical Expert</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-primary-bg flex items-center justify-center text-primary">
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Wait Time</p>
                                                <p className="text-xs font-bold text-secondary truncate">Under 15 min</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-primary-bg flex items-center justify-center text-primary">
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Reviews</p>
                                                <p className="text-xs font-bold text-secondary truncate">{docInfo.averageRating ? docInfo.averageRating.toFixed(1) : 'New'}/5 Rating</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Patient Reviews Section */}
                                    <div className="mt-10 pt-8 border-t border-border">
                                        <h3 className="text-sm font-bold text-secondary uppercase tracking-widest flex items-center gap-2 mb-6">
                                            Patient Reviews
                                            <span className="bg-primary-bg text-primary px-2 py-0.5 rounded-md text-xs">{docInfo.totalReviews || 0}</span>
                                        </h3>

                                        {reviews.length > 0 ? (
                                            <div className="space-y-6">
                                                {reviews.map((rev, idx) => (
                                                    <div key={idx} className="flex gap-4">
                                                        <img src={rev.userId?.image || "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"} className="w-10 h-10 rounded-full object-cover shrink-0 bg-primary-bg border border-border" alt="" />
                                                        <div className="flex-1">
                                                            <div className="flex items-start justify-between">
                                                                <div>
                                                                    <p className="font-bold text-secondary text-sm">{rev.userId?.name || "Anonymous Patient"}</p>
                                                                    <p className="text-[10px] uppercase font-bold tracking-wider text-text-muted mt-0.5">
                                                                        {new Date(rev.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                                                    </p>
                                                                </div>
                                                                <div className="flex text-yellow-400 text-[10px] gap-0.5">
                                                                    {[...Array(5)].map((_, i) => (
                                                                        <span key={i} className={i < rev.rating ? "opacity-100" : "opacity-30"}>★</span>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            {rev.reviewText && (
                                                                <p className="text-sm text-text-main mt-3 leading-relaxed bg-background p-4 rounded-xl rounded-tl-sm border border-border">
                                                                    "{rev.reviewText}"
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-8 bg-background rounded-2xl border border-dashed border-border">
                                                <p className="text-sm font-medium text-text-muted">No reviews yet. Be the first to leave a review after your visit!</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Booking Panel */}
                    <div className="lg:w-[400px]">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-3xl border border-border p-8 shadow-card lg:sticky lg:top-24"
                        >
                            <h2 className="text-xl font-bold text-secondary mb-6 flex items-center gap-2">
                                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                Schedule Appointment
                            </h2>

                            {/* Date Selection */}
                            <div className="mb-8">
                                <label className="text-[11px] font-bold text-text-muted uppercase tracking-widest block mb-4">Select Consultation Date</label>
                                <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
                                    {docSlots.length > 0 && docSlots.map((item, index) => (
                                        <div
                                            key={index}
                                            onClick={() => { setSlotIndex(index); setSlotTime(''); }}
                                            className={`flex flex-col items-center justify-center min-w-[64px] h-20 rounded-2xl cursor-pointer transition-all border ${slotIndex === index
                                                ? 'bg-primary border-primary text-white shadow-primary'
                                                : 'bg-white border-border text-text-muted hover:border-primary/50'
                                                }`}
                                        >
                                            <p className="text-[10px] font-bold tracking-tighter opacity-80">{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                                            <p className="text-lg font-bold mt-1">{item[0] && item[0].datetime.getDate()}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Time Selection */}
                            <div className="mb-8">
                                <label className="text-[11px] font-bold text-text-muted uppercase tracking-widest block mb-4">Available Time Slots</label>
                                <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                                    {docSlots.length > 0 && docSlots[slotIndex].map((item, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSlotTime(item.time)}
                                            className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${item.time === slotTime
                                                ? 'bg-primary-bg border-primary text-primary'
                                                : 'bg-white border-border text-text-muted hover:border-primary/30'
                                                }`}
                                        >
                                            {item.time.toLowerCase()}
                                        </button>
                                    ))}
                                </div>
                                {docSlots.length > 0 && docSlots[slotIndex].length === 0 && (
                                    <p className="text-xs text-error font-medium bg-error/5 p-3 rounded-lg">All slots fully booked for this date.</p>
                                )}
                            </div>

                            {/* Optional Report Upload */}
                            <div className="border border-dashed border-border rounded-2xl p-4 bg-primary-bg/30">
                                <p className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-3 flex items-center gap-1.5">
                                    <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                    Attach Previous Reports
                                    <span className="text-[9px] font-medium bg-primary-bg text-primary px-1.5 py-0.5 rounded-full">Optional</span>
                                </p>
                                {reportFile ? (
                                    <div className="flex items-center justify-between bg-white rounded-xl px-4 py-2.5 border border-border">
                                        <div className="flex items-center gap-2 min-w-0">
                                            <svg className="w-5 h-5 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                                            <span className="text-sm text-secondary font-medium truncate">{reportFile.name}</span>
                                        </div>
                                        <button onClick={() => setReportFile(null)} className="text-text-muted hover:text-error transition-colors ml-3 shrink-0">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                        </button>
                                    </div>
                                ) : (
                                    <label className="flex items-center justify-center gap-2 text-sm text-primary font-semibold cursor-pointer bg-white border border-border rounded-xl py-2.5 hover:bg-primary-bg transition-colors">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                                        Upload PDF or Image
                                        <input
                                            type="file"
                                            accept=".pdf,image/*"
                                            className="hidden"
                                            onChange={e => setReportFile(e.target.files[0] || null)}
                                        />
                                    </label>
                                )}
                                <p className="text-[10px] text-text-muted mt-2">Share blood tests, X-rays, or past prescriptions so the doctor is prepared.</p>
                            </div>

                            <button
                                onClick={bookAppointment}
                                disabled={!slotTime || isBooking}
                                className={`w-full py-4 rounded-2xl font-bold transition-all shadow-btn flex items-center justify-center gap-2 ${slotTime && !isBooking
                                        ? 'bg-primary text-white hover:bg-primary-dark'
                                        : 'bg-border text-text-muted cursor-not-allowed'
                                    }`}
                            >
                                {isBooking ? (
                                    <><svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Booking...</>
                                ) : (
                                    <>Confirm Appointment <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg></>
                                )}
                            </button>

                            <p className="text-[10px] text-center text-text-muted mt-4">
                                By booking, you agree to our <span className="underline cursor-pointer">Terms of Service</span>
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* Related Doctors */}
                <div className="mt-20 border-t border-border pt-20">
                    <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
                </div>
            </main>
        </div>
    )
}

export default Appointment
