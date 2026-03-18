import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import axios from 'axios'

const backendUrl = import.meta.env.VITE_BACKEND_URL?.replace(/\/+$/, '')

const Contact = () => {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', message: '' })

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await axios.post(`${backendUrl}/api/contact/send`, form)
      if (data.success) {
        toast.success(data.message)
        setForm({ firstName: '', lastName: '', email: '', message: '' })
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-[#F8FAFC]">

      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-secondary text-white py-20 lg:py-28">
        {/* Background Patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--tw-colors-primary)_0%,transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:32px_32px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-2xl">
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Get Support</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6">
              We're here to help you.
            </h1>
            <p className="text-gray-300 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
              Reach out to our team for support, business inquiries, or career opportunities. We always respond within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area: Split Layout */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-24 relative z-20 -mt-10 lg:-mt-16">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-0 bg-white rounded-3xl shadow-card border border-border overflow-hidden min-h-[600px]">

          {/* Left Box: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 p-8 md:p-12 lg:p-16"
          >
            <h2 className="text-2xl font-black text-secondary mb-2">Send us a message</h2>
            <p className="text-text-muted font-medium mb-8">Fill out the form below and our team will get in touch.</p>

            <form onSubmit={handleSendMessage} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-text-muted">First Name</label>
                  <input required name="firstName" value={form.firstName} onChange={handleChange} type="text" placeholder="John" className="w-full bg-background border border-border rounded-xl px-4 py-3.5 text-secondary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-text-muted">Last Name</label>
                  <input name="lastName" value={form.lastName} onChange={handleChange} type="text" placeholder="Doe" className="w-full bg-background border border-border rounded-xl px-4 py-3.5 text-secondary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-text-muted">Email Address</label>
                <input required name="email" value={form.email} onChange={handleChange} type="email" placeholder="john@example.com" className="w-full bg-background border border-border rounded-xl px-4 py-3.5 text-secondary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-text-muted">Message</label>
                <textarea required name="message" value={form.message} onChange={handleChange} placeholder="How can we help you today?" className="w-full bg-background border border-border rounded-xl px-4 py-3.5 text-secondary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 resize-none h-32"></textarea>
              </div>

              <button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary-hover disabled:opacity-60 text-white py-4 rounded-xl font-bold shadow-md shadow-primary/20 transition-all flex justify-center items-center gap-2">
                {loading ? (
                  <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg> Sending...</>
                ) : (
                  <>Send Message <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg></>
                )}
              </button>
            </form>
          </motion.div>

          {/* Right Box: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2 bg-gradient-to-br from-secondary to-[#1e293b] p-8 md:p-12 lg:p-16 text-white flex flex-col justify-between relative overflow-hidden"
          >
            {/* Decorative blob */}
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary rounded-full blur-3xl opacity-20 pointer-events-none"></div>

            <div>
              <h3 className="text-2xl font-black mb-8">Contact Information</h3>

              <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8">

                {/* Info Row 1 */}
                <motion.div variants={fadeUp} className="flex gap-4 group cursor-default">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div>
                    <h4 className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-1">Our Office</h4>
                    <p className="font-medium leading-relaxed">
                      54 South Delhi <br />
                      New Delhi, 110001
                    </p>
                  </div>
                </motion.div>

                {/* Info Row 2 */}
                <motion.div variants={fadeUp} className="flex gap-4 group cursor-default">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <h4 className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-1">Email Us</h4>
                    <p className="font-medium cursor-pointer hover:text-primary transition-colors">support@healthaxis.com</p>
                  </div>
                </motion.div>

                {/* Info Row 3 */}
                <motion.div variants={fadeUp} className="flex gap-4 group cursor-default">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <div>
                    <h4 className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-1">Call Us</h4>
                    <p className="font-medium cursor-pointer hover:text-primary transition-colors">+91 90000 00000</p>
                  </div>
                </motion.div>

              </motion.div>
            </div>

            {/* Careers Card */}
            <div className="mt-16 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
              <h4 className="font-bold text-white mb-2">Join our team</h4>
              <p className="text-gray-400 text-sm font-medium mb-4 leading-relaxed">
                Help us build products that make healthcare simpler, transparent, and more accessible.
              </p>
              <button className="text-white hover:text-primary font-bold text-sm tracking-wide flex items-center gap-1.5 transition-colors group">
                Explore Openings
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </button>
            </div>

          </motion.div>
        </div>
      </section>

    </div>
  )
}

export default Contact
