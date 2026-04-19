import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiStar, FiShield, FiGlobe } from 'react-icons/fi'
import logo from '../assets/logo.png'

const SLIDES = [
  { img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', tag: 'Santorini, Greece', price: '$420/night' },
  { img: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800', tag: 'Maldives Overwater Villa', price: '$890/night' },
  { img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800', tag: 'Bali, Indonesia', price: '$210/night' },
]

export default function LoginPage() {
  const { login, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [form, setForm]       = useState({ email: '', password: '', remember: false })
  const [loading, setLoading] = useState(false)
  const [showPwd, setShowPwd] = useState(false)
  const [slide, setSlide]     = useState(0)
  const [ready, setReady]     = useState(false)

  const from = location.state?.from?.pathname || '/'
  useEffect(() => { setReady(true) }, [])
  useEffect(() => {
    const t = setInterval(() => setSlide(i => (i + 1) % SLIDES.length), 4500)
    return () => clearInterval(t)
  }, [])
  if (user) { navigate(from, { replace: true }); return null }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) { toast.error('Please fill all fields'); return }
    setLoading(true)
    try {
      await login(form.email, form.password)
      toast.success('Welcome back ✨')
      navigate(from, { replace: true })
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed')
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-violet-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <style>{`
        @keyframes fadeUp  { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeLeft{ from{opacity:0;transform:translateX(-22px)} to{opacity:1;transform:translateX(0)} }
        @keyframes float1  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes float2  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes spin    { to{transform:rotate(360deg)} }
        @keyframes logoGlow{ 0%,100%{box-shadow:0 0 0 0 rgba(244,63,94,0)} 50%{box-shadow:0 0 40px 8px rgba(244,63,94,0.18),0 0 80px 16px rgba(139,92,246,0.1)} }
        @keyframes blobA   { 0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%} 50%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%} }
        @keyframes blobB   { 0%,100%{border-radius:40% 60% 60% 40%/40% 40% 60% 60%} 50%{border-radius:60% 40% 40% 60%/60% 60% 40% 40%} }
        @keyframes cardSlide{ from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }

        .logo-highlight {
          animation: logoGlow 3.5s ease-in-out infinite, float1 5s ease-in-out infinite;
          background: linear-gradient(135deg,#fff7f8 0%,#fdf4ff 100%);
          border: 2px solid transparent;
          background-clip: padding-box;
          position: relative;
        }
        .logo-highlight::before {
          content:'';
          position:absolute;
          inset:-2px;
          border-radius:inherit;
          background: linear-gradient(135deg,#f43f5e,#a855f7,#f43f5e);
          background-size:200% 200%;
          animation: shimmer 3s linear infinite;
          z-index:-1;
          border-radius:28px;
        }
        .input-wrap input {
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .input-wrap input:focus {
          border-color: #f43f5e;
          box-shadow: 0 0 0 3px rgba(244,63,94,0.12);
          background: #fff;
          outline:none;
        }
        .btn-primary {
          background: linear-gradient(135deg,#f43f5e,#e11d48,#9333ea);
          background-size:200%;
          transition: all 0.3s ease;
        }
        .btn-primary:hover {
          background-position:100%;
          box-shadow:0 10px 35px rgba(244,63,94,0.4);
          transform:translateY(-1px);
        }
        .slide-img { transition: opacity 0.9s ease; }
      `}</style>

      <div className={`w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[32px] shadow-2xl overflow-hidden transition-all duration-700 ${ready ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>

        {/* ── LEFT — Showcase ── */}
        <div className="hidden lg:flex flex-col bg-gradient-to-br from-rose-500 via-fuchsia-500 to-violet-600 relative overflow-hidden p-10">
          {/* Blobs */}
          <div className="absolute top-[-60px] left-[-60px] w-64 h-64 bg-white/10 pointer-events-none" style={{ animation:'blobA 10s ease-in-out infinite', filter:'blur(2px)' }} />
          <div className="absolute bottom-[-40px] right-[-40px] w-56 h-56 bg-white/10 pointer-events-none" style={{ animation:'blobB 12s ease-in-out infinite 2s', filter:'blur(2px)' }} />

          {/* ── LOGO HERO ── */}
          <div className="flex flex-col items-center mb-8 z-10" style={{ animation:'fadeLeft 0.6s ease 0.2s both' }}>
            <div className="logo-highlight rounded-[26px] p-5 mb-5">
              <img src={logo} alt="Basudevbnb" className="w-52 h-auto object-contain" style={{ filter:'drop-shadow(0 4px 16px rgba(244,63,94,0.25))' }} />
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
              <span className="text-white text-xs font-bold tracking-wide">Premium Travel Platform</span>
            </div>
          </div>

          {/* Property card carousel */}
          <div className="z-10 flex-1 flex flex-col justify-center">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-4" style={{ height: 220 }}>
              {SLIDES.map((s, i) => (
                <img key={i} src={s.img} alt={s.tag}
                  className={`slide-img absolute inset-0 w-full h-full object-cover ${i === slide ? 'opacity-100' : 'opacity-0'}`} />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <div>
                  <p className="text-white font-bold text-sm">{SLIDES[slide].tag}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    {[...Array(5)].map((_, i) => <FiStar key={i} size={10} className="fill-amber-400 text-amber-400" />)}
                  </div>
                </div>
                <span className="bg-white/20 backdrop-blur text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/30">
                  {SLIDES[slide].price}
                </span>
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mb-6">
              {SLIDES.map((_, i) => (
                <button key={i} onClick={() => setSlide(i)}
                  className={`rounded-full transition-all duration-300 ${i === slide ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/40'}`} />
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: FiGlobe,  val: '60+',  sub: 'Countries' },
                { icon: FiStar,   val: '4.9',  sub: 'Rating' },
                { icon: FiShield, val: '100%', sub: 'Secure' },
              ].map(({ icon: Icon, val, sub }, i) => (
                <div key={i} className="bg-white/15 backdrop-blur-sm rounded-2xl p-3 text-center border border-white/20"
                  style={{ animation: `fadeUp 0.5s ease ${0.6 + i * 0.1}s both` }}>
                  <Icon size={16} className="text-white/80 mx-auto mb-1.5" />
                  <p className="text-white font-extrabold text-lg leading-none">{val}</p>
                  <p className="text-white/65 text-[10px] mt-0.5">{sub}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-white/40 text-xs text-center z-10 mt-6">© {new Date().getFullYear()} Basudevbnb, Inc.</p>
        </div>

        {/* ── RIGHT — Form ── */}
        <div className="flex flex-col justify-center px-7 py-10 sm:px-10 bg-white relative overflow-hidden">
          {/* Subtle bg circles */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-rose-50 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-36 h-36 bg-violet-50 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          <div className="relative max-w-sm w-full mx-auto">

            {/* Mobile logo */}
            <div className="lg:hidden flex justify-center mb-7" style={{ animation:'fadeUp 0.5s ease 0.1s both' }}>
              <div className="logo-highlight rounded-[20px] p-4">
                <img src={logo} alt="Basudevbnb" className="h-10 w-auto object-contain" />
              </div>
            </div>

            {/* Header */}
            <div className="mb-7" style={{ animation:'fadeUp 0.5s ease 0.2s both' }}>
              <span className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-600 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" /> Sign In
              </span>
              <h2 className="text-2xl font-extrabold text-gray-900">Welcome back 👋</h2>
              <p className="text-gray-400 text-sm mt-1.5">Sign in to continue your journey.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="input-wrap" style={{ animation:'fadeUp 0.5s ease 0.3s both' }}>
                <label className="text-sm font-semibold text-gray-700 block mb-1.5">Email address</label>
                <div className="relative">
                  <FiMail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input type="email" value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 bg-gray-50 text-gray-900 text-sm"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="input-wrap" style={{ animation:'fadeUp 0.5s ease 0.38s both' }}>
                <label className="text-sm font-semibold text-gray-700 block mb-1.5">Password</label>
                <div className="relative">
                  <FiLock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input type={showPwd ? 'text' : 'password'} value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-11 py-3.5 rounded-2xl border border-gray-200 bg-gray-50 text-gray-900 text-sm"
                  />
                  <button type="button" onClick={() => setShowPwd(!showPwd)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors">
                    {showPwd ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                  </button>
                </div>
              </div>

              {/* Remember */}
              <div className="flex items-center" style={{ animation:'fadeUp 0.5s ease 0.44s both' }}>
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <div className="relative" onClick={() => setForm({ ...form, remember: !form.remember })}>
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${form.remember ? 'bg-rose-500 border-rose-500' : 'border-gray-300 bg-white'}`}>
                      {form.remember && <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">Remember me</span>
                </label>
              </div>

              {/* Submit */}
              <div style={{ animation:'fadeUp 0.5s ease 0.5s both' }}>
                <button type="submit" disabled={loading}
                  className="btn-primary w-full text-white py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2.5 disabled:opacity-60 mt-1">
                  {loading ? (
                    <><div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white" style={{ animation:'spin 0.7s linear infinite' }} /> Signing in…</>
                  ) : (
                    <>Sign In <FiArrowRight size={15} /></>
                  )}
                </button>
              </div>
            </form>

            <div className="flex items-center gap-3 my-5" style={{ animation:'fadeUp 0.5s ease 0.56s both' }}>
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-gray-400 text-xs font-medium">No account yet?</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            <Link to="/signup"
              className="block w-full border-2 border-gray-200 text-gray-700 py-3.5 rounded-2xl text-center text-sm font-bold hover:border-rose-400 hover:text-rose-600 hover:bg-rose-50 transition-all duration-200"
              style={{ animation:'fadeUp 0.5s ease 0.6s both' }}>
              Create free account →
            </Link>

            <p className="text-center text-gray-400 text-xs mt-5" style={{ animation:'fadeUp 0.5s ease 0.65s both' }}>
              By signing in you agree to our{' '}
              <Link to="/terms" className="text-rose-500 hover:underline">Terms</Link> &{' '}
              <Link to="/privacy" className="text-rose-500 hover:underline">Privacy</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}