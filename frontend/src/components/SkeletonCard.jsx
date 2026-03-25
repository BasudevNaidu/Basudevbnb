export default function SkeletonCard() {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-200 rounded-xl h-56 w-full" />
      <div className="mt-3 space-y-2">
        <div className="bg-gray-200 h-3 rounded w-1/3" />
        <div className="bg-gray-200 h-4 rounded w-3/4" />
        <div className="bg-gray-200 h-3 rounded w-1/2" />
        <div className="bg-gray-200 h-4 rounded w-1/4" />
      </div>
    </div>
  )
}
