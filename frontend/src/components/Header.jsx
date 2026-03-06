import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const STATS = [
  { value: "12+", label: "Verified doctors" },
  { value: "6", label: "Specialities" },
  { value: "100%", label: "Board-certified" },
  { value: "Secure", label: "Razorpay payments" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const Header = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#f0fafa] via-white to-background pt-10 pb-0 md:pt-16">
      {/* Subtle background accents */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/8 rounded-full blur-[96px] pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-72 h-72 bg-primary-light/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT — Copy */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-7 py-8 lg:py-16"
          >
            {/* Trust pill */}
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-bg border border-primary/20 text-primary text-sm font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              HealthAxis — Modern Healthcare Platform
            </motion.div>

            {/* Heading */}
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-secondary leading-[1.1] tracking-tight">
              Your health,{" "}
              <span className="text-primary relative inline-block">
                in expert hands.
                <svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 200 6" fill="none">
                  <path d="M1 5C50 1 150 1 199 5" stroke="#0D7377" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
            </motion.h1>

            {/* Sub */}
            <motion.p variants={fadeUp} className="text-text-muted text-lg leading-relaxed max-w-xl">
              Book appointments with verified specialists, check real-time availability,
              and manage your health journey — all from one trusted platform.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <a
                href="#speciality"
                className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-7 py-4 rounded-xl hover:bg-primary-dark transition-all shadow-sm hover:shadow-premium active:scale-[0.98]"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                Find a Doctor
              </a>
              <button
                onClick={() => navigate("/about")}
                className="inline-flex items-center gap-2 text-secondary font-semibold px-7 py-4 rounded-xl border-2 border-border hover:border-primary/30 hover:bg-primary-bg transition-all"
              >
                How it works
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </motion.div>

            {/* Stats row */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-6 pt-2">
              {STATS.map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="text-xl font-bold text-secondary">{s.value}</span>
                  <span className="text-xs font-medium text-text-muted mt-0.5">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT — Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
            className="relative hidden lg:flex items-end justify-center"
          >
            {/* Hero image container */}
            <div className="relative w-full max-w-md">
              {/* Decorative bg blob */}
              <div className="absolute inset-x-8 bottom-0 h-4/5 bg-gradient-to-b from-primary-bg to-transparent rounded-[2rem]" />

              {/* Main image */}
              <motion.img
                src="https://www.prevea.com/getmedia/ed03e8ac-079a-4967-a802-a338cecb9e66/Primary-care-homepage-widget.jpg?width=700&height=525&ext=.jpg"
                alt="Healthcare professionals"
                className="relative w-full object-cover rounded-[2rem] shadow-premium-hover"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              />

              {/* Floating trust card */}
              <motion.div
                className="absolute -left-10 top-1/3 bg-white rounded-2xl shadow-premium p-4 border border-border flex items-center gap-3 w-48"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <div className="w-10 h-10 bg-success-bg rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-secondary">Verified Doctors</p>
                  <p className="text-xs text-text-muted">All board-certified</p>
                </div>
              </motion.div>

              {/* Floating appointment card  */}
              <motion.div
                className="absolute -right-8 bottom-16 bg-white rounded-2xl shadow-premium p-4 border border-border w-44"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <p className="text-xs font-bold text-primary">Booking confirmed</p>
                </div>
                <p className="text-xs text-text-muted">Today at 3:00 PM</p>
                <p className="text-xs font-semibold text-secondary mt-1">Dr. Sarah Mitchell</p>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Bottom wave */}
      <div className="w-full mt-10 overflow-hidden leading-none">
        <svg viewBox="0 0 1440 40" fill="none" className="w-full">
          <path d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z" fill="#F4F7F9" />
        </svg>
      </div>
    </section>
  );
};

export default Header;
