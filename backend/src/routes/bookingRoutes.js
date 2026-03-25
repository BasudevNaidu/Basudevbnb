const express = require('express');
const router = express.Router();
const { createBooking, getMyBookings, cancelBooking, getAllBookingsAdmin } = require('../controllers/bookingController');
const { protect, admin } = require('../middleware/auth');

router.post('/', protect, createBooking);
router.get('/my', protect, getMyBookings);
router.put('/:id/cancel', protect, cancelBooking);
router.get('/admin/all', protect, admin, getAllBookingsAdmin);

module.exports = router;
