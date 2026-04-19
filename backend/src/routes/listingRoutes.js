const express = require('express');
const router = express.Router();
const {
  getListings,
  getFeaturedListings,
  getListingById,
  createListing,
  updateListing,
  deleteListing,
  getAllListingsAdmin
} = require('../controllers/listingController');
const { protect, admin } = require('../middleware/auth');

router.get('/', getListings);
router.get('/featured', getFeaturedListings);
router.get('/admin/all', protect, admin, getAllListingsAdmin);
router.get('/:id', getListingById);
router.post('/', protect, admin, createListing);
router.put('/:id', protect, admin, updateListing);
router.delete('/:id', protect, admin, deleteListing);

module.exports = router;

