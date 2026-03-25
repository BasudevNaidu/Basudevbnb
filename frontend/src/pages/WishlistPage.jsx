import { useState, useEffect } from 'react'
import api from '../utils/api'
import PropertyCard from '../components/PropertyCard'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchWishlist()
  }, [])

  const fetchWishlist = async () => {
    try {
      const { data } = await api.get('/users/wishlist')
      setWishlist(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const handleToggle = (listingId) => {
    setWishlist((prev) => prev.filter(l => l._id !== listingId))
  }

  if (loading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Wishlist</h1>
      <p className="text-gray-500 text-sm mb-8">{wishlist.length} saved {wishlist.length === 1 ? 'property' : 'properties'}</p>

      {wishlist.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">❤️</p>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">No saved properties yet</h2>
          <p className="text-gray-500 mb-6">Click the heart icon on any listing to save it here</p>
          <Link to="/search" className="bg-primary-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-600 transition-colors">
            Explore stays
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((listing) => (
            <PropertyCard
              key={listing._id}
              listing={listing}
              wishlistIds={wishlist.map(l => l._id)}
              onWishlistToggle={handleToggle}
            />
          ))}
        </div>
      )}
    </div>
  )
}
