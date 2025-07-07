// backend/models/reservation.model.js
const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  },
  name: String,
  email: String,
  phone: String,
  date: Date,
  time: String,
  numberOfGuests: Number,
  specialRequests: String,
});

module.exports = mongoose.model('Reservation', reservationSchema);
