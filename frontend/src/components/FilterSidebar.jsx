const categories = ['Beach', 'Mountain', 'City', 'Luxury', 'Countryside', 'Other']

export default function FilterSidebar({ filters, onChange }) {
  const handleChange = (key, value) => onChange({ ...filters, [key]: value })

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-5">
      <div>
        <h3 className="font-semibold text-gray-800 mb-3">Category</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="category" value="" checked={!filters.category} onChange={() => handleChange('category', '')} className="accent-primary-500" />
            <span className="text-sm text-gray-700">All</span>
          </label>
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="category" value={cat} checked={filters.category === cat} onChange={() => handleChange('category', cat)} className="accent-primary-500" />
              <span className="text-sm text-gray-700">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-100 pt-4">
        <h3 className="font-semibold text-gray-800 mb-3">Price per night</h3>
        <div className="flex gap-2">
          <div>
            <label className="text-xs text-gray-500 block mb-1">Min ($)</label>
            <input
              type="number"
              placeholder="0"
              value={filters.minPrice}
              onChange={(e) => handleChange('minPrice', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 block mb-1">Max ($)</label>
            <input
              type="number"
              placeholder="9999"
              value={filters.maxPrice}
              onChange={(e) => handleChange('maxPrice', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-4">
        <h3 className="font-semibold text-gray-800 mb-3">Sort by</h3>
        <select
          value={filters.sort}
          onChange={(e) => handleChange('sort', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="">Newest</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      <button
        onClick={() => onChange({ category: '', minPrice: '', maxPrice: '', sort: '' })}
        className="w-full border border-gray-300 rounded-lg py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
      >
        Clear Filters
      </button>
    </div>
  )
}
