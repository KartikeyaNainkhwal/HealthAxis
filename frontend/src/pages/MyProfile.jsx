import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const FieldRow = ({ label, children }) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold uppercase tracking-widest text-text-muted">{label}</label>
        {children}
    </div>
)

const InputField = ({ value, onChange, placeholder, type = "text", isEdit }) => {
    if (!isEdit) {
        return <p className="text-secondary font-medium text-base py-2">{value || '—'}</p>
    }
    return (
        <input
            className="w-full bg-background/50 border border-border rounded-xl px-4 py-2 text-secondary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
        />
    )
}

const MyProfile = () => {
    const [isEdit, setIsEdit] = useState(false)
    const [image, setImage] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const navigate = useNavigate()

    const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext)

    const updateUserProfileData = async () => {
        try {
            setIsSaving(true)
            const formData = new FormData()
            formData.append('name', userData.name)
            formData.append('phone', userData.phone)
            formData.append('address', JSON.stringify(userData.address))
            formData.append('gender', userData.gender)
            formData.append('dob', userData.dob)
            image && formData.append('image', image)

            const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })
            if (data.success) {
                toast.success(data.message)
                await loadUserProfileData()
                setIsEdit(false)
                setImage(false)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setIsSaving(false)
        }
    }

    if (!userData) return (
        <div className="min-h-screen grid place-items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
    )

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            {/* Header */}
            <header className="bg-white border-b border-border sticky top-0 z-30">
                <div className="max-w-6xl mx-auto px-6 lg:px-8 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-secondary">My Profile</h1>
                        <p className="text-text-muted mt-1 font-medium">Manage your personal information and preferences.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        {isEdit ? (
                            <>
                                <button
                                    onClick={() => { setIsEdit(false); setImage(false) }}
                                    className="px-5 py-2.5 rounded-xl font-semibold text-text-muted hover:bg-background hover:text-secondary transition-colors"
                                    disabled={isSaving}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={updateUserProfileData}
                                    disabled={isSaving}
                                    className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-xl font-bold shadow-sm hover:shadow transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isSaving ? (
                                        <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    )}
                                    {isSaving ? 'Saving...' : 'Save Profile'}
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => setIsEdit(true)}
                                className="bg-white border border-border hover:border-text-muted text-secondary px-6 py-2.5 rounded-xl font-bold shadow-sm transition-all flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                Edit Profile
                            </button>
                        )}
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-6 lg:px-8 py-10">
                <div className="flex flex-col lg:flex-row gap-8 items-start">

                    {/* Left Panel: Profile ID Card */}
                    <div className="w-full lg:w-[320px] shrink-0">
                        <div className="bg-white rounded-3xl border border-border shadow-sm overflow-hidden relative group">
                            {/* Decorative Banner */}
                            <div className="h-32 bg-gradient-to-r from-primary to-primary-hover relative">
                                <div className="absolute inset-0 bg-white/10 [mask-image:linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:20px_20px]"></div>
                            </div>

                            <div className="px-6 pb-8 pt-0 relative flex flex-col items-center text-center">
                                {/* Floating Avatar */}
                                <div className="relative -mt-16 mb-4 group/avatar">
                                    <div className="w-32 h-32 rounded-3xl p-1.5 bg-white shadow-md relative z-10">
                                        {isEdit ? (
                                            <label htmlFor="image" className="cursor-pointer block w-full h-full relative rounded-2xl overflow-hidden group/img">
                                                <img
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110"
                                                    src={image ? URL.createObjectURL(image) : userData.image}
                                                    alt="Profile"
                                                />
                                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity backdrop-blur-sm">
                                                    <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                                </div>
                                                <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden accept="image/*" />
                                            </label>
                                        ) : (
                                            <img
                                                className="w-full h-full object-cover rounded-2xl"
                                                src={userData.image}
                                                alt="Profile"
                                            />
                                        )}
                                    </div>
                                    <div className="absolute -inset-1 bg-primary blur-xl opacity-20 group-hover/avatar:opacity-40 transition-opacity rounded-3xl pointer-events-none"></div>
                                </div>

                                <h2 className="text-2xl font-black text-secondary tracking-tight">{userData.name}</h2>
                                <div className="flex items-center gap-1.5 mt-1 text-text-muted justify-center">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    <span className="font-medium text-sm">{userData.email}</span>
                                </div>

                                <div className="w-full h-px bg-border my-6"></div>

                                <button
                                    onClick={() => navigate('/my-appointments')}
                                    className="w-full flex items-center justify-between p-4 rounded-2xl bg-background hover:bg-primary-bg text-secondary group/btn transition-colors border border-transparent hover:border-primary/20"
                                >
                                    <div className="flex items-center gap-3 font-bold">
                                        <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary group-hover/btn:scale-110 transition-transform">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                        </div>
                                        My Appointments
                                    </div>
                                    <svg className="w-5 h-5 text-text-muted group-hover/btn:text-primary transition-colors group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel: Editable Form */}
                    <div className="flex-1 w-full flex flex-col gap-8">

                        {/* Section 1 */}
                        <div className="bg-white rounded-3xl border border-border shadow-sm p-8">
                            <h3 className="text-lg font-bold text-secondary flex items-center gap-3 mb-8">
                                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                </div>
                                Basic Information
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                                <div className="md:col-span-2">
                                    <FieldRow label="Full Legal Name">
                                        <InputField
                                            isEdit={isEdit}
                                            value={userData.name}
                                            placeholder="Your full name"
                                            onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                                        />
                                    </FieldRow>
                                </div>
                                <FieldRow label="Gender">
                                    {isEdit ? (
                                        <select
                                            className="w-full bg-background/50 border border-border rounded-xl px-4 py-2.5 text-secondary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                                            value={userData.gender}
                                            onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                                        >
                                            <option value="Not Selected">Not Selected</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    ) : (
                                        <p className="text-secondary font-medium text-base py-2">{userData.gender || '—'}</p>
                                    )}
                                </FieldRow>
                                <FieldRow label="Date of Birth">
                                    <InputField
                                        isEdit={isEdit}
                                        type="date"
                                        value={userData.dob}
                                        onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                                    />
                                </FieldRow>
                            </div>
                        </div>

                        {/* Section 2 */}
                        <div className="bg-white rounded-3xl border border-border shadow-sm p-8">
                            <h3 className="text-lg font-bold text-secondary flex items-center gap-3 mb-8">
                                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                </div>
                                Contact Details
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8">
                                <FieldRow label="Email Address">
                                    <div className="py-2 flex items-center gap-3">
                                        <p className="text-secondary font-medium">{userData.email}</p>
                                        <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-[10px] font-bold uppercase tracking-widest shrink-0">Verified</span>
                                    </div>
                                </FieldRow>
                                <FieldRow label="Phone Number">
                                    <InputField
                                        isEdit={isEdit}
                                        type="tel"
                                        placeholder="+1 234 567 890"
                                        value={userData.phone}
                                        onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                                    />
                                </FieldRow>
                                <div className="md:col-span-2">
                                    <FieldRow label="Address">
                                        {isEdit ? (
                                            <div className="space-y-4 bg-background/30 p-5 rounded-2xl border border-border">
                                                <input
                                                    className="w-full bg-white border border-border rounded-xl px-4 py-2.5 text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                                                    type="text"
                                                    placeholder="Street Address, P.O. Box, etc."
                                                    value={userData.address?.line1 || ''}
                                                    onChange={(e) => setUserData(prev => ({ ...prev, address: { ...(prev.address || {}), line1: e.target.value } }))}
                                                />
                                                <input
                                                    className="w-full bg-white border border-border rounded-xl px-4 py-2.5 text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                                                    type="text"
                                                    placeholder="Apartment, suite, unit, building, floor, etc. (Optional)"
                                                    value={userData.address?.line2 || ''}
                                                    onChange={(e) => setUserData(prev => ({ ...prev, address: { ...(prev.address || {}), line2: e.target.value } }))}
                                                />
                                            </div>
                                        ) : (
                                            <div className="py-2">
                                                {userData.address?.line1 ? (
                                                    <p className="text-secondary font-medium leading-relaxed">
                                                        {userData.address.line1}
                                                        {userData.address.line2 && <br />}
                                                        {userData.address.line2}
                                                    </p>
                                                ) : (
                                                    <p className="text-text-muted italic">No address provided.</p>
                                                )}
                                            </div>
                                        )}
                                    </FieldRow>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    )
}

export default MyProfile
