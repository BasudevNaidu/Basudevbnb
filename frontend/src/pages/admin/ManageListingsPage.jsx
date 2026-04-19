import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../utils/api'
import toast from 'react-hot-toast'
import { FiPlus, FiEdit2, FiTrash2, FiStar, FiSearch, FiMapPin, FiArrowLeft, FiHome, FiGrid, FiList as FiListIcon } from 'react-icons/fi'

const CATEGORY_STYLES = {
  Beach:       { bg: 'bg-cyan-50',     text: 'text-cyan-700',    dot: 'bg-cyan-400',    border: 'border-cyan-100' },
  Mountain:    { bg: 'bg-emerald-50',  text: 'text-emerald-700', dot: 'bg-emerald-400', border: 'border-emerald-100' },
  City:        { bg: 'bg-violet-50',   text: 'text-violet-700',  dot: 'bg-violet-400',  border: 'border-violet-100' },
  Luxury:      { bg: 'bg-amber-50',    text: 'text-amber-700',   dot: 'bg-amber-400',   border: 'border-amber-100' },
  Countryside: { bg: 'bg-lime-50',     text: 'text-lime-700',    dot: 'bg-lime-400',    border: 'border-lime-100' },
  Other:       { bg: 'bg-gray-100',    text: 'text-gray-600',    dot: 'bg-gray-400',    border: 'border-gray-200' },
}

function DeleteModal({ title, onConfirm, onCancel, loading }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-white rounded-3xl p-8 w-full max-w-sm shadow-2xl border border-gray-100"
        style={{ animation: 'popIn 0.3s cubic-bezier(0.34,1.56,0.64,1) both' }}>
        <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-5">
          <FiTrash2 size={28} className="text-red-400" />
        </div>
        <h3 className="text-xl font-extrabold text-gray-900 text-center mb-2">Delete listing?</h3>
        <p className="text-gray-500 text-sm text-center leading-6 mb-7">
          <span className="font-semibold text-gray-700">"{title}"</span> will be permanently removed and cannot be recovered.
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel}
            className="flex-1 bg-gray-50 border border-gray-200 text-gray-700 py-3 rounded-2xl font-semibold hover:bg-gray-100 transition text-sm">
            Cancel
          </button>
          <button onClick={onConfirm} disabled={loading}
            className="flex-1 bg-gradient-to-r from-red-500 to-rose-500 text-white py-3 rounded-2xl font-bold hover:opacity-90 transition text-sm disabled:opacity-60">
            {loading ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── Listing card (grid view) ── */
function ListingCard({ listing, onDelete, index }) {
  const cat = CATEGORY_STYLES[listing.category] || CATEGORY_STYLES.Other
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
      style={{ animation: `cardIn 0.5s cubic-bezier(0.34,1.56,0.64,1) ${0.1 + index * 0.05}s both` }}>
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={listing.images?.[0] || 'https://images.unsplash.com/photo-1501180336600-ac7bfea1dbe9?w=400'}
          alt={listing.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1501180336600-ac7bfea1dbe9?w=400' }}
        />
        {/* Featured badge */}
        {listing.isFeatured && (
          <span className="absolute top-3 left-3 bg-amber-400 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow flex items-center gap-1">
            <FiStar size={9} className="fill-white" /> Featured
          </span>
        )}
        {/* Category */}
        <span className={`absolute top-3 right-3 ${cat.bg} ${cat.text} text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 border ${cat.border}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${cat.dot}`} />
          {listing.category}
        </span>
      </div>
      {/* Body */}
      <div className="p-5">
        <h3 className="font-bold text-gray-900 text-sm truncate mb-1">{listing.title}</h3>
        <div className="flex items-center gap-1 text-gray-400 text-xs mb-3">
          <FiMapPin size={10} />
          <span className="truncate">{listing.location}{listing.country ? `, ${listing.country}` : ''}</span>
        </div>
        {/* Stats row */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xl font-extrabold text-gray-900">${listing.price}</p>
            <p className="text-gray-400 text-[10px]">per night</p>
          </div>
          {listing.rating > 0 && (
            <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-xl">
              <FiStar size={11} className="text-amber-400 fill-amber-400" />
              <span className="text-amber-700 font-bold text-xs">{listing.rating}</span>
            </div>
          )}
        </div>
        {/* Extra info */}
        <div className="flex gap-2 text-[10px] text-gray-400 mb-4">
          <span className="bg-gray-50 px-2 py-1 rounded-lg">{listing.bedrooms} bed</span>
          <span className="bg-gray-50 px-2 py-1 rounded-lg">{listing.bathrooms} bath</span>
          <span className="bg-gray-50 px-2 py-1 rounded-lg">{listing.maxGuests} guests</span>
        </div>
        {/* Actions */}
        <div className="flex gap-2">
          <Link to={`/admin/listings/edit/${listing._id}`}
            className="flex-1 flex items-center justify-center gap-1.5 bg-violet-50 text-violet-600 text-xs font-bold py-2.5 rounded-xl hover:bg-violet-100 transition-colors border border-violet-100">
            <FiEdit2 size={12} /> Edit
          </Link>
          <button onClick={() => onDelete(listing._id, listing.title)}
            className="flex-1 flex items-center justify-center gap-1.5 bg-red-50 text-red-500 text-xs font-bold py-2.5 rounded-xl hover:bg-red-100 transition-colors border border-red-100">
            <FiTrash2 size={12} /> Delete
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── Listing row (list view) ── */
function ListingRow({ listing, onDelete, index }) {
  const cat = CATEGORY_STYLES[listing.category] || CATEGORY_STYLES.Other
  return (
    <div className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors duration-150 border-b border-gray-50 last:border-0"
      style={{ animation: `slideUp 0.35s ease ${0.15 + index * 0.05}s both` }}>
      <div className="relative flex-shrink-0">
        <img
          src={listing.images?.[0] || 'https://images.unsplash.com/photo-1501180336600-ac7bfea1dbe9?w=200'}
          alt={listing.title}
          className="w-16 h-14 rounded-2xl object-cover"
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1501180336600-ac7bfea1dbe9?w=200' }}
        />
        {listing.isFeatured && (
          <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center ring-2 ring-white shadow">
            <FiStar size={9} className="text-white fill-white" />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-gray-800 text-sm truncate">{listing.title}</p>
        <div className="flex items-center gap-1 mt-0.5">
          <FiMapPin size={10} className="text-gray-400" />
          <p className="text-gray-400 text-xs truncate">{listing.location}{listing.country ? `, ${listing.country}` : ''}</p>
        </div>
        <div className="flex items-center gap-2 mt-1.5">
          <span className={`${cat.bg} ${cat.text} text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 border ${cat.border}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${cat.dot}`} />{listing.category}
          </span>
          <span className="text-gray-300 text-[10px]">{listing.bedrooms}bd · {listing.bathrooms}ba · {listing.maxGuests} guests</span>
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        {listing.rating > 0 && (
          <span className="hidden sm:flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg mr-1">
            <FiStar size={10} className="text-amber-400 fill-amber-400" />
            <span className="text-amber-700 font-bold text-xs">{listing.rating}</span>
          </span>
        )}
        <div className="text-right mr-2">
          <p className="text-gray-900 font-extrabold text-sm">${listing.price}</p>
          <p className="text-gray-400 text-[10px]">/ night</p>
        </div>
        <Link to={`/admin/listings/edit/${listing._id}`}
          className="flex items-center gap-1 bg-violet-50 text-violet-600 text-xs font-bold px-3 py-2 rounded-xl hover:bg-violet-100 transition border border-violet-100">
          <FiEdit2 size={11} /> Edit
        </Link>
        <button onClick={() => onDelete(listing._id, listing.title)}
          className="flex items-center gap-1 bg-red-50 text-red-500 text-xs font-bold px-3 py-2 rounded-xl hover:bg-red-100 transition border border-red-100">
          <FiTrash2 size={11} /> Del
        </button>
      </div>
    </div>
  )
}

export default function ManageListingsPage() {
  const [listings, setListings] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState('All')
  const [viewMode, setViewMode] = useState('grid') // 'grid' | 'list'

  useEffect(() => { fetchListings() }, [])

  useEffect(() => {
    let list = listings
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(l => l.title.toLowerCase().includes(q) || l.location.toLowerCase().includes(q))
    }
    if (catFilter !== 'All') list = list.filter(l => l.category === catFilter)
    setFiltered(list)
  }, [listings, search, catFilter])

  const fetchListings = async () => {
    try {
      const { data } = await api.get('/listings/admin/all')
      setListings(data)
    } catch {
      toast.error('Failed to load listings')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteRequest = (id, title) => setDeleteTarget({ id, title })

  const handleDeleteConfirm = async () => {
    setDeleting(true)
    try {
      await api.delete(`/listings/${deleteTarget.id}`)
      setListings(prev => prev.filter(l => l._id !== deleteTarget.id))
      toast.success('Listing deleted successfully')
    } catch {
      toast.error('Failed to delete listing')
    } finally {
      setDeleting(false)
      setDeleteTarget(null)
    }
  }

  const categories = ['All', ...new Set(listings.map(l => l.category))]

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <style>{`@keyframes spin{to{transform:rotate(360deg)}} @keyframes pulse{0%,100%{opacity:.5}50%{opacity:1}}`}</style>
      <div className="text-center">
        <div className="w-12 h-12 rounded-full border-rose-200 border-t-rose-500 mx-auto mb-4"
          style={{ borderWidth: 3, borderStyle: 'solid', animation: 'spin 0.8s linear infinite' }} />
        <p className="text-gray-400 text-sm" style={{ animation: 'pulse 1.5s ease infinite' }}>Loading listings…</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        @keyframes cardIn { from{opacity:0;transform:translateY(24px) scale(0.96)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes slideUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes popIn { from{opacity:0;transform:scale(0.85)} to{opacity:1;transform:scale(1)} }
      `}</style>

      {deleteTarget && (
        <DeleteModal
          title={deleteTarget.title}
          loading={deleting}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {/* ── Sticky header ── */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20 shadow-sm"
        style={{ animation: 'fadeIn 0.4s ease both' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link to="/admin" className="text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1.5 text-sm font-medium">
              <FiArrowLeft size={15} /> Dashboard
            </Link>
            <span className="text-gray-200">|</span>
            <h1 className="font-extrabold text-gray-900">Manage Listings</h1>
            <span className="bg-gray-100 text-gray-500 text-xs font-bold px-2.5 py-1 rounded-full">{listings.length}</span>
          </div>
          <Link to="/admin/listings/add"
            className="flex items-center gap-2 bg-gradient-to-r from-rose-500 to-fuchsia-600 text-white px-4 py-2.5 rounded-xl font-semibold text-sm hover:opacity-90 hover:scale-105 transition-all shadow-sm">
            <FiPlus size={16} /> Add Listing
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Search + Filters + View toggle ── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8" style={{ animation: 'slideUp 0.4s ease 0.1s both' }}>
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <FiSearch size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search title or location…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-rose-400 focus:ring-3 focus:ring-rose-100 transition-all shadow-sm"
            />
          </div>
          {/* Category pills */}
          <div className="flex gap-2 overflow-x-auto pb-0.5 flex-1">
            {categories.map((c, i) => (
              <button key={c} onClick={() => setCatFilter(c)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-200 border ${
                  catFilter === c
                    ? 'bg-gradient-to-r from-rose-500 to-fuchsia-600 text-white border-transparent shadow-sm'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-rose-300 hover:text-rose-500'
                }`}
                style={{ animation: `cardIn 0.3s ease ${0.12 + i * 0.04}s both` }}>
                {c}
              </button>
            ))}
          </div>
          {/* View toggle */}
          <div className="flex bg-white border border-gray-200 rounded-2xl p-1 gap-1 shadow-sm flex-shrink-0">
            <button onClick={() => setViewMode('grid')}
              className={`p-2 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-rose-500 text-white shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>
              <FiGrid size={15} />
            </button>
            <button onClick={() => setViewMode('list')}
              className={`p-2 rounded-xl transition-all ${viewMode === 'list' ? 'bg-rose-500 text-white shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>
              <FiListIcon size={15} />
            </button>
          </div>
        </div>

        {/* ── Results count ── */}
        {filtered.length > 0 && (
          <p className="text-gray-400 text-xs font-medium mb-5" style={{ animation: 'fadeIn 0.4s ease 0.3s both' }}>
            Showing <span className="text-gray-700 font-bold">{filtered.length}</span> of {listings.length} listings
            {catFilter !== 'All' && <span> in <span className="text-rose-500">{catFilter}</span></span>}
            {search && <span> matching "<span className="text-rose-500">{search}</span>"</span>}
          </p>
        )}

        {/* ── Empty state ── */}
        {filtered.length === 0 && (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm py-20 text-center"
            style={{ animation: 'fadeIn 0.4s ease both' }}>
            <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mx-auto mb-5">
              <FiHome size={32} className="text-gray-300" />
            </div>
            <p className="text-gray-800 font-bold text-lg mb-1">No listings found</p>
            <p className="text-gray-400 text-sm mb-6">Try adjusting your search or filter.</p>
            <Link to="/admin/listings/add"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-fuchsia-600 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:opacity-90 transition">
              <FiPlus size={15} /> Add First Listing
            </Link>
          </div>
        )}

        {/* ── Grid view ── */}
        {filtered.length > 0 && viewMode === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((listing, i) => (
              <ListingCard key={listing._id} listing={listing} onDelete={handleDeleteRequest} index={i} />
            ))}
          </div>
        )}

        {/* ── List view ── */}
        {filtered.length > 0 && viewMode === 'list' && (
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
            style={{ animation: 'slideUp 0.4s ease 0.2s both' }}>
            {filtered.map((listing, i) => (
              <ListingRow key={listing._id} listing={listing} onDelete={handleDeleteRequest} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
