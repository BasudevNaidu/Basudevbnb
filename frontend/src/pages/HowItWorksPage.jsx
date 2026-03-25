import { Link } from 'react-router-dom'
import { FiSearch, FiCalendar, FiHome, FiStar, FiArrowRight } from 'react-icons/fi'

const guestSteps = [
  { icon: <FiSearch size={28} />, step: '01', title: 'Search', desc: 'Browse thousands of unique properties worldwide. Filter by country, category, price, and amenities to find your perfect match.' },
  { icon: <FiCalendar size={28} />, step: '02', title: 'Book', desc: 'Choose your dates, number of guests, and confirm your booking securely. Receive instant confirmation via email.' },
  { icon: <FiHome size={28} />, step: '03', title: 'Stay', desc: 'Check in and enjoy your stay. Our hosts are always available to help make your experience unforgettable.' },
  { icon: <FiStar size={28} />, step: '04', title: 'Review', desc: 'Share your experience by leaving an honest review. Your feedback helps future guests and rewards great hosts.' },
]

const hostSteps = [
  { emoji: '📋', title: 'List Your Property', desc: 'Create a detailed listing with photos, descriptions, pricing, and house rules. It takes less than 30 minutes.' },
  { emoji: '✅', title: 'Get Verified', desc: 'Our team reviews your listing to ensure quality. Most listings are approved within 24 hours.' },
  { emoji: '💬', title: 'Welcome Guests', desc: 'Communicate with guests through our platform. Confirm bookings and share check-in details securely.' },
  { emoji: '💰', title: 'Earn Money', desc: 'Get paid after each stay. You set your price and availability. You keep the lion\'s share of each booking.' },
]

export default function HowItWorksPage() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary-500 to-primary-700 text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">How Basudevbnb Works</h1>
        <p className="text-lg opacity-85 max-w-2xl mx-auto">Whether you're booking a dream stay or listing your home, we've made it simple, safe, and rewarding.</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* For Guests */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <span className="bg-primary-100 text-primary-600 text-sm font-semibold px-4 py-1.5 rounded-full">FOR GUESTS</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-4 mb-2">Book your perfect stay in 4 steps</h2>
            <p className="text-gray-500">Simple, secure, and memorable.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {guestSteps.map((step, i) => (
              <div key={i} className="text-center relative">
                {i < guestSteps.length - 1 && (
                  <div className="hidden md:block absolute top-9 left-[60%] w-full h-0.5 bg-primary-200 z-0" />
                )}
                <div className="relative z-10 w-16 h-16 bg-primary-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg">
                  {step.icon}
                </div>
                <span className="text-xs font-bold text-primary-400 tracking-widest">STEP {step.step}</span>
                <h3 className="font-bold text-gray-900 text-lg mt-1 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/search" className="inline-flex items-center gap-2 bg-primary-500 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-primary-600 transition-colors shadow-md">
              Find a Stay <FiArrowRight />
            </Link>
          </div>
        </section>

        {/* For Hosts */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <span className="bg-green-100 text-green-700 text-sm font-semibold px-4 py-1.5 rounded-full">FOR HOSTS</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-4 mb-2">Start earning from your space</h2>
            <p className="text-gray-500">Turn your extra room or property into income.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {hostSteps.map((step, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6 text-center hover:shadow-md transition-shadow">
                <span className="text-4xl">{step.emoji}</span>
                <h3 className="font-bold text-gray-900 mt-3 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Basudevbnb */}
        <section className="bg-gray-50 rounded-3xl p-10 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Why choose Basudevbnb?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { emoji: '🌍', title: '15+ Countries', desc: 'Properties across USA, India, France, Greece, UK, Japan, UAE, and more.' },
              { emoji: '💰', title: 'Best Price', desc: 'No hidden fees. What you see is what you pay. Flexible cancellation options.' },
              { emoji: '⭐', title: 'Verified Reviews', desc: 'Only guests who\'ve stayed can leave reviews — 100% honest and reliable.' },
              { emoji: '🔒', title: 'Secure Booking', desc: 'Your payment is held safely until after check-in, protecting both guest and host.' },
              { emoji: '24/7', title: 'Always On Support', desc: 'Our team is available around the clock via phone, chat, or email.' },
              { emoji: '🏆', title: 'Unique Stays', desc: 'Treehouses, private islands, mountain lodges — experiences you won\'t find elsewhere.' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <span className="text-3xl flex-shrink-0">{item.emoji}</span>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to start?</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="bg-primary-500 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-primary-600 transition-colors shadow-md">
              Create an Account
            </Link>
            <Link to="/search" className="border-2 border-gray-300 text-gray-700 px-8 py-3.5 rounded-xl font-semibold hover:border-primary-500 hover:text-primary-500 transition-colors">
              Browse Listings
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
