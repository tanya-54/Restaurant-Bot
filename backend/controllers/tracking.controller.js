const Order = require('../models/order.model');

// Track order by ID
exports.trackOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate('restaurantId');
    if (!order) return res.status(404).json({ message: 'Order not found' });

    res.json({
      orderId: order._id,
      status: order.status,
      paymentStatus: order.paymentStatus,
      orderTime: order.orderTime,
      restaurant: order.restaurantId.name,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to track order', error: err.message });
  }
};

// Update order status (for mock/demo)
exports.updateOrderStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = status;
    await order.save();

    res.json({ message: 'Order status updated', order });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update order status', error: err.message });
  }
};
