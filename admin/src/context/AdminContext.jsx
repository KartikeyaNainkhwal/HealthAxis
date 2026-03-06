import axios from "axios";
import { createContext, useState, useMemo } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
if (!BACKEND_URL) console.error('❌ VITE_BACKEND_URL is not set in admin .env!')

// Global 401 handler for admin panel
axios.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      const msg = error.response?.data?.message || ''
      if (msg.includes('expired') || msg.includes('Invalid token') || msg.includes('log in')) {
        localStorage.removeItem('aToken')
        localStorage.removeItem('dToken')
        toast.error('Session expired. Please log in again.')
        window.location.href = '/'
      }
    }
    return Promise.reject(error)
  }
)

const AdminContextProvider = (props) => {

  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") || ""
  );

  const backendUrl = BACKEND_URL;

  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [dashData, setDashData] = useState(false);


  const getAllDoctors = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/admin/all-doctors",
        { headers: { aToken } }
      );

      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/change-availability",
        { docId },
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };


  const updateDoctorProfile = async (doctorId, updateData) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/update-doctor-profile",
        {
          doctorId,
          ...updateData,
        },
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };


  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/admin/appointments",
        { headers: { aToken } }
      );

      if (data.success) {
        setAppointments(data.appointments.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/cancel-appointment",
        { appointmentId },
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAllAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };


  const getDashData = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/admin/dashboard",
        { headers: { aToken } }
      );

      if (data.success) {
        setDashData(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };


  const value = {
    aToken,
    setAToken,
    backendUrl,

    doctors,
    getAllDoctors,
    changeAvailability,
    updateDoctorProfile,

    appointments,
    setAppointments,
    getAllAppointments,
    cancelAppointment,

    dashData,
    getDashData,
  };

  const memoizedValue = useMemo(() => value, [
    aToken,
    doctors,
    appointments,
    dashData
  ]);

  return (
    <AdminContext.Provider value={memoizedValue}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
