import { createContext, useEffect, useState, useMemo, useCallback } from "react";
import { toast } from "react-toastify";
import axios from 'axios'

export const AppContext = createContext()

// Global axios defaults
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

if (!BACKEND_URL) {
    console.error('❌ VITE_BACKEND_URL is not set in .env file!')
}

// Global response interceptor — handle 401 token expiry across all calls
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            const message = error.response?.data?.message || ''
            if (message.includes('expired') || message.includes('Invalid token') || message.includes('log in')) {
                localStorage.removeItem('token')
                // Reload to trigger re-auth flow naturally
                if (window.location.pathname !== '/login') {
                    toast.error('Your session has expired. Please log in again.')
                    window.location.href = '/login'
                }
            }
        }
        return Promise.reject(error)
    }
)

const AppContextProvider = (props) => {
    const currencySymbol = '₹'
    const backendUrl = BACKEND_URL

    const [doctors, setDoctors] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token') || '')
    const [userData, setUserData] = useState(null)

    const getDoctorsData = useCallback(async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/list')
            if (data.success) {
                setDoctors(data.doctors)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error('getDoctorsData:', error.message)
            toast.error('Failed to load doctors. Please refresh.')
        }
    }, [backendUrl])

    const loadUserProfileData = useCallback(async () => {
        if (!token) return
        try {
            const { data } = await axios.get(backendUrl + '/api/user/get-profile', {
                headers: { token }
            })
            if (data.success) {
                setUserData({
                    ...data.userData,
                    address: data.userData.address || { line1: '', line2: '' },
                    gender: data.userData.gender || '',
                    dob: data.userData.dob || ''
                })
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error('loadUserProfileData:', error.message)
        }
    }, [backendUrl, token])

    useEffect(() => {
        getDoctorsData()
    }, [getDoctorsData])

    useEffect(() => {
        if (token) {
            loadUserProfileData()
        } else {
            setUserData(null)
        }
    }, [token])

    const memoizedValue = useMemo(() => ({
        doctors, getDoctorsData,
        currencySymbol,
        backendUrl,
        token, setToken,
        userData, setUserData,
        loadUserProfileData,
        // Utility used by admin/appointment pages
        calculateAge: (dob) => {
            if (!dob) return 'N/A'
            const today = new Date()
            const birthDate = new Date(dob)
            let age = today.getFullYear() - birthDate.getFullYear()
            const m = today.getMonth() - birthDate.getMonth()
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--
            return age
        },
        slotDateFormat: (slotDate) => {
            if (!slotDate) return ''
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            const [day, month, year] = slotDate.split('_')
            return `${day} ${months[Number(month) - 1]} ${year}`
        },
        currency: '₹',
    }), [doctors, token, userData, backendUrl])

    return (
        <AppContext.Provider value={memoizedValue}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
