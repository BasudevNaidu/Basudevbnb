import { Link } from 'react-router-dom'
import { FiShield, FiAlertCircle, FiPhone, FiLock, FiUsers, FiHome, FiCheckCircle } from 'react-icons/fi'

const safetyTips = [
  { icon: '🔐', title: 'Secure Payments Only', desc: 'Always pay through Basudevbnb. Never pay in cash or outside the platform. This ensures your money is protected.' },
  { icon: '💬', title: 'Communicate on Platform', desc: 'Keep all conversations through our messaging system. This protects you and keeps a record in case of disputes.' },
  { icon: '🏠', title: 'Verify the Property', desc: 'Check all photos, reviews, and the host profile before booking. Verified badges indicate hosts have passed our checks.' },
  { icon: '📍', title: 'Share Your Itinerary', desc: 'Always let someone you trust know where you\'re staying. Share the address and check-in details with a friend or family member.' },
  { icon: '🚨', title: 'Know Emergency Numbers', desc: 'Keep local emergency contacts handy. In India: Police (100), Ambulance (108), Fire (101), Women\'s Helpline (1091).' },
  { icon: '⭐', title: 'Check Reviews', desc: 'Read reviews from previous guests. Properties with many positive reviews from verified guests are typically safer choices.' },
]

const hostSafety = [
  'Verify guest identity before confirming bookings',
  'Use our platform messaging for all communications',
  'Set clear house rules and expectations',
  'Install working smoke and carbon monoxide detectors',
  'Have a fire extinguisher and first aid kit accessible',
  'Provide emergency exit information to guests',
  'Report suspicious activity immediately to our team',
]

export default function SafetyInfoPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FiShield size={32} className="text-primary-500" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Safety Information</h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          Your safety is our top priority. Here's everything you need to know to have a safe and secure experience on Basudevbnb.
        </p>
      </div>

      {/* Emergency Banner */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-5 flex items-center gap-4 mb-10">
        <FiAlertCircle size={28} className="text-red-500 flex-shrink-0" />
        <div>
          <p className="font-bold text-red-900">Emergency? Call immediately!</p>
          <p className="text-sm text-red-700">Police: <strong>100</strong> · Ambulance: <strong>108</strong> · Fire: <strong>101</strong> · Basudevbnb Safety: <strong>+91 7606816454</strong></p>
        </div>
      </div>

      {/* Safety Tips for Guests */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <FiUsers className="text-primary-500" /> Guest Safety Tips
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {safetyTips.map((tip, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-2xl p-5 flex gap-4 hover:shadow-sm transition-shadow">
              <span className="text-3xl flex-shrink-0">{tip.icon}</span>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{tip.title}</h3>
                <p className="text-sm text-gray-600">{tip.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Host Safety */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <FiHome className="text-primary-500" /> Host Safety Guidelines
        </h2>
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {hostSafety.map((tip, i) => (
              <div key={i} className="flex items-start gap-3">
                <FiCheckCircle size={17} className="text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Verification */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <FiLock className="text-primary-500" /> How We Protect You
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { icon: '🔒', title: 'Secure Payments', desc: 'All transactions are encrypted end-to-end. We never store raw card details.' },
            { icon: '✅', title: 'Verified Listings', desc: 'Our team manually reviews listings to ensure accuracy and quality.' },
            { icon: '24/7', title: 'Always Available', desc: 'Our safety team is available round-the-clock for emergencies.' },
            { icon: '💬', title: 'Dispute Resolution', desc: 'Neutral dispute resolution team handles conflicts quickly and fairly.' },
            { icon: '🛡️', title: 'Data Privacy', desc: 'Your personal data is never sold. We follow strict privacy practices.' },
            { icon: '⭐', title: 'Review System', desc: 'Transparent reviews from real guests help you make safe choices.' },
          ].map((item, i) => (
            <div key={i} className="bg-gray-50 border border-gray-200 rounded-2xl p-5 text-center">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Report */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold mb-2">Spot something suspicious?</h3>
          <p className="text-gray-400 text-sm">Report any safety concern and our team will investigate within 2 hours.</p>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <a href="tel:+917606816454" className="flex items-center gap-2 bg-primary-500 text-white px-5 py-3 rounded-xl font-semibold hover:bg-primary-600 transition-colors text-sm">
            <FiPhone size={16} /> Report Now
          </a>
          <Link to="/contact" className="flex items-center gap-2 border border-gray-600 text-gray-300 px-5 py-3 rounded-xl font-semibold hover:border-gray-400 transition-colors text-sm">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}
