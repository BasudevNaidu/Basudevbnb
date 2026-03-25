import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../utils/api'
import Spinner from '../../components/Spinner'
import toast from 'react-hot-toast'
import { FiPlus, FiEdit2, FiTrash2, FiStar } from 'react-icons/fi'

export default function ManageListingsPage() {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(null)

  useEffect(() => {
    fetchListings()
  }, [])

  const fetchListings = async () => {
    try {
      const { data } = await api.get('/listings/admin/all')
      setListings(data)
    } catch (e) {
      toast.error('Failed to load listings')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this listing? This cannot be undone.')) return
    setDeleting(id)
    try {
      await api.delete(`/listings/${id}`)
      setListings(listings.filter(l => l._id !== id))
      toast.success('Listing deleted')
    } catch {
      toast.error('Failed to delete listing')
    } finally {
      setDeleting(null)
    }
  }

  if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Listings</h1>
          <p className="text-gray-500 text-sm mt-1">{listings.length} total listings</p>
        </div>
        <Link to="/admin/listings/add" className="flex items-center gap-2 bg-primary-500 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-primary-600 transition-colors">
          <FiPlus size={18} />
          Add Listing
        </Link>
      </div>

      {listings.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 mb-4">No listings yet</p>
          <Link to="/admin/listings/add" className="bg-primary-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-600 transition-colors">
            Add your first listing
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Property</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Category</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Price</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Rating</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Featured</th>
                  <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {listings.map((listing) => (
                  <tr key={listing._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={listing.images?.[0] || 'https://images.unsplash.com/photo-1501180336600-ac7bfea1dbe9?w=100'}
                          alt=""
                          className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1501180336600-ac7bfea1dbe9?w=100' }}
                        />
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{listing.title}</p>
                          <p className="text-xs text-gray-500">{listing.location}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-full font-medium">{listing.category}</span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">${listing.price}/night</td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1 text-sm text-gray-700">
                        <FiStar size={13} className="fill-current" />
                        {listing.rating || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${listing.isFeatured ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-500'}`}>
                        {listing.isFeatured ? 'Featured' : 'No'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/listings/edit/${listing._id}`}
                          className="flex items-center gap-1 text-blue-500 hover:text-blue-700 text-sm border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          <FiEdit2 size={14} />
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(listing._id)}
                          disabled={deleting === listing._id}
                          className="flex items-center gap-1 text-red-500 hover:text-red-700 text-sm border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-60"
                        >
                          <FiTrash2 size={14} />
                          {deleting === listing._id ? '...' : 'Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
