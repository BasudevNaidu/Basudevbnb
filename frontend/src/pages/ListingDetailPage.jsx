import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { FiStar, FiMapPin, FiUsers, FiHome, FiDroplet, FiHeart } from 'react-icons/fi'
import { FaHeart } from 'react-icons/fa'
import api from '../utils/api'
import ImageCarousel from '../components/ImageCarousel'
import Spinner from '../components/Spinner'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

export default function ListingDetailPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isWishlisted, setIsWishlisted] = useState(false)

  useEffect(() => {
    fetchListing()
  }, [id])

  const fetchListing = async () => {
    try {
      const { data } = await api.get(`/listings/${id}`)
      setListing(data)
      if (user) {
        const { data: wishlist } = await api.get('/users/wishlist')
        setIsWishlisted(wishlist.some(l => l._id === id))
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const handleWishlist = async () => {
    if (!user) { toast.error('Please log in to save properties'); navigate('/login'); return }
    try {
      await api.put(`/users/wishlist/${id}`)
      setIsWishlisted(!isWishlisted)
      toast.success(isWishlisted ? 'Removed from wishlist' : 'Saved to wishlist')
    } catch { toast.error('Failed') }
  }

  if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>
  if (!listing) return <div className="text-center py-20 text-gray-500">Listing not found</div>

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4 flex items-center gap-2">
        <Link to="/" className="hover:text-primary-500">Home</Link>
        <span>/</span>
        <Link to={`/search?category=${listing.category}`} className="hover:text-primary-500">{listing.category}</Link>
        <span>/</span>
        <span className="text-gray-800 truncate">{listing.title}</span>
      </nav>

      {/* Title & Wishlist */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{listing.title}</h1>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
            {listing.rating > 0 && (
              <span className="flex items-center gap-1">
                <FiStar className="fill-current text-gray-800" size={14} />
                <span className="font-semibold text-gray-800">{listing.rating}</span>
                <span>({listing.reviewCount} reviews)</span>
              </span>
            )}
            <span className="flex items-center gap-1">
              <FiMapPin size={14} />
              {listing.location}
            </span>
          </div>
        </div>
        <button onClick={handleWishlist} className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 text-sm hover:shadow-md transition-shadow">
          {isWishlisted ? <FaHeart className="text-primary-500" size={16} /> : <FiHeart size={16} />}
          Save
        </button>
      </div>

      {/* Image Gallery */}
      <ImageCarousel images={listing.images} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Main info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Host info */}
          <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {listing.host?.avatar ? (
                <img src={listing.host.avatar} alt={listing.host.name} className="w-full h-full object-cover" />
              ) : (
                <span className="font-bold text-gray-600 text-lg">{listing.host?.name?.[0]}</span>
              )}
            </div>
            <div>
              <p className="font-semibold text-gray-900">Hosted by {listing.host?.name}</p>
              {listing.host?.bio && <p className="text-sm text-gray-500">{listing.host.bio}</p>}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-2 text-gray-700">
              <FiUsers size={18} />
              <span className="text-sm">{listing.maxGuests} guests</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <FiHome size={18} />
              <span className="text-sm">{listing.bedrooms} bedroom{listing.bedrooms !== 1 ? 's' : ''}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <FiDroplet size={18} />
              <span className="text-sm">{listing.bathrooms} bath{listing.bathrooms !== 1 ? 's' : ''}</span>
            </div>
          </div>

          {/* Description */}
          <div className="pb-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">About this place</h2>
            <p className="text-gray-600 leading-relaxed">{listing.description}</p>
          </div>

          {/* Amenities */}
          {listing.amenities?.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3">What this place offers</h2>
              <div className="grid grid-cols-2 gap-2">
                {listing.amenities.map((amenity, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-700 text-sm">
                    <span className="text-green-500">✓</span>
                    {amenity}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Booking card */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xl sticky top-24">
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-2xl font-bold text-gray-900">${listing.price}</span>
              <span className="text-gray-500">/ night</span>
            </div>
            {listing.rating > 0 && (
              <div className="flex items-center gap-1 text-sm text-gray-600 mb-4">
                <FiStar size={14} className="fill-current text-gray-800" />
                <span className="font-semibold text-gray-800">{listing.rating}</span>
                <span>({listing.reviewCount} reviews)</span>
              </div>
            )}
            {user ? (
              <Link
                to={`/book/${listing._id}`}
                className="block w-full bg-primary-500 hover:bg-primary-600 text-white text-center py-3 rounded-xl font-semibold transition-colors"
              >
                Reserve
              </Link>
            ) : (
              <Link
                to="/login"
                className="block w-full bg-primary-500 hover:bg-primary-600 text-white text-center py-3 rounded-xl font-semibold transition-colors"
              >
                Log in to Reserve
              </Link>
            )}
            <p className="text-center text-sm text-gray-500 mt-3">You won't be charged yet</p>
          </div>
        </div>
      </div>
    </div>
  )
}
