const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const isAdmin = require('../middleware/isAdmin');
const reservationController = require('../controllers/reservationController');

router.post('/room', isAdmin, roomController.createRoom);
router.get('/rooms', roomController.getAllRooms);
router.get('/reserve-room', roomController.reserveRoom);


// Ensure you have a route to handle the POST request for creating a reservation
router.post('/reservation', reservationController.createReservation);

module.exports = router;
