// backend/routes/restaurant.routes.js
const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurant.controller');

router.get('/search', restaurantController.searchRestaurants);
router.get('/:id', restaurantController.getRestaurantById);

module.exports = router;
