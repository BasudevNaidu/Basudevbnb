import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import api from '../utils/api'
import PropertyCard from '../components/PropertyCard'
import SkeletonCard from '../components/SkeletonCard'
import FilterSidebar from '../components/FilterSidebar'
import { useAuth } from '../context/AuthContext'
import { FiFilter } from 'react-icons/fi'

export default function SearchPage() {
  const [searchParams] = useSearchParams()
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [wishlistIds, setWishlistIds] = useState([])
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    minPrice: '',
    maxPrice: '',
    sort: '',
  })
  const { user } = useAuth()

  const search = searchParams.get('search') || ''

  useEffect(() => {
    fetchListings()
    if (user) fetchWishlist()
  }, [filters, search])

  const fetchListings = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (search) params.append('search', search)
      if (filters.category) params.append('category', filters.category)
      if (filters.minPrice) params.append('minPrice', filters.minPrice)
      if (filters.maxPrice) params.append('maxPrice', filters.maxPrice)
      if (filters.sort) params.append('sort', filters.sort)
      const { data } = await api.get(`/listings?${params.toString()}`)
      setListings(data)
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {search ? `Results for "${search}"` : filters.category ? `${filters.category} stays` : 'All stays'}
          </h1>
          <p className="text-gray-500 text-sm mt-1">{loading ? '...' : `${listings.length} properties found`}</p>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 text-sm font-medium hover:shadow-md transition-shadow md:hidden"
        >
          <FiFilter size={16} />
          Filters
        </button>
      </div>

      <div className="flex gap-8">
        {/* Sidebar - desktop */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <FilterSidebar filters={filters} onChange={setFilters} />
        </div>

        {/* Mobile sidebar */}
        {showFilters && (
          <div className="md:hidden fixed inset-0 z-50 bg-black/50 flex">
            <div className="bg-white w-80 max-w-full h-full overflow-y-auto p-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-lg">Filters</h2>
                <button onClick={() => setShowFilters(false)} className="text-gray-500 hover:text-gray-800">✕</button>
              </div>
              <FilterSidebar filters={filters} onChange={(f) => { setFilters(f); setShowFilters(false) }} />
            </div>
          </div>
        )}

        {/* Results */}
        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(9).fill(0).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : listings.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-2xl mb-2">🔍</p>
              <p className="text-lg font-semibold text-gray-700">No properties found</p>
              <p className="text-gray-500 text-sm mt-2">Try adjusting your filters or search query</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((listing) => (
                <PropertyCard key={listing._id} listing={listing} wishlistIds={wishlistIds} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
