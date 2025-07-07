// backend/models/restaurant.model.js
const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: String,
  location: String,
  cuisine: [String],
  priceRange: String,
  menu: [
    {
      name: String,
      description: String,
      price: Number,
      image: String,
      reviews: [String],
    },
  ],
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
