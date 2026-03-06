import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const HeroSection = () => {
    const navigate = useNavigate()

    return (
        <section className="relative w-full overflow-hidden bg-secondary" style={{ minHeight: '88vh' }}>
            {/* Background image */}
            <img
                src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1600&auto=format&fit=crop&q=80"
                alt="HealthAxis Medical Center"
                className="absolute inset-0 w-full h-full object-cover opacity-40"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/60 to-transparent" />

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 flex flex-col justify-center h-full py-28 md:py-36">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="max-w-2xl space-y-8"
                >
                    {/* Tag line */}
                    <p className="text-primary-light text-sm font-semibold uppercase tracking-[0.2em]">
                        HealthAxis — National Cancer Institute Designated
                    </p>

                    {/* Hero headline — Serif */}
                    <h1 className="text-white font-bold tracking-tight leading-[1.1]" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontFamily: "'Georgia', 'Times New Roman', serif" }}>
                        Transforming your care.
                    </h1>

                    <p className="text-white/75 text-lg md:text-xl leading-relaxed max-w-xl">
                        HealthAxis brings together world-class specialists, advanced technology, and compassionate care — to give every patient the right answer, the first time.
                    </p>

                    {/* CTA buttons — pill style a la Mayo Clinic */}
                    <div className="flex flex-wrap gap-4 pt-2">
                        <button
                            onClick={() => navigate('/doctors')}
                            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-8 py-4 rounded-full transition-all shadow-lg text-base"
                        >
                            Request appointment
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </button>
                        <button
                            onClick={() => navigate('/about')}
                            className="inline-flex items-center gap-2 bg-transparent border-2 border-white/70 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/10 transition-all text-base"
                        >
                            Learn how we drive innovation
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#F5F5F5] to-transparent" />
        </section>
    )
}

export default HeroSection
