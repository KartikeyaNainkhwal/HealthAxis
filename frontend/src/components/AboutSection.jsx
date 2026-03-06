import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AboutSection = () => {
    const navigate = useNavigate();

    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    const listVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -10 },
        show: { opacity: 1, x: 0 },
    };

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-bg rounded-full blur-[100px] opacity-60 -z-10 translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[80px] opacity-60 -z-10 -translate-x-1/2 translate-y-1/2" />

            <div className="max-w-7xl mx-auto px-6 md:px-10">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Left Column: Image Collage */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative"
                    >
                        {/* Main Image */}
                        <div className="relative z-10 w-[85%] rounded-[2rem] overflow-hidden shadow-premium">
                            <img
                                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2653&auto=format&fit=crop"
                                alt="Modern Hospital Facility"
                                className="w-full h-[400px] lg:h-[500px] object-cover"
                            />
                        </div>

                        {/* Overlapping Image */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="absolute -bottom-10 -right-4 lg:-right-10 z-20 w-[60%] rounded-3xl overflow-hidden shadow-dialog border-4 border-white"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=1770&auto=format&fit=crop"
                                alt="Caring Doctor"
                                className="w-full h-[250px] object-cover"
                            />
                        </motion.div>

                        {/* Experience Badge */}
                        <div className="absolute top-10 -left-6 lg:-left-12 z-20 bg-white p-4 rounded-2xl shadow-premium border border-border flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary-bg text-primary rounded-xl flex items-center justify-center font-bold text-xl">
                                15+
                            </div>
                            <div>
                                <p className="text-secondary font-bold leading-tight">Years of</p>
                                <p className="text-text-muted text-sm">Excellence</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Copy & Content */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        className="space-y-8 mt-16 lg:mt-0"
                    >
                        <div>
                            <span className="inline-block text-xs font-bold tracking-widest text-primary uppercase mb-3">
                                About Our Hospital
                            </span>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary leading-[1.15] tracking-tight">
                                World-Class Healthcare, <br className="hidden lg:block" />
                                <span className="text-primary">Right in Your Neighborhood.</span>
                            </h2>
                        </div>

                        <p className="text-text-muted text-lg leading-relaxed max-w-lg">
                            At HealthAxis, we believe that exceptional healthcare should be accessible and compassionate. Our state-of-the-art facilities and dedicated medical teams are committed to your holistic well-being.
                        </p>

                        {/* Key Benefits List */}
                        <motion.ul
                            variants={listVariants}
                            className="space-y-4 pt-2"
                        >
                            {[
                                "24/7 Emergency Care & Support",
                                "Advanced Medical Technology",
                                "Recognized Top-Tier Specialists",
                                "Patient-First Approach",
                            ].map((item, idx) => (
                                <motion.li key={idx} variants={itemVariants} className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center shrink-0">
                                        <svg className="w-5 h-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-secondary font-semibold">{item}</span>
                                </motion.li>
                            ))}
                        </motion.ul>

                        <div className="pt-4">
                            <button
                                onClick={() => { navigate("/about"); window.scrollTo(0, 0); }}
                                className="btn-primary inline-flex items-center gap-2 group"
                            >
                                Discover Our Story
                                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default AboutSection;
