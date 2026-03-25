import { useState, useEffect } from 'react'
import api from '../utils/api'
import Spinner from '../components/Spinner'
import toast from 'react-hot-toast'
import { FiMapPin, FiCalendar, FiUsers } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export default function BookingHistoryPage() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [cancelling, setCancelling] = useState(null)

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const { data } = await api.get('/bookings/my')
      setBookings(data)
    } catch (e) {
      toast.error('Failed to load bookings')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = async (id) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return
    setCancelling(id)
    try {
      await api.put(`/bookings/${id}/cancel`)
      setBookings((prev) => prev.map(b => b._id === id ? { ...b, status: 'cancelled' } : b))
      toast.success('Booking cancelled')
    } catch {
      toast.error('Failed to cancel booking')
    } finally {
      setCancelling(null)
    }
  }

  if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Booking History</h1>
      <p className="text-gray-500 text-sm mb-8">{bookings.length} booking{bookings.length !== 1 ? 's' : ''}</p>

      {bookings.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">📅</p>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">No bookings yet</h2>
          <p className="text-gray-500 mb-6">Start exploring and book your first stay!</p>
          <Link to="/search" className="bg-primary-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-600 transition-colors">
            Find a place
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="flex gap-4">
                <img
                  src={booking.listing?.images?.[0] || 'https://images.unsplash.com/photo-1501180336600-ac7bfea1dbe9?w=200'}
                  alt=""
                  className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1501180336600-ac7bfea1dbe9?w=200' }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <Link to={`/listings/${booking.listing?._id}`} className="font-semibold text-gray-900 hover:text-primary-500 text-lg transition-colors">
                        {booking.listing?.title || 'Property'}
                      </Link>
                      <p className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                        <FiMapPin size={13} />
                        {booking.listing?.location}
                      </p>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full font-semibold flex-shrink-0 ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                      booking.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <FiCalendar size={13} />
                      {new Date(booking.checkIn).toLocaleDateString()} → {new Date(booking.checkOut).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiUsers size={13} />
                      {booking.guests} guest{booking.guests !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <p className="font-bold text-gray-900 text-lg">${booking.totalPrice}</p>
                    {booking.status === 'confirmed' && (
                      <button
                        onClick={() => handleCancel(booking._id)}
                        disabled={cancelling === booking._id}
                        className="text-sm text-red-500 border border-red-200 px-4 py-1.5 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-60"
                      >
                        {cancelling === booking._id ? 'Cancelling...' : 'Cancel booking'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
