import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'


const COLORS = ['#0D7377', '#16A34A', '#D97706']

const AppointmentsBarChart = ({ data }) => (
  <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-border">
    <h3 className="font-bold text-secondary text-lg mb-6">
      Appointments Overview
    </h3>

    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data}>
        <XAxis dataKey="name" tick={{ fill: '#64748B', fontSize: 13 }} axisLine={false} tickLine={false} />
        <YAxis allowDecimals={false} tick={{ fill: '#64748B', fontSize: 13 }} axisLine={false} tickLine={false} />
        <Tooltip cursor={{ fill: '#F8FAFC' }} contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.1)' }} />
        <Bar dataKey="value" fill="#0D7377" radius={[6, 6, 0, 0]} barSize={40} />
      </BarChart>
    </ResponsiveContainer>
  </div>
)

const SystemPieChart = ({ data }) => (
  <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-border">
    <h3 className="font-bold text-secondary text-lg mb-6">
      System Distribution
    </h3>

    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={70}
          outerRadius={100}
          paddingAngle={5}
          stroke="none"
        >
          {data.map((_, index) => (
            <Cell
              key={index}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.1)' }} />
      </PieChart>
    </ResponsiveContainer>

    <div className="flex justify-center gap-6 mt-4 text-sm font-medium text-slate-600">
      {data.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-full shadow-sm"
            style={{ backgroundColor: COLORS[i] }}
          />
          {item.name}
        </div>
      ))}
    </div>
  </div>
)


const Kpi = ({ title, value, iconPath }) => (
  <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-border flex items-center gap-5 hover:shadow-premium transition-shadow">
    <div className="w-14 h-14 shrink-0 bg-primary/10 rounded-2xl flex items-center justify-center">
      <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
      </svg>
    </div>
    <div>
      <p className="text-sm font-bold uppercase tracking-wider text-slate-400">{title}</p>
      <p className="text-4xl font-bold mt-1 text-secondary tracking-tight">
        {value}
      </p>
    </div>
  </div>
)

const ActivityStatus = ({ item }) => {
  if (item.cancelled)
    return <span className="px-3 py-1 bg-red-50 text-error font-bold text-[10px] uppercase tracking-wider rounded-lg border border-red-200">Cancelled</span>
  if (item.isCompleted)
    return <span className="px-3 py-1 bg-green-50 text-success font-bold text-[10px] uppercase tracking-wider rounded-lg border border-green-200">Completed</span>
  return <span className="px-3 py-1 bg-blue-50 text-blue-600 font-bold text-[10px] uppercase tracking-wider rounded-lg border border-blue-200">Pending</span>
}

const AppointmentRow = ({ item, slotDateFormat, cancelAppointment }) => (
  <div className="flex items-center gap-4 py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors px-2 -mx-2 rounded-xl">
    <img
      src={item?.docData?.image || ''}
      alt=""
      className="w-12 h-12 rounded-full object-cover bg-gray-100"
    />

    <div className="flex-1 min-w-0">
      <p className="font-bold text-secondary truncate">{item?.docData?.name || 'Unknown Doctor'}</p>
      <p className="text-xs text-slate-500 font-medium mt-0.5">
        {slotDateFormat(item.slotDate)}
      </p>
    </div>

    {!item.isCompleted && !item.cancelled && cancelAppointment && (
      <button
        onClick={() => cancelAppointment(item._id)}
        className="text-xs font-bold text-error bg-red-50 px-3 py-1.5 rounded-lg hover:bg-error hover:text-white transition-colors border border-red-100 shrink-0"
      >
        Cancel
      </button>
    )}
  </div>
)


const Dashboard = () => {
  const { aToken, getDashData, dashData, cancelAppointment } =
    useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (aToken) getDashData()
  }, [aToken])

  if (!dashData) return null

  const appointmentStats = [
    {
      name: 'Pending',
      value: dashData.latestAppointments.filter(
        a => !a.isCompleted && !a.cancelled
      ).length,
    },
    {
      name: 'Completed',
      value: dashData.latestAppointments.filter(
        a => a.isCompleted
      ).length,
    },
    {
      name: 'Cancelled',
      value: dashData.latestAppointments.filter(
        a => a.cancelled
      ).length,
    },
  ]

  const systemStats = [
    { name: 'Doctors', value: dashData.doctors },
    { name: 'Patients', value: dashData.patients },
    { name: 'Appointments', value: dashData.appointments },
  ]

  const pending = dashData.latestAppointments.filter(
    a => !a.cancelled && !a.isCompleted
  )
  const completed = dashData.latestAppointments.filter(
    a => a.isCompleted
  )

  return (
    <div className="p-8 md:p-10 bg-background min-h-[calc(100vh-73px)] space-y-8 w-full">
      <div>
        <h1 className="text-3xl font-bold text-secondary tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-slate-500 font-medium mt-2">
          Real-time metrics and activity for your hospital application.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Kpi title="Total Doctors" value={dashData.doctors} iconPath="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        <Kpi title="Appointments" value={dashData.appointments} iconPath="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        <Kpi title="Patients" value={dashData.patients} iconPath="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AppointmentsBarChart data={appointmentStats} />
        <SystemPieChart data={systemStats} />
      </div>

      <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-border">
        <h2 className="font-bold text-secondary text-lg mb-6">
          Recent Activity Timeline
        </h2>

        <div className="space-y-6">
          {dashData.latestAppointments.slice(0, 4).map(item => (
            <div
              key={item._id}
              className="flex items-start gap-5 relative pl-4"
            >
              <div className="absolute left-0 top-2 bottom-[-1.5rem] w-px bg-border last:bg-transparent"></div>
              <div className="absolute left-[-4px] top-2 w-[9px] h-[9px] rounded-full bg-primary shadow-sm border-2 border-white z-10"></div>

              <img
                src={item?.docData?.image || ''}
                alt=""
                className="w-12 h-12 rounded-full object-cover bg-gray-50 border border-gray-100 z-10"
              />

              <div className="flex-1 pt-1 min-w-0">
                <p className="font-medium text-secondary truncate">
                  Appointment booked with{' '}
                  <span className="font-bold">
                    {item?.docData?.name || 'Unknown'}
                  </span>
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-2">
                  <p className="text-xs text-slate-500 font-medium">
                    {slotDateFormat(item.slotDate)}
                  </p>
                  <ActivityStatus item={item} />
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-10">
        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-border">
          <h3 className="font-bold text-secondary text-lg mb-4">
            Pending Appointments
          </h3>
          <div className="divide-y divide-gray-50">
            {pending.slice(0, 4).map(item => (
              <AppointmentRow
                key={item._id}
                item={item}
                slotDateFormat={slotDateFormat}
                cancelAppointment={cancelAppointment}
              />
            ))}
            {pending.length === 0 && <p className="text-slate-500 text-sm py-4">No pending appointments.</p>}
          </div>
        </div>

        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-border">
          <h3 className="font-bold text-secondary text-lg mb-4">
            Completed Appointments
          </h3>
          <div className="divide-y divide-gray-50">
            {completed.slice(0, 4).map(item => (
              <AppointmentRow
                key={item._id}
                item={item}
                slotDateFormat={slotDateFormat}
              />
            ))}
            {completed.length === 0 && <p className="text-slate-500 text-sm py-4">No completed appointments.</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
