import React, { useContext, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { motion, AnimatePresence } from 'framer-motion'

const SPECIALITIES = [
  'General physician',
  'Gynecologist',
  'Dermatologist',
  'Pediatricians',
  'Neurologist',
  'Gastroenterologist',
]

const DoctorCardSkeleton = () => (
  <div className="bg-white border border-border rounded-2xl overflow-hidden animate-pulse">
    <div className="bg-border/40 aspect-[4/3]" />
    <div className="p-5 space-y-3">
      <div className="h-4 w-2/3 bg-border rounded" />
      <div className="h-3 w-1/2 bg-border/60 rounded" />
      <div className="h-px bg-border mt-3" />
      <div className="flex justify-between">
        <div className="h-3 w-16 bg-border/60 rounded" />
        <div className="h-3 w-12 bg-border/60 rounded" />
      </div>
    </div>
  </div>
)

const Doctors = () => {
  const { speciality } = useParams()
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)
  const [search, setSearch] = useState('')
  const [showFilter, setShowFilter] = useState(false)

  const filteredDoctors = useMemo(() => {
    return doctors.filter(doc => {
      const matchSpec = speciality ? doc.speciality === speciality : true
      const matchSearch = doc.name.toLowerCase().includes(search.toLowerCase()) ||
        doc.speciality.toLowerCase().includes(search.toLowerCase())
      return matchSpec && matchSearch
    })
  }, [doctors, speciality, search])

  const isLoading = doctors.length === 0

  return (
    <div className="min-h-screen bg-background">
      {/* Page header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-10">
          <h1 className="text-3xl font-bold text-secondary">Find Your Doctor</h1>
          <p className="text-text-muted mt-2">Browse {doctors.length > 0 ? doctors.length : '...'} verified healthcare specialists</p>

          {/* Search */}
          <div className="relative mt-6 max-w-lg">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="search"
              placeholder="Search by name or speciality..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-base pl-12"
            />
          </div>
        </div>
      </div>

      {/* Layout */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar Filter */}
          <aside className="lg:w-64 shrink-0">
            <div className="bg-white rounded-2xl border border-border shadow-card p-6 lg:sticky lg:top-24">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-sm font-bold uppercase tracking-widest text-text-muted">Speciality</h2>
                <button
                  className="lg:hidden text-xs font-semibold text-primary"
                  onClick={() => setShowFilter(v => !v)}
                >
                  {showFilter ? "Hide" : "Show"}
                </button>
              </div>

              <AnimatePresence>
                {(showFilter || true) && (
                  <motion.div
                    className="space-y-1"
                    initial={false}
                  >
                    <button
                      onClick={() => navigate('/doctors')}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${!speciality ? 'bg-primary-bg text-primary' : 'text-secondary hover:bg-background'
                        }`}
                    >
                      All Specialities
                    </button>
                    {SPECIALITIES.map(spec => (
                      <button
                        key={spec}
                        onClick={() => navigate(speciality === spec ? '/doctors' : `/doctors/${spec}`)}
                        className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${speciality === spec ? 'bg-primary-bg text-primary' : 'text-secondary hover:bg-background'
                          }`}
                      >
                        {spec}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {speciality && (
                <button
                  onClick={() => navigate('/doctors')}
                  className="mt-4 w-full text-xs font-semibold text-text-muted hover:text-error flex items-center gap-1.5 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  Clear filter
                </button>
              )}
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1">
            {/* Active filter chip */}
            {speciality && (
              <div className="flex items-center gap-2 mb-6">
                <span className="text-sm text-text-muted">Showing:</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-bg text-primary rounded-full text-sm font-semibold">
                  {speciality}
                  <button onClick={() => navigate('/doctors')} className="hover:text-error transition-colors">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </span>
              </div>
            )}

            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                {Array.from({ length: 6 }).map((_, i) => <DoctorCardSkeleton key={i} />)}
              </div>
            ) : filteredDoctors.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-16 h-16 bg-primary-bg rounded-2xl flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-primary/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-secondary">No doctors found</h3>
                <p className="text-text-muted mt-2 text-sm">Try adjusting your search or filter</p>
                <button onClick={() => { setSearch(''); navigate('/doctors'); }} className="mt-6 btn-primary btn-sm">
                  Clear all filters
                </button>
              </div>
            ) : (
              <>
                <p className="text-sm text-text-muted mb-5 font-medium">{filteredDoctors.length} doctors found</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                  {filteredDoctors.map((doc, index) => (
                    <motion.div
                      key={doc._id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(index * 0.05, 0.3) }}
                      onClick={() => { navigate(`/appointment/${doc._id}`); window.scrollTo(0, 0) }}
                      className="group bg-white border border-border rounded-2xl overflow-hidden cursor-pointer hover:shadow-premium-hover hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="relative bg-primary-bg aspect-[4/3] overflow-hidden">
                        <img
                          loading="lazy"
                          src={doc.image}
                          alt={doc.name}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className={`absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md ${doc.available ? "bg-success/90 text-white" : "bg-white/80 text-text-muted border border-border"
                          }`}>
                          {doc.available && (
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
                            </span>
                          )}
                          {doc.available ? "Available" : "Unavailable"}
                        </div>
                      </div>

                      <div className="p-5">
                        <h3 className="font-bold text-secondary truncate">{doc.name}</h3>
                        <p className="text-primary text-sm font-medium mt-0.5">{doc.speciality}</p>

                        <div className="flex items-center gap-1 mt-2">
                          <span className="text-yellow-400 text-xs">⭐</span>
                          <span className="text-sm font-bold text-secondary">{doc.averageRating ? doc.averageRating.toFixed(1) : "New"}</span>
                          <span className="text-xs text-text-muted">({doc.totalReviews || 0} reviews)</span>
                        </div>

                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                          <span className="text-xs font-semibold text-text-muted">{doc.experience}</span>
                          <span className="text-sm font-bold text-secondary">₹{doc.fees}<span className="text-xs font-normal text-text-muted">/visit</span></span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Doctors
