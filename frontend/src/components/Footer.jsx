import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg text-gray-800 mb-3">
              <span className="text-primary-500">Basudev</span>bnb
            </h3>
            <p className="text-sm text-gray-600">Find unique stays and experiences around the world.</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Explore</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/search" className="hover:text-primary-500">All Listings</Link></li>
              <li><Link to="/search?category=Beach" className="hover:text-primary-500">Beach</Link></li>
              <li><Link to="/search?category=Mountain" className="hover:text-primary-500">Mountain</Link></li>
              <li><Link to="/search?category=City" className="hover:text-primary-500">City</Link></li>
              <li><Link to="/search?category=Luxury" className="hover:text-primary-500">Luxury</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Account</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/login" className="hover:text-primary-500">Log in</Link></li>
              <li><Link to="/signup" className="hover:text-primary-500">Sign up</Link></li>
              <li><Link to="/dashboard" className="hover:text-primary-500">Dashboard</Link></li>
              <li><Link to="/wishlist" className="hover:text-primary-500">Wishlist</Link></li>
              <li><Link to="/bookings" className="hover:text-primary-500">My Bookings</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Support</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-primary-500">Help Center</a></li>
              <li><a href="#" className="hover:text-primary-500">Safety Info</a></li>
              <li><a href="#" className="hover:text-primary-500">Cancellation Options</a></li>
              <li><a href="#" className="hover:text-primary-500">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Basudevbnb, Inc. All rights reserved.</p>
          <div className="flex gap-4 mt-3 md:mt-0">
            <a href="#" className="hover:text-primary-500">Privacy</a>
            <a href="#" className="hover:text-primary-500">Terms</a>
            <a href="#" className="hover:text-primary-500">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
