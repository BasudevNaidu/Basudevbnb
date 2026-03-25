import { FiAlertCircle, FiCheckCircle, FiInfo, FiCalendar } from 'react-icons/fi'

const policies = [
  {
    title: 'Flexible',
    color: 'green',
    description: 'Full refund up to 24 hours before check-in.',
    rules: [
      { days: '> 24 hours before', refund: '100%', fine: 'No fine', icon: '✅' },
      { days: '< 24 hours before', refund: '0%', fine: '100% of first night', icon: '⚠️' },
      { days: 'After check-in', refund: '0%', fine: '100% of remaining nights', icon: '❌' },
    ]
  },
  {
    title: 'Moderate',
    color: 'yellow',
    description: 'Full refund up to 5 days before check-in.',
    rules: [
      { days: '> 5 days before', refund: '100%', fine: 'No fine', icon: '✅' },
      { days: '2–5 days before', refund: '50%', fine: '50% of total booking', icon: '⚠️' },
      { days: '< 48 hours before', refund: '0%', fine: '100% of total booking', icon: '❌' },
      { days: 'After check-in', refund: '0%', fine: '100% of remaining nights', icon: '❌' },
    ]
  },
  {
    title: 'Strict',
    color: 'red',
    description: 'Full refund only within 48 hours of booking.',
    rules: [
      { days: 'Within 48h of booking (>14 days before stay)', refund: '100%', fine: 'No fine', icon: '✅' },
      { days: '7–14 days before', refund: '50%', fine: '50% of total booking', icon: '⚠️' },
      { days: '< 7 days before', refund: '0%', fine: '100% of total booking', icon: '❌' },
      { days: 'After check-in', refund: '0%', fine: '100% of remaining nights', icon: '❌' },
    ]
  },
]

const colorMap = {
  green: { badge: 'bg-green-100 text-green-700', header: 'bg-green-50 border-green-200', dot: 'bg-green-500' },
  yellow: { badge: 'bg-yellow-100 text-yellow-700', header: 'bg-yellow-50 border-yellow-200', dot: 'bg-yellow-500' },
  red: { badge: 'bg-red-100 text-red-700', header: 'bg-red-50 border-red-200', dot: 'bg-red-500' },
}

const fineCalculator = [
  { scenario: 'Cancel 10 days before (Moderate policy)', booking: 5000, fine: 0, refund: 5000 },
  { scenario: 'Cancel 3 days before (Moderate policy)', booking: 5000, fine: 2500, refund: 2500 },
  { scenario: 'Cancel 1 day before (Strict policy)', booking: 8000, fine: 8000, refund: 0 },
  { scenario: 'Cancel 20 days before (Strict policy, within 48h booking)', booking: 12000, fine: 0, refund: 12000 },
]

export default function CancellationPolicyPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Cancellation Options</h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
          Each listing on Basudevbnb has its own cancellation policy set by the host. Here's a complete breakdown of what you'll pay if you cancel.
        </p>
      </div>

      {/* Policy Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {policies.map((policy) => {
          const c = colorMap[policy.color]
          return (
            <div key={policy.title} className={`border-2 rounded-2xl overflow-hidden ${c.header}`}>
              <div className={`px-6 py-4 border-b ${c.header}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`w-3 h-3 rounded-full ${c.dot}`}></span>
                  <h3 className="font-bold text-gray-900 text-lg">{policy.title}</h3>
                </div>
                <p className="text-sm text-gray-600">{policy.description}</p>
              </div>
              <div className="bg-white px-6 py-4 space-y-3">
                {policy.rules.map((rule, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-base mt-0.5">{rule.icon}</span>
                    <div>
                      <p className="text-xs font-medium text-gray-700">{rule.days}</p>
                      <p className="text-xs text-gray-500">Refund: <strong>{rule.refund}</strong></p>
                      <p className="text-xs text-red-500">Fine: {rule.fine}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Example Fine Calculator */}
      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <FiCalendar className="text-primary-500" /> Example Fine Scenarios
        </h2>
        <p className="text-sm text-gray-500 mb-6">Here are some examples showing the fine to pay depending on when you cancel:</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 text-gray-600 font-semibold">Scenario</th>
                <th className="text-right py-3 text-gray-600 font-semibold">Total Booking (₹)</th>
                <th className="text-right py-3 text-red-500 font-semibold">Fine to Pay (₹)</th>
                <th className="text-right py-3 text-green-600 font-semibold">Refund (₹)</th>
              </tr>
            </thead>
            <tbody>
              {fineCalculator.map((row, i) => (
                <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 text-gray-700">{row.scenario}</td>
                  <td className="py-3 text-right text-gray-900 font-medium">₹{row.booking.toLocaleString()}</td>
                  <td className={`py-3 text-right font-bold ${row.fine > 0 ? 'text-red-500' : 'text-gray-400'}`}>
                    {row.fine > 0 ? `₹${row.fine.toLocaleString()}` : '—'}
                  </td>
                  <td className={`py-3 text-right font-bold ${row.refund > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                    {row.refund > 0 ? `₹${row.refund.toLocaleString()}` : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Important Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex gap-4">
          <FiInfo size={22} className="text-blue-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-blue-900 mb-1">How fines are collected</p>
            <p className="text-sm text-blue-700">If you cancel, any applicable fine is deducted from your refund automatically. You will never be charged extra — only your refund amount is reduced.</p>
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 flex gap-4">
          <FiAlertCircle size={22} className="text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-900 mb-1">Extenuating circumstances</p>
            <p className="text-sm text-amber-700">For emergencies (medical, natural disaster, etc.), contact us at <strong>+91 7606816454</strong> and we'll review your case for a full waiver.</p>
          </div>
        </div>
        <div className="bg-green-50 border border-green-100 rounded-2xl p-5 flex gap-4">
          <FiCheckCircle size={22} className="text-green-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-green-900 mb-1">When refunds are processed</p>
            <p className="text-sm text-green-700">Approved refunds are credited back to your original payment method within 5–10 business days.</p>
          </div>
        </div>
        <div className="bg-purple-50 border border-purple-100 rounded-2xl p-5 flex gap-4">
          <FiCalendar size={22} className="text-purple-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-purple-900 mb-1">Check policy before booking</p>
            <p className="text-sm text-purple-700">Each listing shows its cancellation policy on the booking page. Read it carefully before confirming your reservation.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
