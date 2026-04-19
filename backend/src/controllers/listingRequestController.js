const ListingRequest = require('../models/ListingRequest');
const Listing = require('../models/Listing');

// POST /api/listing-requests  — logged-in user submits a request
const submitRequest = async (req, res) => {
  try {
    const {
      title, description, price, location, country,
      category, images, amenities, maxGuests, bedrooms, bathrooms
    } = req.body;

    const request = await ListingRequest.create({
      title,
      description,
      price,
      location,
      country: country || '',
      category: category || 'Other',
      images: images || [],
      amenities: amenities || [],
      maxGuests: maxGuests || 2,
      bedrooms: bedrooms || 1,
      bathrooms: bathrooms || 1,
      host: req.user._id
    });

    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/listing-requests/mine  — user sees their own requests
const getMyRequests = async (req, res) => {
  try {
    const requests = await ListingRequest.find({ host: req.user._id })
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/listing-requests/admin/all  — admin sees all requests
const getAllRequests = async (req, res) => {
  try {
    const { status } = req.query;
    const query = status ? { status } : {};
    const requests = await ListingRequest.find(query)
      .sort({ createdAt: -1 })
      .populate('host', 'name email avatar');
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/listing-requests/:id/approve  — admin approves, creates live listing
const approveRequest = async (req, res) => {
  try {
    const request = await ListingRequest.findById(req.params.id).populate('host');
    if (!request) return res.status(404).json({ message: 'Request not found' });
    if (request.status !== 'pending') {
      return res.status(400).json({ message: 'Request already processed' });
    }

    // Create a live Listing from the request data
    const listing = await Listing.create({
      title: request.title,
      description: request.description,
      price: request.price,
      location: request.location,
      country: request.country,
      category: request.category,
      images: request.images,
      amenities: request.amenities,
      maxGuests: request.maxGuests,
      bedrooms: request.bedrooms,
      bathrooms: request.bathrooms,
      host: request.host._id,
      isFeatured: false
    });

    // Update the request status
    request.status = 'approved';
    request.approvedListingId = listing._id;
    await request.save();

    res.json({ message: 'Request approved and listing published', listing, request });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/listing-requests/:id/reject  — admin rejects with optional note
const rejectRequest = async (req, res) => {
  try {
    const request = await ListingRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ message: 'Request not found' });
    if (request.status !== 'pending') {
      return res.status(400).json({ message: 'Request already processed' });
    }

    request.status = 'rejected';
    request.adminNote = req.body.adminNote || '';
    await request.save();

    res.json({ message: 'Request rejected', request });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { submitRequest, getMyRequests, getAllRequests, approveRequest, rejectRequest };
