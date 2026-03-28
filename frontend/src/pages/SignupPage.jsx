import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import Spinner from '../components/Spinner'
import logo from '../assets/logo.png'

const getPasswordStrength = (password) => {
  if (password.length < 6) return 'Weak'
  if (
    password.match(/[A-Z]/) &&
    password.match(/[0-9]/) &&
    password.length >= 8
  ) {
    return 'Strong'
  }
  return 'Medium'
}

export default function SignupPage() {
  const { signup, user } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (user) navigate('/')
  }, [user, navigate])

  const validate = () => {
    const newErrors = {}

    if (!form.name.trim()) newErrors.name = 'Full name is required'
    if (!form.email.trim()) newErrors.email = 'Email is required'
    if (!form.password) newErrors.password = 'Password is required'
    if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-200 via-slate-100 to-white flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-7xl rounded-[40px] overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-2">
        
        {/* LEFT HERO */}
        <div className="relative hidden lg:flex flex-col justify-between bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e1b4b] p-16 text-white overflow-hidden">
          
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-fuchsia-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>

          <div className="relative z-10">
            <div className="mb-16 inline-flex rounded-[32px] bg-white/5 backdrop-blur-2xl border border-white/10 px-10 py-8 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
              <img
                src={logo}
                alt="Basudevbnb"
                className="w-80 h-auto object-contain"
              />
            </div>

            <p className="text-rose-400 font-semibold tracking-[0.2em] uppercase text-sm mb-6">
              Premium Hospitality Platform
            </p>

            <h1 className="text-6xl font-bold leading-[1.1] max-w-xl">
              Stay beyond
              <br />
              ordinary living
            </h1>

            <p className="mt-8 text-lg text-slate-300 leading-9 max-w-xl">
              Experience curated luxury stays, trusted hosts, and seamless
              journeys designed for travelers who expect more than just rooms.
            </p>

            <div className="mt-12 grid grid-cols-3 gap-4 max-w-lg">
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4 backdrop-blur-xl">
                <p className="text-2xl font-bold">1k+</p>
                <p className="text-xs text-slate-400 mt-1">Happy Guests</p>
              </div>

              <div className="rounded-2xl bg-white/5 border border-white/10 p-4 backdrop-blur-xl">
                <p className="text-2xl font-bold">50+</p>
                <p className="text-xs text-slate-400 mt-1">Luxury Stays</p>
              </div>

              <div className="rounded-2xl bg-white/5 border border-white/10 p-4 backdrop-blur-xl">
                <p className="text-2xl font-bold">24/7</p>
                <p className="text-xs text-slate-400 mt-1">Premium Support</p>
              </div>
            </div>
          </div>

          <div className="relative z-10 text-sm text-slate-400">
            © 2026 Basudevbnb — Crafted for extraordinary journeys.
          </div>
        </div>

        {/* RIGHT FORM - ULTRA AWESOME */}
        <div className="relative flex items-center justify-center bg-gradient-to-br from-[#eef2ff] via-[#f8fafc] to-[#ecfeff] px-8 py-12 overflow-hidden">
          
          <div className="absolute top-10 left-10 w-72 h-72 bg-violet-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl"></div>

          <div className="relative w-full max-w-lg">
            <div className="rounded-[36px] border border-white/60 bg-white/70 backdrop-blur-2xl shadow-[0_25px_80px_rgba(79,70,229,0.18)] p-10">
              
              <div className="mb-8">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-violet-500 mb-3">
                  Create your account
                </p>

                <h2 className="text-5xl font-bold text-slate-900 leading-tight">
                  Start your next
                  <br />
                  luxury stay
                </h2>

                <p className="text-slate-500 mt-3 text-base leading-7">
                  Join Basudevbnb and unlock exclusive homes, premium support,
                  and seamless world-class booking.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    placeholder="John Doe"
                    className="w-full mt-2 px-5 py-4 rounded-2xl border border-slate-200 bg-white/80 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all shadow-sm"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    placeholder="you@example.com"
                    className="w-full mt-2 px-5 py-4 rounded-2xl border border-slate-200 bg-white/80 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all shadow-sm"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Password
                  </label>
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    placeholder="Minimum 6 characters"
                    className="w-full mt-2 px-5 py-4 rounded-2xl border border-slate-200 bg-white/80 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all shadow-sm"
                  />
                  {form.password && (
                    <p className="text-xs mt-2 text-slate-500">
                      Strength:{' '}
                      <span className="font-semibold text-violet-500">
                        {getPasswordStrength(form.password)}
                      </span>
                    </p>
                  )}
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={form.confirmPassword}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        confirmPassword: e.target.value
                      })
                    }
                    placeholder="Repeat password"
                    className="w-full mt-2 px-5 py-4 rounded-2xl border border-slate-200 bg-white/80 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all shadow-sm"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-4 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 text-white py-4 rounded-2xl font-semibold text-lg shadow-[0_15px_40px_rgba(99,102,241,0.35)] hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(99,102,241,0.45)] transition-all duration-300"
                >
                  {loading ? (
                    <div className="flex justify-center items-center gap-2">
                      <Spinner size="sm" />
                      Creating...
                    </div>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </form>

              <p className="text-center text-sm text-slate-600 mt-6">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-violet-600 font-semibold hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}