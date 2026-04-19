import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  FiHome, FiDollarSign, FiShield, FiStar, FiUsers,
  FiCamera, FiCheckCircle, FiChevronDown, FiArrowRight,
  FiGlobe, FiAward, FiHeart
} from 'react-icons/fi'

/* ─── Animated counter hook ─── */
function useCounter(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, start])
  return count
}

/* ─── Intersection observer hook ─── */
function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

/* ─── FAQ item ─── */
function FAQItem({ q, a, index }) {
  const [open, setOpen] = useState(false)
  const [ref, visible] = useInView()
  return (
    <div
      ref={ref}
      className="border border-white/10 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`,
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left text-white font-medium hover:bg-white/5 transition-colors"
      >
        <span>{q}</span>
        <FiChevronDown
          size={20}
          className="flex-shrink-0 ml-4 text-rose-400 transition-transform duration-300"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>
      <div
        style={{
          maxHeight: open ? '300px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <p className="px-6 pb-5 text-slate-400 leading-7">{a}</p>
      </div>
    </div>
  )
}

/* ─── Step card ─── */
function StepCard({ number, icon: Icon, title, desc, index }) {
  const [ref, visible] = useInView()
  return (
    <div
      ref={ref}
      className="relative flex flex-col items-center text-center"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`,
      }}
    >
      {/* Connector line */}
      {index < 2 && (
        <div className="hidden md:block absolute top-10 left-[calc(50%+3rem)] w-[calc(100%-6rem)] h-px bg-gradient-to-r from-rose-500/50 to-transparent pointer-events-none" />
      )}
      <div className="relative">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-rose-500 to-fuchsia-600 flex items-center justify-center shadow-[0_0_40px_rgba(244,63,94,0.4)] mb-4 step-pulse">
          <Icon size={28} className="text-white" />
        </div>
        <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-slate-800 border-2 border-rose-500 text-rose-400 text-xs font-bold flex items-center justify-center">
          {number}
        </span>
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-slate-400 text-sm leading-6 max-w-[200px]">{desc}</p>
    </div>
  )
}

/* ─── Benefit card ─── */
function BenefitCard({ icon: Icon, title, desc, gradient, index }) {
  const [ref, visible] = useInView()
  return (
    <div
      ref={ref}
      className="group relative overflow-hidden rounded-3xl p-px"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.95)',
        transition: `opacity 0.6s ease ${index * 0.12}s, transform 0.6s cubic-bezier(0.34,1.56,0.64,1) ${index * 0.12}s`,
        background: gradient,
      }}
    >
      <div className="relative rounded-3xl bg-slate-900 p-7 h-full group-hover:bg-slate-800/80 transition-colors duration-300">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
          style={{ background: gradient }}
        >
          <Icon size={22} className="text-white" />
        </div>
        <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
        <p className="text-slate-400 text-sm leading-6">{desc}</p>
        {/* Shimmer on hover */}
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 60%)' }} />
      </div>
    </div>
  )
}

/* ─── Stat card ─── */
function StatCard({ value, suffix, label, index, triggerCounter }) {
  const count = useCounter(value, 1800, triggerCounter)
  const [ref, visible] = useInView()
  return (
    <div
      ref={ref}
      className="text-center"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.5s ease ${index * 0.15}s, transform 0.5s ease ${index * 0.15}s`,
      }}
    >
      <p className="text-5xl font-extrabold bg-gradient-to-r from-rose-400 to-fuchsia-400 bg-clip-text text-transparent mb-1">
        {count.toLocaleString()}{suffix}
      </p>
      <p className="text-slate-400 text-sm font-medium">{label}</p>
    </div>
  )
}


/* ══════════════════════════════════════════════ MAIN PAGE ══ */
export default function BecomeHostPage() {
  const [statsRef, statsVisible] = useInView(0.3)
  const [heroRef, heroVisible] = useInView(0.1)

  const faqs = [
    {
      q: 'Do I need to be a property owner to host?',
      a: 'Not necessarily! Many hosts rent their place with landlord permission. Always check your lease agreement and local regulations before listing your space.',
    },
    {
      q: 'How does Basudevbnb protect my property?',
      a: 'Every booking comes with our Host Guarantee which covers damage up to ₹10,00,000. We also verify all guests before they can book your listing.',
    },
    {
      q: 'How and when do I get paid?',
      a: 'Payments are released 24 hours after your guest checks in. You can receive funds via bank transfer, UPI, or PayPal — whatever works best for you.',
    },
    {
      q: 'Can I set my own availability and pricing?',
      a: 'Absolutely. You have full control over your calendar, pricing per night, minimum stays, and house rules. We never override your decisions.',
    },
    {
      q: 'What if I need help during hosting?',
      a: 'Our Host Support team is available 24/7 via chat, phone, and email. New hosts also get a dedicated onboarding specialist for the first 30 days.',
    },
  ]

  const benefits = [
    {
      icon: FiDollarSign,
      title: 'Earn Extra Income',
      desc: 'Turn your spare room or property into a steady revenue stream. Hosts earn an average of ₹45,000/month.',
      gradient: 'linear-gradient(135deg, #f43f5e, #ec4899)',
    },
    {
      icon: FiShield,
      title: 'Full Protection',
      desc: 'Our Host Guarantee and liability coverage mean you host with total confidence and peace of mind.',
      gradient: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
    },
    {
      icon: FiUsers,
      title: 'Meet the World',
      desc: 'Welcome guests from 190+ countries and cultures. Every guest brings a new story to your doorstep.',
      gradient: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
    },
    {
      icon: FiStar,
      title: 'Superhost Status',
      desc: 'Consistent quality earns you Superhost status — unlocking bonus payouts, priority support, and exclusive perks.',
      gradient: 'linear-gradient(135deg, #f59e0b, #f97316)',
    },
    {
      icon: FiGlobe,
      title: 'Global Reach',
      desc: 'Your listing is seen by millions of travellers searching for unique places to stay every single day.',
      gradient: 'linear-gradient(135deg, #10b981, #059669)',
    },
    {
      icon: FiAward,
      title: 'Host Recognition',
      desc: 'Outstanding hosts are featured on our homepage, newsletters, and social channels — free marketing for you.',
      gradient: 'linear-gradient(135deg, #f43f5e, #fbbf24)',
    },
  ]

  const steps = [
    {
      number: 1,
      icon: FiHome,
      title: 'List Your Space',
      desc: 'Create your listing in minutes. Add photos, describe your place, and set your price.',
    },
    {
      number: 2,
      icon: FiCamera,
      title: 'Welcome Guests',
      desc: 'Approve bookings, set your check-in process, and prepare your space for arriving guests.',
    },
    {
      number: 3,
      icon: FiDollarSign,
      title: 'Get Paid',
      desc: 'Receive earnings directly to your account within 24 hours of every guest check-in.',
    },
  ]

  return (
    <div className="bg-slate-950 min-h-screen overflow-x-hidden">
      <style>{`
        /* Floating blobs */
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.05); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-40px, 30px) scale(1.08); }
          66% { transform: translate(20px, -15px) scale(0.92); }
        }
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(25px, 25px) scale(1.06); }
        }
        .blob1 { animation: float1 12s ease-in-out infinite; }
        .blob2 { animation: float2 15s ease-in-out infinite; }
        .blob3 { animation: float3 9s ease-in-out infinite; }

        /* Hero text reveal */
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-line-1 { animation: slideUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.2s both; }
        .hero-line-2 { animation: slideUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.4s both; }
        .hero-line-3 { animation: slideUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.6s both; }
        .hero-line-4 { animation: slideUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.8s both; }
        .hero-line-5 { animation: slideUp 0.8s cubic-bezier(0.22,1,0.36,1) 1.0s both; }

        /* Gradient border shimmer */
        @keyframes borderRotate {
          from { background-position: 0% 50%; }
          to   { background-position: 100% 50%; }
        }
        .shimmer-border {
          background: linear-gradient(270deg, #f43f5e, #8b5cf6, #06b6d4, #f43f5e);
          background-size: 400% 400%;
          animation: borderRotate 4s linear infinite;
        }

        /* Step glow pulse */
        @keyframes stepGlow {
          0%, 100% { box-shadow: 0 0 30px rgba(244,63,94,0.4); }
          50%       { box-shadow: 0 0 60px rgba(244,63,94,0.7), 0 0 100px rgba(139,92,246,0.3); }
        }
        .step-pulse { animation: stepGlow 3s ease-in-out infinite; }

        /* Earnings bar animation */
        @keyframes barGrow {
          from { width: 0; }
        }
        .bar-animate { animation: barGrow 1.5s cubic-bezier(0.22,1,0.36,1) 0.3s both; }

        /* Floating host card */
        @keyframes cardFloat {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50%       { transform: translateY(-12px) rotate(-1deg); }
        }
        .card-float { animation: cardFloat 5s ease-in-out infinite; }

        /* Scroll indicator */
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); opacity: 0.7; }
          50%       { transform: translateY(8px); opacity: 1; }
        }
        .scroll-bounce { animation: scrollBounce 1.8s ease-in-out infinite; }

        /* Star spin */
        @keyframes spinStar {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .spin-slow { animation: spinStar 20s linear infinite; }

        /* Particle dots */
        @keyframes particleRise {
          0%   { opacity: 0.6; transform: translateY(0) scale(1); }
          100% { opacity: 0;   transform: translateY(-120px) scale(0.4); }
        }
        .particle { animation: particleRise 3s ease-in infinite; }
      `}</style>

      {/* ── HERO ────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-20">
        {/* Animated gradient blobs */}
        <div className="blob1 absolute top-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full bg-rose-600/20 blur-[120px] pointer-events-none" />
        <div className="blob2 absolute bottom-[-120px] right-[-80px] w-[600px] h-[600px] rounded-full bg-fuchsia-600/15 blur-[140px] pointer-events-none" />
        <div className="blob3 absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full bg-violet-600/10 blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        {/* Grid overlay */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Particle dots */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1.5 h-1.5 rounded-full bg-rose-400/60 pointer-events-none"
            style={{
              left: `${10 + i * 12}%`,
              bottom: `${20 + (i % 3) * 15}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${2.5 + i * 0.3}s`,
            }}
          />
        ))}

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          {/* Left: text */}
          <div>
            <div className="hero-line-1 inline-flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 rounded-full px-4 py-2 mb-8">
              <FiHeart size={14} className="text-rose-400" />
              <span className="text-rose-400 text-sm font-semibold tracking-wider uppercase">Join 50,000+ Hosts</span>
            </div>

            <h1 className="hero-line-2 text-5xl md:text-7xl font-extrabold text-white leading-[1.05] mb-6">
              Turn your<br />
              <span className="bg-gradient-to-r from-rose-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent">
                space into
              </span><br />
              income ✦
            </h1>

            <p className="hero-line-3 text-slate-400 text-lg md:text-xl leading-8 max-w-lg mb-10">
              Host on Basudevbnb and earn money from your home, spare room, or 
              holiday property — entirely on your own terms.
            </p>

            <div className="hero-line-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="shimmer-border p-px rounded-2xl">
                <Link
                  to="/signup"
                  className="flex items-center gap-2 bg-slate-950 text-white px-8 py-4 rounded-2xl font-bold text-base hover:bg-slate-900 transition-colors"
                >
                  Start Hosting <FiArrowRight size={18} />
                </Link>
              </div>
              <Link to="/how-it-works" className="text-slate-400 hover:text-white transition-colors text-sm font-medium underline underline-offset-4">
                Learn how it works
              </Link>
            </div>

            {/* Trust badges */}
            <div className="hero-line-5 flex flex-wrap items-center gap-6 mt-10">
              {['No setup fees', 'Cancel anytime', '24/7 support'].map(item => (
                <div key={item} className="flex items-center gap-2 text-slate-400 text-sm">
                  <FiCheckCircle size={16} className="text-emerald-400 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Right: floating host earnings card */}
          <div className="hidden lg:flex flex-col items-center gap-6">
            <div className="card-float relative w-full max-w-sm">
              {/* Main card */}
              <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-fuchsia-600 flex items-center justify-center">
                    <FiHome size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white font-bold">Your Listing</p>
                    <p className="text-slate-400 text-xs">2 BHK · Bengaluru</p>
                  </div>
                </div>

                <p className="text-slate-400 text-sm mb-2">Estimated monthly earnings</p>
                <p className="text-4xl font-extrabold text-white mb-1">₹42,500</p>
                <p className="text-emerald-400 text-sm font-medium mb-6">↑ 18% vs last month</p>

                {/* Mini bar chart */}
                <div className="space-y-3">
                  {[
                    { day: 'Mon', pct: '70%', col: 'from-rose-500 to-fuchsia-500' },
                    { day: 'Wed', pct: '90%', col: 'from-violet-500 to-indigo-500' },
                    { day: 'Fri', pct: '55%', col: 'from-cyan-500 to-sky-500' },
                    { day: 'Sun', pct: '82%', col: 'from-emerald-500 to-teal-500' },
                  ].map(({ day, pct, col }) => (
                    <div key={day} className="flex items-center gap-3">
                      <span className="text-slate-500 text-xs w-7">{day}</span>
                      <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${col} bar-animate`}
                          style={{ width: pct }}
                        />
                      </div>
                      <span className="text-slate-400 text-xs w-8 text-right">{pct}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                ⭐ Superhost
              </div>
            </div>

            {/* Spinning ring decoration */}
            <div className="relative w-20 h-20 spin-slow opacity-30">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-rose-500" />
              <div className="absolute inset-3 rounded-full border border-fuchsia-500/50" />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-bounce absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-slate-500 to-transparent" />
        </div>
      </section>

      {/* ── STATS ───────────────────────────────────────────── */}
      <section ref={statsRef} className="relative py-20 border-y border-white/5">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-500/5 via-fuchsia-500/5 to-violet-500/5 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10">
          <StatCard value={50000} suffix="+" label="Active Hosts" index={0} triggerCounter={statsVisible} />
          <StatCard value={190}   suffix="+"  label="Countries Reached" index={1} triggerCounter={statsVisible} />
          <StatCard value={45000} suffix="₹"  label="Avg Monthly Earn" index={2} triggerCounter={statsVisible} />
          <StatCard value={4.9}   suffix="★"  label="Host Satisfaction" index={3} triggerCounter={statsVisible} />
        </div>
      </section>

      {/* ── BENEFITS ────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            {(() => {
              const [ref, v] = [useRef(null), useState(false)]
              useEffect(() => {
                const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) v[1](true) }, { threshold: 0.2 })
                if (ref.current) obs.observe(ref.current)
                return () => obs.disconnect()
              }, [])
              return (
                <div ref={ref} style={{ opacity: v[0] ? 1 : 0, transform: v[0] ? 'none' : 'translateY(30px)', transition: 'all 0.7s ease' }}>
                  <p className="text-rose-400 font-semibold tracking-[0.2em] uppercase text-sm mb-4">Why Host With Us</p>
                  <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                    Everything you need<br />to succeed as a host
                  </h2>
                  <p className="text-slate-400 max-w-xl mx-auto text-lg leading-8">
                    We've built every tool, protection, and support system so you can focus 
                    on creating great guest experiences.
                  </p>
                </div>
              )
            })()}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => <BenefitCard key={b.title} {...b} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────────── */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="blob1 absolute top-0 left-1/4 w-[400px] h-[400px] rounded-full bg-violet-600/10 blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-fuchsia-400 font-semibold tracking-[0.2em] uppercase text-sm mb-4">Simple Process</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Up and running in 3 steps</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {steps.map((s, i) => <StepCard key={s.number} {...s} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── EARNINGS ESTIMATOR BANNER ───────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto rounded-[40px] relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #4c1d95 50%, #831843 100%)' }}>
          <div className="blob2 absolute bottom-0 right-0 w-[350px] h-[350px] rounded-full bg-rose-500/20 blur-[80px] pointer-events-none" />
          <div className="relative z-10 p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10">
            <div>
              <p className="text-white/60 text-sm font-semibold uppercase tracking-widest mb-3">Start Earning</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                Ready to become<br />a Basudevbnb host?
              </h2>
              <p className="text-white/70 text-base leading-7 max-w-md">
                Thousands of hosts have already turned their spaces into thriving income sources. 
                It takes less than 10 minutes to list your first property.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4 flex-shrink-0">
              <Link
                to="/signup"
                className="flex items-center gap-2 bg-white text-slate-900 px-10 py-4 rounded-2xl font-bold text-base hover:bg-slate-100 transition-colors shadow-xl whitespace-nowrap"
              >
                Get Started — It's Free <FiArrowRight size={18} />
              </Link>
              <p className="text-white/40 text-xs">No credit card required</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-cyan-400 font-semibold tracking-[0.2em] uppercase text-sm mb-4">FAQ</p>
            <h2 className="text-4xl font-extrabold text-white mb-4">Common questions</h2>
            <p className="text-slate-400">Everything you need to know before you start hosting.</p>
          </div>
          <div className="space-y-3">
            {faqs.map((f, i) => <FAQItem key={i} {...f} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ───────────────────────────────────────── */}
      <section className="py-24 px-6 text-center relative overflow-hidden border-t border-white/5">
        <div className="blob3 absolute inset-0 m-auto w-[600px] h-[600px] rounded-full bg-fuchsia-700/10 blur-[140px] pointer-events-none" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="text-7xl mb-6">🏠</div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-5">
            Your home, your rules,<br />your income.
          </h2>
          <p className="text-slate-400 text-lg mb-10 leading-8">
            Join Basudevbnb today and start welcoming guests from around the world.
          </p>
          <div className="shimmer-border inline-block p-px rounded-2xl">
            <Link
              to="/signup"
              className="flex items-center gap-2 bg-slate-950 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-slate-900 transition-colors"
            >
              Create Your Listing <FiArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
