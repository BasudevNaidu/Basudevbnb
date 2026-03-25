import { useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

export default function ImageCarousel({ images }) {
  const [current, setCurrent] = useState(0)
  const imgs = images?.length > 0 ? images : ['https://images.unsplash.com/photo-1501180336600-ac7bfea1dbe9?w=800']

  const prev = () => setCurrent((c) => (c === 0 ? imgs.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === imgs.length - 1 ? 0 : c + 1))

  return (
    <div className="relative rounded-2xl overflow-hidden h-80 md:h-[450px] bg-gray-100">
      <img
        src={imgs[current]}
        alt="listing"
        className="w-full h-full object-cover transition-opacity duration-300"
        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1501180336600-ac7bfea1dbe9?w=800' }}
      />
      {imgs.length > 1 && (
        <>
          <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow hover:scale-110 transition-transform">
            <FiChevronLeft size={20} />
          </button>
          <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow hover:scale-110 transition-transform">
            <FiChevronRight size={20} />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {imgs.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-colors ${i === current ? 'bg-white' : 'bg-white/50'}`} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
