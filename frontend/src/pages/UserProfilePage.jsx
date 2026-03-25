import { useState, useRef } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import toast from 'react-hot-toast'
import Spinner from '../components/Spinner'
import { FiCamera, FiLock, FiUser, FiMail, FiFileText, FiEye, FiEyeOff } from 'react-icons/fi'

export default function UserProfilePage() {
  const { user, updateUser } = useAuth()
  const fileInputRef = useRef(null)
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
    avatar: user?.avatar || '',
    currentPassword: '',
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || '')
  const [showPass, setShowPass] = useState({ current: false, new: false, confirm: false })
  const [activeTab, setActiveTab] = useState('profile')

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image must be under 2MB'); return
    }
    const reader = new FileReader()
    reader.onloadend = () => {
      setAvatarPreview(reader.result)
      setForm(f => ({ ...f, avatar: reader.result }))
    }
    reader.readAsDataURL(file)
  }

  const handleProfileSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await api.put('/users/profile', {
        name: form.name,
        email: form.email,
        bio: form.bio,
        avatar: form.avatar
      })
      updateUser(data)
      toast.success('Profile updated successfully!')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed')
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    if (!form.currentPassword) { toast.error('Enter your current password'); return }
    if (form.password.length < 6) { toast.error('New password must be at least 6 characters'); return }
    if (form.password !== form.confirmPassword) { toast.error('Passwords do not match'); return }
    setLoading(true)
    try {
      await api.put('/users/profile', {
        currentPassword: form.currentPassword,
        password: form.password
      })
      toast.success('Password changed successfully!')
      setForm(f => ({ ...f, currentPassword: '', password: '', confirmPassword: '' }))
    } catch (err) {
      toast.error(err.response?.data?.message || 'Password change failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h1>

      {/* Profile Avatar Section */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-6">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center border-4 border-white shadow-md">
              {avatarPreview ? (
                <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover" onError={() => setAvatarPreview('')} />
              ) : (
                <span className="text-4xl font-bold text-gray-400">{user?.name?.[0]?.toUpperCase()}</span>
              )}
            </div>
            <button onClick={() => fileInputRef.current.click()}
              className="absolute bottom-0 right-0 bg-primary-500 text-white rounded-full p-2 shadow-md hover:bg-primary-600 transition-colors">
              <FiCamera size={14} />
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-lg">{user?.name}</p>
            <p className="text-sm text-gray-500 capitalize">{user?.role} Account</p>
            <p className="text-xs text-gray-400 mt-1">Click the camera icon to upload a photo (max 2MB)</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors ${activeTab === 'profile' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
          <FiUser size={15} /> Profile Info
        </button>
        <button onClick={() => setActiveTab('password')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-colors ${activeTab === 'password' ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
          <FiLock size={15} /> Change Password
        </button>
      </div>

      {/* Profile Info Tab */}
      {activeTab === 'profile' && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><FiUser size={13} /> Full Name</label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><FiMail size={13} /> Email Address</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><FiFileText size={13} /> Bio</label>
              <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} rows={4}
                placeholder="Tell others about yourself — your travel style, interests, or what makes a great stay..."
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none" />
              <p className="text-xs text-gray-400 mt-1">{form.bio.length}/300 characters</p>
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-xl font-semibold transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
              {loading && <Spinner size="sm" />}
              {loading ? 'Saving...' : 'Save Profile'}
            </button>
          </form>
        </div>
      )}

      {/* Change Password Tab */}
      {activeTab === 'password' && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <p className="text-sm text-gray-500 mb-5">Choose a strong password with at least 6 characters.</p>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
              <div className="relative">
                <input type={showPass.current ? 'text' : 'password'} value={form.currentPassword}
                  onChange={(e) => setForm({ ...form, currentPassword: e.target.value })} placeholder="Enter current password"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 pr-11" />
                <button type="button" onClick={() => setShowPass(s => ({ ...s, current: !s.current }))}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600">
                  {showPass.current ? <FiEyeOff size={17} /> : <FiEye size={17} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <div className="relative">
                <input type={showPass.new ? 'text' : 'password'} value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Enter new password"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 pr-11" />
                <button type="button" onClick={() => setShowPass(s => ({ ...s, new: !s.new }))}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600">
                  {showPass.new ? <FiEyeOff size={17} /> : <FiEye size={17} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <div className="relative">
                <input type={showPass.confirm ? 'text' : 'password'} value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} placeholder="Confirm new password"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 pr-11" />
                <button type="button" onClick={() => setShowPass(s => ({ ...s, confirm: !s.confirm }))}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600">
                  {showPass.confirm ? <FiEyeOff size={17} /> : <FiEye size={17} />}
                </button>
              </div>
            </div>
            {form.password && form.confirmPassword && form.password !== form.confirmPassword && (
              <p className="text-xs text-red-500">Passwords do not match</p>
            )}
            <button type="submit" disabled={loading}
              className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-xl font-semibold transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
              {loading && <Spinner size="sm" />}
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
