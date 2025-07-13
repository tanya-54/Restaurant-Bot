const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');

router.get('/orders', adminController.getAllOrders);
router.get('/orders/filter', adminController.getOrdersByStatus);
router.patch('/orders/update/:id', adminController.updateOrderStatus);
router.get('/stats', adminController.getDashboardStats);

module.exports = router;
