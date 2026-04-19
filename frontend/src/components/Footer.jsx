import { Link } from 'react-router-dom'
import { FiGithub, FiLinkedin } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg text-white mb-3">
              <span className="bg-gradient-to-r from-rose-400 to-fuchsia-500 bg-clip-text text-transparent">Basudev</span><span className="text-white">bnb</span>
            </h3>
            <p className="text-sm text-slate-400 mb-4">Find unique stays and experiences around the world.</p>
            <Link to="/how-it-works" className="text-sm text-rose-400 font-medium hover:underline">How it works →</Link>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Explore</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/search" className="hover:text-rose-400 transition-colors">All Listings</Link></li>
              <li><Link to="/search?category=Beach" className="hover:text-rose-400 transition-colors">🏖️ Beach</Link></li>
              <li><Link to="/search?category=Mountain" className="hover:text-rose-400 transition-colors">⛰️ Mountain</Link></li>
              <li><Link to="/search?category=City" className="hover:text-rose-400 transition-colors">🌆 City</Link></li>
              <li><Link to="/search?category=Luxury" className="hover:text-rose-400 transition-colors">💎 Luxury</Link></li>
              <li><Link to="/become-a-host" className="hover:text-rose-400 transition-colors font-medium text-rose-400/70">🏠 Become a Host</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Account</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/login" className="hover:text-rose-400 transition-colors">Log in</Link></li>
              <li><Link to="/signup" className="hover:text-rose-400 transition-colors">Sign up</Link></li>
              <li><Link to="/dashboard" className="hover:text-rose-400 transition-colors">Dashboard</Link></li>
              <li><Link to="/wishlist" className="hover:text-rose-400 transition-colors">Wishlist</Link></li>
              <li><Link to="/bookings" className="hover:text-rose-400 transition-colors">My Bookings</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Support</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/help" className="hover:text-rose-400 transition-colors">Help Center</Link></li>
              <li><Link to="/safety" className="hover:text-rose-400 transition-colors">Safety Info</Link></li>
              <li><Link to="/cancellation-policy" className="hover:text-rose-400 transition-colors">Cancellation Options</Link></li>
              <li><Link to="/contact" className="hover:text-rose-400 transition-colors">Contact Us</Link></li>
            </ul>
            <div className="mt-4 pt-4 border-t border-slate-700">
              <p className="text-xs text-slate-500 mb-2">📞 <a href="tel:+917606816454" className="hover:text-rose-400 font-medium transition-colors">+91 7606816454</a></p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Basudevbnb, Inc. All rights reserved.</p>

          <div className="flex items-center gap-5 mt-3 md:mt-0">
            <Link to="/privacy" className="hover:text-rose-400 transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-rose-400 transition-colors">Terms</Link>
            <Link to="/how-it-works" className="hover:text-rose-400 transition-colors">How it works</Link>
            <div className="flex items-center gap-3 ml-2 border-l border-gray-200 pl-4">
              <a href="https://github.com/BasudevNaidu" target="_blank" rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors" title="GitHub">
                <FiGithub size={20} />
              </a>
              <a href="https://www.linkedin.com/in/naidu-basudev-96b7a6289/" target="_blank" rel="noopener noreferrer"
                className="text-slate-400 hover:text-blue-400 transition-colors" title="LinkedIn">
                <FiLinkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
