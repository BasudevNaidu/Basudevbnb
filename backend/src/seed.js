const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Listing = require('./models/Listing');

dotenv.config();

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/basudevbnb');
  console.log('MongoDB connected for seeding');
};

const seedData = async () => {
  await connectDB();

  await User.deleteMany();
  await Listing.deleteMany();

  const admin = await User.create({
    name: 'Admin User',
    email: 'admin@basudevbnb.com',
    password: 'admin123',
    role: 'admin',
    bio: 'Platform administrator'
  });

  const host = await User.create({
    name: 'John Host',
    email: 'host@basudevbnb.com',
    password: 'host123',
    role: 'user',
    bio: 'Passionate host with beautiful properties'
  });

  await User.create({
    name: 'Jane User',
    email: 'user@basudevbnb.com',
    password: 'user123',
    role: 'user',
    bio: 'Travel enthusiast'
  });

  const listings = [
    {
      title: 'Beachfront Paradise Villa',
      description: 'Stunning beachfront villa with panoramic ocean views. Perfect for a relaxing getaway with direct beach access, private pool, and breathtaking sunsets.',
      price: 350,
      location: 'Malibu, California',
      category: 'Beach',
      amenities: ['WiFi', 'Pool', 'Beach Access', 'Kitchen', 'Air Conditioning', 'Parking'],
      images: [
        'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800'
      ],
      maxGuests: 8,
      bedrooms: 4,
      bathrooms: 3,
      rating: 4.9,
      reviewCount: 124,
      isFeatured: true,
      host: host._id
    },
    {
      title: 'Cozy Mountain Cabin Retreat',
      description: 'Escape to this charming mountain cabin surrounded by pine trees. Features a fireplace, hot tub, and stunning mountain views. Perfect for hiking adventures.',
      price: 180,
      location: 'Aspen, Colorado',
      category: 'Mountain',
      amenities: ['WiFi', 'Fireplace', 'Hot Tub', 'Kitchen', 'Hiking Trails', 'Parking'],
      images: [
        'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800',
        'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800'
      ],
      maxGuests: 6,
      bedrooms: 3,
      bathrooms: 2,
      rating: 4.8,
      reviewCount: 89,
      isFeatured: true,
      host: host._id
    },
    {
      title: 'Luxury Penthouse in Manhattan',
      description: 'Experience New York City from the top! This stunning penthouse offers 360-degree city views, luxury furnishings, and is steps away from world-class restaurants.',
      price: 650,
      location: 'New York City, New York',
      category: 'Luxury',
      amenities: ['WiFi', 'Gym', 'Doorman', 'City Views', 'Smart Home', 'Air Conditioning'],
      images: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'
      ],
      maxGuests: 4,
      bedrooms: 2,
      bathrooms: 2,
      rating: 4.95,
      reviewCount: 67,
      isFeatured: true,
      host: admin._id
    },
    {
      title: 'Modern City Loft',
      description: 'Stylish urban loft in the heart of the city. Exposed brick walls, high ceilings, and modern amenities make this the perfect city escape.',
      price: 220,
      location: 'Chicago, Illinois',
      category: 'City',
      amenities: ['WiFi', 'Kitchen', 'Air Conditioning', 'Workspace', 'Gym Access'],
      images: [
        'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800',
        'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800'
      ],
      maxGuests: 3,
      bedrooms: 1,
      bathrooms: 1,
      rating: 4.7,
      reviewCount: 203,
      isFeatured: false,
      host: host._id
    },
    {
      title: 'Tropical Beach Bungalow',
      description: 'Wake up to the sound of waves in this charming beach bungalow. Thatched roof, hammock on the porch, and spectacular sunrises over the Pacific.',
      price: 145,
      location: 'Maui, Hawaii',
      category: 'Beach',
      amenities: ['WiFi', 'Beach Access', 'Hammock', 'Kitchen', 'Snorkeling Gear'],
      images: [
        'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=800',
        'https://images.unsplash.com/photo-1501180336600-ac7bfea1dbe9?w=800'
      ],
      maxGuests: 4,
      bedrooms: 2,
      bathrooms: 1,
      rating: 4.85,
      reviewCount: 156,
      isFeatured: true,
      host: host._id
    },
    {
      title: 'Alpine Ski Chalet',
      description: 'Premium ski-in/ski-out chalet with direct slope access. Cozy fireplaces, gourmet kitchen, and stunning alpine panoramas await you.',
      price: 480,
      location: 'Vail, Colorado',
      category: 'Mountain',
      amenities: ['WiFi', 'Ski Storage', 'Hot Tub', 'Fireplace', 'Kitchen', 'Garage'],
      images: [
        'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=800',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800'
      ],
      maxGuests: 10,
      bedrooms: 5,
      bathrooms: 4,
      rating: 4.92,
      reviewCount: 45,
      isFeatured: true,
      host: admin._id
    },
    {
      title: 'Downtown Studio Apartment',
      description: 'Compact and cozy studio in a prime downtown location. Perfect for solo travelers or couples exploring the city. Walk to restaurants, museums, and shops.',
      price: 95,
      location: 'Seattle, Washington',
      category: 'City',
      amenities: ['WiFi', 'Kitchen', 'Smart TV', 'Air Conditioning', 'Washer'],
      images: [
        'https://images.unsplash.com/photo-1555636222-cae831e670b3?w=800',
        'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800'
      ],
      maxGuests: 2,
      bedrooms: 0,
      bathrooms: 1,
      rating: 4.6,
      reviewCount: 312,
      isFeatured: false,
      host: host._id
    },
    {
      title: 'Exclusive Private Island Villa',
      description: 'The ultimate luxury experience. Your own private island with a sprawling villa, personal butler, private dock, and helicopter pad. Truly unforgettable.',
      price: 2500,
      location: 'Maldives',
      category: 'Luxury',
      amenities: ['Private Island', 'Butler', 'Private Pool', 'Yacht', 'Spa', 'Chef'],
      images: [
        'https://images.unsplash.com/photo-1439130490301-25e322d88054?w=800',
        'https://images.unsplash.com/photo-1505881502353-a1986add3762?w=800'
      ],
      maxGuests: 12,
      bedrooms: 6,
      bathrooms: 6,
      rating: 5.0,
      reviewCount: 22,
      isFeatured: true,
      host: admin._id
    }
  ];

  await Listing.insertMany(listings);

  console.log('Seed data inserted!');
  console.log('Admin: admin@basudevbnb.com / admin123');
  console.log('Host: host@basudevbnb.com / host123');
  console.log('User: user@basudevbnb.com / user123');

  mongoose.connection.close();
};

seedData().catch(console.error);
