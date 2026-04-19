import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FiSearch, FiMenu, FiUser, FiX } from 'react-icons/fi'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const menuRef = useRef(null)

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
    }
  }

  const handleLogout = () => {
    logout()
    setMenuOpen(false)
    navigate('/')
  }

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/70 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <span className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-fuchsia-600 bg-clip-text text-transparent">Basudev</span>
            <span className="text-2xl font-bold text-gray-800">bnb</span>
          </Link>

          {/* Search bar - hidden on mobile */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center border border-gray-300 rounded-full px-4 py-2 shadow-sm hover:shadow-md focus-within:ring-2 focus-within:ring-rose-300 focus-within:border-rose-400 transition-all max-w-xs w-full mx-4">
            <input
              type="text"
              placeholder="Search destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="outline-none text-sm flex-1 bg-transparent"
            />
            <button type="submit" className="bg-gradient-to-r from-rose-500 to-fuchsia-600 text-white p-1.5 rounded-full ml-2 hover:opacity-90 transition-opacity">
              <FiSearch size={14} />
            </button>
          </form>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/become-a-host"
              className="text-sm font-semibold text-slate-700 hover:text-rose-500 transition-colors border border-gray-200 rounded-full px-4 py-2 hover:border-rose-300 hover:bg-rose-50 transition-all"
            >
              Become a Host
            </Link>
            {user?.role === 'admin' && (
              <Link to="/admin" className="text-sm font-medium text-gray-600 hover:text-primary-500 transition-colors">
                Admin Panel
              </Link>
            )}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 border border-gray-300 rounded-full px-3 py-2 hover:shadow-md transition-shadow"
              >
                <FiMenu size={18} className="text-gray-600" />
                <div className="bg-gray-400 rounded-full p-1">
                  {user?.avatar ? (
                    <img src={user.avatar} alt="avatar" className="w-5 h-5 rounded-full object-cover" />
                  ) : (
                    <FiUser size={16} className="text-white" />
                  )}
                </div>
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-xl z-50 py-2 ring-1 ring-black/5">
                  {user ? (
                    <>
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Dashboard</Link>
                      <Link to="/bookings" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">My Bookings</Link>
                      <Link to="/wishlist" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Wishlist</Link>
                      <Link to="/profile" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Profile</Link>
                      {user.role === 'admin' && (
                        <Link to="/admin" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-sm text-primary-500 font-medium hover:bg-gray-50">Admin Panel</Link>
                      )}
                      <div className="border-t border-gray-100 mt-1">
                        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Log out</button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Link to="/signup" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50">Sign up</Link>
                      <Link to="/login" onClick={() => setMenuOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Log in</Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-gray-600">
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile search */}
        <form onSubmit={handleSearch} className="md:hidden flex items-center border border-gray-300 rounded-full px-4 py-2 mb-3">
          <input
            type="text"
            placeholder="Search destinations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="outline-none text-sm flex-1 bg-transparent"
          />
          <button type="submit" className="bg-gradient-to-r from-rose-500 to-fuchsia-600 text-white p-1.5 rounded-full ml-2 hover:opacity-90 transition-opacity">
            <FiSearch size={14} />
          </button>
        </form>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-3 px-4">
          {user ? (
            <>
              <div className="pb-2 mb-2 border-b border-gray-100">
                <p className="font-semibold text-gray-800">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-gray-700">Dashboard</Link>
              <Link to="/bookings" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-gray-700">My Bookings</Link>
              <Link to="/wishlist" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-gray-700">Wishlist</Link>
              <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-gray-700">Profile</Link>
              {user.role === 'admin' && (
                <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-primary-500 font-medium">Admin Panel</Link>
              )}
              <button onClick={handleLogout} className="block py-2 text-sm text-gray-700 w-full text-left">Log out</button>
            </>
          ) : (
            <>
              <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-medium text-gray-800">Sign up</Link>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm text-gray-700">Log in</Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
