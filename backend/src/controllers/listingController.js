const Listing = require('../models/Listing');

const getListings = async (req, res) => {
  try {
    const { location, category, minPrice, maxPrice, sort, search } = req.query;
    let query = {};

    if (location) query.location = { $regex: location, $options: 'i' };
    if (category) query.category = category;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }

    let sortOption = { createdAt: -1 };
    if (sort === 'price_asc') sortOption = { price: 1 };
    else if (sort === 'price_desc') sortOption = { price: -1 };
    else if (sort === 'rating') sortOption = { rating: -1 };

    const listings = await Listing.find(query).sort(sortOption).populate('host', 'name email avatar');
    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFeaturedListings = async (req, res) => {
  try {
    const listings = await Listing.find({ isFeatured: true })
      .limit(8)
      .populate('host', 'name email avatar');
    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate('host', 'name email avatar bio');
    if (!listing) return res.status(404).json({ message: 'Listing not found' });
    res.json(listing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createListing = async (req, res) => {
  try {
    const { title, description, price, location, category, amenities, maxGuests, bedrooms, bathrooms, images, isFeatured } = req.body;

    const listing = await Listing.create({
      title,
      description,
      price,
      location,
      category,
      amenities: amenities || [],
      maxGuests: maxGuests || 2,
      bedrooms: bedrooms || 1,
      bathrooms: bathrooms || 1,
      images: images || [],
      isFeatured: isFeatured || false,
      host: req.user._id
    });

    res.status(201).json(listing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });

    const updated = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });

    await Listing.findByIdAndDelete(req.params.id);
    res.json({ message: 'Listing deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllListingsAdmin = async (req, res) => {
  try {
    const listings = await Listing.find().sort({ createdAt: -1 }).populate('host', 'name email');
    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getListings, getFeaturedListings, getListingById, createListing, updateListing, deleteListing, getAllListingsAdmin };
