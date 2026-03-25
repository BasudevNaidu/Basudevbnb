import { Link } from 'react-router-dom'
import { FiHeart, FiStar } from 'react-icons/fi'
import { FaHeart } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import toast from 'react-hot-toast'
import { useState } from 'react'

export default function PropertyCard({ listing, wishlistIds = [], onWishlistToggle }) {
  const { user } = useAuth()
  const [isWishlisted, setIsWishlisted] = useState(wishlistIds.includes(listing._id))
  const [loading, setLoading] = useState(false)

  const handleWishlist = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!user) {
      toast.error('Please log in to save to wishlist')
      return
    }
    setLoading(true)
    try {
      await api.put(`/users/wishlist/${listing._id}`)
      setIsWishlisted(!isWishlisted)
      if (onWishlistToggle) onWishlistToggle(listing._id)
      toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist')
    } catch {
      toast.error('Failed to update wishlist')
    } finally {
      setLoading(false)
    }
  }

  const image = listing.images?.[0] || 'https://images.unsplash.com/photo-1501180336600-ac7bfea1dbe9?w=600'

  return (
    <Link to={`/listings/${listing._id}`} className="group block">
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={image}
          alt={listing.title}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1501180336600-ac7bfea1dbe9?w=600' }}
        />
        <button
          onClick={handleWishlist}
          disabled={loading}
          className="absolute top-3 right-3 p-1 transition-colors"
        >
          {isWishlisted ? (
            <FaHeart size={22} className="text-primary-500" />
          ) : (
            <FiHeart size={22} className="text-white drop-shadow-md hover:text-primary-500 transition-colors" />
          )}
        </button>
        {listing.isFeatured && (
          <span className="absolute top-3 left-3 bg-white text-primary-500 text-xs font-semibold px-2 py-1 rounded-full">
            Featured
          </span>
        )}
      </div>
      <div className="mt-3">
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 uppercase tracking-wide">{listing.category}</p>
            <h3 className="font-semibold text-gray-900 truncate mt-0.5">{listing.title}</h3>
            <p className="text-sm text-gray-500 truncate">{listing.location}</p>
          </div>
          {listing.rating > 0 && (
            <div className="flex items-center gap-1 ml-2 flex-shrink-0">
              <FiStar size={14} className="fill-current text-gray-800" />
              <span className="text-sm font-medium text-gray-800">{listing.rating}</span>
            </div>
          )}
        </div>
        <p className="mt-1 text-sm">
          <span className="font-semibold text-gray-900">${listing.price}</span>
          <span className="text-gray-500"> / night</span>
        </p>
      </div>
    </Link>
  )
}
