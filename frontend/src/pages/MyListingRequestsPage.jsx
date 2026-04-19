import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../utils/api'
import Spinner from '../components/Spinner'
import { FiClock, FiCheckCircle, FiXCircle, FiArrowRight, FiHome, FiRefreshCw } from 'react-icons/fi'

const STATUS_CONFIG = {
  pending:  { label: 'Under Review', icon: FiClock,        color: 'text-amber-400',  bg: 'bg-amber-400/10 border-amber-400/20' },
  approved: { label: 'Approved ✓',   icon: FiCheckCircle,  color: 'text-emerald-400',bg: 'bg-emerald-400/10 border-emerald-400/20' },
  rejected: { label: 'Not Approved', icon: FiXCircle,      color: 'text-red-400',    bg: 'bg-red-400/10 border-red-400/20' },
}

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.pending
  const Icon = cfg.icon
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${cfg.bg} ${cfg.color}`}>
      <Icon size={12} />
      {cfg.label}
    </span>
  )
}

function RequestCard({ req, index }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300"
      style={{ animation: `slideUp 0.4s ease ${index * 0.08}s both` }}
    >
      <div className="p-5 flex flex-col sm:flex-row gap-4 items-start justify-between">
        {/* Image */}
        <img
          src={req.images?.[0] || 'https://images.unsplash.com/photo-1501180336600-ac7bfea1dbe9?w=400'}
          alt={req.title}
          className="w-full sm:w-28 h-24 object-cover rounded-xl flex-shrink-0"
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1501180336600-ac7bfea1dbe9?w=400' }}
        />

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-start gap-2 mb-1">
            <h3 className="font-bold text-white text-base truncate">{req.title}</h3>
            <StatusBadge status={req.status} />
          </div>
          <p className="text-slate-400 text-sm">{req.location}, {req.country} · {req.category}</p>
          <p className="text-slate-300 text-sm mt-1">${req.price}/night · {req.maxGuests} guests · {req.bedrooms} bed</p>
          <p className="text-slate-500 text-xs mt-2">Submitted {new Date(req.createdAt).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}</p>
        </div>

        {/* Actions */}
        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          {req.status === 'approved' && req.approvedListingId && (
            <Link to={`/listings/${req.approvedListingId}`}
              className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold px-4 py-2 rounded-xl hover:opacity-90 transition">
              View Live Listing <FiArrowRight size={12} />
            </Link>
          )}
          {req.status === 'rejected' && req.adminNote && (
            <button onClick={() => setExpanded(!expanded)}
              className="text-xs text-red-400 underline underline-offset-2 hover:text-red-300 transition">
              {expanded ? 'Hide' : 'See'} feedback
            </button>
          )}
          {req.status === 'rejected' && (
            <Link to="/submit-listing"
              className="flex items-center gap-1.5 bg-white/10 text-white text-xs font-medium px-4 py-2 rounded-xl hover:bg-white/20 transition">
              Resubmit
            </Link>
          )}
        </div>
      </div>

      {/* Admin note */}
      {expanded && req.adminNote && (
        <div className="px-5 pb-5">
          <div className="bg-red-400/10 border border-red-400/20 rounded-xl p-4 text-sm text-red-300 leading-6">
            <span className="font-semibold text-red-400">Admin Feedback: </span>{req.adminNote}
          </div>
        </div>
      )}
    </div>
  )
}

export default function MyListingRequestsPage() {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => { fetchRequests() }, [])

  const fetchRequests = async () => {
    setLoading(true)
    try {
      const { data } = await api.get('/listing-requests/mine')
      setRequests(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const filtered = filter === 'all' ? requests : requests.filter(r => r.status === filter)
  const counts = {
    all: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    approved: requests.filter(r => r.status === 'approved').length,
    rejected: requests.filter(r => r.status === 'rejected').length,
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-12">
      <style>{`
        @keyframes slideUp {
          from { opacity:0; transform: translateY(20px); }
          to   { opacity:1; transform: translateY(0); }
        }
      `}</style>

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-white">My Listing Requests</h1>
            <p className="text-slate-400 mt-1">Track the status of your submitted properties.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={fetchRequests}
              className="flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-xl text-sm hover:bg-white/20 transition">
              <FiRefreshCw size={14} /> Refresh
            </button>
            <Link to="/submit-listing"
              className="flex items-center gap-2 bg-gradient-to-r from-rose-500 to-fuchsia-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition">
              <FiHome size={14} /> New Request
            </Link>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {['all', 'pending', 'approved', 'rejected'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition ${
                filter === f
                  ? 'bg-gradient-to-r from-rose-500 to-fuchsia-600 text-white'
                  : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/10'
              }`}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
              <span className="ml-1.5 text-xs opacity-70">({counts[f]})</span>
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center py-20"><Spinner size="lg" /></div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🏠</div>
            <h2 className="text-xl font-bold text-white mb-2">
              {filter === 'all' ? 'No requests yet' : `No ${filter} requests`}
            </h2>
            <p className="text-slate-400 mb-6">Submit your first property listing request.</p>
            <Link to="/submit-listing"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-fuchsia-600 text-white px-7 py-3 rounded-2xl font-bold hover:opacity-90 transition">
              Submit a Listing <FiArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((req, i) => <RequestCard key={req._id} req={req} index={i} />)}
          </div>
        )}
      </div>
    </div>
  )
}
