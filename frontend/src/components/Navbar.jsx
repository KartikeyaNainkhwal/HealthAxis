import React, { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setShowMenu(false);
  }, [location]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(false);
    navigate("/login");
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/doctors", label: "Find Doctors" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-card border-b border-border"
          : "bg-white/80 backdrop-blur-md border-b border-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          {/* Brand */}
          <div
            className="flex items-center gap-2.5 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="white" opacity="0.3" />
                <path d="M12 6v4H8v4h4v4h4v-4h4v-4h-4V6h-4z" fill="white" />
              </svg>
            </div>
            <span className="text-lg font-bold text-secondary tracking-tight">
              HealthAxis
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${isActive
                    ? "text-primary bg-primary-bg"
                    : "text-text-muted hover:text-secondary hover:bg-background"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {token && userData ? (
              <div className="relative group">
                <button className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-full border border-border hover:border-primary/30 hover:bg-primary-bg transition-all duration-200 group">
                  <img
                    src={userData.image || "https://ui-avatars.com/api/?name=U&background=0D7377&color=fff&size=80"}
                    className="w-7 h-7 rounded-full object-cover ring-1 ring-border"
                    alt="Profile"
                  />
                  <span className="hidden sm:block text-sm font-semibold text-secondary max-w-[100px] truncate">
                    {userData.name?.split(" ")[0] || "Account"}
                  </span>
                  <svg className="w-3.5 h-3.5 text-text-muted group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown */}
                <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-dialog border border-border overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-1 group-hover:translate-y-0">
                  <div className="px-4 py-3 border-b border-border bg-background/50">
                    <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Account</p>
                    <p className="text-sm font-semibold text-secondary truncate mt-0.5">{userData.name}</p>
                  </div>
                  <div className="py-1">
                    <button onClick={() => navigate("/my-profile")} className="w-full text-left px-4 py-2.5 text-sm font-medium text-text-main hover:bg-background hover:text-primary transition-colors flex items-center gap-2.5">
                      <svg className="w-4 h-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                      My Profile
                    </button>
                    <button onClick={() => navigate("/my-appointments")} className="w-full text-left px-4 py-2.5 text-sm font-medium text-text-main hover:bg-background hover:text-primary transition-colors flex items-center gap-2.5">
                      <svg className="w-4 h-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      My Appointments
                    </button>
                    <div className="h-px bg-border mx-4 my-1" />
                    <button onClick={logout} className="w-full text-left px-4 py-2.5 text-sm font-medium text-error hover:bg-error-bg transition-colors flex items-center gap-2.5">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <button
                  onClick={() => navigate("/login")}
                  className="text-sm font-semibold text-text-main px-4 py-2 rounded-xl hover:bg-background transition-colors"
                >
                  Log in
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="text-sm font-semibold bg-primary text-white px-5 py-2.5 rounded-xl hover:bg-primary-dark transition-all shadow-sm hover:shadow-premium"
                >
                  Get Started
                </button>
              </div>
            )}

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setShowMenu(true)}
              className="md:hidden w-9 h-9 rounded-xl bg-background flex items-center justify-center border border-border hover:border-primary/30 transition-colors"
              aria-label="Open menu"
            >
              <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 md:hidden"
          >
            <div className="absolute inset-0 bg-secondary/40 backdrop-blur-sm" onClick={() => setShowMenu(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.28 }}
              className="absolute right-0 top-0 bottom-0 w-[85vw] max-w-sm bg-white shadow-dialog flex flex-col"
            >
              <div className="flex justify-between items-center px-6 py-5 border-b border-border">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                      <path d="M12 6v4H8v4h4v4h4v-4h4v-4h-4V6h-4z" fill="white" />
                    </svg>
                  </div>
                  <span className="font-bold text-secondary">HealthAxis</span>
                </div>
                <button onClick={() => setShowMenu(false)} className="w-8 h-8 rounded-lg bg-background flex items-center justify-center border border-border">
                  <svg className="w-4 h-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {token && userData && (
                <div className="px-6 py-4 bg-primary-bg border-b border-border">
                  <div className="flex items-center gap-3">
                    <img src={userData.image || "https://ui-avatars.com/api/?name=U&background=0D7377&color=fff"} className="w-10 h-10 rounded-full object-cover" alt="Profile" />
                    <div>
                      <p className="font-semibold text-secondary text-sm">{userData.name}</p>
                      <p className="text-xs text-text-muted">{userData.email}</p>
                    </div>
                  </div>
                </div>
              )}

              <nav className="flex-1 px-4 py-4 overflow-auto">
                {navLinks.map(({ path, label }, i) => (
                  <motion.div
                    key={path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <NavLink
                      to={path}
                      onClick={() => setShowMenu(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3.5 rounded-xl mb-1 text-sm font-semibold transition-colors ${isActive ? "bg-primary-bg text-primary" : "text-secondary hover:bg-background"
                        }`
                      }
                    >
                      {label}
                    </NavLink>
                  </motion.div>
                ))}

                {token ? (
                  <>
                    <div className="h-px bg-border my-3" />
                    <button onClick={() => { navigate("/my-profile"); setShowMenu(false); }} className="w-full text-left flex items-center gap-3 px-4 py-3.5 rounded-xl mb-1 text-sm font-semibold text-secondary hover:bg-background transition-colors">My Profile</button>
                    <button onClick={() => { navigate("/my-appointments"); setShowMenu(false); }} className="w-full text-left flex items-center gap-3 px-4 py-3.5 rounded-xl mb-1 text-sm font-semibold text-secondary hover:bg-background transition-colors">My Appointments</button>
                    <button onClick={logout} className="w-full text-left flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold text-error hover:bg-error-bg transition-colors mt-1">Sign Out</button>
                  </>
                ) : (
                  <div className="mt-4 flex flex-col gap-2">
                    <button onClick={() => { navigate("/login"); setShowMenu(false); }} className="btn-primary w-full py-3">Get Started Free</button>
                    <button onClick={() => { navigate("/login"); setShowMenu(false); }} className="btn-secondary w-full py-3">Log in</button>
                  </div>
                )}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
