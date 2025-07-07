// backend/controllers/restaurant.controller.js
const Restaurant = require('../models/restaurant.model');

exports.searchRestaurants = async (req, res) => {
  const { cuisine, location, priceRange, keyword } = req.query;

  try {
    const filters = {};

    if (cuisine) filters.cuisine = cuisine;
    if (location) filters.location = location;
    if (priceRange) filters.priceRange = priceRange;
    if (keyword) {
      filters.$or = [
        { name: { $regex: keyword, $options: 'i' } },
        { 'menu.name': { $regex: keyword, $options: 'i' } },
      ];
    }

    const results = await Restaurant.find(filters);
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Search failed', error });
  }
};

exports.getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ message: 'Not found' });
    res.json(restaurant);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching restaurant' });
  }
};
