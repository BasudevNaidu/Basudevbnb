import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../../utils/api'
import toast from 'react-hot-toast'
import Spinner from '../../components/Spinner'
import { FiArrowLeft } from 'react-icons/fi'

const categories = ['Beach', 'Mountain', 'City', 'Luxury', 'Countryside', 'Other']

export default function AddListingPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    category: 'Other',
    amenities: '',
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    images: '',
    isFeatured: false
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title || !form.description || !form.price || !form.location) {
      toast.error('Please fill all required fields'); return
    }
    setLoading(true)
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        maxGuests: Number(form.maxGuests),
        bedrooms: Number(form.bedrooms),
        bathrooms: Number(form.bathrooms),
        amenities: form.amenities.split(',').map(a => a.trim()).filter(Boolean),
        images: form.images.split(',').map(u => u.trim()).filter(Boolean)
      }
      await api.post('/listings', payload)
      toast.success('Listing created successfully!')
      navigate('/admin/listings')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create listing')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/admin/listings" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 text-sm">
        <FiArrowLeft size={16} /> Back to listings
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Add New Listing</h1>

      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
          <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Beachfront Paradise Villa"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} placeholder="Describe your property..."
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price per night ($) *</label>
            <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="150"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
              {categories.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
          <input type="text" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="e.g. Malibu, California"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Max Guests</label>
            <input type="number" min="1" value={form.maxGuests} onChange={(e) => setForm({ ...form, maxGuests: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
            <input type="number" min="0" value={form.bedrooms} onChange={(e) => setForm({ ...form, bedrooms: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
            <input type="number" min="1" value={form.bathrooms} onChange={(e) => setForm({ ...form, bathrooms: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Amenities (comma separated)</label>
          <input type="text" value={form.amenities} onChange={(e) => setForm({ ...form, amenities: e.target.value })} placeholder="WiFi, Pool, Kitchen, Parking"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image URLs (comma separated)</label>
          <textarea value={form.images} onChange={(e) => setForm({ ...form, images: e.target.value })} rows={2} placeholder="https://images.unsplash.com/..., https://..."
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none" />
          <p className="text-xs text-gray-400 mt-1">Paste Unsplash or any image URLs, comma separated</p>
        </div>

        <div className="flex items-center gap-3">
          <input type="checkbox" id="featured" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
            className="w-4 h-4 accent-primary-500 rounded" />
          <label htmlFor="featured" className="text-sm font-medium text-gray-700">Mark as Featured (show on homepage)</label>
        </div>

        <button type="submit" disabled={loading}
          className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-xl font-semibold transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
          {loading && <Spinner size="sm" />}
          {loading ? 'Creating...' : 'Create Listing'}
        </button>
      </form>
    </div>
  )
}
