import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import EditDoctorModal from "./EditDoctorModal";
import ViewDoctorModal from "./ViewDoctorModal";
import { motion, AnimatePresence } from "framer-motion";

const DoctorsList = () => {
  const {
    doctors,
    aToken,
    getAllDoctors,
    changeAvailability,
    updateDoctorProfile,
  } = useContext(AdminContext);

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [viewDoctor, setViewDoctor] = useState(null);

  useEffect(() => {
    if (aToken) getAllDoctors();
  }, [aToken]);

  return (
    <div className="p-6 md:p-10 bg-[#F8FAFC] min-h-[calc(100vh-73px)] w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-secondary tracking-tight">
          Doctors Catalog
        </h1>
        <p className="text-text-muted font-medium mt-1.5">
          Manage doctor profiles, specialties, and real-time availability.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 pt-4">
        <AnimatePresence>
          {doctors.map((doctor, index) => (
            <motion.div
              key={doctor._id}
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-white border border-border rounded-[2rem] overflow-hidden hover:shadow-card hover:-translate-y-1 transition-all duration-300 group flex flex-col"
            >
              {/* Image Container matching frontend TopDoctors */}
              <div className="bg-primary-bg overflow-hidden relative">
                <img
                  className="w-full h-56 object-cover object-top"
                  src={doctor.image}
                  alt={doctor.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  {/* Optional hover overlay elements */}
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-sm text-center w-full justify-between mb-3 border-b border-border pb-3">
                  <span className="text-[10px] font-black tracking-widest uppercase text-text-muted">Status</span>
                  <div className="flex items-center gap-2">
                    <p className={`text-[10px] font-bold uppercase tracking-widest ${doctor.available ? 'text-green-500' : 'text-slate-500'}`}>
                      {doctor.available ? 'Available' : 'Away'}
                    </p>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={doctor.available}
                        onChange={() => changeAvailability(doctor._id)}
                      />
                      <div className="w-9 h-5 bg-border rounded-full peer peer-checked:bg-green-500 transition-colors duration-300 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                    </label>
                  </div>
                </div>

                <div>
                  <p className="text-secondary font-black text-xl line-clamp-1 mb-1">
                    {doctor.name}
                  </p>
                  <p className="text-primary font-bold text-sm">
                    {doctor.speciality}
                  </p>
                </div>

                <div className="flex gap-2 mt-auto pt-5">
                  <button
                    onClick={() => setViewDoctor(doctor)}
                    className="flex-1 text-sm py-2.5 border border-border rounded-xl font-bold text-secondary hover:bg-background transition-colors w-full"
                  >
                    View full
                  </button>
                  <button
                    onClick={() => setSelectedDoctor(doctor)}
                    className="w-11 h-11 shrink-0 bg-primary/10 text-primary rounded-xl font-bold flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                    title="Edit Profile"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {viewDoctor && (
        <ViewDoctorModal
          doctor={viewDoctor}
          onClose={() => setViewDoctor(null)}
        />
      )}

      {selectedDoctor && (
        <EditDoctorModal
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
          onSave={updateDoctorProfile}
        />
      )}
    </div>
  );
};

export default DoctorsList;
