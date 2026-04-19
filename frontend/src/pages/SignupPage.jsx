import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiCheck, FiX } from 'react-icons/fi'
import logo from '../assets/logo.png'

const PROPERTY_IMAGES = [
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600',
  'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=600',
  'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=600',
  'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600',
]

const PERKS = [
  { icon: '🔐', text: 'Secure & encrypted account' },
  { icon: '🌍', text: 'Browse properties worldwide' },
  { icon: '🏆', text: 'Exclusive member deals' },
  { icon: '💬', text: '24/7 guest support' },
]

function getStrength(pw) {
  if (!pw) return null
  const strong = pw.match(/[A-Z]/) && pw.match(/[0-9]/) && pw.match(/[^a-zA-Z0-9]/) && pw.length >= 8
  const medium = pw.length >= 6 && (pw.match(/[A-Z]/) || pw.match(/[0-9]/))
  if (strong) return { label: 'Strong', color: 'bg-emerald-500', pct: '100%', text: 'text-emerald-600' }
  if (medium) return { label: 'Medium', color: 'bg-amber-500',   pct: '60%',  text: 'text-amber-600' }
  return        { label: 'Weak',   color: 'bg-red-500',     pct: '25%',  text: 'text-red-500' }
}

function PasswordRule({ met, text }) {
  return (
    <div className={`flex items-center gap-1.5 text-xs transition-colors duration-300 ${met ? 'text-emerald-600' : 'text-gray-400'}`}>
      {met ? <FiCheck size={11} /> : <FiX size={11} />}
      {text}
    </div>
  )
}

export default function SignupPage() {
  const { signup, user } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [showPwd, setShowPwd] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [activeImg, setActiveImg] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [step, setStep] = useState(1) // 1 = personal info, 2 = password

  useEffect(() => { setMounted(true) }, [])
  useEffect(() => {
    const t = setInterval(() => setActiveImg(i => (i + 1) % PROPERTY_IMAGES.length), 4000)
    return () => clearInterval(t)
  }, [])
  useEffect(() => { if (user) navigate('/') }, [user, navigate])

  const strength = getStrength(form.password)

  const validate = () => {
    const e = {}
    if (!form.name.trim())     e.name = 'Full name is required'
    if (!form.email.trim())    e.email = 'Email is required'
    if (!form.password)        e.password = 'Password is required'
    if (form.password.length < 6) e.password = 'Minimum 6 characters'
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleNext = () => {
    const e = {}
    if (!form.name.trim())  e.name = 'Full name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    setErrors(e)
    if (Object.keys(e).length === 0) setStep(2)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    try {
      await signup(form.name, form.email, form.password)
      toast.success('Welcome to Basudevbnb 🎉')
      navigate('/')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  const pwRules = [
    { met: form.password.length >= 6,          text: 'At least 6 characters' },
    { met: /[A-Z]/.test(form.password),        text: 'One uppercase letter' },
    { met: /[0-9]/.test(form.password),        text: 'One number' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-10">
      <style>{`
        @keyframes fadeUp    { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeLeft  { from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }
        @keyframes imgIn     { from{opacity:0;transform:scale(1.06)} to{opacity:1;transform:scale(1)} }
        @keyframes floatY    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes spin      { to{transform:rotate(360deg)} }
        @keyframes blobA     { 0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%;transform:scale(1)}
                               50%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%;transform:scale(1.06) translate(8px,-8px)} }
        @keyframes blobB     { 0%,100%{border-radius:40% 60% 60% 40%/40% 40% 60% 60%;transform:scale(1)}
                               50%{border-radius:60% 40% 40% 60%/60% 60% 40% 40%;transform:scale(1.04) translate(-8px,10px)} }
        @keyframes slideAnim { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:translateX(0)} }
        @keyframes barGrow   { from{width:0} }
        @keyframes logoGlow  { 0%,100%{box-shadow:0 0 30px rgba(244,63,94,0.3),0 0 60px rgba(139,92,246,0.15)} 50%{box-shadow:0 0 50px rgba(244,63,94,0.5),0 0 100px rgba(139,92,246,0.3)} }
        @keyframes shimmerBorder { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
        .logo-hero           { animation: floatY 5s ease-in-out infinite, logoGlow 3s ease-in-out infinite; }
        .input-focus:focus   { box-shadow:0 0 0 3px rgba(244,63,94,0.15); border-color:#f43f5e !important; }
        .btn-glow:hover      { box-shadow:0 8px 30px rgba(244,63,94,0.35); }
        .perk-card           { animation: floatY 4.5s ease-in-out infinite; }
        .perk-card:nth-child(2){ animation-delay:.4s; }
        .perk-card:nth-child(3){ animation-delay:.8s; }
        .perk-card:nth-child(4){ animation-delay:1.2s; }
        .step-slide          { animation: slideAnim 0.4s ease both; }
      `}</style>

      <div className={`w-full max-w-6xl bg-white rounded-[32px] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        style={{ transition: 'opacity 0.6s ease, transform 0.6s ease' }}>

        {/* ── LEFT PANEL ── */}
        <div className="relative hidden lg:block overflow-hidden">
          {PROPERTY_IMAGES.map((src, i) => (
            <img key={i} src={src} alt=""
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1200 ${i === activeImg ? 'opacity-100' : 'opacity-0'}`} />
          ))}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-700/80 via-fuchsia-600/65 to-rose-700/75" />

          {/* Morphing blobs */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/10 rounded-full"
            style={{ animation: 'blobA 9s ease-in-out infinite' }} />
          <div className="absolute -bottom-16 -right-20 w-60 h-60 bg-white/10 rounded-full"
            style={{ animation: 'blobB 10s ease-in-out infinite' }} />

          <div className="relative z-10 h-full flex flex-col justify-between p-10 min-h-[680px]">
            {/* ── LOGO HERO ── */}
            <div className="flex flex-col items-center mb-2" style={{ animation: 'fadeLeft 0.6s ease 0.2s both' }}>
              <div className="logo-hero rounded-[24px] p-5 mb-3"
                style={{
                  background: 'linear-gradient(135deg,rgba(255,255,255,0.22) 0%,rgba(255,255,255,0.1) 100%)',
                  border: '2px solid rgba(255,255,255,0.35)',
                  backdropFilter: 'blur(12px)'
                }}>
                <img src={logo} alt="Basudevbnb"
                  className="w-56 h-auto object-contain"
                  style={{ filter: 'drop-shadow(0 4px 20px rgba(255,255,255,0.4)) drop-shadow(0 0 40px rgba(244,63,94,0.5))' }}
                />
              </div>
              <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1 border border-white/25">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                <span className="text-white text-[10px] font-bold tracking-widest uppercase">Premium Platform</span>
              </div>
            </div>

            {/* Copy */}
            <div>
              <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 mb-5"
                style={{ animation: 'fadeUp 0.5s ease 0.35s both' }}>
                <span className="text-white text-xs font-semibold">🏡 Join 10,000+ happy guests</span>
              </div>
              <h1 className="text-white text-4xl font-extrabold leading-tight mb-4"
                style={{ animation: 'fadeUp 0.5s ease 0.45s both' }}>
                Start your next<br />extraordinary stay
              </h1>
              <p className="text-white/80 text-sm leading-7 max-w-xs"
                style={{ animation: 'fadeUp 0.5s ease 0.55s both' }}>
                Join Basudevbnb and unlock exclusive homes, premium support, and seamless world-class booking.
              </p>

              {/* Perk cards */}
              <div className="grid grid-cols-2 gap-3 mt-8"
                style={{ animation: 'fadeUp 0.5s ease 0.68s both' }}>
                {PERKS.map((p, i) => (
                  <div key={i} className="perk-card bg-white/15 backdrop-blur-sm border border-white/20 rounded-2xl p-4">
                    <div className="text-xl mb-2">{p.icon}</div>
                    <p className="text-white text-xs font-medium leading-5">{p.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Image indicators */}
            <div className="flex items-center gap-2"
              style={{ animation: 'fadeUp 0.5s ease 0.82s both' }}>
              {PROPERTY_IMAGES.map((_, i) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  className={`rounded-full transition-all duration-300 ${i === activeImg ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/40 hover:bg-white/60'}`} />
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT FORM ── */}
        <div className="flex items-center justify-center px-6 py-12 sm:px-10 bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-violet-50 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-rose-50 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          <div className="relative w-full max-w-md">
            {/* Mobile logo */}
            <div className="lg:hidden flex items-center gap-2 mb-7" style={{ animation: 'fadeUp 0.5s ease 0.1s both' }}>
              <img src={logo} alt="Basudevbnb" className="h-7 object-contain" />
            </div>

            {/* Step indicator */}
            <div className="flex items-center gap-3 mb-6" style={{ animation: 'fadeUp 0.5s ease 0.15s both' }}>
              {[1, 2].map(s => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${step >= s ? 'bg-gradient-to-br from-rose-500 to-fuchsia-600 text-white shadow-md' : 'bg-gray-100 text-gray-400'}`}>
                    {step > s ? <FiCheck size={12} /> : s}
                  </div>
                  {s < 2 && <div className={`h-0.5 w-10 rounded-full transition-all duration-500 ${step > 1 ? 'bg-gradient-to-r from-rose-500 to-fuchsia-600' : 'bg-gray-200'}`} />}
                </div>
              ))}
              <span className="text-xs text-gray-400 ml-1">Step {step} of 2</span>
            </div>

            {/* Header */}
            <div className="mb-6" style={{ animation: 'fadeUp 0.5s ease 0.22s both' }}>
              <div className="inline-flex items-center gap-2 bg-violet-50 rounded-full px-3 py-1.5 mb-3">
                <span className="text-violet-600 text-xs font-bold uppercase tracking-widest">Create Account</span>
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900">
                {step === 1 ? (
                  <>Tell us about<br /><span className="bg-gradient-to-r from-rose-500 to-fuchsia-600 bg-clip-text text-transparent">yourself 😊</span></>
                ) : (
                  <>Secure your<br /><span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">account 🔐</span></>
                )}
              </h2>
            </div>

            {/* Step 1 — Personal Info */}
            {step === 1 && (
              <div className="space-y-5 step-slide">
                {/* Name */}
                <div style={{ animation: 'fadeUp 0.4s ease 0.3s both' }}>
                  <label className="text-sm font-semibold text-gray-700 block mb-1.5">Full Name</label>
                  <div className="relative">
                    <FiUser size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input type="text" value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="John Doe"
                      className="input-focus w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 bg-gray-50 text-gray-900 text-sm outline-none transition-all duration-200"
                    />
                  </div>
                  {errors.name && <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><FiX size={10} /> {errors.name}</p>}
                </div>

                {/* Email */}
                <div style={{ animation: 'fadeUp 0.4s ease 0.38s both' }}>
                  <label className="text-sm font-semibold text-gray-700 block mb-1.5">Email Address</label>
                  <div className="relative">
                    <FiMail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input type="email" value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="you@example.com"
                      className="input-focus w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 bg-gray-50 text-gray-900 text-sm outline-none transition-all duration-200"
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><FiX size={10} /> {errors.email}</p>}
                </div>

                <div style={{ animation: 'fadeUp 0.4s ease 0.46s both' }}>
                  <button type="button" onClick={handleNext}
                    className="btn-glow w-full bg-gradient-to-r from-rose-500 to-fuchsia-600 text-white py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:opacity-95 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 shadow-lg mt-2">
                    Continue <FiArrowRight size={15} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2 — Password */}
            {step === 2 && (
              <form onSubmit={handleSubmit} className="space-y-5 step-slide">
                {/* Password */}
                <div style={{ animation: 'fadeUp 0.4s ease 0.28s both' }}>
                  <label className="text-sm font-semibold text-gray-700 block mb-1.5">Password</label>
                  <div className="relative">
                    <FiLock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input type={showPwd ? 'text' : 'password'} value={form.password}
                      onChange={e => setForm({ ...form, password: e.target.value })}
                      placeholder="Min. 6 characters"
                      className="input-focus w-full pl-11 pr-11 py-3.5 rounded-2xl border border-gray-200 bg-gray-50 text-gray-900 text-sm outline-none transition-all duration-200"
                    />
                    <button type="button" onClick={() => setShowPwd(!showPwd)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                      {showPwd ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                    </button>
                  </div>

                  {/* Strength bar */}
                  {form.password && strength && (
                    <div className="mt-2.5">
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${strength.color} transition-all duration-500`}
                          style={{ width: strength.pct, animation: 'barGrow 0.5s ease both' }} />
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <div className="flex gap-3">
                          {pwRules.map((r, i) => <PasswordRule key={i} {...r} />)}
                        </div>
                        <span className={`text-xs font-bold ${strength.text}`}>{strength.label}</span>
                      </div>
                    </div>
                  )}
                  {errors.password && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><FiX size={10} />{errors.password}</p>}
                </div>

                {/* Confirm */}
                <div style={{ animation: 'fadeUp 0.4s ease 0.36s both' }}>
                  <label className="text-sm font-semibold text-gray-700 block mb-1.5">Confirm Password</label>
                  <div className="relative">
                    <FiLock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    <input type={showConfirm ? 'text' : 'password'} value={form.confirmPassword}
                      onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
                      placeholder="Repeat your password"
                      className={`input-focus w-full pl-11 pr-11 py-3.5 rounded-2xl border bg-gray-50 text-gray-900 text-sm outline-none transition-all duration-200 ${
                        form.confirmPassword && form.password !== form.confirmPassword ? 'border-red-300' :
                        form.confirmPassword && form.password === form.confirmPassword ? 'border-emerald-400 !ring-emerald-200' :
                        'border-gray-200'
                      }`}
                    />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                      {showConfirm ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                    </button>
                    {form.confirmPassword && form.password === form.confirmPassword && (
                      <FiCheck size={14} className="absolute right-11 top-1/2 -translate-y-1/2 text-emerald-500" />
                    )}
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><FiX size={10} />{errors.confirmPassword}</p>}
                </div>

                {/* Back + Submit */}
                <div className="flex gap-3" style={{ animation: 'fadeUp 0.4s ease 0.44s both' }}>
                  <button type="button" onClick={() => setStep(1)}
                    className="flex-1 border-2 border-gray-200 text-gray-600 py-3.5 rounded-2xl font-bold text-sm hover:border-gray-300 hover:bg-gray-50 transition-all duration-200">
                    ← Back
                  </button>
                  <button type="submit" disabled={loading}
                    className="btn-glow flex-1 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:opacity-95 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 shadow-lg disabled:opacity-60">
                    {loading ? (
                      <>
                        <div className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white" style={{ animation: 'spin 0.7s linear infinite' }} />
                        Creating…
                      </>
                    ) : (
                      <>Create Account <FiArrowRight size={15} /></>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* Already have account */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-gray-400 text-xs">Already have an account?</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>
            <Link to="/login"
              className="block w-full border-2 border-gray-200 py-3.5 rounded-2xl text-center text-sm font-bold text-gray-700 hover:border-rose-300 hover:text-rose-600 hover:bg-rose-50 transition-all duration-200">
              Sign in instead →
            </Link>

            <p className="text-center text-gray-400 text-xs mt-5">
              By creating an account you agree to our{' '}
              <Link to="/terms" className="text-rose-500 hover:underline">Terms</Link> &{' '}
              <Link to="/privacy" className="text-rose-500 hover:underline">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}