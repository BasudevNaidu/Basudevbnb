import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../utils/api'
import Spinner from '../../components/Spinner'
import { FiHome, FiUsers, FiCalendar, FiPlusCircle, FiList } from 'react-icons/fi'

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ listings: 0, users: 0, bookings: 0 })
  const [recentListings, setRecentListings] = useState([])
  const [recentBookings, setRecentBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [listingsRes, usersRes, bookingsRes] = await Promise.all([
        api.get('/listings/admin/all'),
        api.get('/users/admin/all'),
        api.get('/bookings/admin/all')
      ])
      setStats({ listings: listingsRes.data.length, users: usersRes.data.length, bookings: bookingsRes.data.length })
      setRecentListings(listingsRes.data.slice(0, 5))
      setRecentBookings(bookingsRes.data.slice(0, 5))
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage your Basudevbnb platform</p>
        </div>
        <Link to="/admin/listings/add" className="flex items-center gap-2 bg-primary-500 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-primary-600 transition-colors">
          <FiPlusCircle size={18} />
          Add Listing
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          { icon: <FiHome size={28} className="text-primary-500" />, label: 'Total Listings', count: stats.listings, bg: 'bg-red-50', link: '/admin/listings' },
          { icon: <FiUsers size={28} className="text-blue-500" />, label: 'Total Users', count: stats.users, bg: 'bg-blue-50', link: '#' },
          { icon: <FiCalendar size={28} className="text-green-500" />, label: 'Total Bookings', count: stats.bookings, bg: 'bg-green-50', link: '#' },
        ].map((s) => (
          <Link key={s.label} to={s.link} className={`${s.bg} rounded-2xl p-6 flex items-center gap-5 hover:shadow-md transition-shadow`}>
            <div className="bg-white p-4 rounded-xl shadow-sm">{s.icon}</div>
            <div>
              <p className="text-4xl font-bold text-gray-900">{s.count}</p>
              <p className="text-gray-600 font-medium">{s.label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <Link to="/admin/listings" className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
          <FiList size={20} className="text-primary-500" />
          <span className="font-medium text-gray-800">Manage Listings</span>
        </Link>
        <Link to="/admin/listings/add" className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
          <FiPlusCircle size={20} className="text-primary-500" />
          <span className="font-medium text-gray-800">Add New Listing</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Listings */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Recent Listings</h2>
            <Link to="/admin/listings" className="text-primary-500 text-sm font-medium hover:underline">View all</Link>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            {recentListings.map((listing, i) => (
              <div key={listing._id} className={`flex items-center gap-4 p-4 ${i !== recentListings.length - 1 ? 'border-b border-gray-100' : ''}`}>
                <img src={listing.images?.[0] || 'https://images.unsplash.com/photo-1501180336600-ac7bfea1dbe9?w=100'} alt="" className="w-12 h-12 rounded-lg object-cover" onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1501180336600-ac7bfea1dbe9?w=100' }} />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{listing.title}</p>
                  <p className="text-sm text-gray-500">{listing.location}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-semibold text-gray-900">${listing.price}/night</p>
                  <Link to={`/admin/listings/edit/${listing._id}`} className="text-xs text-primary-500 hover:underline">Edit</Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Bookings */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Bookings</h2>
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            {recentBookings.length === 0 ? (
              <p className="p-6 text-center text-gray-500">No bookings yet</p>
            ) : recentBookings.map((b, i) => (
              <div key={b._id} className={`p-4 ${i !== recentBookings.length - 1 ? 'border-b border-gray-100' : ''}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{b.listing?.title || 'Listing'}</p>
                    <p className="text-xs text-gray-500 mt-0.5">by {b.user?.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 text-sm">${b.totalPrice}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${b.status === 'confirmed' ? 'bg-green-100 text-green-700' : b.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {b.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
