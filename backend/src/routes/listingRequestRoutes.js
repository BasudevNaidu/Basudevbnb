const express = require('express');
const router = express.Router();
const {
  submitRequest,
  getMyRequests,
  getAllRequests,
  approveRequest,
  rejectRequest
} = require('../controllers/listingRequestController');
const { protect, admin } = require('../middleware/auth');

// User routes
router.post('/', protect, submitRequest);
router.get('/mine', protect, getMyRequests);

// Admin routes
router.get('/admin/all', protect, admin, getAllRequests);
router.put('/:id/approve', protect, admin, approveRequest);
router.put('/:id/reject', protect, admin, rejectRequest);

module.exports = router;
