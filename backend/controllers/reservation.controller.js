// backend/controllers/reservation.controller.js
const Reservation = require('../models/reservation.model');

exports.bookReservation = async (req, res) => {
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();
    res.status(201).json({ message: 'Reservation successful', reservation });
  } catch (err) {
    res.status(500).json({ message: 'Reservation failed', error: err.message });
  }
};

exports.getUserReservations = async (req, res) => {
  const { email } = req.query;
  try {
    const reservations = await Reservation.find({ email }).populate('restaurantId');
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: 'Fetching reservations failed', error: err.message });
  }
};

exports.cancelReservation = async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Reservation cancelled' });
  } catch (err) {
    res.status(500).json({ message: 'Cancellation failed', error: err.message });
  }
};
