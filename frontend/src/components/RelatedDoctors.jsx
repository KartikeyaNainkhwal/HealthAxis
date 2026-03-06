import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext)
  const navigate = useNavigate()
  const [relDoc, setRelDoc] = useState([])

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      setRelDoc(doctors.filter(doc => doc.speciality === speciality && doc._id !== docId))
    }
  }, [doctors, speciality, docId])

  if (!relDoc.length) return null

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="mb-10">
          <span className="text-xs font-bold tracking-widest text-primary uppercase">Same Speciality</span>
          <h2 className="text-2xl font-bold text-secondary mt-2">More doctors like this</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {relDoc.slice(0, 4).map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07 }}
              onClick={() => { navigate(`/appointment/${item._id}`); window.scrollTo(0, 0) }}
              className="group bg-white border border-border rounded-2xl overflow-hidden cursor-pointer hover:shadow-premium-hover hover:-translate-y-1 transition-all duration-300"
              key={item._id}
            >
              <div className="relative bg-primary-bg aspect-[4/3] overflow-hidden">
                <img
                  loading="lazy"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  src={item.image}
                  alt={item.name}
                />
                <div className={`absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold backdrop-blur-md ${item.available ? "bg-success/85 text-white" : "bg-white/80 text-text-muted"
                  }`}>
                  {item.available && <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping inline-block" />}
                  {item.available ? "Available" : "Unavailable"}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-secondary truncate">{item.name}</h3>
                <p className="text-primary text-sm font-medium mt-0.5">{item.speciality}</p>
                <p className="text-xs text-text-muted mt-2">₹{item.fees}/visit</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RelatedDoctors
