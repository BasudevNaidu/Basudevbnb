import { useState } from 'react'
import { FiPhone, FiMail, FiMapPin, FiClock, FiSend, FiMessageCircle } from 'react-icons/fi'
import toast from 'react-hot-toast'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    toast.success('Message sent! We\'ll get back to you within 24 hours.')
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          We're here to help! Reach out to our team and we'll get back to you as quickly as possible.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Cards */}
        <div className="space-y-5">
          <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-6 text-white shadow-lg">
            <FiPhone size={28} className="mb-3" />
            <h3 className="font-bold text-lg mb-1">Call Us</h3>
            <p className="opacity-80 text-sm mb-3">Speak with our support team directly</p>
            <a href="tel:+917606816454" className="text-xl font-bold tracking-wide hover:opacity-80 transition-opacity">
              +91 7606816454
            </a>
            <p className="text-xs opacity-70 mt-2">Available 9 AM – 9 PM IST, Mon–Sat</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <FiMail size={24} className="text-primary-500 mb-3" />
            <h3 className="font-bold text-gray-900 mb-1">Email Us</h3>
            <p className="text-sm text-gray-500 mb-2">We reply within 24 hours</p>
            <a href="mailto:support@basudevbnb.com" className="text-primary-500 font-medium text-sm hover:underline">
              support@basudevbnb.com
            </a>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <FiMessageCircle size={24} className="text-primary-500 mb-3" />
            <h3 className="font-bold text-gray-900 mb-1">Live Chat</h3>
            <p className="text-sm text-gray-500 mb-2">Chat with us in real-time</p>
            <span className="inline-flex items-center gap-1.5 text-sm text-green-600 font-medium">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Online now
            </span>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <FiMapPin size={24} className="text-primary-500 mb-3" />
            <h3 className="font-bold text-gray-900 mb-1">Our Office</h3>
            <p className="text-sm text-gray-500">Basudevbnb HQ<br />Bhubaneswar, Odisha<br />India – 751001</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          {sent ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiSend size={32} className="text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
              <p className="text-gray-500 mb-6">Thank you for reaching out. Our team will respond within 24 hours.</p>
              <button onClick={() => setSent(false)} className="bg-primary-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-600 transition-colors">
                Send Another Message
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                    <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                    <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                  <select required value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white">
                    <option value="">Select a topic...</option>
                    <option>Booking Issue</option>
                    <option>Account Problem</option>
                    <option>Payment Query</option>
                    <option>Cancellation Request</option>
                    <option>Host Support</option>
                    <option>Safety Concern</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                  <textarea required rows={6} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="Describe your issue or question in detail..."
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none" />
                </div>
                <button type="submit"
                  className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3.5 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
                  <FiSend size={17} /> Send Message
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      {/* Response time banner */}
      <div className="mt-10 bg-blue-50 border border-blue-100 rounded-2xl p-5 flex items-center gap-4">
        <FiClock size={24} className="text-blue-500 flex-shrink-0" />
        <div>
          <p className="font-semibold text-blue-900">Typical response times</p>
          <p className="text-sm text-blue-700">Phone: Immediate · Email: Within 24 hours · Live Chat: Under 5 minutes</p>
        </div>
      </div>
    </div>
  )
}
