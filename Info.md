# Basudevbnb Workspace

## Overview

Full-stack Airbnb-inspired web application called **Basudevbnb**.

## Tech Stack

- **Frontend**: React.js + Vite + Tailwind CSS (in `/frontend`)
- **Backend**: Node.js + Express.js (in `/backend`)
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JWT

## Project Structure

```
workspace/
├── frontend/               # React + Vite frontend
│   ├── src/
│   │   ├── App.jsx         # Root app with routes
│   │   ├── context/        # AuthContext (user state, login/logout)
│   │   ├── utils/api.js    # Axios instance with JWT interceptor
│   │   ├── components/     # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── PropertyCard.jsx
│   │   │   ├── ImageCarousel.jsx
│   │   │   ├── FilterSidebar.jsx
│   │   │   ├── SkeletonCard.jsx
│   │   │   ├── Spinner.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── AdminRoute.jsx
│   │   └── pages/          # All pages
│   │       ├── HomePage.jsx
│   │       ├── SearchPage.jsx
│   │       ├── ListingDetailPage.jsx
│   │       ├── LoginPage.jsx
│   │       ├── SignupPage.jsx
│   │       ├── UserProfilePage.jsx
│   │       ├── UserDashboardPage.jsx
│   │       ├── WishlistPage.jsx
│   │       ├── BookingPage.jsx
│   │       ├── BookingHistoryPage.jsx
│   │       ├── NotFoundPage.jsx
│   │       └── admin/
│   │           ├── AdminDashboardPage.jsx
│   │           ├── ManageListingsPage.jsx
│   │           ├── AddListingPage.jsx
│   │           └── EditListingPage.jsx
│   ├── vite.config.js      # Vite with proxy to backend :5000
│   └── package.json        # npm (not pnpm)
│
├── backend/                # Node.js + Express backend
│   ├── src/
│   │   ├── index.js        # Entry point
│   │   ├── config/db.js    # MongoDB connection
│   │   ├── models/         # Mongoose models
│   │   │   ├── User.js
│   │   │   ├── Listing.js
│   │   │   └── Booking.js
│   │   ├── controllers/    # Route handlers
│   │   ├── middleware/     # JWT auth middleware
│   │   ├── routes/         # Express routers
│   │   └── seed.js         # Seed script for demo data
│   ├── .env                # Environment variables
│   └── package.json        # npm (not pnpm)
│
└── artifacts/              # Replit artifacts (separate from main project)
```

## Roles

- **Admin**: Can create/edit/delete listings, view all stats
- **User**: Can browse, book, wishlist properties

## API Routes

- `POST /api/auth/signup` — Register
- `POST /api/auth/login` — Login
- `GET  /api/listings` — All listings (with filters)
- `GET  /api/listings/featured` — Featured listings
- `GET  /api/listings/:id` — Single listing
- `POST /api/listings` — Create (admin only)
- `PUT  /api/listings/:id` — Update (admin only)
- `DELETE /api/listings/:id` — Delete (admin only)
- `POST /api/bookings` — Create booking
- `GET  /api/bookings/my` — My bookings
- `PUT  /api/bookings/:id/cancel` — Cancel booking
- `GET  /api/users/profile` — Get profile
- `PUT  /api/users/profile` — Update profile
- `GET  /api/users/wishlist` — Get wishlist
- `PUT  /api/users/wishlist/:listingId` — Toggle wishlist

## Demo Credentials (after seeding)

- Admin: `admin@basudevbnb.com` / `admin123`
- Host: `host@basudevbnb.com` / `host123`
- User: `user@basudevbnb.com` / `user123`
