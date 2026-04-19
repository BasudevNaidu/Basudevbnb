# Basudevbnb — Complete Project Explanation
### (Read this fully before your faculty presentation)

---
3
## 1. What Is This Project?

**Basudevbnb** is a full-stack web application inspired by Airbnb. It allows users to:
- Browse property listings (homes, beaches, mountains, luxury stays, etc.)
- Register and log in securely
- Book properties for specific dates
- Manage their bookings and wishlist
- Admins can manage all listings and users through a dedicated admin panel

The project is split into two separate applications:
- **Frontend** — Built with React (Vite) + Tailwind CSS
- **Backend** — Built with Node.js + Express + MongoDB (via Mongoose)

Both are deployed separately on **Vercel**.

---

## 2. Technology Stack (What You Used and Why)

### Frontend
| Technology | What It Is | Why Used |
|---|---|---|
| **React 19** | A JavaScript UI library | Build interactive UIs with reusable components |
| **Vite** | A fast build tool / dev server | Faster than Create React App, modern standard |
| **Tailwind CSS** | A utility-first CSS framework | Style elements directly in JSX without writing separate CSS |
| **React Router DOM v7** | Client-side routing library | Navigate between pages without full page reloads (SPA) |
| **Axios** | HTTP client library | Make API requests from the browser to the backend |
| **React Hot Toast** | Notification library | Show success/error pop-up messages to the user |
| **React Icons** | Icon library | Use icons like search, heart, user, etc. |
| **React Datepicker** | Date picker UI component | Select check-in/check-out dates for booking |
| **date-fns** | Date utility library | Format and calculate dates (e.g., number of nights) |

### Backend
| Technology | What It Is | Why Used |
|---|---|---|
| **Node.js** | JavaScript runtime (server-side) | Run JavaScript outside the browser on a server |
| **Express.js** | Web framework for Node.js | Simplifies creating API routes and handling HTTP requests |
| **MongoDB** | NoSQL database | Store user/listing/booking data as flexible JSON-like documents |
| **Mongoose** | ODM (Object Data Modelling) library | Define schemas and interact with MongoDB using JavaScript objects |
| **JSON Web Token (JWT)** | Authentication token standard | Securely identify logged-in users across requests |
| **bcryptjs** | Password hashing library | Hash (encrypt) passwords before storing them in the database |
| **dotenv** | Environment variable loader | Load secret configuration from a `.env` file |
| **cors** | Cross-Origin Resource Sharing middleware | Allow the frontend (different domain/port) to talk to the backend |
| **nodemon** | Development utility | Auto-restart the server when you save a file |

---

## 3. Project Folder Structure

```
Basudevbnb-Stack/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js              ← MongoDB connection logic
│   │   ├── controllers/
│   │   │   ├── authController.js  ← Login / Signup logic
│   │   │   ├── bookingController.js
│   │   │   ├── listingController.js
│   │   │   └── userController.js
│   │   ├── middleware/
│   │   │   └── auth.js            ← JWT verification middleware
│   │   ├── models/
│   │   │   ├── Booking.js         ← Mongoose schema for bookings
│   │   │   ├── Listing.js         ← Mongoose schema for listings
│   │   │   └── User.js            ← Mongoose schema for users
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── bookingRoutes.js
│   │   │   ├── listingRoutes.js
│   │   │   └── userRoutes.js
│   │   ├── index.js               ← Entry point — starts the Express server
│   │   └── seed.js                ← Script to populate initial data in DB
│   ├── .env                       ← Secret environment variables
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── assets/                ← Images, logo
    │   ├── components/            ← Reusable UI components (Navbar, Footer, etc.)
    │   ├── context/
    │   │   └── AuthContext.jsx    ← Global auth state using React Context API
    │   ├── pages/                 ← All page-level components
    │   ├── utils/
    │   │   └── api.js             ← Axios instance with JWT interceptors
    │   ├── App.jsx                ← Root component with all routes defined
    │   └── main.jsx               ← Entry point — renders <App /> into DOM
    ├── index.html                 ← HTML shell file
    ├── vite.config.js             ← Vite configuration
    └── tailwind.config.js         ← Tailwind configuration
```

---

## 4. Backend Deep Dive

### 4.1 Entry Point — `backend/src/index.js`

This is the first file that runs when you start the server. It:
1. Loads environment variables using `dotenv.config()`
2. Creates an Express app: `const app = express()`
3. Connects to MongoDB by calling `connectDB()`
4. Sets up **CORS** — allows requests from `localhost:5173` (local dev) and the deployed Vercel frontend URL
5. Parses incoming JSON requests: `app.use(express.json())`
6. Registers all route groups:
   - `/api/auth` → authRoutes
   - `/api/listings` → listingRoutes
   - `/api/bookings` → bookingRoutes
   - `/api/users` → userRoutes
7. Starts listening on the port: `app.listen(PORT)`

There is also a global error handler middleware at the bottom that catches any unhandled errors and returns a 500 JSON response.

---

### 4.2 Database Connection — `backend/src/config/db.js`

```js
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  console.log(`MongoDB Connected: ${conn.connection.host}`);
};
```

- Uses `mongoose.connect()` to connect to MongoDB Atlas (cloud database)
- The connection string `MONGO_URI` is stored in the `.env` file, NOT hardcoded
- If the connection fails, it calls `process.exit(1)` to crash the app intentionally — you can't run without a database

---

### 4.3 Environment Variables — `.env`

The `.env` file contains **secrets and config that must never be committed to GitHub**:

```
PORT=5001
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/basudevbnb
JWT_SECRET=some_long_random_secret_string
NODE_ENV=production
```

- **PORT**: Which port the server listens on
- **MONGO_URI**: The database connection string from MongoDB Atlas
- **JWT_SECRET**: A random secret string used to sign and verify JWT tokens
- **NODE_ENV**: Tells the app whether it's running in development or production

The `dotenv` package reads this file and attaches these values to `process.env` so you can access them anywhere in the code as `process.env.PORT`, `process.env.MONGO_URI`, etc.

**Why not hardcode?** If you hardcode passwords/secrets in code and push it to GitHub, anyone can see them and access your database. `.env` is listed in `.gitignore` so it is NEVER pushed.

---

### 4.4 Mongoose Models (Schemas)

A **schema** is a blueprint that defines the shape of data stored in MongoDB.

#### User Model (`models/User.js`)
```js
const userSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  email:    { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 6 },
  role:     { type: String, enum: ['user', 'admin'], default: 'user' },
  avatar:   { type: String, default: '' },
  bio:      { type: String, default: '' },
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Listing' }]
}, { timestamps: true });
```

Key concepts here:
- `required: true` → The field MUST be present or MongoDB will reject the document
- `unique: true` → No two users can have the same email
- `enum` → The value can only be one of those listed options
- `ref: 'Listing'` → This is a **reference** to another collection (like a foreign key in SQL). This enables `populate()`.
- `timestamps: true` → Automatically adds `createdAt` and `updatedAt` fields

**Password Hashing Hook (pre-save middleware)**:
```js
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
```
Before any user document is saved, if the password field was changed, it gets hashed with bcrypt (12 rounds of salting). This means the **plaintext password is NEVER stored in the database**.

**matchPassword method**:
```js
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
```
This compares a raw password (entered during login) with the hashed one in the DB. Returns `true` or `false`.

---

#### Listing Model (`models/Listing.js`)
```js
const listingSchema = new mongoose.Schema({
  title, description, price, location, country,
  category: { type: String, enum: ['Beach','Mountain','City','Luxury','Countryside','Other'] },
  images: [{ type: String }],        // Array of image URLs
  amenities: [{ type: String }],     // Array of strings like 'WiFi', 'Pool'
  host: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  maxGuests, bedrooms, bathrooms, rating, reviewCount,
  isFeatured: { type: Boolean, default: false }
}, { timestamps: true });
```

- `host` is a reference to the User who created/owns this listing
- `images` is an array of URL strings (e.g., Cloudinary links)
- A **text index** is created on location, title, description to enable full-text search: `listingSchema.index({ location: 'text', title: 'text', description: 'text' })`

---

#### Booking Model (`models/Booking.js`)
```js
const bookingSchema = new mongoose.Schema({
  listing:    { type: ObjectId, ref: 'Listing', required: true },
  user:       { type: ObjectId, ref: 'User', required: true },
  checkIn:    { type: Date, required: true },
  checkOut:   { type: Date, required: true },
  guests:     { type: Number, required: true, min: 1 },
  totalPrice: { type: Number, required: true },
  status:     { type: String, enum: ['pending','confirmed','cancelled'], default: 'confirmed' }
}, { timestamps: true });
```

- Both `listing` and `user` are ObjectId references — connecting the three collections
- The `totalPrice` is calculated on the backend: `price per night × number of nights`
- `status` tracks the booking lifecycle

---

### 4.5 JWT Authentication

**JWT = JSON Web Token**. It is a compact, URL-safe token that encodes user identity information.

#### How it works — step by step:

1. **User logs in** → sends email + password to `POST /api/auth/login`
2. **Backend verifies** the password using `bcrypt.compare()`
3. If correct → **generates a JWT token**:
   ```js
   jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
   ```
   - The payload is `{ id: user._id }` — just the user's MongoDB `_id`
   - Signed with `JWT_SECRET` — a long random string
   - Expires in 7 days
4. **Token is sent to the frontend** in the response JSON
5. **Frontend stores** the token in `localStorage` (under key `basudevbnb_user`)
6. **On every future API request**, the frontend attaches the token in the `Authorization` header:
   ```
   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
7. **Backend middleware (`auth.js`) verifies** the token:
   ```js
   const decoded = jwt.verify(token, process.env.JWT_SECRET);
   req.user = await User.findById(decoded.id).select('-password');
   ```
   - If valid → attaches the user object to `req.user` and calls `next()` to proceed
   - If invalid/expired → returns `401 Unauthorized`

**A JWT has 3 parts** separated by dots: `header.payload.signature`
- **Header**: Algorithm info
- **Payload**: The user data (`{ id: "abc123" }`)
- **Signature**: HMAC hash of header + payload using the secret — proves authenticity

**Why JWT instead of sessions?**  
JWT is **stateless** — the server doesn't need to store session data. The token itself carries the user info. Perfect for REST APIs.

---

### 4.6 Middleware — `middleware/auth.js`

Two middleware functions:

**`protect`** — ensures the user is logged in:
```js
const protect = async (req, res, next) => {
  // 1. Check for Bearer token in headers
  // 2. Verify it with jwt.verify()
  // 3. Find user from DB, attach to req.user
  // 4. Call next() to proceed to the route handler
};
```

**`admin`** — ensures the user is an admin:
```js
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') next();
  else res.status(403).json({ message: 'Access denied. Admins only.' });
};
```

These are used as **route guards** in route files:
```js
router.post('/', protect, admin, createListing);
// protect runs first → admin runs second → createListing runs only if both pass
```

---

### 4.7 Controllers

Controllers contain the **business logic** for each route. They receive the HTTP request, process it, and send a response.

#### `authController.js`
- `signup` → Check if user exists → `User.create()` → return JWT token
- `login` → Find user by email → `user.matchPassword()` → return JWT token
- `getMe` → Just returns `req.user` (already set by `protect` middleware)

#### `listingController.js`
- `getListings` → Supports **filtering** (by category, location, country, price range) and **sorting** (by price or rating) using MongoDB query operators like `$regex`, `$gte`, `$lte`, `$or`
- `getFeaturedListings` → Only returns listings where `isFeatured: true`
- `getListingById` → Single listing with `.populate('host', 'name email avatar bio')`
- `createListing`, `updateListing`, `deleteListing` → CRUD, admin only

**`populate()`**: Instead of returning just the ObjectId reference, Mongoose fetches the actual referenced document and embeds it. E.g., instead of `host: "64abc..."`, you get `host: { name: "John", email: "..." }`.

#### `bookingController.js`
- `createBooking` → Calculates total price (`price × nights`), creates booking
- `getMyBookings` → Fetches only bookings where `user === req.user._id`
- `cancelBooking` → First verifies the booking belongs to the requesting user before allowing cancellation (authorization check)
- `getAllBookingsAdmin` → Admin only — returns all bookings

#### `userController.js`
- `updateUserProfile` → Updates name/email/bio/avatar. For password changes, requires `currentPassword` first (security measure)
- `toggleWishlist` → Adds or removes a listing ID from `user.wishlist` array
- `getWishlist` → Populates the wishlist array with full listing data

---

### 4.8 Routes

Routes map **HTTP methods + URL paths** to controller functions.

```js
// authRoutes.js
router.post('/signup', signup);
router.post('/login', login);
router.get('/me', protect, getMe);

// listingRoutes.js
router.get('/', getListings);                        // Public
router.get('/featured', getFeaturedListings);        // Public
router.get('/:id', getListingById);                  // Public
router.post('/', protect, admin, createListing);     // Admin only
router.put('/:id', protect, admin, updateListing);   // Admin only
router.delete('/:id', protect, admin, deleteListing);// Admin only

// bookingRoutes.js
router.post('/', protect, createBooking);            // Logged-in users
router.get('/my', protect, getMyBookings);           // Logged-in users
router.put('/:id/cancel', protect, cancelBooking);   // Logged-in users
router.get('/admin/all', protect, admin, getAllBookingsAdmin); // Admin
```

**REST conventions used:**
- `GET` → Read data
- `POST` → Create new data
- `PUT` → Update existing data
- `DELETE` → Delete data

---

## 5. Frontend Deep Dive

### 5.1 Entry Point — `main.jsx`

```jsx
ReactDOM.createRoot(document.getElementById('root')).render(<App />)
```

This is the entry point. It finds the `<div id="root">` in `index.html` and renders the entire React app inside it. This is the **Single Page Application (SPA)** pattern — the entire app is loaded once.

---

### 5.2 `App.jsx` — Root Component with Routing

`App.jsx` wraps everything in:
1. **`<AuthProvider>`** — provides global auth state to all components
2. **`<Router>`** — enables client-side routing
3. **`<Routes>`** — defines the URL-to-component mapping

```jsx
<Route path="/listings/:id" element={<ListingDetailPage />} />
<Route path="/profile" element={<ProtectedRoute><UserProfilePage /></ProtectedRoute>} />
<Route path="/admin" element={<AdminRoute><AdminDashboardPage /></AdminRoute>} />
```

- `:id` is a **URL parameter** — dynamic segment. Accessed inside the component with `useParams()`
- `<ProtectedRoute>` wraps pages that require login
- `<AdminRoute>` wraps pages that require admin role
- `<Route path="*">` — the 404 Not Found catch-all

---

### 5.3 React Context API — `AuthContext.jsx`

React Context is used to share the **logged-in user's data** globally across all components without "prop drilling" (passing props through many layers).

```jsx
const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)  // Global user state

  useEffect(() => {
    // On page load, check localStorage for existing session
    const storedUser = localStorage.getItem('basudevbnb_user')
    if (storedUser) setUser(JSON.parse(storedUser))
  }, [])

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password })
    setUser(data)
    localStorage.setItem('basudevbnb_user', JSON.stringify(data))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('basudevbnb_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)  // Custom hook
```

**How any component uses it:**
```jsx
const { user, logout } = useAuth()
```

This gives any component access to the logged-in user object and auth functions without passing props.

---

### 5.4 Axios Instance — `utils/api.js`

Instead of using `axios` directly, a **custom instance** is created:

```js
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' }
})
```

Two **interceptors** are set up:

**Request interceptor** — runs before every API call:
```js
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('basudevbnb_user'))
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
})
```
This automatically attaches the JWT token to every request. You don't have to manually add it each time.

**Response interceptor** — runs after every API response:
```js
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('basudevbnb_user')
      window.location.href = '/login'  // Force logout on token expiry
    }
    return Promise.reject(err)
  }
)
```
If the server sends a `401 Unauthorized` (token expired), the user is automatically logged out and redirected to login.

---

### 5.5 Protected Routes

**`ProtectedRoute.jsx`**:
```jsx
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <Spinner />             // Still checking localStorage
  if (!user) return <Navigate to="/login" />  // Not logged in → redirect
  return children                             // Logged in → show the page
}
```

**`AdminRoute.jsx`** works similarly but checks `user.role === 'admin'`.

This is **client-side route guarding**. Note: the backend also enforces these restrictions — the frontend guard is just for UX.

---

### 5.6 Pages Overview

| Page | Purpose |
|---|---|
| `HomePage.jsx` | Hero section + featured listings + categories |
| `SearchPage.jsx` | Filter/search all listings |
| `ListingDetailPage.jsx` | Full details of one property |
| `LoginPage.jsx` | Login form |
| `SignupPage.jsx` | Registration form |
| `BookingPage.jsx` | Date picker + booking form |
| `BookingHistoryPage.jsx` | User's past and current bookings |
| `UserProfilePage.jsx` | Edit profile, change password, upload avatar |
| `UserDashboardPage.jsx` | Overview of user activity |
| `WishlistPage.jsx` | Saved/favourited listings |
| `AdminDashboardPage.jsx` | Admin stats overview |
| `ManageListingsPage.jsx` | Admin — view/delete all listings |
| `AddListingPage.jsx` | Admin — create new listing |
| `EditListingPage.jsx` | Admin — edit existing listing |
| `NotFoundPage.jsx` | 404 fallback |

---

### 5.7 Key React Concepts Used

**useState**: Manages local component state (form fields, loading state, etc.)
```jsx
const [form, setForm] = useState({ email: '', password: '' })
```

**useEffect**: Runs side effects (API calls, localStorage reads) after render
```jsx
useEffect(() => {
  fetchListings()  // Runs once when component mounts
}, [])
```

**useNavigate**: Programmatic navigation after login/logout
```jsx
const navigate = useNavigate()
navigate('/dashboard')
```

**useParams**: Extracts URL parameters
```jsx
const { id } = useParams()  // Gets :id from /listings/:id
```

**useLocation**: Reads the current URL, used to redirect back after login
```jsx
const location = useLocation()
const from = location.state?.from?.pathname || '/'
```

---

## 6. API Flow — Complete Example

**Scenario: User books a property**

1. User clicks "Book Now" on a listing page
2. `BookingPage.jsx` renders — user picks dates, number of guests
3. On submit, `api.post('/bookings', { listingId, checkIn, checkOut, guests })` is called
4. Axios **request interceptor** adds `Authorization: Bearer <token>` header
5. Express server receives the request at `POST /api/bookings`
6. **`protect` middleware** runs:
   - Reads the token from the header
   - Verifies it with `jwt.verify()`
   - Finds the user from DB, attaches to `req.user`
7. **`createBooking` controller** runs:
   - Finds the listing by `listingId`
   - Calculates `nights = (checkOut - checkIn) / ms_per_day`
   - Calculates `totalPrice = listing.price * nights`
   - Creates the Booking document in MongoDB
   - Returns the populated booking
8. Frontend receives the response → shows success toast → navigates to `/bookings`

---

## 7. CORS Explained

CORS = **Cross-Origin Resource Sharing**. It's a browser security feature.

**The Problem**: Your frontend is at `http://localhost:5173` but your backend is at `http://localhost:5001`. These are different "origins" (different ports). The browser blocks such cross-origin requests by default.

**The Solution**: The backend tells the browser which origins are allowed:
```js
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)  // Allow
    } else {
      callback(new Error("Not allowed by CORS"))  // Block
    }
  },
  credentials: true
}))
```

`credentials: true` is needed because the requests include the `Authorization` header (treat it like a cookie-enabled request).

---

## 8. MongoDB Operators Used

| Operator | What It Does | Used Where |
|---|---|---|
| `$regex` | Pattern matching (like SQL LIKE) | Search by location, title |
| `$options: 'i'` | Case-insensitive regex | Same |
| `$gte` | Greater than or equal to | Min price filter |
| `$lte` | Less than or equal to | Max price filter |
| `$or` | Match any of multiple conditions | Search across multiple fields |
| `$in` | Match any value in an array | Wishlist lookup |

---

## 9. Deployment

- **Frontend** → Deployed on **Vercel** (runs Vite build, serves static files)
  - `VITE_API_URL` env variable points to the backend Vercel URL
- **Backend** → Deployed on **Vercel** (serverless Node.js functions)
  - `vercel.json` configures routing so all requests go to `src/index.js`
  - Env vars (`MONGO_URI`, `JWT_SECRET`) are set in Vercel Dashboard

---

## 10. Possible Questions Your Faculty May Ask (With Answers)

---

### Q1: What is a REST API and is your project RESTful?

**Answer**: REST (Representational State Transfer) is an architectural style for designing APIs. A RESTful API uses standard HTTP methods (GET, POST, PUT, DELETE) to perform CRUD operations on resources identified by URLs.

Yes, my project is RESTful:
- `GET /api/listings` — Read all listings
- `POST /api/listings` — Create a listing
- `PUT /api/listings/:id` — Update a listing
- `DELETE /api/listings/:id` — Delete a listing

Each route represents a resource (`/listings`, `/bookings`, `/users`) and uses the appropriate HTTP verb.

---

### Q2: What is JWT and why did you use it instead of sessions?

**Answer**: JWT (JSON Web Token) is a stateless authentication mechanism. When a user logs in, the server creates a token containing the user's ID, signs it with a secret key, and sends it back. The client stores this token and sends it in the `Authorization: Bearer <token>` header with every future request.

I used JWT instead of sessions because:
1. **Stateless** — the server doesn't store session data; the token is self-contained
2. **Scalable** — works well across multiple servers (no shared session store needed)
3. **Perfect for REST APIs** — standard approach for API authentication

---

### Q3: How is the password secured in your project?

**Answer**: Passwords are **never stored in plaintext**. When a user registers:
1. They submit their password in the request body
2. Before saving to MongoDB, the `pre('save')` hook in the User model hashes it using **bcryptjs** with a **salt round of 12**
3. Bcrypt generates a unique random salt + hashes the password → result is a 60-character string
4. Only this hash is stored in the database

When logging in, `bcrypt.compare(enteredPassword, hashedPassword)` is used. Bcrypt extracts the salt from the hash and re-hashes the entered password to compare. The original password cannot be recovered from the hash (**one-way function**).

---

### Q4: What is Mongoose and what is a Schema?

**Answer**: Mongoose is an ODM (Object Data Modelling) library for MongoDB and Node.js. MongoDB itself is schema-less — you can store any shape of document. Mongoose adds a **schema layer** on top to enforce structure.

A Schema defines:
- What fields a document should have
- The data type of each field
- Validation rules (required, minlength, enum, etc.)
- Default values
- Relationships to other collections (via `ref`)

Example from our project: The `Booking` schema enforces that every booking MUST have a `listing`, `user`, `checkIn`, `checkOut`, `guests`, and `totalPrice`. If any required field is missing, Mongoose throws a validation error before touching the database.

---

### Q5: What is the difference between authentication and authorization?

**Answer**:
- **Authentication** = Verifying WHO you are (login — proving identity)
- **Authorization** = Verifying WHAT you're allowed to do (permissions — access control)

In my project:
- **Authentication**: The `protect` middleware verifies the JWT token. If valid, we know "this request is from user X"
- **Authorization**: The `admin` middleware checks `req.user.role === 'admin'`. Even if authenticated, a regular user cannot create/delete listings. In `cancelBooking`, the code checks `booking.user.toString() !== req.user._id.toString()` to ensure users can only cancel their own bookings.

---

### Q6: What is React Context API and why did you use it?

**Answer**: React Context API is a built-in state management solution for sharing data across the component tree without passing it as props through every intermediate component (known as "prop drilling").

I used it to manage the **global authentication state** (the logged-in user object). Any component — Navbar, ProtectedRoute, BookingPage — can access the current user, login function, or logout function simply by calling `const { user, logout } = useAuth()`.

The `AuthProvider` wraps the entire app in `App.jsx`, making auth state available everywhere.

---

### Q7: What is the difference between `useEffect` and `useState`?

**Answer**:
- **`useState`** manages **local component state** — data that, when changed, causes the component to re-render. Example: form input values, loading spinner toggle.
- **`useEffect`** handles **side effects** — operations that happen after rendering, like fetching data from an API, reading localStorage, setting up subscriptions, or timers.

In `AuthContext.jsx`:
```jsx
const [user, setUser] = useState(null)  // State: current user

useEffect(() => {
  // Side effect: runs once after component mounts
  const storedUser = localStorage.getItem('basudevbnb_user')
  if (storedUser) setUser(JSON.parse(storedUser))
}, [])   // Empty array = run only once on mount
```

---

### Q8: What is the `populate()` method in Mongoose?

**Answer**: `populate()` resolves ObjectId references by fetching the actual referenced document from the other collection and embedding it in the result.

For example, a Booking document in MongoDB looks like:
```json
{ "listing": "64abc123...", "user": "64xyz789..." }
```

After `.populate('listing', 'title location images')`:
```json
{
  "listing": { "title": "Beach House", "location": "Goa", "images": [...] },
  "user": "64xyz789..."
}
```

It's similar to a SQL JOIN. You specify which fields to include to avoid fetching unnecessary data (like passwords).

---

### Q9: What is CORS and how did you handle it?

**Answer**: CORS (Cross-Origin Resource Sharing) is a browser security mechanism that blocks HTTP requests made from a different origin (domain/port/protocol) than the server.

Since the frontend runs on `localhost:5173` and the backend on `localhost:5001`, the browser blocks the requests. I added the `cors` npm package to the Express server and configured it to allow only my frontend's origins:
```js
const allowedOrigins = ["http://localhost:5173", "https://basudevbnb-3nzp.vercel.app"]
```

`credentials: true` is also set because our requests include the `Authorization` header.

---

### Q10: What is the difference between `PUT` and `POST`?

**Answer**:
- **`POST`** — Creates a new resource. Every call typically creates a new item. Example: `POST /api/bookings` creates a new booking.
- **`PUT`** — Updates an existing resource. You specify which item to update via URL parameter. Example: `PUT /api/listings/:id` updates that specific listing. Using the same `PUT` request multiple times should produce the same result (idempotent).

---

### Q11: What is Vite? Why not Create React App?

**Answer**: Vite is a next-generation frontend build tool. It uses **ES Modules** natively in the browser during development, which means:
- **Instant server start** — no bundling on startup
- **Lightning fast HMR** (Hot Module Replacement) — changes reflect in milliseconds
- **Faster builds** for production using Rollup

Create React App (CRA) is older, bundles everything with Webpack even in development, making it much slower. Vite is now the recommended tool in the React community.

---

### Q12: What is Tailwind CSS and how is it different from regular CSS?

**Answer**: Tailwind CSS is a **utility-first CSS framework**. Instead of writing custom CSS classes, you apply pre-built utility classes directly in your HTML/JSX.

Regular CSS:
```css
.button { background: blue; padding: 16px; border-radius: 8px; }
```

Tailwind:
```jsx
<button className="bg-blue-500 px-4 py-4 rounded-lg">Click</button>
```

Benefits:
- No naming CSS classes
- No context switching between files
- Responsive design with `md:`, `lg:` prefixes
- Consistent design tokens (spacing, colors)
- Unused styles are automatically removed in production (PurgeCSS)

---

### Q13: What is the MVC pattern and does your project follow it?

**Answer**: MVC = **Model-View-Controller** — a software design pattern that separates an application into three components:
- **Model** — Data layer (defines structure, interacts with DB). In my project: `models/User.js`, `models/Listing.js`, `models/Booking.js`
- **View** — Presentation layer (what the user sees). In my project: the entire React frontend
- **Controller** — Business logic layer (receives requests, processes, returns responses). In my project: `controllers/authController.js`, etc.

Yes, the backend follows MVC. The routes direct requests to controllers, controllers interact with models, and the React frontend acts as the View.

---

### Q14: How does the booking price calculation work?

**Answer**: In `bookingController.js`:
```js
const checkInDate = new Date(checkIn)
const checkOutDate = new Date(checkOut)
const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24))
const totalPrice = listing.price * nights
```

- `checkOutDate - checkInDate` gives the difference in **milliseconds**
- Dividing by `1000 * 60 * 60 * 24` converts it to **days (nights)**
- `Math.ceil()` rounds up (a half-day counts as a full night)
- `totalPrice = pricePerNight × numberOfNights`

This calculation happens on the **backend** intentionally, so users can't manipulate the price from the browser.

---

### Q15: How does the wishlist feature work?

**Answer**: The wishlist is stored as an array of Listing ObjectIds inside the User document:
```js
wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Listing' }]
```

In `userController.js`, `toggleWishlist`:
```js
const index = user.wishlist.indexOf(listingId)
if (index === -1) {
  user.wishlist.push(listingId)    // Add
} else {
  user.wishlist.splice(index, 1)   // Remove
}
await user.save()
```

It toggles: if the listing is already in the wishlist, remove it; if not, add it. To show the full listing details, `populate('wishlist')` is used to resolve the ObjectIds into full Listing objects.

---

### Q16: What happens if the JWT token expires?

**Answer**: JWT tokens in this project expire after **7 days** (set with `expiresIn: '7d'` in `jwt.sign()`).

When an expired token is sent:
1. The backend's `jwt.verify()` throws a `TokenExpiredError`
2. The `protect` middleware catches this and returns `401 Unauthorized`
3. On the **frontend**, the Axios response interceptor detects the `401`:
   ```js
   if (err.response?.status === 401) {
     localStorage.removeItem('basudevbnb_user')
     window.location.href = '/login'
   }
   ```
4. The user's data is cleared from localStorage and they're redirected to the login page

---

### Q17: What is `nodemon` and why is it used only in development?

**Answer**: `nodemon` is a development utility that watches your Node.js files and **automatically restarts the server** whenever you save a file. Without it, you'd have to manually stop and restart the server every time you make a change.

It's listed in `devDependencies` (not `dependencies`) because it's only needed during development, not in production. In production, the server runs with `node src/index.js` (stable, no file-watching overhead).

---

### Q18: What is the difference between `find()` and `findById()` in Mongoose?

**Answer**:
- **`find(query)`** — Returns an array of all documents matching the query. Returns an empty array `[]` if nothing matches.
- **`findById(id)`** — Returns a single document where `_id` matches. Returns `null` if not found.
- **`findOne(query)`** — Returns the first document matching the query. Returns `null` if not found.

Examples from the project:
```js
// Get ALL bookings for a user
Booking.find({ user: req.user._id })

// Get ONE specific listing
Listing.findById(req.params.id)

// Find user by email (for login)
User.findOne({ email })
```

---

### Q19: Why is `select('-password')` used?

**Answer**: By default, when you fetch a user document, ALL fields including the hashed password are returned.  
`select('-password')` tells Mongoose to **exclude** the `password` field from the query result. The `-` prefix means "exclude this field".

This is a security measure — you never want to send the password hash (even though it's hashed) to the frontend or expose it in API responses. This is why `protect` middleware uses:
```js
req.user = await User.findById(decoded.id).select('-password')
```

---

### Q20: What is `async/await` and why is it used everywhere?

**Answer**: `async/await` is modern JavaScript syntax for handling **asynchronous operations** (like database queries and API calls) in a clean, readable way.

Without it (using callbacks):
```js
User.findById(id, function(err, user) {
  if (err) { /* handle error */ }
  // use user
})
```

With `async/await`:
```js
const user = await User.findById(id)  // "wait" for the DB response
```

`await` pauses execution until the Promise resolves. `async` marks the function as asynchronous. `try/catch` is used to handle errors cleanly. All database operations (MongoDB queries) return Promises, which is why `async/await` is used throughout all controllers.

---

## 11. Quick Summary for Verbal Explanation

Here's what to say when your faculty asks "Explain your project in 2 minutes":

> "I built a full-stack property rental web application called Basudevbnb, similar to Airbnb. 
>
> The **frontend** is built with **React** using **Vite** as the build tool, **Tailwind CSS** for styling, and **React Router** for client-side navigation. It uses React's **Context API** for global authentication state and **Axios** for HTTP requests to the backend.
>
> The **backend** is a **Node.js + Express** REST API that connects to a **MongoDB Atlas** cloud database using **Mongoose**. I have three main schemas — **User**, **Listing**, and **Booking** — with relationships between them using ObjectId references.
>
> For security, passwords are hashed with **bcryptjs** before storage. User authentication uses **JWT tokens** — when you log in, you receive a token that's stored in localStorage and sent in the Authorization header of every subsequent API request. The backend verifies this token using middleware before allowing access to protected routes.
>
> The application supports user registration/login, browsing and filtering property listings, booking properties with date selection and automatic price calculation, managing a wishlist, and a full admin panel for managing listings and bookings.
>
> Both the frontend and backend are deployed separately on **Vercel**."

---

*This document was written based on actual code in the Basudevbnb-Stack project.*
