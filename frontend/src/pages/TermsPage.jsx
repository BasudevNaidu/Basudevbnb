import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiFileText, FiAlertCircle, FiCheckCircle, FiXCircle, FiUser, FiHome, FiArrowLeft, FiMail } from 'react-icons/fi'

const sections = [
  {
    icon: FiCheckCircle,
    title: 'Acceptance of Terms',
    color: 'from-emerald-500 to-teal-600',
    content: [
      'By creating an account or using Basudevbnb\'s platform, you agree to be bound by these Terms of Service.',
      'If you do not agree with any part of these terms, you may not access or use our services.',
      'We reserve the right to update these terms at any time. Continued use after changes constitutes your acceptance of the revised terms.',
      'You must be at least 18 years of age to create an account and use our services.',
    ],
  },
  {
    icon: FiUser,
    title: 'User Accounts & Responsibilities',
    color: 'from-violet-500 to-fuchsia-600',
    content: [
      'You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.',
      'You agree to provide accurate, current, and complete information during registration and to update it as necessary.',
      'You must not share your account with others or create multiple accounts for the same individual.',
      'You agree not to use the platform for any unlawful, abusive, or fraudulent purpose.',
      'Basudevbnb reserves the right to suspend or terminate accounts that violate these terms.',
    ],
  },
  {
    icon: FiHome,
    title: 'Booking & Hosting',
    color: 'from-rose-500 to-fuchsia-600',
    content: [
      'Guests agree to respect the listed property rules and vacate by the agreed check-out time.',
      'Hosts are responsible for ensuring their property listing information is accurate, including photos, amenities, and pricing.',
      'All listings submitted by users require admin approval before being published on the platform.',
      'Basudevbnb acts as an intermediary platform and is not responsible for the condition of listed properties.',
      'Hosts must comply with all local laws and regulations regarding short-term rentals.',
    ],
  },
  {
    icon: FiAlertCircle,
    title: 'Cancellations & Refunds',
    color: 'from-amber-500 to-orange-600',
    content: [
      'Cancellation policies are set by individual hosts and displayed on each listing page.',
      'Refunds are subject to the applicable cancellation policy at the time of booking.',
      'In cases of significant misrepresentation of a property, guests may be eligible for a full refund subject to review.',
      'Basudevbnb reserves the right to make final decisions on disputed bookings and refunds.',
    ],
  },
  {
    icon: FiXCircle,
    title: 'Prohibited Activities',
    color: 'from-red-500 to-rose-600',
    content: [
      'Using the platform to engage in any illegal activity, including human trafficking or drug-related activities.',
      'Posting false, misleading, or fraudulent property listings.',
      'Harassment, discrimination, or abusive behaviour towards other users or hosts.',
      'Attempting to circumvent our platform by conducting transactions outside of Basudevbnb.',
      'Scraping, hacking, or otherwise attempting to gain unauthorised access to our systems.',
      'Impersonating another person or entity.',
    ],
  },
  {
    icon: FiFileText,
    title: 'Limitation of Liability',
    color: 'from-slate-600 to-slate-800',
    content: [
      'Basudevbnb provides the platform "as is" and makes no warranties regarding the accuracy or completeness of listing information.',
      'We are not liable for any indirect, incidental, or consequential damages arising from your use of the platform.',
      'Our maximum liability to you for any claim related to your use of the platform is limited to the booking amount paid.',
      'We are not responsible for actions or omissions of hosts, guests, or third-party service providers.',
    ],
  },
]

export default function TermsPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .fade-up { animation: fadeUp 0.5s ease both; }
      `}</style>

      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-900 via-rose-950 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'radial-gradient(circle at 70% 50%, #f43f5e 0%, transparent 50%), radial-gradient(circle at 20% 30%, #8b5cf6 0%, transparent 40%)' }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6 fade-up">
            <FiFileText size={14} className="text-rose-400" />
            <span className="text-rose-300 text-sm font-semibold">Legal Document</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 fade-up" style={{ animationDelay: '0.1s' }}>
            Terms of Service
          </h1>
          <p className="text-slate-300 text-lg max-w-xl mx-auto fade-up" style={{ animationDelay: '0.2s' }}>
            Please read these terms carefully before using Basudevbnb. They govern your access to and use of our platform.
          </p>
          <p className="text-slate-500 text-sm mt-4 fade-up" style={{ animationDelay: '0.3s' }}>
            Last updated: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Back */}
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-700 text-sm transition-colors mb-10">
          <FiArrowLeft size={14} /> Back to Home
        </Link>

        {/* Intro */}
        <div className="bg-rose-50 border border-rose-100 rounded-3xl p-7 mb-10 fade-up">
          <p className="text-rose-900 text-sm leading-7">
            These Terms of Service ("Terms") constitute a legally binding agreement between you and <strong>Basudevbnb, Inc.</strong>
            governing your use of our website, mobile application, and related services (collectively, the "Platform").
            By accessing or using the Platform, you acknowledge that you have read, understood, and agree to be bound by these Terms.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, i) => (
            <div key={i}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 fade-up"
              style={{ animationDelay: `${0.1 + i * 0.06}s` }}>
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${section.color} flex items-center justify-center`}>
                  <section.icon size={18} className="text-white" />
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Section {i + 1}</span>
                  <h2 className="text-lg font-bold text-gray-900 leading-tight">{section.title}</h2>
                </div>
              </div>
              <ul className="space-y-3">
                {section.content.map((point, j) => (
                  <li key={j} className="flex items-start gap-3 text-gray-600 text-sm leading-6">
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2 bg-gradient-to-br ${section.color}`} />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="mt-12 bg-gradient-to-br from-slate-900 to-rose-950 rounded-3xl p-8 text-center">
          <p className="text-white font-bold text-lg mb-2">Questions about these Terms?</p>
          <p className="text-slate-400 text-sm mb-5">Reach out and we'll be happy to clarify.</p>
          <a href="mailto:basudev2002naidu@gmail.com"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-fuchsia-600 text-white px-7 py-3 rounded-2xl font-bold text-sm hover:opacity-90 transition">
            <FiMail size={15} /> Contact Us
          </a>
        </div>

        <p className="text-center text-gray-400 text-xs mt-8">
          © {new Date().getFullYear()} Basudevbnb, Inc. · <Link to="/privacy" className="hover:text-violet-500 transition-colors">Privacy Policy</Link>
        </p>
      </div>
    </div>
  )
}
