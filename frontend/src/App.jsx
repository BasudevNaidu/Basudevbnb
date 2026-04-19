import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import ListingDetailPage from './pages/ListingDetailPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import UserProfilePage from './pages/UserProfilePage'
import UserDashboardPage from './pages/UserDashboardPage'
import WishlistPage from './pages/WishlistPage'
import BookingPage from './pages/BookingPage'
import BookingHistoryPage from './pages/BookingHistoryPage'
import ContactPage from './pages/ContactPage'
import CancellationPolicyPage from './pages/CancellationPolicyPage'
import HelpCenterPage from './pages/HelpCenterPage'
import SafetyInfoPage from './pages/SafetyInfoPage'
import HowItWorksPage from './pages/HowItWorksPage'
import BecomeHostPage from './pages/BecomeHostPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import SubmitListingPage from './pages/SubmitListingPage'
import MyListingRequestsPage from './pages/MyListingRequestsPage'
import AdminListingRequestsPage from './pages/admin/AdminListingRequestsPage'
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import ManageListingsPage from './pages/admin/ManageListingsPage'
import AddListingPage from './pages/admin/AddListingPage'
import EditListingPage from './pages/admin/EditListingPage'
import NotFoundPage from './pages/NotFoundPage'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/listings/:id" element={<ListingDetailPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/become-a-host" element={<BecomeHostPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/cancellation-policy" element={<CancellationPolicyPage />} />
              <Route path="/help" element={<HelpCenterPage />} />
              <Route path="/safety" element={<SafetyInfoPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/profile" element={<ProtectedRoute><UserProfilePage /></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><UserDashboardPage /></ProtectedRoute>} />
              <Route path="/wishlist" element={<ProtectedRoute><WishlistPage /></ProtectedRoute>} />
              <Route path="/book/:listingId" element={<ProtectedRoute><BookingPage /></ProtectedRoute>} />
              <Route path="/bookings" element={<ProtectedRoute><BookingHistoryPage /></ProtectedRoute>} />
              <Route path="/admin" element={<AdminRoute><AdminDashboardPage /></AdminRoute>} />
              <Route path="/admin/listings" element={<AdminRoute><ManageListingsPage /></AdminRoute>} />
              <Route path="/admin/listings/add" element={<AdminRoute><AddListingPage /></AdminRoute>} />
              <Route path="/admin/listings/edit/:id" element={<AdminRoute><EditListingPage /></AdminRoute>} />
              <Route path="/admin/listing-requests" element={<AdminRoute><AdminListingRequestsPage /></AdminRoute>} />
              <Route path="/submit-listing" element={<ProtectedRoute><SubmitListingPage /></ProtectedRoute>} />
              <Route path="/my-listing-requests" element={<ProtectedRoute><MyListingRequestsPage /></ProtectedRoute>} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      </Router>
    </AuthProvider>
  )
}

export default App
