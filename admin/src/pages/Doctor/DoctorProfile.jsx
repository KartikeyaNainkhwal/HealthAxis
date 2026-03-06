import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const DoctorProfile = () => {

    const { dToken, profileData, setProfileData, getProfileData, backendUrl } = useContext(DoctorContext)
    const { currency } = useContext(AppContext)
    const [isEdit, setIsEdit] = useState(false)

    const updateProfile = async () => {

        try {

            const updateData = {
                address: profileData.address,
                fees: profileData.fees,
                about: profileData.about,
                available: profileData.available
            }

            const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { headers: { dToken } })

            if (data.success) {
                toast.success(data.message)
                setIsEdit(false)
                getProfileData()
            } else {
                toast.error(data.message)
            }

            setIsEdit(false)

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    useEffect(() => {
        if (dToken) {
            getProfileData()
        }
    }, [dToken])

    return profileData && (
        <div className="p-8 md:p-10 bg-background min-h-[calc(100vh-73px)] w-full">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-secondary tracking-tight">
                    Profile Management
                </h1>
                <p className="text-slate-500 font-medium mt-2">
                    Manage your personal details and professional information
                </p>
            </div>

            <div className='flex flex-col md:flex-row gap-8 max-w-5xl'>
                <div className="shrink-0 group">
                    <img className='w-full md:w-80 rounded-[2rem] object-cover shadow-premium border border-border-light bg-white p-2' src={profileData.image} alt="" />
                </div>

                <div className='flex-1 bg-white rounded-[2rem] shadow-premium border border-border-light p-8 md:p-10'>

                    <p className='text-3xl font-bold text-secondary tracking-tight'>{profileData.name}</p>
                    <div className='flex flex-wrap items-center gap-3 mt-3 text-slate-500 font-medium'>
                        <span className="flex items-center gap-2 font-bold text-secondary">
                            <span className="w-2 h-2 rounded-full bg-primary/70"></span>
                            {profileData.degree}
                        </span>
                        <span>•</span>
                        <span>{profileData.speciality}</span>
                        <span className='py-1 px-3 ml-2 border border-border-light bg-background font-bold text-secondary/80 text-[10px] uppercase tracking-wider rounded-lg'>{profileData.experience}</span>
                    </div>

                    <div className="mt-8">
                        <p className='text-sm font-bold uppercase tracking-wider text-slate-400 mb-3'>About</p>
                        <div className='text-slate-600 font-medium leading-relaxed max-w-[700px]'>
                            {
                                isEdit
                                    ? <textarea onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))} type='text' className='w-full border border-border-light focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none rounded-xl p-4 bg-background focus:bg-white text-text-main resize-none' rows={6} value={profileData.about} />
                                    : profileData.about
                            }
                        </div>
                    </div>

                    <p className='text-slate-500 font-medium mt-8 flex items-center gap-3'>
                        <span className="text-sm font-bold uppercase tracking-wider text-slate-400">Consultation Fee</span>
                        <span className='text-secondary font-bold text-lg'>
                            {currency} {isEdit ? <input type='number' className="inline-block border border-border-light focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none rounded-lg px-3 py-1.5 bg-background focus:bg-white w-24 text-base" onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} value={profileData.fees} /> : profileData.fees}
                        </span>
                    </p>

                    <div className='flex flex-col gap-3 py-6 mt-6 border-t border-gray-100'>
                        <p className="text-sm font-bold uppercase tracking-wider text-slate-400">Clinic Address</p>
                        <div className='text-secondary font-medium space-y-2'>
                            {isEdit ? <input type='text' className="w-full max-w-md border border-border-light focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none rounded-lg px-4 py-2 bg-background focus:bg-white" onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={profileData.address.line1} /> : <p>{profileData.address.line1}</p>}
                            {isEdit ? <input type='text' className="w-full max-w-md border border-border-light focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none rounded-lg px-4 py-2 bg-background focus:bg-white" onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={profileData.address.line2} /> : <p>{profileData.address.line2}</p>}
                        </div>
                    </div>

                    <div className='flex items-center gap-3 pt-6 border-t border-gray-100'>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={profileData.available}
                                onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))}
                                disabled={!isEdit}
                            />
                            <div className={`w-11 h-6 rounded-full peer transition-colors duration-300 ${!isEdit && profileData.available ? 'bg-success/50' : 'bg-gray-200 peer-checked:bg-success'} ${!isEdit && 'opacity-70'}`}></div>
                            <div className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-5 shadow-sm`}></div>
                        </label>
                        <span className="text-sm font-bold text-secondary">Available for Appointments</span>
                    </div>

                    <div className="mt-10">
                        {
                            isEdit
                                ? <button onClick={updateProfile} className='px-10 py-3 bg-primary text-white border-transparent font-bold text-base rounded-xl transition-all shadow-md hover:bg-primary-dark hover:shadow-primary/30 active:scale-[0.98]'>Save Changes</button>
                                : <button onClick={() => setIsEdit(prev => !prev)} className='px-10 py-3 bg-primary/10 text-primary border-transparent font-bold text-base rounded-xl transition-all shadow-sm hover:bg-primary hover:text-white'>Edit Profile</button>
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}

export default DoctorProfile