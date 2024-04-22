const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/ReservationController');
const authenticate = require('../middleware/authenticate');
const roomController = require('../controllers/roomController'); 

router.post('/reservation', authenticate, reservationController.createReservation);
router.post('/reserve-room', authenticate, reservationController.createReservation);
// Ensure you have a route to handle the GET request for reserving a room
router.get('/reserve-room', roomController.reserveRoom);

// Ensure you have a route to handle the POST request for creating a reservation
router.post('/reservation', reservationController.createReservation);

module.exports = router;
