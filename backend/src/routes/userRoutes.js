const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
  toggleWishlist,
  getWishlist,
  getAllUsersAdmin
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/auth');


router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.get('/wishlist', protect, getWishlist);
router.put('/wishlist/:listingId', protect, toggleWishlist);
router.get('/admin/all', protect, admin, getAllUsersAdmin);

module.exports = router;
