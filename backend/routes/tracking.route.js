const express = require('express');
const router = express.Router();
const trackingController = require('../controllers/tracking.controller');

router.get('/:orderId', trackingController.trackOrder);
router.patch('/update/:orderId', trackingController.updateOrderStatus); // (admin or mock)

module.exports = router;
