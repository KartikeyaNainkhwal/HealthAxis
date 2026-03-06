import React, { useState } from 'react'

const EditDoctorModal = ({ doctor, onClose, onSave }) => {
  const [form, setForm] = useState({
    about: doctor.about,
    fees: doctor.fees,
    available: doctor.available,
    address: {
      line1: doctor.address.line1,
      line2: doctor.address.line2,
    },
  })

  const handleChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-xl rounded-xl p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            Edit Doctor Profile
          </h2>
          <button onClick={onClose}>✕</button>
        </div>

        {/* Doctor Info */}
        <div className="flex gap-4 items-center mb-6">
          <img
            src={doctor.image}
            alt=""
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <p className="font-medium">{doctor.name}</p>
            <p className="text-sm text-gray-500">
              {doctor.degree} • {doctor.speciality}
            </p>
          </div>
        </div>

        {/* About */}
        <label className="text-sm font-medium">About</label>
        <textarea
          value={form.about}
          onChange={e => handleChange('about', e.target.value)}
          rows={4}
          className="w-full border rounded p-2 mt-1"
        />

        {/* Fees */}
        <label className="text-sm font-medium mt-4 block">
          Consultation Fees
        </label>
        <input
          type="number"
          value={form.fees}
          onChange={e => handleChange('fees', e.target.value)}
          className="w-full border rounded p-2 mt-1"
        />

        {/* Address */}
        <label className="text-sm font-medium mt-4 block">
          Address
        </label>
        <input
          type="text"
          value={form.address.line1}
          onChange={e =>
            setForm(prev => ({
              ...prev,
              address: { ...prev.address, line1: e.target.value },
            }))
          }
          className="w-full border rounded p-2 mt-1"
          placeholder="Address line 1"
        />
        <input
          type="text"
          value={form.address.line2}
          onChange={e =>
            setForm(prev => ({
              ...prev,
              address: { ...prev.address, line2: e.target.value },
            }))
          }
          className="w-full border rounded p-2 mt-2"
          placeholder="Address line 2"
        />

        {/* Availability */}
        <div className="flex items-center gap-2 mt-4">
          <input
            type="checkbox"
            checked={form.available}
            onChange={() =>
              handleChange('available', !form.available)
            }
          />
          <span className="text-sm">Available</span>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border rounded"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSave(doctor._id, form)
              onClose()
            }}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditDoctorModal
