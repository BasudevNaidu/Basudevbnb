import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import Spinner from '../components/Spinner'
import logo from '../assets/logo.png'

export default function LoginPage() {
  const { login, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [form, setForm] = useState({
    email: '',
    password: '',
    remember: false
  })
  const [loading, setLoading] = useState(false)

  const from = location.state?.from?.pathname || '/'

  if (user) {
    navigate(from, { replace: true })
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.email || !form.password) {
      toast.error('Please fill all fields')
      return
    }

    setLoading(true)
    try {
      await login(form.email, form.password)
      toast.success('Welcome back ✨')
      navigate(from, { replace: true })
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed')
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
              Welcome Back
            </p>

            <h1 className="text-6xl font-bold leading-[1.1] max-w-xl">
              Your next luxury
              <br />
              stay awaits
            </h1>

            <p className="mt-8 text-lg text-slate-300 leading-9 max-w-xl">
              Access your saved stays, premium bookings, and world-class
              hospitality experiences.
            </p>

            <div className="mt-12 grid grid-cols-3 gap-4 max-w-lg">
              <div className="rounded-2xl bg-white/5 border border-white/10 p-4 backdrop-blur-xl">
                <p className="text-2xl font-bold">10K+</p>
                <p className="text-xs text-slate-400 mt-1">Guests</p>
              </div>

              <div className="rounded-2xl bg-white/5 border border-white/10 p-4 backdrop-blur-xl">
                <p className="text-2xl font-bold">500+</p>
                <p className="text-xs text-slate-400 mt-1">Stays</p>
              </div>

              <div className="rounded-2xl bg-white/5 border border-white/10 p-4 backdrop-blur-xl">
                <p className="text-2xl font-bold">24/7</p>
                <p className="text-xs text-slate-400 mt-1">Support</p>
              </div>
            </div>
          </div>

          <div className="relative z-10 text-sm text-slate-400">
            © 2026 Basudevbnb — Premium travel redefined.
          </div>
        </div>

        {/* RIGHT LOGIN FORM */}
        <div className="relative flex items-center justify-center bg-gradient-to-br from-[#eef2ff] via-[#f8fafc] to-[#ecfeff] px-8 py-12 overflow-hidden">
          <div className="absolute top-10 left-10 w-72 h-72 bg-violet-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl"></div>

          <div className="relative w-full max-w-lg">
            <div className="rounded-[36px] border border-white/60 bg-white/70 backdrop-blur-2xl shadow-[0_25px_80px_rgba(79,70,229,0.18)] p-10">
              
              <div className="mb-8">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-violet-500 mb-3">
                  Login
                </p>

                <h2 className="text-5xl font-bold text-slate-900 leading-tight">
                  Welcome back
                  <br />
                  explorer ✨
                </h2>

                <p className="text-slate-500 mt-3 text-base leading-7">
                  Login to continue your luxury travel journey with Basudevbnb.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
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
                    className="w-full mt-2 px-5 py-4 rounded-2xl border border-slate-200 bg-white/80 focus:ring-2 focus:ring-cyan-500 outline-none transition-all shadow-sm"
                  />
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
                    placeholder="••••••••"
                    className="w-full mt-2 px-5 py-4 rounded-2xl border border-slate-200 bg-white/80 focus:ring-2 focus:ring-violet-500 outline-none transition-all shadow-sm"
                  />
                </div>

                <div className="flex items-center text-sm">
                  <label className="flex items-center gap-2 text-slate-600">
                    <input
                      type="checkbox"
                      checked={form.remember}
                      onChange={(e) =>
                        setForm({ ...form, remember: e.target.checked })
                      }
                    />
                    Remember me
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-4 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 text-white py-4 rounded-2xl font-semibold text-lg shadow-[0_15px_40px_rgba(99,102,241,0.35)] hover:scale-[1.02] transition-all duration-300"
                >
                  {loading ? (
                    <div className="flex justify-center items-center gap-2">
                      <Spinner size="sm" />
                      Logging in...
                    </div>
                  ) : (
                    'Log in'
                  )}
                </button>
              </form>

              <p className="text-center text-sm text-slate-600 mt-6">
                Don’t have an account?{' '}
                <Link
                  to="/signup"
                  className="text-violet-600 font-semibold hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}