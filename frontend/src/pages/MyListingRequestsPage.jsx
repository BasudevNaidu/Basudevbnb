import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import api from '../utils/api'
import Spinner from '../components/Spinner'
import { FiClock, FiCheckCircle, FiXCircle, FiArrowRight, FiHome, FiRefreshCw, FiList, FiFilter } from 'react-icons/fi'

/* ─── Inline styles injected once ─── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

  .mlr-root * { font-family: 'Inter', sans-serif; box-sizing: border-box; }

  /* ── Keyframes ── */
  @keyframes mlr-fadeSlideUp {
    from { opacity: 0; transform: translateY(32px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0)   scale(1);    }
  }
  @keyframes mlr-fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes mlr-shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes mlr-pulse-ring {
    0%   { transform: scale(1);   opacity: 0.6; }
    100% { transform: scale(1.6); opacity: 0;   }
  }
  @keyframes mlr-spin {
    to { transform: rotate(360deg); }
  }
  @keyframes mlr-float {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-6px); }
  }
  @keyframes mlr-expandDown {
    from { opacity: 0; max-height: 0;   transform: translateY(-8px); }
    to   { opacity: 1; max-height: 200px; transform: translateY(0); }
  }
  @keyframes mlr-countUp {
    from { opacity:0; transform: scale(0.7); }
    to   { opacity:1; transform: scale(1);   }
  }
  @keyframes mlr-bgShift {
    0%,100% { background-position: 0% 50%;   }
    50%      { background-position: 100% 50%; }
  }
  @keyframes mlr-orb1 {
    0%,100% { transform: translate(0,0) scale(1); }
    33%      { transform: translate(40px,-30px) scale(1.1); }
    66%      { transform: translate(-20px, 20px) scale(0.95); }
  }
  @keyframes mlr-orb2 {
    0%,100% { transform: translate(0,0) scale(1); }
    33%      { transform: translate(-50px, 20px) scale(1.08); }
    66%      { transform: translate(30px,-40px) scale(0.92); }
  }

  /* ── Animated gradient header ── */
  .mlr-hero-gradient {
    background: linear-gradient(135deg, #fff5f7 0%, #fef3f8 25%, #f0f9ff 50%, #fef9e7 75%, #f5f0ff 100%);
    background-size: 400% 400%;
    animation: mlr-bgShift 12s ease infinite;
  }

  /* ── Shimmer text ── */
  .mlr-shimmer-title {
    background: linear-gradient(
      90deg,
      #e11d48 0%, #db2777 20%, #9333ea 40%,
      #3b82f6 50%, #9333ea 60%, #db2777 80%, #e11d48 100%
    );
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: mlr-shimmer 4s linear infinite;
  }

  /* ── Card hover lift ── */
  .mlr-card {
    transition: transform 0.35s cubic-bezier(.34,1.56,.64,1), box-shadow 0.35s ease, border-color 0.25s ease;
  }
  .mlr-card:hover {
    transform: translateY(-6px) scale(1.008);
    box-shadow: 0 24px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(219,39,119,0.1);
  }

  /* ── Filter tab active underline animation ── */
  .mlr-tab-active::after {
    content: '';
    position: absolute;
    bottom: -2px; left: 50%; right: 50%;
    height: 2px;
    background: linear-gradient(90deg, #e11d48, #9333ea);
    border-radius: 2px;
    transition: left 0.3s ease, right 0.3s ease;
  }
  .mlr-tab-active::after { left: 0; right: 0; }

  /* ── Image overlay shimmer on hover ── */
  .mlr-img-wrap { position: relative; overflow: hidden; }
  .mlr-img-wrap::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.45) 50%, transparent 70%);
    background-size: 200% 100%;
    background-position: -200% 0;
    transition: background-position 0.6s ease;
  }
  .mlr-card:hover .mlr-img-wrap::after { background-position: 200% 0; }

  /* ── Refresh button spin on hover ── */
  .mlr-refresh-btn:hover .mlr-refresh-icon { animation: mlr-spin 0.6s linear; }

  /* ── Stat cards ── */
  .mlr-stat-card {
    transition: transform 0.3s cubic-bezier(.34,1.56,.64,1), box-shadow 0.3s ease;
  }
  .mlr-stat-card:hover {
    transform: translateY(-4px) scale(1.04);
    box-shadow: 0 16px 40px rgba(0,0,0,0.1);
  }

  /* ── Expand admin note ── */
  .mlr-admin-note {
    overflow: hidden;
    animation: mlr-expandDown 0.3s ease forwards;
  }

  /* ── Floating empty state icon ── */
  .mlr-float { animation: mlr-float 3s ease-in-out infinite; }

  /* ── Pulse ring for pending badge ── */
  .mlr-pulse-ring {
    position: relative;
    display: inline-flex;
    align-items: center;
  }
  .mlr-pulse-ring::before {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: 9999px;
    border: 2px solid #f59e0b;
    animation: mlr-pulse-ring 1.6s ease-out infinite;
  }
`

/* ─── Status config (light palette) ─── */
const STATUS_CONFIG = {
  pending:  {
    label: 'Under Review',
    icon: FiClock,
    color: 'text-amber-600',
    bg: 'bg-amber-50 border-amber-200',
    dot: 'bg-amber-500',
    isPulsing: true,
  },
  approved: {
    label: 'Approved ✓',
    icon: FiCheckCircle,
    color: 'text-emerald-700',
    bg: 'bg-emerald-50 border-emerald-200',
    dot: 'bg-emerald-500',
    isPulsing: false,
  },
  rejected: {
    label: 'Not Approved',
    icon: FiXCircle,
    color: 'text-rose-600',
    bg: 'bg-rose-50 border-rose-200',
    dot: 'bg-rose-500',
    isPulsing: false,
  },
}

/* ─── Status Badge ─── */
function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.pending
  const Icon = cfg.icon
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${cfg.bg} ${cfg.color}`}>
      {cfg.isPulsing ? (
        <span className="mlr-pulse-ring">
          <span className={`w-2 h-2 rounded-full ${cfg.dot} block`} />
        </span>
      ) : (
        <Icon size={12} />
      )}
      {cfg.label}
    </span>
  )
}

/* ─── Stat Card ─── */
function StatCard({ label, count, gradient, icon: Icon, delay }) {
  return (
    <div
      className="mlr-stat-card rounded-2xl p-4 flex items-center gap-3 shadow-sm border border-white/80"
      style={{
        background: gradient,
        animation: `mlr-fadeSlideUp 0.5s ease ${delay}s both`,
      }}
    >
      <div className="w-10 h-10 rounded-xl bg-white/60 flex items-center justify-center shadow-sm flex-shrink-0">
        <Icon size={18} className="text-slate-600" />
      </div>
      <div>
        <div
          className="text-2xl font-black text-slate-800 leading-none"
          style={{ animation: `mlr-countUp 0.5s ease ${delay + 0.1}s both` }}
        >
          {count}
        </div>
        <div className="text-xs text-slate-500 font-medium mt-0.5">{label}</div>
      </div>
    </div>
  )
}

/* ─── Request Card ─── */
function RequestCard({ req, index }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className="mlr-card bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm"
      style={{ animation: `mlr-fadeSlideUp 0.45s cubic-bezier(.34,1.56,.64,1) ${index * 0.09}s both` }}
    >
      <div className="p-5 flex flex-col sm:flex-row gap-4 items-start">
        {/* Image */}
        <div className="mlr-img-wrap w-full sm:w-32 h-24 rounded-xl flex-shrink-0">
          <img
            src={req.images?.[0] || 'https://images.unsplash.com/photo-1501180336600-ac7bfea1dbe9?w=400'}
            alt={req.title}
            className="w-full h-full object-cover rounded-xl"
            onError={e => { e.target.src = 'https://images.unsplash.com/photo-1501180336600-ac7bfea1dbe9?w=400' }}
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-start gap-2 mb-1">
            <h3 className="font-bold text-slate-800 text-base leading-tight">{req.title}</h3>
            <StatusBadge status={req.status} />
          </div>
          <p className="text-slate-500 text-sm">{req.location}, {req.country} · <span className="capitalize">{req.category}</span></p>
          <p className="text-slate-700 text-sm mt-1 font-medium">
            <span className="text-rose-500 font-bold">${req.price}</span>/night ·{' '}
            {req.maxGuests} guests · {req.bedrooms} bed
          </p>
          <p className="text-slate-400 text-xs mt-2 flex items-center gap-1">
            <FiClock size={10} />
            Submitted {new Date(req.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 flex-shrink-0 self-start">
          {req.status === 'approved' && req.approvedListingId && (
            <Link
              to={`/listings/${req.approvedListingId}`}
              className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold px-4 py-2 rounded-xl hover:opacity-90 transition shadow-md shadow-emerald-200"
            >
              View Listing <FiArrowRight size={11} />
            </Link>
          )}
          {req.status === 'rejected' && req.adminNote && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-xs text-rose-500 font-semibold underline underline-offset-2 hover:text-rose-600 transition"
            >
              {expanded ? 'Hide' : 'See'} feedback
            </button>
          )}
          {req.status === 'rejected' && (
            <Link
              to="/submit-listing"
              className="flex items-center gap-1.5 bg-slate-100 text-slate-700 text-xs font-medium px-4 py-2 rounded-xl hover:bg-slate-200 transition border border-slate-200"
            >
              Resubmit
            </Link>
          )}
        </div>
      </div>

      {/* Divider line accent */}
      <div
        className="h-0.5 w-full"
        style={{
          background:
            req.status === 'approved'
              ? 'linear-gradient(90deg, #10b981, #14b8a6, transparent)'
              : req.status === 'rejected'
              ? 'linear-gradient(90deg, #f43f5e, #fb923c, transparent)'
              : 'linear-gradient(90deg, #f59e0b, #fbbf24, transparent)',
        }}
      />

      {/* Admin note */}
      {expanded && req.adminNote && (
        <div className="mlr-admin-note px-5 py-4">
          <div className="bg-rose-50 border border-rose-100 rounded-xl p-4 text-sm text-rose-700 leading-6">
            <span className="font-semibold text-rose-600">Admin Feedback: </span>
            {req.adminNote}
          </div>
        </div>
      )}
    </div>
  )
}

/* ─── Main Page ─── */
export default function MyListingRequestsPage() {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => { fetchRequests() }, [])

  const fetchRequests = async () => {
    setLoading(true)
    setRefreshing(true)
    try {
      const { data } = await api.get('/listing-requests/mine')
      setRequests(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
      setTimeout(() => setRefreshing(false), 600)
    }
  }

  const filtered = filter === 'all' ? requests : requests.filter(r => r.status === filter)
  const counts = {
    all:      requests.length,
    pending:  requests.filter(r => r.status === 'pending').length,
    approved: requests.filter(r => r.status === 'approved').length,
    rejected: requests.filter(r => r.status === 'rejected').length,
  }

  const TABS = [
    { key: 'all',      label: 'All',      color: 'from-rose-500 to-fuchsia-600' },
    { key: 'pending',  label: 'Pending',  color: 'from-amber-400 to-orange-500' },
    { key: 'approved', label: 'Approved', color: 'from-emerald-500 to-teal-500' },
    { key: 'rejected', label: 'Rejected', color: 'from-rose-500 to-rose-600'   },
  ]

  const STATS = [
    { key: 'all',      label: 'Total Requests', gradient: 'linear-gradient(135deg,#fdf4ff,#fce7f3)', icon: FiList,        delay: 0.05 },
    { key: 'pending',  label: 'Under Review',   gradient: 'linear-gradient(135deg,#fffbeb,#fef3c7)', icon: FiClock,       delay: 0.12 },
    { key: 'approved', label: 'Approved',       gradient: 'linear-gradient(135deg,#ecfdf5,#d1fae5)', icon: FiCheckCircle, delay: 0.19 },
    { key: 'rejected', label: 'Rejected',       gradient: 'linear-gradient(135deg,#fff1f2,#ffe4e6)', icon: FiXCircle,     delay: 0.26 },
  ]

  return (
    <div className="mlr-root min-h-screen" style={{ background: '#f8fafc' }}>
      <style>{GLOBAL_CSS}</style>

      {/* ── Decorative blobs ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed', top: '-120px', right: '-120px', width: '420px', height: '420px',
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(219,39,119,0.12) 0%, transparent 70%)',
          animation: 'mlr-orb1 14s ease-in-out infinite', pointerEvents: 'none', zIndex: 0,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'fixed', bottom: '-80px', left: '-80px', width: '360px', height: '360px',
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(147,51,234,0.10) 0%, transparent 70%)',
          animation: 'mlr-orb2 18s ease-in-out infinite', pointerEvents: 'none', zIndex: 0,
        }}
      />

      {/* ── Hero Header ── */}
      <div className="mlr-hero-gradient relative border-b border-slate-100 shadow-sm" style={{ zIndex: 1 }}>
        <div className="max-w-4xl mx-auto px-4 py-10">
          <div
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5"
            style={{ animation: 'mlr-fadeSlideUp 0.5s ease 0s both' }}
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">🏡</span>
                <span className="text-xs font-semibold text-rose-500 uppercase tracking-widest">My Dashboard</span>
              </div>
              <h1 className="mlr-shimmer-title text-3xl sm:text-4xl font-black leading-tight">
                Listing Requests
              </h1>
              <p className="text-slate-500 mt-1 text-sm">Track and manage your submitted property requests.</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={fetchRequests}
                disabled={refreshing}
                className="mlr-refresh-btn flex items-center gap-2 bg-white text-slate-600 px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-50 transition border border-slate-200 shadow-sm active:scale-95"
              >
                <FiRefreshCw
                  size={14}
                  className="mlr-refresh-icon"
                  style={refreshing ? { animation: 'mlr-spin 0.6s linear infinite' } : {}}
                />
                Refresh
              </button>
              <Link
                to="/submit-listing"
                className="flex items-center gap-2 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition shadow-md shadow-rose-200 hover:opacity-90 active:scale-95"
                style={{ background: 'linear-gradient(135deg, #e11d48, #9333ea)' }}
              >
                <FiHome size={14} /> New Request
              </Link>
            </div>
          </div>

          {/* ── Stat Cards Row ── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
            {STATS.map(s => (
              <StatCard key={s.key} label={s.label} count={counts[s.key]} gradient={s.gradient} icon={s.icon} delay={s.delay} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-4xl mx-auto px-4 py-8 relative" style={{ zIndex: 1 }}>

        {/* ── Filter Tabs ── */}
        <div
          className="flex gap-2 mb-7 overflow-x-auto pb-1"
          style={{ animation: 'mlr-fadeSlideUp 0.5s ease 0.2s both' }}
        >
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={() => setFilter(t.key)}
              className={`relative px-5 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-250 active:scale-95 ${
                filter === t.key
                  ? 'text-white shadow-md'
                  : 'bg-white text-slate-500 hover:text-slate-700 border border-slate-200 hover:border-slate-300 shadow-sm'
              }`}
              style={
                filter === t.key
                  ? { background: `linear-gradient(135deg, var(--from), var(--to))`,
                      backgroundImage: `linear-gradient(135deg, ${t.color.includes('rose-500 to-fuchsia') ? '#e11d48, #9333ea' : t.color.includes('amber') ? '#f59e0b, #f97316' : t.color.includes('emerald') ? '#10b981, #14b8a6' : '#f43f5e, #e11d48'})` }
                  : {}
              }
            >
              {t.label}
              <span className="ml-1.5 text-xs opacity-70">({counts[t.key]})</span>
            </button>
          ))}
        </div>

        {/* ── Content ── */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4" style={{ animation: 'mlr-fadeIn 0.3s ease' }}>
            <div
              style={{
                width: 48, height: 48, borderRadius: '50%',
                border: '4px solid #f3e8ff',
                borderTopColor: '#9333ea',
                animation: 'mlr-spin 0.8s linear infinite',
              }}
            />
            <p className="text-slate-400 text-sm">Loading your requests…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="text-center py-24 bg-white rounded-3xl shadow-sm border border-slate-100"
            style={{ animation: 'mlr-fadeSlideUp 0.5s ease 0.1s both' }}
          >
            <div className="mlr-float text-7xl mb-5 select-none">🏠</div>
            <h2 className="text-xl font-bold text-slate-700 mb-2">
              {filter === 'all' ? 'No requests yet' : `No ${filter} requests`}
            </h2>
            <p className="text-slate-400 mb-8 text-sm">
              {filter === 'all'
                ? 'Submit your first property and start earning!'
                : `You currently have no ${filter} listing requests.`}
            </p>
            <Link
              to="/submit-listing"
              className="inline-flex items-center gap-2 text-white px-8 py-3.5 rounded-2xl font-bold hover:opacity-90 transition shadow-lg shadow-rose-200 active:scale-95"
              style={{ background: 'linear-gradient(135deg, #e11d48, #9333ea)' }}
            >
              Submit a Listing <FiArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((req, i) => (
              <RequestCard key={req._id} req={req} index={i} />
            ))}

            {/* Footer note */}
            <p
              className="text-center text-slate-400 text-xs pt-4"
              style={{ animation: `mlr-fadeIn 0.5s ease ${filtered.length * 0.09 + 0.3}s both` }}
            >
              Showing {filtered.length} of {requests.length} request{requests.length !== 1 ? 's' : ''}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
