import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import api from '../utils/api'
import toast from 'react-hot-toast'
import Spinner from '../components/Spinner'
import { FiMapPin, FiStar } from 'react-icons/fi'
import { formatPrice } from '../utils/currency'

export default function BookingPage() {
  const { listingId } = useParams()
  const navigate = useNavigate()
  const [listing, setListing] = useState(null)
  const [loadingListing, setLoadingListing] = useState(true)
  const [checkIn, setCheckIn] = useState(null)
  const [checkOut, setCheckOut] = useState(null)
  const [guests, setGuests] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchListing()
  }, [listingId])

  const fetchListing = async () => {
    try {
      const { data } = await api.get(`/listings/${listingId}`)
      setListing(data)
    } catch (e) {
      toast.error('Could not load listing')
      navigate('/')
    } finally {
      setLoadingListing(false)
    }
  }

  const nights = checkIn && checkOut ? Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24)) : 0
  const total = nights > 0 && listing ? listing.price * nights : 0

  const handleBooking = async () => {
    if (!checkIn || !checkOut) { toast.error('Please select check-in and check-out dates'); return }
    if (nights <= 0) { toast.error('Check-out must be after check-in'); return }
    setLoading(true)
    try {
      await api.post('/bookings', { listingId, checkIn: checkIn.toISOString(), checkOut: checkOut.toISOString(), guests })
      toast.success('Booking confirmed!')
      navigate('/bookings')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed')
    } finally {
      setLoading(false)
    }
  }

  if (loadingListing) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>
  if (!listing) return null

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Confirm your booking</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Booking form */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Your trip</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Check-in date</label>
                <DatePicker
                  selected={checkIn}
                  onChange={(date) => { setCheckIn(date); if (checkOut && date >= checkOut) setCheckOut(null) }}
                  minDate={new Date()}
                  placeholderText="Select check-in date"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
                  dateFormat="MMM d, yyyy"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Check-out date</label>
                <DatePicker
                  selected={checkOut}
                  onChange={(date) => setCheckOut(date)}
                  minDate={checkIn ? new Date(checkIn.getTime() + 86400000) : new Date()}
                  placeholderText="Select check-out date"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
                  dateFormat="MMM d, yyyy"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Guests</label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {Array.from({ length: listing.maxGuests }, (_, i) => i + 1).map(n => (
                    <option key={n} value={n}>{n} guest{n !== 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Price breakdown */}
          {nights > 0 && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Price details</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-700">
                  <span>{formatPrice(listing.price, listing.country)} x {nights} night{nights !== 1 ? 's' : ''}</span>
                  <span>{formatPrice(listing.price * nights, listing.country)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Service fee</span>
                  <span>$0</span>
                </div>
                <div className="border-t border-gray-200 pt-2 flex justify-between font-bold text-gray-900">
                  <span>Total</span>
                  <span>{formatPrice(total, listing.country)}</span>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleBooking}
            disabled={loading || !checkIn || !checkOut}
            className="w-full bg-primary-500 hover:bg-primary-600 text-white py-4 rounded-xl font-bold text-lg transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading && <Spinner size="sm" />}
            {loading ? 'Confirming...' : `Confirm booking${total > 0 ? ` — ${formatPrice(total, listing.country)}` : ''}`}
          </button>
        </div>

        {/* Property summary */}
        <div>
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm sticky top-24">
            <img
              src={listing.images?.[0] || 'https://images.unsplash.com/photo-1501180336600-ac7bfea1dbe9?w=400'}
              alt={listing.title}
              className="w-full h-48 object-cover rounded-xl mb-4"
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1501180336600-ac7bfea1dbe9?w=400' }}
            />
            <h3 className="font-semibold text-gray-900 text-lg">{listing.title}</h3>
            <p className="flex items-center gap-1 text-sm text-gray-500 mt-1">
              <FiMapPin size={14} />
              {listing.location}
            </p>
            {listing.rating > 0 && (
              <p className="flex items-center gap-1 text-sm mt-1">
                <FiStar size={14} className="fill-current text-gray-800" />
                <span className="font-semibold">{listing.rating}</span>
                <span className="text-gray-500">({listing.reviewCount} reviews)</span>
              </p>
            )}
            <div className="border-t border-gray-200 mt-4 pt-4">
              <p className="text-lg font-bold text-gray-900">{formatPrice(listing.price, listing.country)} <span className="text-sm font-normal text-gray-500">/ night</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
