import React from "react";
import { useNavigate } from "react-router-dom";

const FEATURES = [
  { icon: "🔍", text: "Search by speciality or symptom" },
  { icon: "📅", text: "Real-time slot availability" },
  { icon: "✅", text: "Instant booking confirmation" },
  { icon: "💊", text: "Teleconsult from home" },
];

const Banner = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="rounded-3xl overflow-hidden grid md:grid-cols-2 shadow-premium-hover">

          {/* Left — dark teal panel */}
          <div className="bg-gradient-to-br from-secondary to-[#1a3450] px-10 py-14 flex flex-col justify-center gap-8">
            <div>
              <span className="inline-block text-xs font-bold tracking-widest text-primary-light uppercase mb-4">Why HealthAxis?</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                Healthcare made simple, fast, and trustworthy.
              </h2>
              <p className="text-white/60 mt-5 leading-relaxed text-base">
                HealthAxis connects you with verified healthcare specialists in minutes — no waiting rooms, no paperwork.
              </p>
            </div>

            <button
              onClick={() => navigate("/login")}
              className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-7 py-4 rounded-xl hover:bg-primary-light transition-all w-max shadow-sm"
            >
              Create free account
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
          </div>

          {/* Right — feature list */}
          <div className="bg-white px-10 py-14 flex flex-col justify-center gap-6">
            <p className="text-sm font-bold uppercase tracking-widest text-text-muted">Everything in one place</p>
            <ul className="space-y-5">
              {FEATURES.map((f) => (
                <li key={f.text} className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-primary-bg flex items-center justify-center text-xl shrink-0">
                    {f.icon}
                  </div>
                  <span className="text-base font-semibold text-secondary">{f.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
