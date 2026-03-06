import React from 'react'
import { motion } from 'framer-motion'

const TESTIMONIALS = [
    {
        id: 1,
        name: 'Priya Sharma',
        title: 'Cardiac Patient, Mumbai',
        rating: 5,
        quote: 'The cardiology team at HealthAxis quite literally saved my life. The diagnostics were precise, the speed was extraordinary, and the care never felt clinical — it felt human.',
        initial: 'PS',
    },
    {
        id: 2,
        name: 'Rajesh Kumar',
        title: 'Knee Replacement, Delhi',
        rating: 5,
        quote: 'After years of knee pain, the orthopedic team here gave me a new lease on life. The entire journey — from consultation to surgery to recovery — was seamless.',
        initial: 'RK',
    },
    {
        id: 3,
        name: 'Anita Verma',
        title: "Pediatric Patient's Parent",
        rating: 5,
        quote: 'My son recovered faster than we expected. The pediatric ward was warm, child-friendly, and the doctors took time to explain everything at our level. Deeply grateful.',
        initial: 'AV',
    },
]

const Stars = () => (
    <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(i => (
            <svg key={i} className="w-4 h-4 fill-amber-400 text-amber-400" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
        ))}
    </div>
)

const TestimonialsSection = () => {
    return (
        <section className="bg-[#F5F5F5] py-20 px-6 md:px-10 border-t border-border">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <p className="text-primary text-sm font-semibold uppercase tracking-[0.18em] mb-3">Patient Stories</p>
                    <h2 style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }} className="text-3xl md:text-4xl font-bold text-secondary">
                        Lives we have changed
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {TESTIMONIALS.map((t, i) => (
                        <motion.div
                            key={t.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="bg-white rounded-2xl p-7 border border-border shadow-card flex flex-col gap-5"
                        >
                            <Stars />

                            <blockquote className="text-sm text-text-main leading-relaxed flex-1 italic">
                                "{t.quote}"
                            </blockquote>

                            <div className="flex items-center gap-3 pt-3 border-t border-border">
                                <div className="w-10 h-10 rounded-full bg-primary-bg text-primary font-bold text-sm flex items-center justify-center">
                                    {t.initial}
                                </div>
                                <div>
                                    <p className="font-bold text-secondary text-sm">{t.name}</p>
                                    <p className="text-xs text-text-muted">{t.title}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default TestimonialsSection
