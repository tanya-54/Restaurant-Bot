// backend/routes/reservation.routes.js
const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservation.controller');

router.post('/book', reservationController.bookReservation);
router.get('/user', reservationController.getUserReservations);
router.delete('/:id', reservationController.cancelReservation);

module.exports = router;
