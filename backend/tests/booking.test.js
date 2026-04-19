const request = require('supertest');
const app = require('../src/app');
const { setupTestDB } = require('./helpers/testDb');
const { buildRandomUserPayload } = require('./helpers/factories');
const User = require('../src/models/User');
const Listing = require('../src/models/Listing');

setupTestDB();

describe('Booking API', () => {
  test('POST /api/bookings should create a booking for authenticated user', async () => {
    const userPayload = buildRandomUserPayload();
    const signupResponse = await request(app).post('/api/auth/signup').send(userPayload).expect(201);
    const token = signupResponse.body.token;

    const host = await User.create({
      name: 'Host User',
      email: `host_${Date.now()}_${Math.floor(Math.random() * 100000)}@example.com`,
      password: 'password123'
    });

    const listing = await Listing.create({
      title: 'Test Listing',
      description: 'Listing for booking test',
      price: 100,
      location: 'Test City',
      country: 'Test Country',
      category: 'City',
      host: host._id,
      images: [],
      amenities: [],
      maxGuests: 2,
      bedrooms: 1,
      bathrooms: 1
    });

    const bookingPayload = {
      listingId: listing._id.toString(),
      checkIn: '2030-01-10',
      checkOut: '2030-01-12',
      guests: 2
    };

    const response = await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${token}`)
      .send(bookingPayload);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('listing');
    expect(response.body).toHaveProperty('user');
    expect(response.body.totalPrice).toBe(200);
  });
});
