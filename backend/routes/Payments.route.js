const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');

// creating order
router.post('/create-order', paymentController.createOrder);


//then verifying the signature
router.post('/verify', paymentController.verifyPayment);

module.exports = router;
