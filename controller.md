# Controllers & Auth — Faculty Explanation Guide

---

## What is a Controller?

A **controller** is a JavaScript function that contains the **actual logic** of an API route. When a request comes in, the route decides which controller to call, and the controller does the work — reads from / writes to the database and sends back a response.

**Simple analogy:**
- **Route** = Receptionist (receives your request, directs it)
- **Controller** = Manager (does the actual work)
- **Model** = Database (stores the data)

**Why separate controllers from routes?**
To keep code clean and organized. Routes just say *"this URL → call this function"*. Controllers contain *how* it works.

---

## What is Middleware (`auth.js`)?

Middleware is a function that runs **between** the request arriving and the controller executing. It can either allow the request to continue (`next()`) or reject it by sending an error response.

We have **two middleware functions** in `middleware/auth.js`:

---

### 1. `protect` — Checks if the user is logged in

**What it does:**
1. Reads the `Authorization: Bearer <token>` header from the request
2. Verifies the JWT token using `jwt.verify(token, JWT_SECRET)`
3. If valid → finds the user from the database and attaches them to `req.user`
4. If invalid/missing → returns `401 Unauthorized` and stops the request

**Why we need it:**
Without it, anyone without an account could make bookings, access profiles, etc. This protects routes so only logged-in users can access them.

---

### 2. `admin` — Checks if the logged-in user is an admin

**What it does:**
- Always runs **after** `protect` (because `protect` sets `req.user`)
- Checks if `req.user.role === 'admin'`
- If yes → allows the request to continue
- If no → returns `403 Forbidden`

**Difference between 401 and 403:**
- `401` = You are **not logged in** (identity unknown)
- `403` = You are logged in but **don't have permission** (access denied)

**How they're used in routes:**
```
Public route:      router.get('/', getListings)
User-only route:   router.post('/', protect, createBooking)
Admin-only route:  router.post('/', protect, admin, createListing)
```

---

## `authController.js` — Login & Signup



### `signup`
1. Gets `name`, `email`, `password` from request body
2. Checks if email is already registered — if yes, return error
3. Creates the user → **bcrypt automatically hashes the password** (via pre-save hook in User model)
4. Returns user data + a JWT token

### `login`
1. Gets `email`, `password` from request body
2. Finds user by email — if not found, return "Invalid email or password"
3. Compares entered password with hashed password using `bcrypt.compare()`
4. If match → returns user data + a JWT token

> **Why same error message for wrong email AND wrong password?**
> Security — telling an attacker "email not found" reveals which emails are registered.

### `getMe`
- Just returns `req.user` (already set by `protect` middleware)
- Used to verify the token is still valid and get fresh user data

---

## `listingController.js` — Property Listings

| Function | What It Does | Who Can Use |
|---|---|---|
| `getListings` | Returns all listings with filter/sort support | Everyone |
| `getFeaturedListings` | Returns listings where `isFeatured: true` (max 8) | Everyone |
| `getListingById` | Returns one listing by its ID | Everyone |
| `createListing` | Creates a new listing | Admin only |
| `updateListing` | Updates an existing listing | Admin only |
| `deleteListing` | Deletes a listing | Admin only |
| `getAllListingsAdmin` | Returns ALL listings (no filters) for admin panel | Admin only |

**Key concept — Filtering in `getListings`:**
The frontend sends URL parameters like `?category=Beach&minPrice=1000`. The backend builds a dynamic MongoDB query using operators:
- `$regex` = search by text pattern (like SQL LIKE)
- `$gte` / `$lte` = greater than / less than (for price range)
- `$or` = match any of multiple conditions (for search bar)

**Key concept — `populate()`:**
MongoDB stores only the host's ID inside a listing. `populate('host', 'name email avatar')` fetches the actual host user data and embeds it in the response — like a SQL JOIN.

---

## `bookingController.js` — Bookings

### `createBooking`
1. Gets `listingId`, `checkIn`, `checkOut`, `guests` from request body
2. Finds the listing to get the price per night
3. Calculates number of nights: `(checkOutDate - checkInDate) / (1000 × 60 × 60 × 24)`
4. Calculates total price: `listing.price × nights`
5. Creates the booking in the database with `user: req.user._id`

> **Why calculate price on the backend?**
> If done on the frontend, a user could open browser DevTools and change the price before submitting. Backend calculation uses the real price from the database — cannot be tampered with.

### `getMyBookings`
- Queries `Booking.find({ user: req.user._id })` — only returns **this user's** bookings
- Without this filter, any user could see all bookings on the platform

### `cancelBooking`
- Finds the booking by ID
- **Checks ownership:** `booking.user.toString() !== req.user._id.toString()`
- If someone else's booking → `403 Forbidden`
- If yours → sets `status: 'cancelled'` and saves (does NOT delete — kept for history)

> **Why `.toString()` for comparison?**
> MongoDB ObjectIds are objects, not strings. `===` on two objects compares references, not values. `.toString()` converts both to strings so the comparison works correctly.

### `getAllBookingsAdmin`
- Returns ALL bookings (no user filter) — admin panel only

---

## `userController.js` — User Profile & Wishlist

### `updateUserProfile`
- Updates name, email, bio, avatar — only fields that are sent
- For **password change**: user must provide `currentPassword` first (verified with bcrypt), then the new password is set and auto-hashed on save

> **Why `user.save()` instead of `findByIdAndUpdate()`?**
> `findByIdAndUpdate()` skips Mongoose middleware hooks. We need the `pre('save')` hook to run so bcrypt automatically hashes the new password.

### `toggleWishlist`
- Checks if the listing ID is already in `user.wishlist` array
- If yes → removes it (`splice`)
- If no → adds it (`push`)
- One endpoint handles both add and remove — that's why it's called a "toggle"

### `getAllUsersAdmin`
- Returns all users for the admin panel — always excludes passwords with `.select('-password')`

---

## How a Request Flows Through the App

```
Browser sends request
        ↓
Express server (index.js) receives it
        ↓
Matched to a Route (e.g., bookingRoutes.js)
        ↓
protect middleware runs → verifies JWT → sets req.user
        ↓
admin middleware runs (only if needed)
        ↓
Controller function executes → talks to MongoDB
        ↓
Response sent back to browser
```

---

## Route Access Summary

| Route | Login Required | Admin Required |
|---|---|---|
| Browse listings | ✗ No | ✗ No |
| View listing detail | ✗ No | ✗ No |
| Login / Signup | ✗ No | ✗ No |
| Create booking | ✓ Yes | ✗ No |
| View my bookings | ✓ Yes | ✗ No |
| Cancel my booking | ✓ Yes | ✗ No |
| Edit profile / wishlist | ✓ Yes | ✗ No |
| Create/Edit/Delete listing | ✓ Yes | ✓ Yes |
| View all bookings | ✓ Yes | ✓ Yes |
| View all users | ✓ Yes | ✓ Yes |

---

## Expected Cross-Questions & Answers

**Q: What is a controller?**
A function that contains business logic. It receives a request, interacts with the database, and sends a response. We separate it from routes to keep code organized and readable.

**Q: What is middleware and what does `next()` do?**
Middleware is a function that runs before the controller. `next()` passes the request forward to the next function. If we don't call `next()` and don't send a response, the request just hangs.

**Q: What is JWT?**
JSON Web Token. When you log in, the server creates a token containing your user ID, signs it with a secret key, and sends it back. You store it and send it with every future request. The server verifies it without needing to store session data.

**Q: What is the difference between authentication and authorization?**
- **Authentication** = proving who you are (login, JWT verification — done by `protect`)
- **Authorization** = checking what you're allowed to do (role check — done by `admin`)

**Q: How are passwords secured?**
Passwords are hashed with bcrypt before storing. When login happens, `bcrypt.compare()` checks if the entered password matches the hash. The original password cannot be recovered from the hash.

**Q: Why is price calculated on the backend?**
To prevent users from manipulating it via browser DevTools. The backend always calculates using the real price from the database.

**Q: Why use `.toString()` when comparing MongoDB IDs?**
Because Mongoose ObjectIds are objects. Comparing two objects with `===` compares their memory references, not their actual values. `.toString()` converts them to strings so the comparison works correctly.

**Q: What does `populate()` do?**
It replaces an ObjectId reference with the actual data from the referenced collection — similar to a JOIN in SQL. For example, instead of showing `host: "64abc..."`, it returns `host: { name: "John", email: "..." }`.

**Q: Why does cancelling a booking use `save()` instead of deleting it?**
We want to keep booking history. Changing the status to `'cancelled'` preserves the record for the user's booking history page, audit trail, and potential refund tracking.

**Q: What is the difference between `find()` and `findById()`?**
- `find(query)` → returns an **array** of matching documents
- `findById(id)` → returns a **single** document matching that `_id`, or `null`
