// backend/models/order.model.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  userEmail: String,
  orderType: { type: String, enum: ['delivery', 'pickup'], default: 'pickup' },
  deliveryAddress: String,
  totalAmount: Number,
  status: {
    type: String,
    enum: ['confirmed', 'preparing', 'out for delivery', 'ready for pickup', 'delivered', 'cancelled'],
    default: 'confirmed',
  },
  orderTime: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
