const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const authenticate = require('../middleware/authenticate');

router.post('/reserve-room', authenticate, reservationController.createReservation);

module.exports = router;