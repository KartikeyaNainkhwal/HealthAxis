import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AdminContext } from '../../context/AdminContext'

const AddDoctor = () => {

  const [docImg, setDocImg] = useState(null)
  const [loading, setLoading] = useState(false)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [speciality, setSpeciality] = useState('General physician')
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')

  const { backendUrl, aToken } = useContext(AdminContext)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload a valid image')
      return
    }

    setDocImg(file)
  }

  const resetForm = () => {
    setDocImg(null)
    setName('')
    setEmail('')
    setPassword('')
    setExperience('1 Year')
    setFees('')
    setAbout('')
    setSpeciality('General physician')
    setDegree('')
    setAddress1('')
    setAddress2('')
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (!docImg) return toast.error('Doctor image is required')

    try {
      setLoading(true)

      const formData = new FormData()
      formData.append('image', docImg)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('experience', experience)
      formData.append('fees', Number(fees))
      formData.append('about', about)
      formData.append('speciality', speciality)
      formData.append('degree', degree)
      formData.append(
        'address',
        JSON.stringify({ line1: address1, line2: address2 })
      )

      const { data } = await axios.post(
        `${backendUrl}/api/admin/add-doctor`,
        formData,
        { headers: { atoken: aToken } }
      )

      if (data.success) {
        toast.success(data.message)
        resetForm()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    } finally {
      setLoading(false)
    }
  }


  return (
    <form
      onSubmit={onSubmitHandler}
      className="p-8 md:p-10 bg-background min-h-[calc(100vh-73px)] w-full"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary tracking-tight">
          Add New Doctor
        </h1>
        <p className="text-slate-500 font-medium mt-2">
          Enter details to onboard a new doctor to the platform
        </p>
      </div>

      <div className="bg-white rounded-[2rem] shadow-premium border border-border p-10 max-w-5xl">
        <div className="flex items-center gap-6 mb-10 pb-8 border-b border-gray-100">
          <label htmlFor="doc-img" className="relative cursor-pointer group">
            <img
              src={
                docImg
                  ? URL.createObjectURL(docImg)
                  : assets.upload_area
              }
              alt=""
              className="w-24 h-24 rounded-full object-cover border-2 border-dashed border-primary/50 group-hover:border-primary transition-colors bg-background"
            />
            <span className="absolute bottom-0 right-0 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm group-hover:scale-105 transition-transform">
              Edit
            </span>
          </label>
          <input
            type="file"
            id="doc-img"
            hidden
            onChange={handleImageChange}
          />
          <div>
            <p className="text-lg font-bold text-secondary">Profile Picture</p>
            <p className="text-sm font-medium text-slate-500 mt-1">
              Upload a professional headshot. Recommended size: 500x500px.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 text-secondary">
          <div className="space-y-6">
            <Input label="Doctor Name" value={name} setValue={setName} placeholder="e.g. Dr. Richard James" />
            <Input label="Email Address" type="email" value={email} setValue={setEmail} placeholder="richard.james@example.com" />
            <Input
              label="Password"
              type="password"
              value={password}
              setValue={setPassword}
              placeholder="••••••••"
            />

            <Select
              label="Years of Experience"
              value={experience}
              setValue={setExperience}
              options={[
                '1 Year', '2 Years', '3 Years', '4 Years',
                '5 Years', '6 Years', '7 Years', '8 Years',
                '9 Years', '10+ Years', '15+ Years', '20+ Years'
              ]}
            />

            <Input
              label="Consultation Fees"
              type="number"
              value={fees}
              setValue={setFees}
              placeholder="e.g. 50"
            />
          </div>

          <div className="space-y-6">
            <Select
              label="Speciality"
              value={speciality}
              setValue={setSpeciality}
              options={[
                'General physician',
                'Gynecologist',
                'Dermatologist',
                'Pediatricians',
                'Neurologist',
                'Gastroenterologist',
              ]}
            />

            <Input label="Education / Degree" value={degree} setValue={setDegree} placeholder="e.g. MBBS, MD" />

            <div className="space-y-3">
              <label className="text-sm font-semibold text-secondary block">Clinic Address</label>
              <input
                className="w-full border border-border rounded-xl px-4 py-3 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none bg-background focus:bg-white text-text-main font-medium placeholder-slate-400"
                placeholder="Address line 1 (Street, Building)"
                value={address1}
                onChange={(e) => setAddress1(e.target.value)}
                required
              />
              <input
                className="w-full border border-border rounded-xl px-4 py-3 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none bg-background focus:bg-white text-text-main font-medium placeholder-slate-400"
                placeholder="Address line 2 (City, Zip Code, State)"
                value={address2}
                onChange={(e) => setAddress2(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-gray-100">
          <label className="text-sm font-semibold text-secondary block mb-3">About Doctor</label>
          <textarea
            rows={5}
            className="w-full border border-border rounded-2xl px-5 py-4 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none resize-none bg-background focus:bg-white text-text-main font-medium placeholder-slate-400"
            placeholder="Write a comprehensive description about the doctor's background, expertise, and approach to patient care..."
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
        </div>

        <div className="mt-10 flex justify-end">
          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className={`px-10 py-4 rounded-xl text-white font-bold transition-all shadow-md
                ${loading
                ? 'bg-gray-400 cursor-not-allowed shadow-none'
                : 'bg-primary hover:bg-primary-dark hover:shadow-primary/30 active:scale-[0.98]'
              }`}
          >
            {loading ? 'Adding Doctor...' : 'Add Doctor to Platform'}
          </button>
        </div>
      </div>
    </form>
  )
}


const Input = ({ label, value, setValue, type = 'text', placeholder }) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-semibold text-secondary">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="w-full border border-border rounded-xl px-4 py-3 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none bg-background focus:bg-white text-text-main font-medium placeholder-slate-400"
      required
      placeholder={placeholder}
    />
  </div>
)

const Select = ({ label, value, setValue, options }) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-semibold text-secondary">{label}</label>
    <div className="relative">
      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full border border-border rounded-xl px-4 py-3 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none bg-background focus:bg-white text-text-main font-medium appearance-none"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
      </div>
    </div>
  </div>
)

export default AddDoctor
