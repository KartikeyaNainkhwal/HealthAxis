import React from 'react'
import { motion } from 'framer-motion'

const SPECIALITIES = [
    {
        id: 'cardiology',
        name: 'Cardiology',
        desc: 'Heart disease, arrhythmia, heart failure & interventional care.',
        img: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&auto=format&fit=crop',
    },
    {
        id: 'neurology',
        name: 'Neurology',
        desc: 'Brain, spine & nervous system disorders — diagnosis to recovery.',
        img: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&auto=format&fit=crop',
    },
    {
        id: 'orthopedics',
        name: 'Orthopedics',
        desc: 'Bone, joint & sports injuries — from fractures to full replacements.',
        img: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&auto=format&fit=crop',
    },
    {
        id: 'oncology',
        name: 'Oncology',
        desc: 'Comprehensive cancer care with personalized, targeted therapies.',
        img: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&auto=format&fit=crop',
    },
]

const SpecialitiesSection = () => {
    return (
        <section id="specialities" className="bg-[#F5F5F5] py-20 px-6 md:px-10">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <p className="text-primary text-sm font-semibold uppercase tracking-[0.18em] mb-3">Our Departments</p>
                    <h2 style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }} className="text-3xl md:text-4xl font-bold text-secondary">
                        Centres of Excellence
                    </h2>
                    <p className="mt-3 text-text-muted max-w-2xl leading-relaxed">
                        Our speciality centres combine the best doctors, latest technology, and compassionate care — delivering outcomes that matter.
                    </p>
                </motion.div>

                {/* Photo-overlay cards — Mayo Clinic Locations style */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {SPECIALITIES.map((s, i) => (
                        <motion.div
                            key={s.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-card hover:shadow-premium-hover transition-shadow duration-300"
                            style={{ aspectRatio: '16/9' }}
                        >
                            {/* Background image */}
                            <img
                                src={s.img}
                                alt={s.name}
                                className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-500"
                            />
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-secondary/85 via-secondary/30 to-transparent" />
                            {/* Text */}
                            <div className="absolute bottom-0 left-0 p-6 text-white">
                                <div className="flex items-center gap-2">
                                    <h3 style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }} className="text-xl font-bold">{s.name}</h3>
                                    <svg className="w-4 h-4 opacity-80 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                                <p className="text-white/75 text-sm mt-1">{s.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Link list — Mayo Clinic conditions list style */}
                <div className="mt-12 bg-white rounded-2xl border border-border p-8">
                    <h3 className="text-lg font-bold text-secondary mb-6">Also treated at HealthAxis</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0">
                        {[
                            'Pediatrics', 'General Medicine', 'Dermatology',
                            'Gastroenterology', 'Pulmonology', 'Urology',
                            'Ophthalmology', 'Psychiatry', 'Endocrinology',
                        ].map((dept) => (
                            <div key={dept} className="flex items-center gap-2 py-3 border-b border-border last:border-b-0 sm:last:border-b group cursor-pointer">
                                <span className="text-primary font-medium text-sm group-hover:underline">{dept}</span>
                                <svg className="w-3.5 h-3.5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SpecialitiesSection
