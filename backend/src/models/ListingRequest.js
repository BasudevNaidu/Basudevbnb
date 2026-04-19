const mongoose = require('mongoose');

const listingRequestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  country: {
    type: String,
    default: '',
    trim: true
  },
  category: {
    type: String,
    enum: ['Beach', 'Mountain', 'City', 'Luxury', 'Countryside', 'Other'],
    default: 'Other'
  },
  images: [{ type: String }],
  amenities: [{ type: String }],
  maxGuests: { type: Number, default: 2 },
  bedrooms: { type: Number, default: 1 },
  bathrooms: { type: Number, default: 1 },
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  adminNote: {
    type: String,
    default: ''
  },
  approvedListingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Listing',
    default: null
  }
}, { timestamps: true });

module.exports = mongoose.model('ListingRequest', listingRequestSchema);
