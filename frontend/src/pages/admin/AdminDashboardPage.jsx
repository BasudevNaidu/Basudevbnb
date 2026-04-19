import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../utils/api'
import {
  FiHome, FiUsers, FiCalendar, FiPlusCircle, FiList,
  FiInbox, FiArrowRight, FiTrendingUp, FiStar,
  FiMapPin, FiDollarSign, FiActivity, FiEye
} from 'react-icons/fi'

/* ── Animated counter ── */
function useCounter(target, duration = 1800, run = false) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!run || target === 0) return
    let start = null
    const step = ts => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 4)
      setVal(Math.floor(ease * target))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, run])
  return val
}

/* ── Stat Card ── */
function StatCard({ icon: Icon, label, count, iconBg, iconColor, borderColor, delay, run, link, trend }) {
  const animated = useCounter(count, 1800, run)
  return (
    <Link to={link}
      className="stat-card group bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer block"
      style={{ animation: `cardIn 0.6s cubic-bezier(0.34,1.56,0.64,1) ${delay}s both`, borderLeftWidth: '4px', borderLeftColor: borderColor }}>
      <div className="flex items-start justify-between mb-5">
        <div className={`w-12 h-12 rounded-2xl ${iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <Icon size={22} className={iconColor} />
        </div>
        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1">
          <FiTrendingUp size={10} /> {trend}
        </span>
      </div>
      <p className="text-4xl font-extrabold text-gray-900 tabular-nums">{animated.toLocaleString()}</p>
      <p className="text-gray-500 font-medium text-sm mt-1.5">{label}</p>
      <div className="mt-4 flex items-center gap-1 text-xs font-medium" style={{ color: borderColor }}>
        View details <FiArrowRight size={11} className="group-hover:translate-x-1 transition-transform duration-200" />
      </div>
    </Link>
  )
}

/* ── Section Header ── */
function SectionHeader({ icon: Icon, title, iconColor, action }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-2.5">
        <div className={`w-8 h-8 rounded-xl ${iconColor} flex items-center justify-center`}>
          <Icon size={15} className="text-white" />
        </div>
        <h2 className="text-base font-bold text-gray-800">{title}</h2>
      </div>
      {action}
    </div>
  )
}

const CATEGORY_STYLES = {
  Beach:       { bg: 'bg-cyan-50',     text: 'text-cyan-700',    dot: 'bg-cyan-400' },
  Mountain:    { bg: 'bg-emerald-50',  text: 'text-emerald-700', dot: 'bg-emerald-400' },
  City:        { bg: 'bg-violet-50',   text: 'text-violet-700',  dot: 'bg-violet-400' },
  Luxury:      { bg: 'bg-amber-50',    text: 'text-amber-700',   dot: 'bg-amber-400' },
  Countryside: { bg: 'bg-lime-50',     text: 'text-lime-700',    dot: 'bg-lime-400' },
  Other:       { bg: 'bg-gray-100',    text: 'text-gray-600',    dot: 'bg-gray-400' },
}

const BOOKING_STATUS = {
  confirmed: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-400' },
  cancelled: { bg: 'bg-red-50',     text: 'text-red-700',     dot: 'bg-red-400' },
  pending:   { bg: 'bg-amber-50',   text: 'text-amber-700',   dot: 'bg-amber-400' },
}

const GUEST_GRADIENTS = [
  'from-rose-400 to-fuchsia-500',
  'from-violet-400 to-indigo-500',
  'from-emerald-400 to-teal-500',
  'from-amber-400 to-orange-500',
  'from-cyan-400 to-sky-500',
]

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ listings: 0, users: 0, bookings: 0, pendingRequests: 0 })
  const [recentListings, setRecentListings] = useState([])
  const [recentBookings, setRecentBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [runCounters, setRunCounters] = useState(false)

  useEffect(() => { fetchData() }, [])

  const fetchData = async () => {
    try {
      const [listingsRes, usersRes, bookingsRes, requestsRes] = await Promise.all([
        api.get('/listings/admin/all'),
        api.get('/users/admin/all'),
        api.get('/bookings/admin/all'),
        api.get('/listing-requests/admin/all?status=pending')
      ])
      setStats({
        listings: listingsRes.data.length,
        users: usersRes.data.length,
        bookings: bookingsRes.data.length,
        pendingRequests: requestsRes.data.length
      })
      setRecentListings(listingsRes.data.slice(0, 5))
      setRecentBookings(bookingsRes.data.slice(0, 5))
      setTimeout(() => setRunCounters(true), 400)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <style>{`@keyframes spin{to{transform:rotate(360deg)}} @keyframes pulse{0%,100%{opacity:.5}50%{opacity:1}}`}</style>
      <div className="text-center">
        <div className="w-12 h-12 rounded-full border-3 border-rose-200 border-t-rose-500 mx-auto mb-4"
          style={{ borderWidth: 3, animation: 'spin 0.8s linear infinite' }} />
        <p className="text-gray-400 text-sm" style={{ animation: 'pulse 1.5s ease infinite' }}>Loading dashboard…</p>
      </div>
    </div>
  )

  const statCards = [
    { icon: FiHome,     label: 'Total Listings',     count: stats.listings,        iconBg: 'bg-rose-50',    iconColor: 'text-rose-500',    borderColor: '#f43f5e', link: '/admin/listings',          delay: 0.05, trend: 'Active' },
    { icon: FiUsers,    label: 'Registered Users',   count: stats.users,           iconBg: 'bg-violet-50',  iconColor: 'text-violet-500',  borderColor: '#8b5cf6', link: '#',                        delay: 0.15, trend: 'Total' },
    { icon: FiCalendar, label: 'Total Bookings',     count: stats.bookings,        iconBg: 'bg-emerald-50', iconColor: 'text-emerald-500', borderColor: '#10b981', link: '#',                        delay: 0.25, trend: 'All time' },
    { icon: FiInbox,    label: 'Pending Requests',   count: stats.pendingRequests, iconBg: 'bg-amber-50',   iconColor: 'text-amber-500',   borderColor: '#f59e0b', link: '/admin/listing-requests',  delay: 0.35, trend: 'Review now' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        @keyframes cardIn {
          from { opacity:0; transform: translateY(28px) scale(0.96); }
          to   { opacity:1; transform: translateY(0) scale(1); }
        }
        @keyframes slideUp {
          from { opacity:0; transform: translateY(18px); }
          to   { opacity:1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity:0; } to { opacity:1; }
        }
        @keyframes barGrow { from { width:0; } }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.35} }
        .live-dot { animation: blink 1.8s ease infinite; }
        .stat-card:hover { border-left-width: 6px !important; }
        .list-row:hover { background: #fafafa; }
        .action-card:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,0,0,0.1); }
      `}</style>

      {/* ── Top bar ──────────────────────────────── */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20 shadow-sm"
        style={{ animation: 'fadeIn 0.5s ease both' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-rose-500 to-fuchsia-600 flex items-center justify-center shadow-sm">
              <FiActivity size={16} className="text-white" />
            </div>
            <div>
              <span className="text-gray-900 font-bold text-lg">Admin</span>
              <span className="text-rose-500 font-bold text-lg">Panel</span>
            </div>
            <div className="flex items-center gap-1.5 ml-3 bg-emerald-50 text-emerald-600 text-xs font-semibold px-2.5 py-1 rounded-full">
              <div className="live-dot w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Live
            </div>
          </div>
          <Link to="/admin/listings/add"
            className="flex items-center gap-2 bg-gradient-to-r from-rose-500 to-fuchsia-600 text-white px-4 py-2.5 rounded-xl font-semibold text-sm hover:opacity-90 hover:scale-105 transition-all duration-200 shadow-sm">
            <FiPlusCircle size={16} /> Add Listing
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Page title ───────────────────────────── */}
        <div className="mb-8" style={{ animation: 'slideUp 0.5s ease 0.05s both' }}>
          <h1 className="text-3xl font-extrabold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1 text-sm">
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>

        {/* ── Stat cards ───────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
          {statCards.map(s => <StatCard key={s.label} {...s} run={runCounters} />)}
        </div>

        {/* ── Overview bars ────────────────────────── */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7 mb-8"
          style={{ animation: 'slideUp 0.5s ease 0.45s both' }}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-gradient-to-br from-rose-500 to-fuchsia-600 rounded-xl flex items-center justify-center">
                <FiTrendingUp size={15} className="text-white" />
              </div>
              <h2 className="font-bold text-gray-800">Platform Overview</h2>
            </div>
            <span className="text-xs text-gray-400 border border-gray-200 rounded-full px-3 py-1 font-medium">All time</span>
          </div>
          <div className="space-y-5">
            {[
              { label: 'Listings',          val: stats.listings,        pct: 100,                                                                                                       color: 'from-rose-400 to-rose-500',     bg: 'bg-rose-50' },
              { label: 'Users',             val: stats.users,           pct: Math.min(stats.listings ? (stats.users / Math.max(stats.listings,1)) * 70 : 65, 100),                   color: 'from-violet-400 to-violet-500', bg: 'bg-violet-50' },
              { label: 'Bookings',          val: stats.bookings,        pct: Math.min(stats.listings ? (stats.bookings / Math.max(stats.listings,1)) * 80 : 45, 100),                color: 'from-emerald-400 to-emerald-500', bg: 'bg-emerald-50' },
              { label: 'Pending Requests',  val: stats.pendingRequests, pct: Math.min(stats.listings ? (stats.pendingRequests / Math.max(stats.listings,1)) * 100 : 15, 100),        color: 'from-amber-400 to-amber-500',   bg: 'bg-amber-50' },
            ].map((row, i) => (
              <div key={row.label} className="flex items-center gap-4"
                style={{ animation: `slideUp 0.4s ease ${0.55 + i * 0.1}s both` }}>
                <span className="text-gray-500 text-xs font-medium w-36 flex-shrink-0">{row.label}</span>
                <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full bg-gradient-to-r ${row.color}`}
                    style={{ width: `${row.pct}%`, animation: `barGrow 1.4s cubic-bezier(0.22,1,0.36,1) ${0.6 + i * 0.12}s both` }} />
                </div>
                <span className="text-gray-900 font-bold text-sm w-8 text-right tabular-nums">{row.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Quick Actions ─────────────────────────── */}
        <div className="mb-8" style={{ animation: 'slideUp 0.5s ease 0.55s both' }}>
          <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-base">
            <span className="w-1.5 h-5 bg-gradient-to-b from-rose-500 to-fuchsia-600 rounded-full inline-block" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: FiList,        label: 'Manage Listings',      desc: 'Edit, delete & feature properties',   to: '/admin/listings',          from: 'from-rose-500',    to2: 'to-fuchsia-600', delay: 0.6 },
              { icon: FiPlusCircle,  label: 'Add New Listing',      desc: 'Publish a property directly',         to: '/admin/listings/add',      from: 'from-violet-500',  to2: 'to-indigo-600',  delay: 0.68 },
              { icon: FiInbox,       label: 'Host Requests',        desc: 'Review & approve submissions',        to: '/admin/listing-requests',  from: 'from-amber-500',   to2: 'to-orange-500',  delay: 0.76, badge: stats.pendingRequests },
            ].map(card => (
              <Link key={card.label} to={card.to}
                className="action-card bg-white border border-gray-100 rounded-2xl p-5 flex items-start gap-4 transition-all duration-300 shadow-sm"
                style={{ animation: `cardIn 0.5s ease ${card.delay}s both` }}>
                <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${card.from} ${card.to2} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                  <card.icon size={18} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-gray-800 text-sm">{card.label}</p>
                    {card.badge > 0 && (
                      <span className="bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-pulse">{card.badge}</span>
                    )}
                  </div>
                  <p className="text-gray-400 text-xs mt-0.5">{card.desc}</p>
                </div>
                <FiArrowRight size={14} className="text-gray-300 flex-shrink-0 mt-1 group-hover:text-gray-500 transition-colors" />
              </Link>
            ))}
          </div>
        </div>

        {/* ── Recent Activity ────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Recent Listings */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
            style={{ animation: 'slideUp 0.5s ease 0.85s both' }}>
            <div className="px-6 pt-6 pb-4 border-b border-gray-50">
              <SectionHeader
                icon={FiHome}
                title="Recent Listings"
                iconColor="bg-gradient-to-br from-rose-500 to-fuchsia-600"
                action={
                  <Link to="/admin/listings"
                    className="text-rose-500 text-xs font-semibold hover:text-rose-600 flex items-center gap-1 transition-colors">
                    View all <FiArrowRight size={12} />
                  </Link>
                }
              />
            </div>
            <div className="divide-y divide-gray-50">
              {recentListings.length === 0 ? (
                <div className="py-14 text-center">
                  <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <FiHome size={24} className="text-gray-300" />
                  </div>
                  <p className="text-gray-400 text-sm font-medium">No listings yet</p>
                  <Link to="/admin/listings/add" className="text-rose-500 text-xs mt-1 inline-block hover:underline">Add your first →</Link>
                </div>
              ) : recentListings.map((listing, i) => {
                const cat = CATEGORY_STYLES[listing.category] || CATEGORY_STYLES.Other
                return (
                  <div key={listing._id}
                    className="list-row flex items-center gap-4 px-6 py-4 transition-colors duration-150"
                    style={{ animation: `slideUp 0.4s ease ${0.9 + i * 0.07}s both` }}>
                    {/* Image */}
                    <div className="relative flex-shrink-0">
                      <img
                        src={listing.images?.[0] || 'https://images.unsplash.com/photo-1501180336600-ac7bfea1dbe9?w=200'}
                        alt={listing.title}
                        className="w-16 h-14 rounded-2xl object-cover"
                        onError={e => { e.target.src = 'https://images.unsplash.com/photo-1501180336600-ac7bfea1dbe9?w=200' }}
                      />
                      {listing.isFeatured && (
                        <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center shadow-sm ring-2 ring-white">
                          <FiStar size={9} className="text-white fill-white" />
                        </div>
                      )}
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-800 text-sm truncate">{listing.title}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <FiMapPin size={10} className="text-gray-400 flex-shrink-0" />
                        <p className="text-gray-400 text-xs truncate">{listing.location}{listing.country ? `, ${listing.country}` : ''}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`${cat.bg} ${cat.text} text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${cat.dot}`} />
                          {listing.category}
                        </span>
                        {listing.rating > 0 && (
                          <span className="flex items-center gap-0.5 text-[10px] font-semibold text-amber-600">
                            <FiStar size={9} className="fill-amber-400 text-amber-400" /> {listing.rating}
                          </span>
                        )}
                      </div>
                    </div>
                    {/* Price + Actions */}
                    <div className="text-right flex-shrink-0 space-y-2">
                      <div>
                        <p className="text-gray-900 font-extrabold text-sm">${listing.price}</p>
                        <p className="text-gray-400 text-[10px]">per night</p>
                      </div>
                      <Link to={`/admin/listings/edit/${listing._id}`}
                        className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
                        onClick={e => e.stopPropagation()}>
                        <FiEye size={9} /> Edit
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
            style={{ animation: 'slideUp 0.5s ease 0.9s both' }}>
            <div className="px-6 pt-6 pb-4 border-b border-gray-50">
              <SectionHeader
                icon={FiCalendar}
                title="Recent Bookings"
                iconColor="bg-gradient-to-br from-emerald-500 to-teal-600"
                action={
                  <span className="text-xs text-gray-400 bg-gray-50 border border-gray-100 px-3 py-1 rounded-full font-medium">
                    {recentBookings.length} entries
                  </span>
                }
              />
            </div>
            <div className="divide-y divide-gray-50">
              {recentBookings.length === 0 ? (
                <div className="py-14 text-center">
                  <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <FiCalendar size={24} className="text-gray-300" />
                  </div>
                  <p className="text-gray-400 text-sm font-medium">No bookings yet</p>
                </div>
              ) : recentBookings.map((b, i) => {
                const statusStyle = BOOKING_STATUS[b.status] || BOOKING_STATUS.pending
                const gradient = GUEST_GRADIENTS[i % GUEST_GRADIENTS.length]
                return (
                  <div key={b._id}
                    className="list-row flex items-center gap-4 px-6 py-4 transition-colors duration-150"
                    style={{ animation: `slideUp 0.4s ease ${0.95 + i * 0.07}s both` }}>
                    {/* Avatar */}
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0 text-white font-extrabold text-lg shadow-sm`}>
                      {b.user?.name?.charAt(0)?.toUpperCase() || 'G'}
                    </div>
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-800 text-sm truncate">{b.listing?.title || 'Deleted Listing'}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <FiUsers size={10} className="text-gray-400" />
                        <p className="text-gray-500 text-xs font-medium">{b.user?.name || 'Unknown Guest'}</p>
                      </div>
                      {b.checkIn && (
                        <div className="flex items-center gap-1 mt-1.5">
                          <FiCalendar size={9} className="text-gray-300" />
                          <p className="text-gray-400 text-[10px]">
                            {new Date(b.checkIn).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' })}
                            {b.checkOut ? ` → ${new Date(b.checkOut).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' })}` : ''}
                          </p>
                        </div>
                      )}
                    </div>
                    {/* Amount + Status */}
                    <div className="text-right flex-shrink-0 space-y-2">
                      <div>
                        <p className="text-gray-900 font-extrabold text-sm flex items-center justify-end gap-0.5">
                          <FiDollarSign size={12} className="text-gray-500" />{b.totalPrice || 0}
                        </p>
                        <p className="text-gray-400 text-[10px]">total</p>
                      </div>
                      <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full ${statusStyle.bg} ${statusStyle.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
                        {b.status}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
