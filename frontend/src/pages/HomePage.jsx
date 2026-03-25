import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'
import api from '../utils/api'
import PropertyCard from '../components/PropertyCard'
import SkeletonCard from '../components/SkeletonCard'
import { useAuth } from '../context/AuthContext'

const categories = [
  { name: 'Beach', emoji: '🏖️', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400' },
  { name: 'Mountain', emoji: '⛰️', img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400' },
  { name: 'City', emoji: '🌆', img: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400' },
  { name: 'Luxury', emoji: '💎', img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400' },
]

export default function HomePage() {
  const [featured, setFeatured] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [wishlistIds, setWishlistIds] = useState([])
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    fetchFeatured()
    if (user) fetchWishlist()
  }, [user])

  const fetchFeatured = async () => {
    try {
      const { data } = await api.get('/listings/featured')
      setFeatured(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const fetchWishlist = async () => {
    try {
      const { data } = await api.get('/users/wishlist')
      setWishlistIds(data.map(l => l._id))
    } catch (e) {}
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) navigate(`/search?search=${encodeURIComponent(searchQuery.trim())}`)
  }

  return (
    <div>
      {/* Hero Section */}
      <div
        className="relative h-[500px] flex items-center justify-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1600)', backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Find your next adventure</h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">Discover unique places to stay around the world</p>
          <form onSubmit={handleSearch} className="flex items-center bg-white rounded-full px-6 py-4 max-w-xl mx-auto shadow-2xl">
            <FiSearch size={20} className="text-gray-400 mr-3 flex-shrink-0" />
            <input
              type="text"
              placeholder="Where do you want to go?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 outline-none text-gray-800 text-base bg-transparent"
            />
            <button type="submit" className="bg-primary-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-primary-600 transition-colors ml-3">
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore by category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link key={cat.name} to={`/search?category=${cat.name}`} className="group relative overflow-hidden rounded-2xl h-40 cursor-pointer">
                <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                <div className="absolute bottom-4 left-4 text-white">
                  <span className="text-2xl">{cat.emoji}</span>
                  <p className="font-bold text-lg">{cat.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Listings */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Featured properties</h2>
            <Link to="/search" className="text-primary-500 font-medium hover:underline text-sm">View all</Link>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : featured.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">No featured listings yet.</p>
              <p className="text-sm mt-2">Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featured.map((listing) => (
                <PropertyCard key={listing._id} listing={listing} wishlistIds={wishlistIds} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
