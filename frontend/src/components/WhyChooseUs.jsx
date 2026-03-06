import React from 'react'
import { motion } from 'framer-motion'

const WHY_US = [
    { icon: '🏥', title: 'Advanced Diagnostics', desc: 'Latest MRI 3T, robotic surgery systems, PET-CT, and digital pathology labs across every department.' },
    { icon: '👨‍⚕️', title: 'Expert Specialists', desc: '500+ board-certified specialists with advanced fellowship training from AIIMS, CMC, and international centres.' },
    { icon: '🚑', title: '24/7 Emergency', desc: 'Level-I trauma centre. Round-the-clock emergency, resuscitation, and intensive care available always.' },
    { icon: '🤝', title: 'Patient-First Philosophy', desc: 'Every care plan is individualized. We involve you and your family at every step of the journey.' },
    { icon: '🏢', title: 'NABH Certified', desc: 'Fully accredited for clinical safety and quality standards under NABH and JCI international norms.' },
    { icon: '📱', title: 'Digital Health Records', desc: 'Secure online access to your reports, prescriptions, and appointments — anywhere, anytime.' },
]

const WhyChooseUs = () => {
    return (
        <section className="bg-white py-20 px-6 md:px-10 border-t border-border">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <p className="text-primary text-sm font-semibold uppercase tracking-[0.18em] mb-3">Our Advantage</p>
                    <h2 style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }} className="text-3xl md:text-4xl font-bold text-secondary">
                        Why patients choose HealthAxis
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {WHY_US.map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.07 }}
                            className="flex gap-4 p-6 rounded-2xl border border-border bg-[#F5F5F5] hover:border-primary/30 hover:bg-primary-bg transition-all duration-200"
                        >
                            <span className="text-3xl shrink-0 mt-0.5">{item.icon}</span>
                            <div>
                                <h3 className="font-bold text-secondary mb-1.5 text-sm">{item.title}</h3>
                                <p className="text-sm text-text-muted leading-relaxed">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default WhyChooseUs
