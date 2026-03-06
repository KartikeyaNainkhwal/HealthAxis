import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";

const DoctorCard = ({ doctor, index }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      onClick={() => { navigate(`/appointment/${doctor._id}`); window.scrollTo(0, 0); }}
      className="group bg-white border border-border rounded-2xl overflow-hidden cursor-pointer hover:shadow-premium-hover hover:-translate-y-1 transition-all duration-300"
    >
      {/* Photo */}
      <div className="relative bg-primary-bg aspect-[4/3] flex items-end justify-center overflow-hidden">
        <img
          loading="lazy"
          src={doctor.image}
          alt={doctor.name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
        {/* Availability badge */}
        <div className={`absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md ${doctor.available
          ? "bg-success/90 text-white"
          : "bg-white/80 text-text-muted"
          }`}>
          {doctor.available && (
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
            </span>
          )}
          {doctor.available ? "Available" : "Unavailable"}
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="font-bold text-secondary text-base truncate">{doctor.name}</h3>
        <p className="text-primary text-sm font-medium mt-0.5">{doctor.speciality}</p>

        <div className="flex items-center gap-1 mt-2">
          <span className="text-yellow-400 text-xs">⭐</span>
          <span className="text-sm font-bold text-secondary">{doctor.averageRating ? doctor.averageRating.toFixed(1) : "New"}</span>
          <span className="text-xs text-text-muted">({doctor.totalReviews || 0} reviews)</span>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <span className="text-xs font-semibold text-text-muted flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {doctor.experience}
          </span>
          <span className="text-sm font-bold text-secondary">
            ₹{doctor.fees}
            <span className="text-xs font-normal text-text-muted">/visit</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4"
        >
          <div>
            <span className="text-xs font-bold tracking-widest text-primary uppercase">Top Rated</span>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mt-2">
              Doctors you can trust
            </h2>
            <p className="text-text-muted mt-3 max-w-lg leading-relaxed">
              Every doctor on HealthAxis is verified, board-certified, and reviewed by real patients.
            </p>
          </div>
          <button
            onClick={() => { navigate("/doctors"); window.scrollTo(0, 0); }}
            className="shrink-0 text-sm font-semibold text-primary border border-primary/30 bg-primary-bg px-5 py-2.5 rounded-xl hover:bg-primary hover:text-white transition-all"
          >
            View all →
          </button>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {doctors.slice(0, 10).map((doc, i) => (
            <DoctorCard key={doc._id} doctor={doc} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopDoctors;
