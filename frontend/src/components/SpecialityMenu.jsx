import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SPECIALITIES = [
  { label: "General Physician", icon: "🩺", slug: "General physician" },
  { label: "Gynecologist", icon: "👶", slug: "Gynecologist" },
  { label: "Dermatologist", icon: "🌿", slug: "Dermatologist" },
  { label: "Pediatrician", icon: "🍼", slug: "Pediatricians" },
  { label: "Neurologist", icon: "🧠", slug: "Neurologist" },
  { label: "Gastroenterologist", icon: "🫁", slug: "Gastroenterologist" },
];

const SpecialityMenu = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  return (
    <section id="speciality" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="inline-block text-xs font-bold tracking-widest text-primary uppercase mb-3">Browse By Speciality</span>
          <h2 className="text-3xl md:text-4xl font-bold text-secondary">
            Find the right specialist
          </h2>
          <p className="text-text-muted mt-4 text-base leading-relaxed">
            Choose from our wide network of verified specialists. All doctors are board-certified and background-checked.
          </p>
        </motion.div>

        {/* Speciality Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {SPECIALITIES.map((spec, i) => (
            <motion.button
              key={spec.slug}
              onClick={() => navigate(`/doctors/${spec.slug}`)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group flex flex-col items-center gap-3 p-6 bg-white rounded-2xl border border-border hover:border-primary/30 hover:shadow-premium transition-all duration-200 cursor-pointer text-center"
            >
              <div className="w-14 h-14 rounded-xl bg-primary-bg flex items-center justify-center text-2xl group-hover:bg-primary group-hover:scale-110 transition-all duration-200">
                <span className="group-hover:grayscale-0">{spec.icon}</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-secondary group-hover:text-primary transition-colors leading-tight">
                  {spec.label}
                </p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-10"
        >
          <button
            onClick={() => navigate("/doctors")}
            className="text-sm font-semibold text-primary hover:text-primary-dark inline-flex items-center gap-1.5 hover:gap-2.5 transition-all"
          >
            View all doctors
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default SpecialityMenu;
