import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const ACTIONS = [
    {
        id: 'book',
        icon: '📅',
        title: 'Book Appointment',
        desc: 'Schedule with a specialist today — same-week appointments available.',
        path: '/doctors',
    },
    {
        id: 'find',
        icon: '🔍',
        title: 'Find a Doctor',
        desc: 'Browse 500+ verified specialists by name, department, or condition.',
        path: '/doctors',
    },
    {
        id: 'emergency',
        icon: '🚨',
        title: 'Emergency Care',
        desc: 'Our 24/7 emergency unit is always ready. Walk in or call ahead.',
        path: '/contact',
    },
    {
        id: 'packages',
        icon: '📋',
        title: 'Health Packages',
        desc: 'Annual check-ups, corporate packages, and preventive screening plans.',
        path: '/doctors',
    },
]

const QuickActions = () => {
    const navigate = useNavigate()

    return (
        <section className="bg-white py-16 px-6 md:px-10 border-b border-border">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {ACTIONS.map((a, i) => (
                        <motion.div
                            key={a.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            onClick={() => navigate(a.path)}
                            className="group flex flex-col gap-3 p-6 rounded-2xl border border-border bg-white hover:border-primary/30 hover:shadow-premium transition-all duration-200 cursor-pointer"
                        >
                            <span className="text-3xl">{a.icon}</span>
                            <h3 className="font-bold text-secondary text-base">{a.title}</h3>
                            <p className="text-sm text-text-muted leading-relaxed flex-1">{a.desc}</p>
                            <div className="flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all duration-200">
                                Get started
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default QuickActions
