// backend/routes/order.routes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');

router.post('/place', orderController.placeOrder);
router.get('/user', orderController.getOrdersByUser);
router.patch('/cancel/:id', orderController.cancelOrder);
router.get('/:id', orderController.getOrderById);

module.exports = router;
