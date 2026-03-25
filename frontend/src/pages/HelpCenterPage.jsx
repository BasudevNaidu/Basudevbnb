import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiSearch, FiChevronDown, FiChevronUp, FiPhone, FiMail } from 'react-icons/fi'

const categories = [
  { icon: '🏠', title: 'Booking & Reservations', count: 8 },
  { icon: '💳', title: 'Payments & Refunds', count: 6 },
  { icon: '👤', title: 'Account & Profile', count: 5 },
  { icon: '🏡', title: 'Hosting', count: 7 },
  { icon: '🔒', title: 'Safety & Security', count: 4 },
  { icon: '📱', title: 'App & Technical', count: 5 },
]

const faqs = [
  {
    category: 'Booking',
    q: 'How do I make a booking?',
    a: 'Browse listings, select your dates, number of guests, and click "Reserve Now". Review the details and confirm your booking. You\'ll receive an email confirmation instantly.'
  },
  {
    category: 'Booking',
    q: 'Can I modify my booking after confirming?',
    a: 'Yes! Go to My Bookings in your dashboard. You can modify dates subject to availability and the host\'s approval. Note that price changes may apply.'
  },
  {
    category: 'Payment',
    q: 'What payment methods are accepted?',
    a: 'We accept all major credit/debit cards (Visa, Mastercard, RuPay), UPI, Net Banking, and digital wallets. All payments are 100% secure and encrypted.'
  },
  {
    category: 'Payment',
    q: 'When will I get my refund?',
    a: 'Refunds are processed within 5–10 business days after cancellation approval. The amount depends on the listing\'s cancellation policy.'
  },
  {
    category: 'Account',
    q: 'How do I change my password?',
    a: 'Go to your Profile page and click the "Change Password" tab. Enter your current password, then your new password (minimum 6 characters) and confirm it.'
  },
  {
    category: 'Account',
    q: 'How do I upload a profile picture?',
    a: 'On your Profile page, click the camera icon on your avatar. Select an image from your device (max 2MB). Your photo will be saved when you click Save Profile.'
  },
  {
    category: 'Hosting',
    q: 'How do I list my property?',
    a: 'Contact our admin team at support@basudevbnb.com to get host privileges. Once approved, you can add listings from the Admin Panel with photos, pricing, and amenities.'
  },
  {
    category: 'Safety',
    q: 'Is my personal information safe?',
    a: 'Absolutely. We use industry-standard encryption for all data. Passwords are hashed with bcrypt. We never share your personal information with third parties.'
  },
  {
    category: 'Booking',
    q: 'What if the host cancels my booking?',
    a: 'If a host cancels, you\'ll receive a 100% refund immediately. We\'ll also help you find an alternative property and may offer a discount on your next booking.'
  },
  {
    category: 'Booking',
    q: 'How does the wishlist work?',
    a: 'Click the heart icon on any property to add it to your wishlist. Access all saved properties from the Wishlist page in your account. Wishlists are private to you.'
  },
]

function FAQItem({ item }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors">
        <span className="font-medium text-gray-900 text-sm">{item.q}</span>
        {open ? <FiChevronUp className="text-primary-500 flex-shrink-0 ml-3" /> : <FiChevronDown className="text-gray-400 flex-shrink-0 ml-3" />}
      </button>
      {open && (
        <div className="px-5 pb-4 text-sm text-gray-600 border-t border-gray-100 bg-gray-50">
          <p className="pt-4">{item.a}</p>
        </div>
      )}
    </div>
  )
}

export default function HelpCenterPage() {
  const [search, setSearch] = useState('')
  const filtered = faqs.filter(f => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
        <p className="text-gray-500 text-lg mb-8">Find answers to common questions or reach out to our support team.</p>
        <div className="max-w-xl mx-auto relative">
          <FiSearch size={18} className="absolute left-4 top-3.5 text-gray-400" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search help articles..."
            className="w-full border border-gray-300 rounded-2xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-sm" />
        </div>
      </div>

      {/* Categories */}
      {!search && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {categories.map((cat) => (
            <div key={cat.title} className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-primary-300 hover:shadow-sm transition-all cursor-pointer text-center">
              <span className="text-3xl">{cat.icon}</span>
              <p className="font-semibold text-gray-900 mt-2 text-sm">{cat.title}</p>
              <p className="text-xs text-gray-400 mt-0.5">{cat.count} articles</p>
            </div>
          ))}
        </div>
      )}

      {/* FAQs */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-5">
          {search ? `Search results for "${search}"` : 'Frequently Asked Questions'}
        </h2>
        {filtered.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            <p className="text-lg">No results found for "{search}"</p>
            <p className="text-sm mt-2">Try different keywords or contact our support team</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((faq, i) => <FAQItem key={i} item={faq} />)}
          </div>
        )}
      </div>

      {/* Still need help */}
      <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-8 text-white text-center">
        <h3 className="text-2xl font-bold mb-2">Still need help?</h3>
        <p className="opacity-80 mb-6">Our support team is ready to assist you anytime.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="tel:+917606816454" className="flex items-center justify-center gap-2 bg-white text-primary-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
            <FiPhone size={17} /> Call +91 7606816454
          </a>
          <Link to="/contact" className="flex items-center justify-center gap-2 border-2 border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors">
            <FiMail size={17} /> Send a Message
          </Link>
        </div>
      </div>
    </div>
  )
}
