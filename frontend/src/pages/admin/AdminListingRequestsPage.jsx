import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../utils/api'
import Spinner from '../../components/Spinner'
import toast from 'react-hot-toast'
import { FiCheckCircle, FiXCircle, FiEye, FiFilter, FiRefreshCw, FiUser, FiHome, FiDollarSign } from 'react-icons/fi'

const STATUS_COLORS = {
  pending:  'bg-amber-400/15 text-amber-400 border-amber-400/20',
  approved: 'bg-emerald-400/15 text-emerald-400 border-emerald-400/20',
  rejected: 'bg-red-400/15 text-red-400 border-red-400/20',
}

function RejectModal({ onConfirm, onCancel }) {
  const [note, setNote] = useState('')
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-slate-900 border border-white/10 rounded-2xl p-7 w-full max-w-md shadow-2xl">
        <h3 className="text-xl font-bold text-white mb-2">Reject Request</h3>
        <p className="text-slate-400 text-sm mb-4">Optionally provide feedback to help the host improve their listing.</p>
        <textarea
          className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm outline-none focus:border-red-400/50 resize-none"
          rows={4}
          placeholder="e.g. Images are not clear, please add better photos..."
          value={note}
          onChange={e => setNote(e.target.value)}
        />
        <div className="flex gap-3 mt-5">
          <button onClick={onCancel}
            className="flex-1 bg-white/10 text-white py-3 rounded-xl font-medium hover:bg-white/20 transition">
            Cancel
          </button>
          <button onClick={() => onConfirm(note)}
            className="flex-1 bg-gradient-to-r from-red-500 to-rose-600 text-white py-3 rounded-xl font-bold hover:opacity-90 transition">
            Confirm Reject
          </button>
        </div>
      </div>
    </div>
  )
}

function RequestRow({ req, onApprove, onReject }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all">
      <div className="p-5 grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-4 items-start">
        {/* Image */}
        <img
          src={req.images?.[0] || 'https://images.unsplash.com/photo-1501180336600-ac7bfea1dbe9?w=300'}
          alt={req.title}
          className="w-24 h-20 object-cover rounded-xl"
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1501180336600-ac7bfea1dbe9?w=300' }}
        />

        {/* Details */}
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="font-bold text-white">{req.title}</h3>
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${STATUS_COLORS[req.status]}`}>
              {req.status}
            </span>
          </div>
          <p className="text-slate-400 text-sm">{req.location}, {req.country} · {req.category}</p>
          <div className="flex flex-wrap gap-4 mt-2 text-sm text-slate-300">
            <span className="flex items-center gap-1"><FiDollarSign size={13} />${req.price}/night</span>
            <span className="flex items-center gap-1"><FiHome size={13} />{req.bedrooms}bd · {req.bathrooms}ba · {req.maxGuests} guests</span>
            <span className="flex items-center gap-1"><FiUser size={13} />{req.host?.name} ({req.host?.email})</span>
          </div>
          <p className="text-slate-500 text-xs mt-2">
            Submitted {new Date(req.createdAt).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' })}
          </p>
          {req.adminNote && (
            <p className="text-red-400 text-xs mt-1">Note: {req.adminNote}</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 items-end">
          <button onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10">
            <FiEye size={12} /> {expanded ? 'Hide' : 'Preview'}
          </button>
          {req.status === 'pending' && (
            <>
              <button onClick={() => onApprove(req._id)}
                className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold px-4 py-2 rounded-xl hover:opacity-90 transition">
                <FiCheckCircle size={13} /> Approve
              </button>
              <button onClick={() => onReject(req._id)}
                className="flex items-center gap-1.5 bg-gradient-to-r from-red-500 to-rose-600 text-white text-xs font-bold px-4 py-2 rounded-xl hover:opacity-90 transition">
                <FiXCircle size={13} /> Reject
              </button>
            </>
          )}
          {req.status === 'approved' && req.approvedListingId && (
            <Link to={`/listings/${req.approvedListingId}`} target="_blank"
              className="flex items-center gap-1.5 bg-emerald-500/20 text-emerald-400 text-xs font-medium px-3 py-1.5 rounded-xl hover:bg-emerald-500/30 transition border border-emerald-500/20">
              View Listing →
            </Link>
          )}
        </div>
      </div>

      {/* Expanded description preview */}
      {expanded && (
        <div className="px-5 pb-5 border-t border-white/5 pt-4">
          <p className="text-slate-400 text-sm leading-6">{req.description}</p>
          {req.amenities?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {req.amenities.map(a => (
                <span key={a} className="text-xs px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-slate-300">{a}</span>
              ))}
            </div>
          )}
          {req.images?.length > 1 && (
            <div className="flex gap-2 mt-3 overflow-x-auto">
              {req.images.slice(1).map((img, i) => (
                <img key={i} src={img} alt="" className="h-20 w-32 object-cover rounded-lg flex-shrink-0" />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function AdminListingRequestsPage() {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('pending')
  const [rejectTarget, setRejectTarget] = useState(null) // id being rejected

  useEffect(() => { fetchRequests() }, [filter])

  const fetchRequests = async () => {
    setLoading(true)
    try {
      const params = filter !== 'all' ? `?status=${filter}` : ''
      const { data } = await api.get(`/listing-requests/admin/all${params}`)
      setRequests(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (id) => {
    try {
      await api.put(`/listing-requests/${id}/approve`)
      toast.success('Request approved — listing is now live! 🎉')
      fetchRequests()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Approval failed')
    }
  }

  const handleRejectConfirm = async (note) => {
    try {
      await api.put(`/listing-requests/${rejectTarget}/reject`, { adminNote: note })
      toast.success('Request rejected — host has been notified.')
      setRejectTarget(null)
      fetchRequests()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Rejection failed')
    }
  }

  const counts = {
    all:      requests.length,
    pending:  requests.filter(r => r.status === 'pending').length,
    approved: requests.filter(r => r.status === 'approved').length,
    rejected: requests.filter(r => r.status === 'rejected').length,
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10">
      <style>{`
        @keyframes fadeIn {
          from { opacity:0; transform:translateY(15px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .fade-in { animation: fadeIn 0.4s ease both; }
      `}</style>

      {rejectTarget && (
        <RejectModal
          onConfirm={handleRejectConfirm}
          onCancel={() => setRejectTarget(null)}
        />
      )}

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Link to="/admin" className="text-slate-400 hover:text-white text-sm transition">← Admin</Link>
            </div>
            <h1 className="text-3xl font-extrabold text-white">Listing Requests</h1>
            <p className="text-slate-400 mt-1">Review and approve property listing submissions from users.</p>
          </div>
          <button onClick={fetchRequests}
            className="flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-xl text-sm hover:bg-white/20 transition">
            <FiRefreshCw size={14} /> Refresh
          </button>
        </div>

        {/* Stats summary */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Pending', val: requests.filter(r => r.status === 'pending').length, color: 'from-amber-500/20 to-amber-500/5 border-amber-500/20 text-amber-400' },
            { label: 'Approved', val: requests.filter(r => r.status === 'approved').length, color: 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/20 text-emerald-400' },
            { label: 'Rejected', val: requests.filter(r => r.status === 'rejected').length, color: 'from-red-500/20 to-red-500/5 border-red-500/20 text-red-400' },
          ].map(s => (
            <div key={s.label} className={`bg-gradient-to-br ${s.color} border rounded-2xl p-5 text-center fade-in`}>
              <p className="text-3xl font-extrabold">{s.val}</p>
              <p className="text-sm font-medium opacity-80 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {['pending', 'approved', 'rejected', 'all'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition flex items-center gap-1.5 ${
                filter === f
                  ? 'bg-gradient-to-r from-rose-500 to-fuchsia-600 text-white'
                  : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/10'
              }`}>
              <FiFilter size={12} />
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* List */}
        {loading ? (
          <div className="flex justify-center py-20"><Spinner size="lg" /></div>
        ) : requests.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-white text-xl font-bold">No {filter !== 'all' ? filter : ''} requests</p>
            <p className="text-slate-400 mt-2">Check back later or change the filter.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((req, i) => (
              <div key={req._id} className="fade-in" style={{ animationDelay: `${i * 0.06}s` }}>
                <RequestRow
                  req={req}
                  onApprove={handleApprove}
                  onReject={id => setRejectTarget(id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
