import { Link } from 'react-router-dom'
import { FiGithub, FiLinkedin } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg text-gray-800 mb-3">
              <span className="text-primary-500">Basudev</span>bnb
            </h3>
            <p className="text-sm text-gray-600 mb-4">Find unique stays and experiences around the world.</p>
            <Link to="/how-it-works" className="text-sm text-primary-500 font-medium hover:underline">How it works →</Link>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Explore</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/search" className="hover:text-primary-500">All Listings</Link></li>
              <li><Link to="/search?category=Beach" className="hover:text-primary-500">🏖️ Beach</Link></li>
              <li><Link to="/search?category=Mountain" className="hover:text-primary-500">⛰️ Mountain</Link></li>
              <li><Link to="/search?category=City" className="hover:text-primary-500">🌆 City</Link></li>
              <li><Link to="/search?category=Luxury" className="hover:text-primary-500">💎 Luxury</Link></li>
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
              <li><Link to="/help" className="hover:text-primary-500">Help Center</Link></li>
              <li><Link to="/safety" className="hover:text-primary-500">Safety Info</Link></li>
              <li><Link to="/cancellation-policy" className="hover:text-primary-500">Cancellation Options</Link></li>
              <li><Link to="/contact" className="hover:text-primary-500">Contact Us</Link></li>
            </ul>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2">📞 <a href="tel:+917606816454" className="hover:text-primary-500 font-medium">+91 7606816454</a></p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Basudevbnb, Inc. All rights reserved.</p>

          <div className="flex items-center gap-5 mt-3 md:mt-0">
            <a href="#" className="hover:text-primary-500">Privacy</a>
            <a href="#" className="hover:text-primary-500">Terms</a>
            <Link to="/how-it-works" className="hover:text-primary-500">How it works</Link>
            <div className="flex items-center gap-3 ml-2 border-l border-gray-200 pl-4">
              <a href="https://github.com/BasudevNaidu" target="_blank" rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900 transition-colors" title="GitHub">
                <FiGithub size={20} />
              </a>
              <a href="https://www.linkedin.com/in/naidu-basudev-96b7a6289/" target="_blank" rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-600 transition-colors" title="LinkedIn">
                <FiLinkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
