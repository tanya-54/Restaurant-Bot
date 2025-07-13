const Order = require('../models/order.model');
const Restaurant = require('../models/restaurant.model');

exports.getRecommendations = async (req, res) => {
  const { email } = req.query;

  try {
    const orders = await Order.find({ userEmail: email });

    const itemFreq = {};

    orders.forEach(order => {
      order.items.forEach(item => {
        itemFreq[item.name] = (itemFreq[item.name] || 0) + item.quantity;
      });
    });

    const topItems = Object.entries(itemFreq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([item]) => item);

    const recommendedRestaurants = await Restaurant.find({
      'menu.name': { $in: topItems },
    });

    res.json({
      topItems,
      recommendedRestaurants,
    });
  } catch (err) {
    res.status(500).json({ message: 'Recommendation failed', error: err.message });
  }
};
