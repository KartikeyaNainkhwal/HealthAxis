import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-50 text-secondary border-t border-border mt-0">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="space-y-5 lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="white" opacity="0.3" />
                  <path d="M12 6v4H8v4h4v4h4v-4h4v-4h-4V6h-4z" fill="white" />
                </svg>
              </div>
              <span className="text-lg font-bold text-secondary tracking-tight">HealthAxis</span>
            </div>
            <p className="text-text-muted text-sm leading-relaxed max-w-xs">
              Connecting patients with trusted healthcare professionals for a healthier tomorrow.
            </p>
            <div className="flex gap-3">
              {["twitter", "linkedin", "facebook"].map((s) => (
                <a key={s} href="#" className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-primary hover:text-white transition-colors border border-border">
                  <span className="sr-only">{s}</span>
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" /></svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-text-muted mb-5">Platform</h3>
            <ul className="space-y-3">
              {[
                { label: "Home", path: "/" },
                { label: "Find Doctors", path: "/doctors" },
                { label: "My Appointments", path: "/my-appointments" },
                { label: "My Profile", path: "/my-profile" },
              ].map((l) => (
                <li key={l.label}>
                  <button
                    onClick={() => navigate(l.path)}
                    className="text-sm text-text-muted hover:text-primary transition-colors"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-text-muted mb-5">Company</h3>
            <ul className="space-y-3">
              {[
                { label: "About Us", path: "/about" },
                { label: "Contact", path: "/contact" },
                { label: "Privacy", path: "/contact" },
                { label: "Terms", path: "/contact" },
              ].map((l) => (
                <li key={l.label}>
                  <button
                    onClick={() => navigate(l.path)}
                    className="text-sm text-text-muted hover:text-primary transition-colors"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-text-muted mb-5">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-text-muted">
                <svg className="w-4 h-4 text-primary mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                54709 Willms Station, Suite 350, Washington, USA
              </li>
              <li className="flex items-center gap-3 text-sm text-text-muted">
                <svg className="w-4 h-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                +1 (888) 000-1234
              </li>
              <li className="flex items-center gap-3 text-sm text-text-muted">
                <svg className="w-4 h-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                contact@healthaxis.com
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-text-muted">
          <p>© {new Date().getFullYear()} HealthAxis. Developed by Kartikeya Nainkhwal.</p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
            <span>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
