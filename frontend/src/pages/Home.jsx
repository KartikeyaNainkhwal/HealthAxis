import React from 'react'
import HeroSection from '../components/HeroSection'
import QuickActions from '../components/QuickActions'
import HospitalAbout from '../components/HospitalAbout'
import SpecialitiesSection from '../components/SpecialitiesSection'
import TopDoctors from '../components/TopDoctors'
import EmergencyStrip from '../components/EmergencyStrip'

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Quick Action Cards */}
      <QuickActions />

      {/* 3. About split + stats */}
      <HospitalAbout />

      {/* 4. Specialities photo grid */}
      <SpecialitiesSection />

      {/* 5. Top Doctors */}
      <TopDoctors />

      {/* 6. Emergency CTA */}
      <EmergencyStrip />
    </div>
  )
}

export default Home