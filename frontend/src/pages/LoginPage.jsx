import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import Spinner from '../components/Spinner'

export default function LoginPage() {
  const { login, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const from = location.state?.from?.pathname || '/'

  if (user) {
    navigate(from, { replace: true })
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.email || !form.password) {
      toast.error('Please fill all fields')
      return
    }

    setLoading(true)
    try {
      await login(form.email, form.password)
      toast.success('Welcome back!')
      navigate(from, { replace: true })
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      
      <div className="w-full max-w-md">
        
        <div className="bg-white/80 backdrop-blur-lg border border-gray-200 rounded-3xl shadow-2xl p-8">

          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome Back 👋
            </h1>
            <p className="text-gray-500 text-sm mt-2">
              Login to continue to your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm 
                focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                transition-all duration-200"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm 
                focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                transition-all duration-200"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-xl font-semibold 
              transition-all duration-200 disabled:opacity-60 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              {loading && <Spinner size="sm" />}
              {loading ? 'Logging in...' : 'Log in'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-xs text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Signup */}
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="text-primary-500 font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}