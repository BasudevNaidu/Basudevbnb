import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import PropertyCard from '../components/PropertyCard'
import Spinner from '../components/Spinner'
import { FiHeart, FiCalendar, FiUser, FiGrid } from 'react-icons/fi'

export default function UserDashboardPage() {
  const { user } = useAuth()
  const [listings, setListings] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [listingsRes, wishlistRes, bookingsRes] = await Promise.all([
        api.get('/listings'),
        api.get('/users/wishlist'),
        api.get('/bookings/my')
      ])
      setListings(listingsRes.data.slice(0, 4))
      setWishlist(wishlistRes.data.slice(0, 4))
      setBookings(bookingsRes.data.slice(0, 3))
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name?.split(' ')[0]}!</h1>
        <p className="text-gray-500 mt-1">Manage your bookings, wishlist and profile</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { icon: <FiGrid size={22} className="text-primary-500" />, label: 'All Listings', count: listings.length + '+', link: '/search' },
          { icon: <FiHeart size={22} className="text-red-500" />, label: 'Saved', count: wishlist.length, link: '/wishlist' },
          { icon: <FiCalendar size={22} className="text-blue-500" />, label: 'Bookings', count: bookings.length, link: '/bookings' },
          { icon: <FiUser size={22} className="text-green-500" />, label: 'Profile', count: '✓', link: '/profile' },
        ].map((s) => (
          <Link key={s.label} to={s.link} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow flex items-center gap-4">
            <div className="bg-gray-50 p-3 rounded-xl">{s.icon}</div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{s.count}</p>
              <p className="text-sm text-gray-500">{s.label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Bookings */}
      {bookings.length > 0 && (
        <section className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Recent Bookings</h2>
            <Link to="/bookings" className="text-primary-500 text-sm font-medium hover:underline">View all</Link>
          </div>
          <div className="space-y-3">
            {bookings.map((b) => (
              <div key={b._id} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4">
                <img src={b.listing?.images?.[0] || 'https://images.unsplash.com/photo-1501180336600-ac7bfea1dbe9?w=200'} alt="" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1501180336600-ac7bfea1dbe9?w=200' }} />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">{b.listing?.title}</p>
                  <p className="text-sm text-gray-500 truncate">{b.listing?.location}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(b.checkIn).toLocaleDateString()} → {new Date(b.checkOut).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-gray-900">${b.totalPrice}</p>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${b.status === 'confirmed' ? 'bg-green-100 text-green-700' : b.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {b.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Wishlist preview */}
      {wishlist.length > 0 && (
        <section className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Saved Places</h2>
            <Link to="/wishlist" className="text-primary-500 text-sm font-medium hover:underline">View all</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {wishlist.map((listing) => (
              <PropertyCard key={listing._id} listing={listing} wishlistIds={wishlist.map(l => l._id)} />
            ))}
          </div>
        </section>
      )}

      {/* Explore */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Explore Stays</h2>
          <Link to="/search" className="text-primary-500 text-sm font-medium hover:underline">View all</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {listings.map((listing) => (
            <PropertyCard key={listing._id} listing={listing} wishlistIds={wishlist.map(l => l._id)} />
          ))}
        </div>
      </section>
    </div>
  )
}
