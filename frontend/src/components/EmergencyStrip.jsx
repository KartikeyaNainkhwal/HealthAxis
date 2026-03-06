import React from 'react'
import { motion } from 'framer-motion'

const EmergencyStrip = () => {
    return (
        <section className="bg-secondary py-14 px-6 md:px-10">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
                >
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
                            <p className="text-white/60 text-xs font-bold uppercase tracking-[0.18em]">24/7 Emergency Services</p>
                        </div>
                        <h2 style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }} className="text-2xl md:text-3xl font-bold text-white leading-tight">
                            Need immediate medical assistance?
                        </h2>
                        <p className="text-white/60 leading-relaxed max-w-lg">
                            Our emergency team is on standby around the clock. Walk in to our ER, call our helpline, or request an ambulance — we are always ready.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 shrink-0">
                        <div>
                            <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-1">Emergency Helpline</p>
                            <a href="tel:+911800000000" className="text-white text-3xl font-bold tracking-tight hover:text-primary-light transition-colors">
                                1800-000-0000
                            </a>
                        </div>
                        <a
                            href="tel:+911800000000"
                            className="inline-flex items-center gap-2 bg-white text-secondary font-bold px-8 py-4 rounded-full hover:bg-primary-bg transition-all text-sm"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            Call Now
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default EmergencyStrip
