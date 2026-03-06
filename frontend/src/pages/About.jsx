import React from "react";
import { motion } from "framer-motion";

const About = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="bg-[#F8FAFC]">

      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-secondary text-white py-20 lg:py-28">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--tw-colors-primary)_0%,transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:32px_32px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="pr-4">
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">About HealthAxis</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-[1.1]">
              Healthcare, <br /> simplified for <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">humans.</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
              We are removing friction from healthcare by connecting patients with verified, expert doctors instantly and confidently.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative hidden md:block"
          >
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/30 to-emerald-400/20 rounded-[2.5rem] blur-2xl transform -rotate-3"></div>
            <img
              src="https://dratdoorstep.com/wp-content/uploads/2025/07/dr-at-door-website-home-page-dr-image-2.jpg"
              alt="Healthcare professionals"
              className="relative z-10 w-full rounded-[2rem] shadow-2xl border border-white/10 object-cover h-[400px]"
            />
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="max-w-4xl mx-auto px-6 lg:px-10 py-20 lg:py-32">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          className="space-y-8 text-secondary font-medium text-xl md:text-2xl leading-relaxed text-center"
        >
          <motion.p variants={fadeUp}>
            Healthcare should feel calm, clear, and supportive — not confusing. But for too long, patients have struggled with outdated systems, endless waiting rooms, and slow processes.
          </motion.p>
          <motion.p variants={fadeUp} className="font-black text-2xl md:text-3xl text-primary">
            HealthAxis changes everything.
          </motion.p>
          <motion.p variants={fadeUp} className="text-lg md:text-xl text-text-muted">
            We bring real-time slot availability, strictly verified doctors, and instant bookings together in one remarkably seamless experience. Whether you’re visiting a specialist clinic or managing long-term care, our platform is designed to stay simple, reliable, and incredibly fast.
          </motion.p>
        </motion.div>
      </section>

      {/* Why Choose Us Grid */}
      <section className="bg-white border-y border-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
          <div className="text-center mb-16">
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-3 block">Why Choose Us</span>
            <h2 className="text-3xl lg:text-4xl font-black text-secondary">The HealthAxis Advantage</h2>
          </div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8 text-center"
          >

            <motion.div variants={fadeUp} className="bg-[#F8FAFC] p-10 rounded-3xl border border-border hover:border-primary/30 transition-colors group">
              <div className="w-20 h-20 mx-auto bg-white rounded-2xl shadow-sm border border-border flex items-center justify-center mb-8 group-hover:scale-110 group-hover:shadow-md transition-all">
                <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              </div>
              <h3 className="text-xl font-black text-secondary mb-3">Absolute Clarity</h3>
              <p className="text-text-muted font-medium leading-relaxed">
                Clear steps, honest pricing, and transparent doctor reviews. No hidden fees or confusing medical jargon.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-[#F8FAFC] p-10 rounded-3xl border border-border hover:border-amber-300/50 transition-colors group">
              <div className="w-20 h-20 mx-auto bg-white rounded-2xl shadow-sm border border-border flex items-center justify-center mb-8 group-hover:scale-110 group-hover:shadow-md transition-all">
                <svg className="w-10 h-10 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <h3 className="text-xl font-black text-secondary mb-3">Verified Trust</h3>
              <p className="text-text-muted font-medium leading-relaxed">
                Every professional on our platform passes a strict background check. Your personal health data is always encrypted.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-[#F8FAFC] p-10 rounded-3xl border border-border hover:border-emerald-300/50 transition-colors group">
              <div className="w-20 h-20 mx-auto bg-white rounded-2xl shadow-sm border border-border flex items-center justify-center mb-8 group-hover:scale-110 group-hover:shadow-md transition-all">
                <svg className="w-10 h-10 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="text-xl font-black text-secondary mb-3">Lightning Speed</h3>
              <p className="text-text-muted font-medium leading-relaxed">
                Book appointments in literally seconds. Receive instant digital prescriptions and PDF receipts right on your dashboard.
              </p>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#F8FAFC]">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} className="max-w-4xl mx-auto px-6 py-28 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-secondary tracking-tight">
            Built for patients. <br className="hidden md:block" />Designed for trust.
          </h2>
          <p className="mt-6 text-xl text-text-muted font-medium mb-10">
            Join thousands of patients who are already experiencing the future of healthcare.
          </p>
          <button className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-primary/20 transition-all">
            Create free account
          </button>
        </motion.div>
      </section>

    </div>
  );
};

export default About;
