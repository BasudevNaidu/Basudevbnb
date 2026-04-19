import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import toast from 'react-hot-toast'
import { FiHome, FiMapPin, FiDollarSign, FiImage, FiCheckCircle, FiArrowRight, FiArrowLeft } from 'react-icons/fi'

const STEPS = ['Basics', 'Details', 'Images & Submit']

const CATEGORIES = ['Beach', 'Mountain', 'City', 'Luxury', 'Countryside', 'Other']
const AMENITIES_LIST = [
  'WiFi', 'Air Conditioning', 'Heating', 'Kitchen', 'Washing Machine',
  'TV', 'Parking', 'Pool', 'Gym', 'Balcony', 'Pet Friendly', 'Workspace'
]

export default function SubmitListingPage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    country: '',
    category: 'Other',
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    amenities: [],
    images: ['', '', ''] // up to 3 image URLs
  })

  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  const toggleAmenity = (a) => {
    set('amenities', form.amenities.includes(a)
      ? form.amenities.filter(x => x !== a)
      : [...form.amenities, a]
    )
  }

  const validateStep = () => {
    if (step === 0) {
      if (!form.title.trim()) { toast.error('Please enter a title'); return false }
      if (!form.description.trim()) { toast.error('Please enter a description'); return false }
      if (!form.price || isNaN(form.price) || Number(form.price) <= 0) { toast.error('Enter a valid price'); return false }
    }
    if (step === 1) {
      if (!form.location.trim()) { toast.error('Please enter a location'); return false }
      if (!form.country.trim()) { toast.error('Please enter a country'); return false }
    }
    return true
  }

  const handleNext = () => {
    if (validateStep()) setStep(s => s + 1)
  }

  const handleSubmit = async () => {
    const images = form.images.filter(u => u.trim())
    if (images.length === 0) { toast.error('Please add at least one image URL'); return }

    setLoading(true)
    try {
      await api.post('/listing-requests', {
        ...form,
        price: Number(form.price),
        maxGuests: Number(form.maxGuests),
        bedrooms: Number(form.bedrooms),
        bathrooms: Number(form.bathrooms),
        images
      })
      setSubmitted(true)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Submission failed')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <style>{`
          @keyframes popIn {
            0%   { opacity:0; transform: scale(0.7); }
            60%  { transform: scale(1.06); }
            100% { opacity:1; transform: scale(1); }
          }
          .pop-in { animation: popIn 0.6s cubic-bezier(0.34,1.56,0.64,1) both; }
          @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
          .float-anim { animation: float 3s ease-in-out infinite; }
        `}</style>
        <div className="text-center pop-in">
          <div className="float-anim text-8xl mb-6">🏠</div>
          <h1 className="text-4xl font-extrabold text-white mb-3">Request Submitted!</h1>
          <p className="text-slate-400 text-lg max-w-md mx-auto mb-8 leading-7">
            Our admins will review your property listing. You'll be able to track the
            status from your dashboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/my-listing-requests"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-fuchsia-600 text-white px-8 py-3 rounded-2xl font-bold hover:opacity-90 transition">
              Track My Request <FiArrowRight size={18} />
            </Link>
            <Link to="/"
              className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-3 rounded-2xl font-medium hover:bg-white/20 transition">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-12">
      <style>{`
        @keyframes fadeSlide {
          from { opacity:0; transform: translateX(30px); }
          to   { opacity:1; transform: translateX(0); }
        }
        .fade-slide { animation: fadeSlide 0.35s ease both; }
        .input-field {
          width:100%; background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1);
          border-radius:12px; padding:12px 16px; color:white; font-size:15px;
          outline:none; transition: border-color 0.2s, box-shadow 0.2s;
        }
        .input-field::placeholder { color: rgba(255,255,255,0.3); }
        .input-field:focus { border-color: #f43f5e; box-shadow: 0 0 0 3px rgba(244,63,94,0.15); }
        .input-field option { background: #1e293b; }
        .amenity-chip {
          border-radius:50px; padding: 6px 16px; font-size:13px; font-weight:500;
          border: 1px solid rgba(255,255,255,0.1); cursor:pointer; transition: all 0.2s;
          color: rgba(255,255,255,0.6); background: rgba(255,255,255,0.04);
        }
        .amenity-chip.active {
          background: linear-gradient(135deg,#f43f5e,#a855f7);
          border-color: transparent; color: white;
        }
        .amenity-chip:hover:not(.active) { border-color: rgba(244,63,94,0.5); color: white; }
      `}</style>

      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 rounded-full px-4 py-2 mb-4">
            <FiHome size={14} className="text-rose-400" />
            <span className="text-rose-400 text-sm font-semibold">List Your Property</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-2">Submit a Listing Request</h1>
          <p className="text-slate-400">Fill in your property details. Our team will review and publish it.</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-0 mb-10">
          {STEPS.map((label, i) => (
            <div key={i} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  i < step ? 'bg-emerald-500 text-white' :
                  i === step ? 'bg-gradient-to-br from-rose-500 to-fuchsia-600 text-white shadow-[0_0_20px_rgba(244,63,94,0.4)]' :
                  'bg-white/10 text-slate-500'
                }`}>
                  {i < step ? <FiCheckCircle size={16} /> : i + 1}
                </div>
                <span className={`text-xs mt-1.5 font-medium ${i === step ? 'text-white' : 'text-slate-500'}`}>{label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`w-16 h-px mb-5 mx-1 transition-colors duration-300 ${i < step ? 'bg-emerald-500' : 'bg-white/10'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step card */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 fade-slide" key={step}>
          {/* ── STEP 0: Basics ─────────────────────── */}
          {step === 0 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-white mb-1">Basic Information</h2>
              <p className="text-slate-400 text-sm mb-4">Tell us what makes your place special.</p>

              <div>
                <label className="text-sm font-medium text-slate-300 block mb-2">Property Title *</label>
                <input className="input-field" placeholder="e.g. Cozy Beach Villa with Sea View"
                  value={form.title} onChange={e => set('title', e.target.value)} />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-300 block mb-2">Description *</label>
                <textarea className="input-field" rows={4}
                  placeholder="Describe your property, its vibe, and what guests will love..."
                  value={form.description} onChange={e => set('description', e.target.value)} />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-300 block mb-2">
                  <FiDollarSign className="inline mb-0.5 mr-1" />Price per Night ($) *
                </label>
                <input type="number" className="input-field" placeholder="e.g. 120"
                  value={form.price} onChange={e => set('price', e.target.value)} />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-300 block mb-2">Category</label>
                <select className="input-field" value={form.category} onChange={e => set('category', e.target.value)}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
          )}

          {/* ── STEP 1: Details ────────────────────── */}
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-white mb-1">Property Details</h2>
              <p className="text-slate-400 text-sm mb-4">Where is it, and what does it offer?</p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-300 block mb-2">
                    <FiMapPin className="inline mb-0.5 mr-1" />Location / City *
                  </label>
                  <input className="input-field" placeholder="e.g. Goa"
                    value={form.location} onChange={e => set('location', e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-300 block mb-2">Country *</label>
                  <input className="input-field" placeholder="e.g. India"
                    value={form.country} onChange={e => set('country', e.target.value)} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Max Guests', field: 'maxGuests', min: 1 },
                  { label: 'Bedrooms', field: 'bedrooms', min: 0 },
                  { label: 'Bathrooms', field: 'bathrooms', min: 0 },
                ].map(({ label, field, min }) => (
                  <div key={field}>
                    <label className="text-sm font-medium text-slate-300 block mb-2">{label}</label>
                    <div className="flex items-center gap-2">
                      <button type="button" onClick={() => set(field, Math.max(min, form[field] - 1))}
                        className="w-8 h-8 rounded-full bg-white/10 text-white hover:bg-white/20 transition font-bold flex items-center justify-center">−</button>
                      <span className="text-white font-bold w-6 text-center">{form[field]}</span>
                      <button type="button" onClick={() => set(field, form[field] + 1)}
                        className="w-8 h-8 rounded-full bg-white/10 text-white hover:bg-white/20 transition font-bold flex items-center justify-center">+</button>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <label className="text-sm font-medium text-slate-300 block mb-3">Amenities</label>
                <div className="flex flex-wrap gap-2">
                  {AMENITIES_LIST.map(a => (
                    <button key={a} type="button"
                      onClick={() => toggleAmenity(a)}
                      className={`amenity-chip ${form.amenities.includes(a) ? 'active' : ''}`}>
                      {a}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 2: Images & Submit ─────────────── */}
          {step === 2 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-white mb-1">Images & Submit</h2>
              <p className="text-slate-400 text-sm mb-4">
                Paste direct image URLs (e.g. from Unsplash). At least one required.
              </p>

              {form.images.map((url, i) => (
                <div key={i}>
                  <label className="text-sm font-medium text-slate-300 block mb-2">
                    <FiImage className="inline mb-0.5 mr-1" />Image URL {i + 1}{i === 0 ? ' *' : ' (optional)'}
                  </label>
                  <input className="input-field" placeholder="https://images.unsplash.com/..."
                    value={url}
                    onChange={e => {
                      const imgs = [...form.images]
                      imgs[i] = e.target.value
                      set('images', imgs)
                    }} />
                  {url && (
                    <img src={url} alt="" className="mt-2 w-full h-28 object-cover rounded-xl opacity-80"
                      onError={e => { e.target.style.display = 'none' }}
                      onLoad={e => { e.target.style.display = 'block' }} />
                  )}
                </div>
              ))}

              {/* Summary */}
              <div className="mt-6 p-4 bg-white/5 rounded-2xl border border-white/10 text-sm text-slate-300 space-y-1">
                <p><span className="text-white font-medium">Title:</span> {form.title}</p>
                <p><span className="text-white font-medium">Location:</span> {form.location}, {form.country}</p>
                <p><span className="text-white font-medium">Price:</span> ${form.price}/night</p>
                <p><span className="text-white font-medium">Category:</span> {form.category}</p>
                <p><span className="text-white font-medium">Guests:</span> {form.maxGuests} · {form.bedrooms} bed · {form.bathrooms} bath</p>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={() => step === 0 ? navigate('/become-a-host') : setStep(s => s - 1)}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition font-medium"
            >
              <FiArrowLeft size={16} /> {step === 0 ? 'Cancel' : 'Back'}
            </button>

            {step < 2 ? (
              <button type="button" onClick={handleNext}
                className="flex items-center gap-2 bg-gradient-to-r from-rose-500 to-fuchsia-600 text-white px-7 py-3 rounded-2xl font-bold hover:opacity-90 transition">
                Next <FiArrowRight size={16} />
              </button>
            ) : (
              <button type="button" onClick={handleSubmit} disabled={loading}
                className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-7 py-3 rounded-2xl font-bold hover:opacity-90 transition disabled:opacity-60">
                {loading ? 'Submitting...' : 'Submit Request ✓'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
