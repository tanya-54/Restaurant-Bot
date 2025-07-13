const Order = require('../models/order.model');

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('restaurantId').sort({ orderTime: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
  }
};

exports.getOrdersByStatus = async (req, res) => {
  try {
    const { status } = req.query;
    const orders = await Order.find({ status }).populate('restaurantId');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to filter orders', error: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = status;
    await order.save();

    res.json({ message: 'Order status updated successfully', order });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update order', error: err.message });
  }
};

exports.getDashboardStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalRevenueData = await Order.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } },
    ]);

    const totalRevenue = totalRevenueData[0]?.total || 0;

    const statusCounts = await Order.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    res.json({
      totalOrders,
      totalRevenue,
      statusCounts,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch dashboard stats', error: err.message });
  }
};
