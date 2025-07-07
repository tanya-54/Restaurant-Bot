// backend/app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const reservationRoutes = require('./routes/reservation.routes');
const restaurantRoutes = require('./routes/restaurant.routes');
const orderRoutes = require('./routes/order.routes');


const app = express();

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/orders', orderRoutes);



// Health check
app.get('/', (req, res) => {
  res.send('Restaurant Bot API running!');
});

module.exports = app;
