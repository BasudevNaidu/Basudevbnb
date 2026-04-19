import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiShield, FiLock, FiEye, FiDatabase, FiUser, FiMail, FiArrowLeft } from 'react-icons/fi'

const sections = [
  {
    icon: FiEye,
    title: 'Information We Collect',
    content: [
      'Personal information you provide when creating an account: name, email address, phone number, and profile photo.',
      'Booking and transaction data including check-in/check-out dates, payment confirmation references, and communication with hosts.',
      'Device and usage information such as IP address, browser type, pages visited, and time spent on our platform.',
      'Location data (if you grant permission) to help suggest nearby properties.',
    ],
  },
  {
    icon: FiDatabase,
    title: 'How We Use Your Data',
    content: [
      'To process bookings, send confirmation emails, and manage your account securely.',
      'To personalise your experience and recommend properties matching your preferences.',
      'To communicate important updates, promotions, and service notifications.',
      'To improve our platform through anonymised analytics and A/B testing.',
      'To prevent fraud, comply with legal obligations, and resolve disputes.',
    ],
  },
  {
    icon: FiLock,
    title: 'Data Security',
    content: [
      'All passwords are hashed using industry-standard bcrypt encryption — we never store plain-text passwords.',
      'Our platform uses HTTPS/TLS encryption for all data transmitted between your browser and our servers.',
      'Access to sensitive user data is restricted to authorised personnel only, following the principle of least privilege.',
      'We conduct regular security audits and vulnerability assessments of our systems.',
    ],
  },
  {
    icon: FiUser,
    title: 'Your Rights',
    content: [
      'Access: You can request a copy of the personal data we hold about you at any time.',
      'Correction: You may update or correct inaccurate information through your account settings.',
      'Deletion: You can request permanent deletion of your account and associated data.',
      'Portability: You can request your data in a structured, machine-readable format.',
      'Opt-out: You may unsubscribe from marketing emails via the link in any email we send.',
    ],
  },
  {
    icon: FiMail,
    title: 'Cookies & Third Parties',
    content: [
      'We use essential cookies to keep you logged in and remember your preferences.',
      'Analytics cookies (anonymised) help us understand how users navigate our platform.',
      'We do not sell your personal data to third parties under any circumstances.',
      'Third-party services we use (e.g., payment processors) have their own privacy policies that govern their use of your data.',
    ],
  },
]

export default function PrivacyPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .fade-up { animation: fadeUp 0.5s ease both; }
      `}</style>

      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-900 via-violet-950 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #8b5cf6 0%, transparent 50%), radial-gradient(circle at 80% 20%, #f43f5e 0%, transparent 40%)' }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6 fade-up">
            <FiShield size={14} className="text-violet-400" />
            <span className="text-violet-300 text-sm font-semibold">Legal Document</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 fade-up" style={{ animationDelay: '0.1s' }}>
            Privacy Policy
          </h1>
          <p className="text-slate-300 text-lg max-w-xl mx-auto fade-up" style={{ animationDelay: '0.2s' }}>
            We respect your privacy. Here's a transparent overview of how we collect, use, and protect your personal data.
          </p>
          <p className="text-slate-500 text-sm mt-4 fade-up" style={{ animationDelay: '0.3s' }}>
            Last updated: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Back link */}
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-700 text-sm transition-colors mb-10">
          <FiArrowLeft size={14} /> Back to Home
        </Link>

        {/* Intro card */}
        <div className="bg-violet-50 border border-violet-100 rounded-3xl p-7 mb-10 fade-up">
          <p className="text-violet-800 text-sm leading-7">
            This Privacy Policy applies to <strong>Basudevbnb</strong> and explains how we handle your personal information
            when you use our platform to browse, book, or list properties. By using our services, you agree to the practices
            described in this policy. If you have any questions, contact us at{' '}
            <a href="mailto:basudev2002naidu@gmail.com" className="underline font-medium">basudev2002naidu@gmail.com</a>.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, i) => (
            <div key={i}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 fade-up"
              style={{ animationDelay: `${0.1 + i * 0.07}s` }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center">
                  <section.icon size={18} className="text-white" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">{section.title}</h2>
              </div>
              <ul className="space-y-3">
                {section.content.map((point, j) => (
                  <li key={j} className="flex items-start gap-3 text-gray-600 text-sm leading-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 flex-shrink-0 mt-2" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-12 bg-gradient-to-br from-slate-900 to-violet-950 rounded-3xl p-8 text-center">
          <p className="text-white font-bold text-lg mb-2">Questions about your privacy?</p>
          <p className="text-slate-400 text-sm mb-5">Our team is happy to help clarify anything in this policy.</p>
          <a href="mailto:basudev2002naidu@gmail.com"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-500 to-fuchsia-600 text-white px-7 py-3 rounded-2xl font-bold text-sm hover:opacity-90 transition">
            <FiMail size={15} /> Contact Us
          </a>
        </div>

        <p className="text-center text-gray-400 text-xs mt-8">
          © {new Date().getFullYear()} Basudevbnb, Inc. · <Link to="/terms" className="hover:text-rose-500 transition-colors">Terms of Service</Link>
        </p>
      </div>
    </div>
  )
}
