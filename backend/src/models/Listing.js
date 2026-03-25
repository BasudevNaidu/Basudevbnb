const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
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
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  maxGuests: { type: Number, default: 2 },
  bedrooms: { type: Number, default: 1 },
  bathrooms: { type: Number, default: 1 },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviewCount: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false }
}, { timestamps: true });

listingSchema.index({ location: 'text', title: 'text', description: 'text' });

module.exports = mongoose.model('Listing', listingSchema);
