const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// ✅ DB connection (no change)
connectDB();

// ✅ CORS setup (no change)
app.use(cors({
  origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : true,
  credentials: true
}));

// ✅ Middleware (no change)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ✅ ADDED: Root route
// 🔴 ISSUE FIXED: "Cannot GET /" happens because no "/" route was defined
app.get("/", (req, res) => {
  res.send("Backend running on Vercel ✅");
});

// ✅ Health check (no change)
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// ✅ Routes (no change)
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/listings', require('./routes/listingRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// ✅ Error handler (no change)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error', error: err.message });
});

// ❌ REMOVED: app.listen()
// 🔴 ISSUE FIXED: Vercel is serverless, it does NOT allow app.listen()
// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// ✅ REQUIRED: export app for Vercel
module.exports = app;