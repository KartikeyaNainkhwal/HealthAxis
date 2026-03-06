import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const EMPTY_MED = { name: '', dosage: '', frequency: '', duration: '', instructions: '' }

const PrescriptionModal = ({ appointment, onClose, backendUrl, dToken }) => {
  const [medicines, setMedicines] = useState([{ ...EMPTY_MED }])
  const [generalInstructions, setGeneralInstructions] = useState('')
  const [followUpDate, setFollowUpDate] = useState('')
  const [saving, setSaving] = useState(false)

  const addMed = () => setMedicines(m => [...m, { ...EMPTY_MED }])
  const removeMed = (i) => setMedicines(m => m.filter((_, idx) => idx !== i))
  const updateMed = (i, field, val) => setMedicines(m => m.map((med, idx) => idx === i ? { ...med, [field]: val } : med))

  const handleSave = async () => {
    if (medicines.some(m => !m.name || !m.dosage || !m.frequency || !m.duration)) {
      toast.error('Please fill name, dosage, frequency, and duration for all medicines.')
      return
    }
    setSaving(true)
    try {
      const { data } = await axios.post(backendUrl + '/api/prescription/save', {
        appointmentId: appointment._id,
        medicines,
        generalInstructions,
        followUpDate,
      }, { headers: { Authorization: `Bearer ${dToken}` } })

      if (data.success) {
        toast.success('Prescription saved successfully! 🎉')
        onClose(true)
      } else {
        toast.error(data.message)
      }
    } catch (e) {
      toast.error(e.response?.data?.message || 'Failed to save prescription')
    }
    setSaving(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0D7377] to-[#14A8AD] px-8 py-5 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-white font-bold text-xl tracking-tight">Write Prescription</h2>
            <p className="text-teal-100 text-sm mt-0.5">Patient: <span className="font-semibold">{appointment.userData?.name}</span></p>
          </div>
          <button onClick={() => onClose(false)} className="text-white/70 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 px-8 py-6 space-y-6">
          {/* Medicines table */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-800 text-sm uppercase tracking-widest">Medicines</h3>
              <button onClick={addMed} className="flex items-center gap-1.5 text-xs font-bold text-[#0D7377] bg-teal-50 px-3 py-1.5 rounded-lg hover:bg-teal-100 transition-colors border border-teal-200">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                Add Medicine
              </button>
            </div>

            <div className="space-y-3">
              {medicines.map((med, i) => (
                <div key={i} className="bg-gray-50 rounded-2xl p-4 border border-gray-200 relative">
                  {medicines.length > 1 && (
                    <button onClick={() => removeMed(i)} className="absolute top-3 right-3 text-red-400 hover:text-red-600">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  )}
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Medicine {i + 1}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="col-span-2 sm:col-span-1">
                      <label className="text-[11px] font-semibold text-gray-500 block mb-1">Drug / Medicine Name *</label>
                      <input
                        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#0D7377]/30 focus:border-[#0D7377]"
                        placeholder="e.g. Amoxicillin"
                        value={med.name}
                        onChange={e => updateMed(i, 'name', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-gray-500 block mb-1">Dosage *</label>
                      <input
                        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#0D7377]/30 focus:border-[#0D7377]"
                        placeholder="e.g. 500mg"
                        value={med.dosage}
                        onChange={e => updateMed(i, 'dosage', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-gray-500 block mb-1">Frequency *</label>
                      <select
                        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#0D7377]/30 focus:border-[#0D7377]"
                        value={med.frequency}
                        onChange={e => updateMed(i, 'frequency', e.target.value)}
                      >
                        <option value="">Select</option>
                        <option>Once daily</option>
                        <option>Twice daily</option>
                        <option>Thrice daily</option>
                        <option>Every 4 hours</option>
                        <option>Every 6 hours</option>
                        <option>As needed (SOS)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-gray-500 block mb-1">Duration *</label>
                      <input
                        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#0D7377]/30 focus:border-[#0D7377]"
                        placeholder="e.g. 7 days"
                        value={med.duration}
                        onChange={e => updateMed(i, 'duration', e.target.value)}
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-[11px] font-semibold text-gray-500 block mb-1">Special Instructions</label>
                      <input
                        className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#0D7377]/30 focus:border-[#0D7377]"
                        placeholder="e.g. After meals, with warm water"
                        value={med.instructions}
                        onChange={e => updateMed(i, 'instructions', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* General Instructions */}
          <div>
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest block mb-2">General Instructions & Advice</label>
            <textarea
              rows={3}
              className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-800 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0D7377]/30 focus:border-[#0D7377] resize-none"
              placeholder="e.g. Drink plenty of fluids. Avoid alcohol. Rest for 3 days..."
              value={generalInstructions}
              onChange={e => setGeneralInstructions(e.target.value)}
            />
          </div>

          {/* Follow-up */}
          <div>
            <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest block mb-2">Follow-up Date (Optional)</label>
            <input
              type="date"
              className="border border-gray-200 rounded-2xl px-4 py-2.5 text-sm text-gray-800 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0D7377]/30 focus:border-[#0D7377]"
              value={followUpDate}
              onChange={e => setFollowUpDate(e.target.value)}
            />
          </div>
        </div>

        {/* Footer actions */}
        <div className="border-t border-gray-100 px-8 py-4 flex items-center justify-between bg-gray-50/80 shrink-0">
          <p className="text-xs text-gray-400 font-medium">A signed PDF will be generated automatically.</p>
          <div className="flex gap-3">
            <button onClick={() => onClose(false)} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-600 border border-gray-200 hover:bg-gray-100 transition-colors">
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-[#0D7377] hover:bg-[#0A5E61] transition-colors disabled:opacity-70 flex items-center gap-2"
            >
              {saving ? 'Saving...' : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Save Prescription
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment, backendUrl } = useContext(DoctorContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)
  const [prescriptionTarget, setPrescriptionTarget] = useState(null)

  useEffect(() => {
    if (dToken) getAppointments()
  }, [dToken])

  const handleModalClose = (refetch) => {
    setPrescriptionTarget(null)
    if (refetch) getAppointments()
  }

  return (
    <div className='p-8 md:p-10 bg-background min-h-[calc(100vh-73px)] w-full'>
      {prescriptionTarget && (
        <PrescriptionModal
          appointment={prescriptionTarget}
          onClose={handleModalClose}
          backendUrl={backendUrl}
          dToken={dToken}
        />
      )}

      <div className="mb-8">
        <h1 className='text-3xl font-bold text-secondary tracking-tight'>Appointments Details</h1>
        <p className="text-slate-500 font-medium mt-2">Manage your upcoming and past bookings</p>
      </div>

      <div className='bg-white border border-border-light rounded-[2rem] shadow-sm overflow-hidden'>
        <div className='hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1.5fr] grid-flow-col py-5 px-8 border-b border-border-light bg-gray-50/50 text-xs font-bold text-slate-400 uppercase tracking-wider'>
          <p>#</p><p>Patient</p><p>Payment</p><p>Age</p><p>Date & Time</p><p>Fees</p><p>Action</p>
        </div>
        <div className="max-h-[70vh] overflow-y-auto">
          {appointments.length === 0 ? (
            <div className="p-10 text-center text-slate-500 font-medium">No appointments found.</div>
          ) : (
            appointments.map((item, index) => (
              <div className='flex flex-wrap justify-between max-sm:gap-4 max-sm:p-6 sm:grid sm:grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1.5fr] items-center text-secondary font-medium py-4 px-8 border-b border-gray-100 hover:bg-primary/5 transition-colors' key={index}>
                <p className='max-sm:hidden text-slate-400'>{index + 1}</p>

                <div className='flex items-center gap-3 w-full sm:w-auto'>
                  <img src={item?.userData?.image || ''} className='w-10 h-10 rounded-full object-cover shadow-sm' alt="" />
                  <p className="font-bold">{item?.userData?.name || 'Unknown Patient'}</p>
                </div>

                <div>
                  <p className={`text-[10px] font-bold uppercase inline px-3 py-1 rounded-lg border tracking-wider ${item.payment ? 'bg-primary/5 text-primary border-primary/20' : 'bg-gray-50 text-slate-500 border-gray-200'}`}>
                    {item.payment ? 'Online' : 'Cash'}
                  </p>
                </div>

                <p className='max-sm:hidden text-slate-600'>{calculateAge(item?.userData?.dob)}</p>

                <div className="text-sm w-full sm:w-auto mt-2 sm:mt-0">
                  <p className="font-bold">{slotDateFormat(item.slotDate)}</p>
                  <p className="text-slate-500">{item.slotTime}</p>
                </div>

                <p className="font-bold w-full sm:w-auto mt-2 sm:mt-0">{currency}{item.amount}</p>

                <div className="mt-2 sm:mt-0 w-full sm:w-auto flex items-center gap-2">
                  {item.cancelled ? (
                    <div className="flex flex-col gap-1.5 items-start">
                      <p className='px-3 py-1 bg-red-50 text-error font-bold text-[10px] uppercase tracking-wider rounded-lg border border-red-200 inline-block'>Cancelled</p>
                      {item.reportUrl && (
                        <a
                          href={item.reportUrl}
                          target="_blank"
                          rel="noreferrer"
                          title={`View: ${item.reportName || 'Patient Report'}`}
                          className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-lg border bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 transition-colors"
                        >
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                          View Reports
                        </a>
                      )}
                    </div>
                  ) : item.isCompleted ? (
                    <div className="flex flex-col gap-1.5 items-start">
                      <p className='px-3 py-1 bg-green-50 text-success font-bold text-[10px] uppercase tracking-wider rounded-lg border border-green-200 inline-block'>Completed</p>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <button
                          onClick={() => setPrescriptionTarget(item)}
                          title={item.prescription ? "Update Prescription" : "Write Prescription"}
                          className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-lg border transition-colors ${item.prescription ? 'bg-teal-50 text-[#0D7377] border-teal-200 hover:bg-teal-100' : 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100'}`}
                        >
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                          {item.prescription ? 'Edit Rx' : 'Write Rx'}
                        </button>
                        {item.reportUrl && (
                          <a
                            href={item.reportUrl}
                            target="_blank"
                            rel="noreferrer"
                            title={`View: ${item.reportName || 'Patient Report'}`}
                            className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-lg border bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 transition-colors"
                          >
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                            Reports
                          </a>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className='flex flex-col gap-1.5 items-start'>
                      <div className='flex items-center gap-2'>
                        <button onClick={() => cancelAppointment(item._id)} className='w-9 h-9 flex items-center justify-center rounded-xl bg-red-50 text-error hover:bg-error hover:text-white transition-colors border border-red-100 shadow-sm'>
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                        <button onClick={() => completeAppointment(item._id)} className='w-9 h-9 flex items-center justify-center rounded-xl bg-green-50 text-success hover:bg-success hover:text-white transition-colors border border-green-100 shadow-sm'>
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                        </button>
                      </div>
                      {item.reportUrl && (
                        <a
                          href={item.reportUrl}
                          target="_blank"
                          rel="noreferrer"
                          title={`View: ${item.reportName || 'Patient Report'}`}
                          className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-lg border bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 transition-colors"
                        >
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.547 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                          View Reports
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default DoctorAppointments