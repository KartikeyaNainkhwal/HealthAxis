import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const HospitalAbout = () => {
    const navigate = useNavigate()

    return (
        <>
            {/* Section A: "Healing starts here" — Split layout (Mayo Clinic style) */}
            <section className="bg-[#F5F5F5] py-20 px-6 md:px-10">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

                    {/* Left: Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        <h2 style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }} className="text-4xl md:text-5xl font-bold text-secondary leading-tight">
                            Healing starts here
                        </h2>

                        <div className="space-y-4 text-text-main">
                            <div>
                                <p className="font-bold text-secondary mb-1">The right answers the first time</p>
                                <p className="text-text-muted leading-relaxed">Effective treatment depends on getting the right diagnosis. Our experts diagnose and treat the toughest medical challenges across 30+ specialities.</p>
                            </div>

                            <div>
                                <p className="font-bold text-secondary mb-1">Ranked among India's best hospitals</p>
                                <p className="text-text-muted leading-relaxed">HealthAxis is recognized as a top-ranked hospital for clinical excellence, patient outcomes, and innovative medical research.</p>
                            </div>

                            <div>
                                <p className="font-bold text-secondary mb-1">Every patient is unique</p>
                                <p className="text-text-muted leading-relaxed">We don't offer generic care. Every treatment plan is tailored to the individual — shaped by expert diagnosis, advanced imaging, and compassionate consultation.</p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4 pt-2">
                            <button
                                onClick={() => navigate('/doctors')}
                                className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-7 py-3.5 rounded-full hover:bg-primary-dark transition-all text-sm"
                            >
                                Book an appointment
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            </button>

                            <button
                                onClick={() => navigate('/about')}
                                className="inline-flex items-center gap-2 border-2 border-primary text-primary font-semibold px-7 py-3.5 rounded-full hover:bg-primary-bg transition-all text-sm"
                            >
                                About HealthAxis
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            </button>
                        </div>
                    </motion.div>

                    {/* Right: Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.97 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&auto=format&fit=crop"
                            alt="Doctor consulting patient at HealthAxis"
                            className="w-full rounded-2xl object-cover shadow-premium-hover aspect-[4/3]"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Section B: "World-class care" — Reversed split */}
            <section className="bg-white py-20 px-6 md:px-10">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

                    {/* Left: Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.97 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop"
                            alt="State-of-the-art HealthAxis hospital facility"
                            className="w-full rounded-2xl object-cover shadow-premium-hover aspect-[4/3]"
                        />
                    </motion.div>

                    {/* Right: Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        <h2 style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }} className="text-4xl md:text-5xl font-bold text-secondary leading-tight">
                            World-class care for every patient
                        </h2>

                        <p className="text-text-muted leading-relaxed text-base">
                            Whether you're coming from across the city or across the country, HealthAxis is committed to making advanced, specialist care accessible, compassionate, and seamless for every individual.
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { value: '1M+', label: 'Patients treated' },
                                { value: '500+', label: 'Expert specialists' },
                                { value: '30+', label: 'Departments' },
                                { value: '24/7', label: 'Emergency care' },
                            ].map((s) => (
                                <div key={s.label} className="bg-[#F5F5F5] rounded-xl p-4 border border-border">
                                    <p className="text-2xl font-bold text-primary">{s.value}</p>
                                    <p className="text-sm text-text-muted mt-0.5">{s.label}</p>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => navigate('/about')}
                            className="inline-flex items-center gap-2 border-2 border-primary text-primary font-semibold px-7 py-3.5 rounded-full hover:bg-primary-bg transition-all text-sm"
                        >
                            Our specialities & services
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </button>
                    </motion.div>
                </div>
            </section>
        </>
    )
}

export default HospitalAbout
