import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'
import { assets } from '../../assets/assets'

const KpiCard = ({ title, value, subtitle, iconPath, trend, colorClass }) => (
  <div className="bg-white rounded-[1.5rem] p-6 shadow-[0px_4px_24px_rgba(0,0,0,0.02)] border border-[#f3f4f6] flex flex-col transition-all duration-300">
    <div className="flex justify-between items-start mb-4">
      <div className={`w-10 h-10 rounded-[12px] flex items-center justify-center ${colorClass}`}>
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
        </svg>
      </div>
      {trend && (
        <span className="flex items-center gap-1 text-[10px] font-bold text-success bg-green-50 px-2 py-1 rounded-full uppercase tracking-wider">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" /></svg>
          {trend}
        </span>
      )}
    </div>
    <div>
      <p className="text-[11px] font-bold uppercase tracking-wider text-[#94a3b8]">{title}</p>
      <div className="flex items-baseline gap-2 mt-1">
        <p className="text-3xl font-bold text-[#1e293b] tracking-tight">{value}</p>
      </div>
      {subtitle && <p className="text-[11px] text-[#64748b] mt-2 font-medium">{subtitle}</p>}
    </div>
  </div>
)

const ActivityBadge = ({ item }) => {
  if (item.cancelled)
    return <span className="px-3 py-1 bg-red-50 text-error font-bold text-[9px] uppercase tracking-wider rounded-md border border-red-100 inline-block">Cancelled</span>
  if (item.isCompleted)
    return <span className="px-3 py-1 bg-[#f0fdf4] text-[#16a34a] font-bold text-[9px] uppercase tracking-wider rounded-md border border-[#bbf7d0] inline-block">Completed</span>
  return <span className="px-3 py-1 bg-blue-50 text-blue-600 font-bold text-[9px] uppercase tracking-wider rounded-md border border-blue-100 inline-block">Pending</span>
}

const CustomTooltip = ({ active, payload, label, currency }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1e293b] text-white px-4 py-2 rounded-xl shadow-xl text-xs">
        <p className="font-bold text-[#cbd5e1] mb-1">{label}</p>
        <p className="font-bold text-base text-white">
          {currency}{payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData } = useContext(DoctorContext)
  const { slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getDashData()
    }
  }, [dToken, getDashData])

  return dashData && (
    <div className='p-6 md:p-8 bg-[#f8fafc] min-h-screen space-y-8 w-full -mt-[73px] pt-[100px]'>

      <div className="mb-8">
        <h1 className="text-[26px] font-extrabold text-[#0f172a] tracking-tight">Analytics Dashboard</h1>
        <p className="text-[#64748b] text-sm mt-1 font-medium">Track your earnings, appointments, and patient metrics.</p>
      </div>

      {/* KPI GRID */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        <KpiCard
          title="Total Earnings"
          value={`${currency || '₹'}${dashData.earnings}`}
          subtitle="From completed & paid appointments"
          iconPath="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          colorClass="bg-[#eff6ff] text-[#3b82f6] border border-[#dbeafe]"
          trend="UP"
        />
        <KpiCard
          title="Pending Cash"
          value={`${currency || '₹'}${dashData.pendingPayments || 0}`}
          subtitle="Appointments awaiting fee collection"
          iconPath="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          colorClass="bg-[#fffbeb] text-[#d97706] border border-[#fef3c7]"
        />
        <KpiCard
          title="Total Patients"
          value={dashData.patients}
          subtitle="Unique patients treated"
          iconPath="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          colorClass="bg-[#f0f9ff] text-[#0ea5e9] border border-[#e0f2fe]"
        />
        <KpiCard
          title="Appointments"
          value={dashData.appointments}
          subtitle={`${dashData.completedAppointments || 0} Completed, ${dashData.cancelledAppointments || 0} Cancelled`}
          iconPath="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          colorClass="bg-[#faf5ff] text-[#a855f7] border border-[#f3e8ff]"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CHART SECTION */}
        <div className="lg:col-span-2 bg-white rounded-[1.5rem] p-6 shadow-[0px_4px_24px_rgba(0,0,0,0.02)] border border-[#f3f4f6]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-[17px] font-bold text-[#0f172a]">Revenue Trend</h2>
              <p className="text-[13px] font-medium text-[#64748b] mt-1">Daily earnings over the last 7 days</p>
            </div>
            <div className="p-2.5 bg-[#eef2ff] rounded-xl border border-[#e0e7ff]">
              <svg className="w-4 h-4 text-[#4f46e5]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            </div>
          </div>
          <div className="h-[280px] w-full">
            {dashData.revenueTrend && dashData.revenueTrend.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dashData.revenueTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} tickFormatter={(value) => `${currency || '₹'}${value}`} />
                  <Tooltip content={<CustomTooltip currency={currency || '₹'} />} cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }} />
                  <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
                <div className="h-full flex items-center justify-center text-slate-400 font-medium text-sm">Loading trend data...</div>
            )}
          </div>
        </div>

        {/* LATEST APPOINTMENTS WIDGET */}
        <div className="bg-white rounded-[1.5rem] p-6 shadow-[0px_4px_24px_rgba(0,0,0,0.02)] border border-[#f3f4f6] flex flex-col h-[400px] lg:h-[400px]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[17px] font-bold text-[#0f172a] flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#f8fafc] border border-[#e2e8f0] flex items-center justify-center">
                <svg className="w-4 h-4 text-[#475569]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              Recent Activity
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto pr-1 space-y-2 mt-2">
            {dashData.latestAppointments.length > 0 ? (
              dashData.latestAppointments.map((item, index) => (
                <div key={index} className="group flex items-center gap-3 p-2.5 rounded-[14px] hover:bg-[#f8fafc] transition-colors border border-transparent">
                  <div className="w-10 h-10 rounded-full bg-[#3b82f6] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    {item.userData.name.substring(0,2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0 leading-tight">
                    <p className="text-[13px] font-bold text-[#0f172a] truncate">{item.userData.name}</p>
                    <p className="text-[11px] font-medium text-[#64748b] mt-0.5">{slotDateFormat(item.slotDate)}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <ActivityBadge item={item} />
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center py-8">
                <div className="w-10 h-10 bg-[#f1f5f9] rounded-full flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-[#94a3b8]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
                </div>
                <p className="text-sm font-bold text-[#94a3b8]">No recent activity</p>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  )
}

export default DoctorDashboard
