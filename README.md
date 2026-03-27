# 🏠 BasudevBnb — Full-Stack Airbnb Clone

> A full-featured Airbnb-inspired vacation rental web application built with the **MERN stack** (MongoDB, Express, React, Node.js). Users can browse listings, make bookings, manage wishlists, and admins can manage the entire platform.

---

## 🌐 Live Demo

| Service | URL |
|---------|-----|
| Frontend | [https://basudevbnb-3nzp.vercel.app](https://basudevbnb-3nzp.vercel.app) |
| Backend API | Deployed on Vercel (Serverless) |

---

## 📁 Project Structure

```
Basudevbnb-Stack/
├── backend/                  # Node.js + Express REST API
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js         # MongoDB connection setup
│   │   ├── controllers/
│   │   │   ├── authController.js       # Register / Login logic
│   │   │   ├── bookingController.js    # Booking CRUD
│   │   │   ├── listingController.js    # Listing CRUD + search/filter
│   │   │   └── userController.js       # Profile, wishlist management
│   │   ├── middleware/
│   │   │   └── auth.js       # JWT authentication middleware
│   │   ├── models/
│   │   │   ├── User.js       # User schema (bcrypt password hashing)
│   │   │   ├── Listing.js    # Listing schema (category, amenities, etc.)
│   │   │   └── Booking.js    # Booking schema (check-in/out, guests, status)
│   │   ├── routes/
│   │   │   ├── authRoutes.js      # /api/auth
│   │   │   ├── bookingRoutes.js   # /api/bookings
│   │   │   ├── listingRoutes.js   # /api/listings
│   │   │   └── userRoutes.js      # /api/users
│   │   ├── index.js          # Express app entry point
│   │   └── seed.js           # Database seed script
│   ├── .env                  # Environment variables (not committed)
│   ├── .env.example          # Template for environment variables
│   ├── package.json
│   └── vercel.json           # Vercel deployment config
│
├── frontend/                 # React + Vite SPA
│   ├── src/
│   │   ├── components/
│   │   │   ├── AdminRoute.jsx       # Protects admin-only routes
│   │   │   ├── FilterSidebar.jsx    # Listing filter UI
│   │   │   ├── Footer.jsx           # Site-wide footer
│   │   │   ├── ImageCarousel.jsx    # Listing image carousel
│   │   │   ├── Navbar.jsx           # Top navigation bar
│   │   │   ├── PropertyCard.jsx     # Listing card component
│   │   │   ├── ProtectedRoute.jsx   # Protects authenticated routes
│   │   │   ├── SkeletonCard.jsx     # Loading skeleton for cards
│   │   │   └── Spinner.jsx          # Loading spinner
│   │   ├── context/
│   │   │   └── AuthContext.jsx      # Global auth state (React Context API)
│   │   ├── pages/
│   │   │   ├── HomePage.jsx              # Landing page with featured listings
│   │   │   ├── SearchPage.jsx            # Search results with filters
│   │   │   ├── ListingDetailPage.jsx     # Single listing detail view
│   │   │   ├── BookingPage.jsx           # Booking form with date picker
│   │   │   ├── BookingHistoryPage.jsx    # User's past bookings
│   │   │   ├── LoginPage.jsx             # Login form
│   │   │   ├── SignupPage.jsx            # Registration form
│   │   │   ├── UserProfilePage.jsx       # Edit profile, avatar, bio
│   │   │   ├── UserDashboardPage.jsx     # User dashboard overview
│   │   │   ├── WishlistPage.jsx          # Saved/wishlist listings
│   │   │   ├── ContactPage.jsx           # Contact information
│   │   │   ├── HowItWorksPage.jsx        # Platform guide
│   │   │   ├── HelpCenterPage.jsx        # Help & FAQ
│   │   │   ├── SafetyInfoPage.jsx        # Safety guidelines
│   │   │   ├── CancellationPolicyPage.jsx # Cancellation policy
│   │   │   ├── NotFoundPage.jsx          # 404 page
│   │   │   └── admin/
│   │   │       ├── AdminDashboardPage.jsx  # Admin overview & stats
│   │   │       ├── ManageListingsPage.jsx  # View/delete all listings
│   │   │       ├── AddListingPage.jsx      # Create a new listing
│   │   │       └── EditListingPage.jsx     # Edit an existing listing
│   │   ├── utils/                    # Utility/helper functions
│   │   ├── App.jsx                   # Root component with routing
│   │   ├── main.jsx                  # React entry point
│   │   ├── App.css                   # Global styles
│   │   └── index.css                 # Base CSS / Tailwind directives
│   ├── public/               # Static assets
│   ├── index.html            # HTML template
│   ├── .env                  # Frontend environment variables
│   ├── .env.example          # Template for environment variables
│   ├── vite.config.js        # Vite configuration (proxy setup)
│   ├── tailwind.config.js    # Tailwind CSS config
│   ├── postcss.config.js     # PostCSS config
│   ├── eslint.config.js      # ESLint config
│   └── vercel.json           # Vercel frontend deployment config
│
├── package.json              # Root package (workspace orchestration)
└── .gitignore
```

---

## ✨ Features

### 👤 User Features
- **Register & Login** — JWT-based authentication with hashed passwords (bcrypt)
- **Browse Listings** — View all vacation rental listings with images, price, location, and ratings
- **Search & Filter** — Search by keyword; filter by category (Beach, Mountain, City, Luxury, Countryside, Other), price range, bedrooms, guests
- **Listing Detail** — Full listing page with image carousel, amenities, host info, and booking panel
- **Book a Stay** — Select check-in / check-out dates with a date picker, auto-calculates total price
- **Booking History** — View all past and current bookings with statuses (pending / confirmed / cancelled)
- **Wishlist** — Save and remove listings from a personal wishlist
- **Profile Management** — Update name, email, bio, avatar (base64 image upload)
- **Dashboard** — Personalized user dashboard

### 🛡️ Admin Features
- **Admin Dashboard** — Stats overview (total users, listings, bookings)
- **Manage Listings** — View, search, and delete any listing on the platform
- **Add Listing** — Create new listings with title, description, price, location, category, images, amenities, bedrooms, bathrooms, max guests
- **Edit Listing** — Update any existing listing

### 🌐 Informational Pages
- How It Works
- Help Center
- Contact Us
- Cancellation Policy
- Safety Information

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime |
| **Express.js 4.x** | REST API framework |
| **MongoDB** | NoSQL database (via MongoDB Atlas) |
| **Mongoose 8.x** | ODM for MongoDB schema modeling |
| **bcryptjs** | Password hashing (12 salt rounds) |
| **jsonwebtoken (JWT)** | Stateless authentication tokens |
| **cors** | Cross-origin request handling |
| **dotenv** | Environment variable management |
| **nodemon** | Dev auto-restart on file changes |

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 19** | UI component library |
| **Vite 8** | Blazing fast dev server & bundler |
| **React Router DOM 7** | Client-side routing & navigation |
| **Tailwind CSS 3** | Utility-first CSS framework |
| **Axios** | HTTP client for API calls |
| **React Context API** | Global authentication state management |
| **react-datepicker** | Date picker for booking form |
| **react-hot-toast** | Toast notification system |
| **react-icons** | Icon library |
| **date-fns** | Date formatting utilities |
| **PostCSS + Autoprefixer** | CSS processing pipeline |
| **ESLint** | Code linting |

### Deployment
| Service | What's Deployed |
|---------|----------------|
| **Vercel** | Frontend (React SPA) |
| **Vercel** | Backend (Express Serverless Functions) |
| **MongoDB Atlas** | Cloud database |

---

## 🗄️ Database Models

### 👤 User
```js
{
  name:      String (required),
  email:     String (required, unique, lowercase),
  password:  String (required, min 6 chars — bcrypt hashed),
  role:      String (enum: 'user' | 'admin', default: 'user'),
  avatar:    String (base64 image or URL),
  bio:       String,
  wishlist:  [ObjectId → Listing],
  timestamps: createdAt, updatedAt
}
```

### 🏠 Listing
```js
{
  title:       String (required),
  description: String (required),
  price:       Number (required, min 0),
  location:    String (required),
  country:     String,
  category:    String (enum: Beach | Mountain | City | Luxury | Countryside | Other),
  images:      [String],
  amenities:   [String],
  host:        ObjectId → User (required),
  maxGuests:   Number (default: 2),
  bedrooms:    Number (default: 1),
  bathrooms:   Number (default: 1),
  rating:      Number (0–5, default: 0),
  reviewCount: Number (default: 0),
  isFeatured:  Boolean (default: false),
  timestamps:  createdAt, updatedAt
}
// Text index on: location, title, description (full-text search)
```

### 📅 Booking
```js
{
  listing:    ObjectId → Listing (required),
  user:       ObjectId → User (required),
  checkIn:    Date (required),
  checkOut:   Date (required),
  guests:     Number (required, min 1),
  totalPrice: Number (required),
  status:     String (enum: pending | confirmed | cancelled, default: 'confirmed'),
  timestamps: createdAt, updatedAt
}
```

---

## 🌐 API Endpoints

### 🔐 Auth — `/api/auth`
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | Login and receive JWT token | ❌ |

### 🏠 Listings — `/api/listings`
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/listings` | Get all listings (with optional filters) | ❌ |
| GET | `/api/listings/:id` | Get single listing by ID | ❌ |
| POST | `/api/listings` | Create a new listing | ✅ Admin |
| PUT | `/api/listings/:id` | Update a listing | ✅ Admin |
| DELETE | `/api/listings/:id` | Delete a listing | ✅ Admin |

### 📅 Bookings — `/api/bookings`
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/bookings` | Create a new booking | ✅ User |
| GET | `/api/bookings/my` | Get logged-in user's bookings | ✅ User |
| PUT | `/api/bookings/:id/cancel` | Cancel a booking | ✅ User |
| GET | `/api/bookings` | Get all bookings (admin) | ✅ Admin |

### 👤 Users — `/api/users`
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/users/profile` | Get own profile | ✅ User |
| PUT | `/api/users/profile` | Update profile (name, bio, avatar) | ✅ User |
| GET | `/api/users/wishlist` | Get wishlist | ✅ User |
| POST | `/api/users/wishlist/:id` | Add listing to wishlist | ✅ User |
| DELETE | `/api/users/wishlist/:id` | Remove listing from wishlist | ✅ User |
| GET | `/api/users` | Get all users (admin) | ✅ Admin |

### 🩺 Health Check
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Server health check |

---

## 🗺️ Frontend Routes

| Route | Page | Access |
|-------|------|--------|
| `/` | Home Page | Public |
| `/search` | Search & Filter Listings | Public |
| `/listings/:id` | Listing Detail | Public |
| `/login` | Login | Public |
| `/signup` | Sign Up | Public |
| `/how-it-works` | How It Works | Public |
| `/contact` | Contact Us | Public |
| `/cancellation-policy` | Cancellation Policy | Public |
| `/help` | Help Center | Public |
| `/safety` | Safety Info | Public |
| `/profile` | User Profile | 🔒 Authenticated |
| `/dashboard` | User Dashboard | 🔒 Authenticated |
| `/wishlist` | Wishlist | 🔒 Authenticated |
| `/book/:listingId` | Booking Page | 🔒 Authenticated |
| `/bookings` | Booking History | 🔒 Authenticated |
| `/admin` | Admin Dashboard | 🔒 Admin Only |
| `/admin/listings` | Manage Listings | 🔒 Admin Only |
| `/admin/listings/add` | Add Listing | 🔒 Admin Only |
| `/admin/listings/edit/:id` | Edit Listing | 🔒 Admin Only |
| `*` | 404 Not Found | Public |

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)
```env
PORT=5001
MONGO_URI=mongodb+srv://YOUR_USER:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/basudevbnb
JWT_SECRET=your_super_secret_jwt_key_change_this_to_something_long
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

### Frontend (`frontend/.env`)
```env
# For local development, leave empty — Vite proxy handles it automatically
VITE_API_URL=

# For production (Vercel), set your deployed backend URL:
# VITE_API_URL=https://your-backend.vercel.app/api
```

---

## 🚀 Getting Started Locally

### Prerequisites
- **Node.js** v18+
- **npm** v8+
- **MongoDB Atlas** account (free tier works)

---

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/Basudevbnb-Stack.git
cd Basudevbnb-Stack
```

---

### 2. Setup the Backend
```bash
cd backend
npm install
```

Create your `.env` file:
```bash
cp .env.example .env
```

Fill in your `MONGO_URI` and `JWT_SECRET` in `.env`.

Start the dev server:
```bash
npm run dev
# Server starts on http://localhost:5001
```

---

### 3. (Optional) Seed the Database
```bash
cd backend
node src/seed.js
# Seeds sample listings and an admin user
```

---

### 4. Setup the Frontend
```bash
cd frontend
npm install
```

Create your `.env` file:
```bash
cp .env.example .env
# For local dev, leave VITE_API_URL empty — proxy is configured in vite.config.js
```

Start the dev server:
```bash
npm run dev
# Frontend starts on http://localhost:5173
```

---

### 5. Access the App
- Open your browser: **http://localhost:5173**
- The Vite dev server proxies all `/api/*` calls to the backend at `http://localhost:5001`

---

## 🔒 Authentication Flow

1. User registers or logs in → backend returns a **JWT token**
2. Token is stored in **localStorage** via `AuthContext`
3. All protected API requests include the token in the `Authorization: Bearer <token>` header
4. The `auth.js` middleware on the backend verifies the token on every protected route
5. Routes that require admin access additionally check `user.role === 'admin'`

---

## 🧩 Key Components

| Component | Description |
|-----------|-------------|
| `AuthContext.jsx` | Global state for user object and token, provides `login()` and `logout()` |
| `ProtectedRoute.jsx` | Wraps routes that require the user to be logged in, redirects to `/login` if not |
| `AdminRoute.jsx` | Wraps routes that require `role === 'admin'`, redirects non-admins |
| `Navbar.jsx` | Responsive top navigation with auth-aware menu (login/logout/profile/admin links) |
| `PropertyCard.jsx` | Reusable card for displaying a listing (image, price, location, rating) |
| `FilterSidebar.jsx` | Sidebar with filters for category, price, bedrooms, and guests |
| `ImageCarousel.jsx` | Sliding image carousel for listing detail pages |
| `SkeletonCard.jsx` | Animated loading skeleton placeholder while listings load |

---

## 🌱 Database Seeding

The `backend/src/seed.js` script populates your database with sample data for development and demo purposes.

Run it once after your backend is configured:
```bash
cd backend
node src/seed.js
```

This creates demo listings across all categories (Beach, Mountain, City, Luxury, etc.) and an admin user account. Check the file for the admin credentials it seeds.

---

## 📦 Available Scripts

### Backend
| Command | Description |
|---------|-------------|
| `npm start` | Run production server (`node src/index.js`) |
| `npm run dev` | Run dev server with auto-reload (`nodemon`) |

### Frontend
| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server (HMR enabled) |
| `npm run build` | Build production bundle to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint to check code quality |

---

## ☁️ Deployment

### Frontend (Vercel)
1. Push your code to GitHub
2. Import the repository on [Vercel](https://vercel.com)
3. Set **Root Directory** to `frontend`
4. Add environment variable: `VITE_API_URL=https://your-backend.vercel.app/api`
5. Deploy

The `frontend/vercel.json` rewrites all routes to `index.html` for SPA client-side routing.

### Backend (Vercel Serverless)
1. Import the repository on Vercel
2. Set **Root Directory** to `backend`
3. Add environment variables: `MONGO_URI`, `JWT_SECRET`, `NODE_ENV=production`, `CORS_ORIGIN`
4. Deploy

The `backend/vercel.json` configures Express as a serverless function.

---

## 🔧 How to Create / Extend Features

### Adding a New API Route
1. Create a controller function in `backend/src/controllers/`
2. Create or update the route file in `backend/src/routes/`
3. Register the route in `backend/src/index.js` with `app.use('/api/your-route', require('./routes/yourRoutes'))`

### Adding a New Page
1. Create a `.jsx` file in `frontend/src/pages/`
2. Import and add a `<Route>` entry in `frontend/src/App.jsx`
3. Wrap with `<ProtectedRoute>` or `<AdminRoute>` if authentication is needed

### Adding a New Data Model
1. Create a schema file in `backend/src/models/`
2. Export with `mongoose.model('ModelName', schema)`
3. Import in the relevant controller

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "feat: add my feature"`
4. Push and open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Basudev Naidu**  
Full-Stack Developer | MERN Stack Enthusiast  
GitHub: [@BasudevNaidu](https://github.com/BasudevNaidu)

---

> Built with ❤️ as a full-stack MERN project — Airbnb-inspired vacation rental platform.
