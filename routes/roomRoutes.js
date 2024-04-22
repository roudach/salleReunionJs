const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const isAdmin = require('../middleware/isAdmin');
const reservationController = require('../controllers/ReservationController');
const authenticate = require('../middleware/authenticate');

router.post('/room', isAdmin, roomController.createRoom);
router.get('/rooms', roomController.getAllRooms);
router.get('/reserve-room', roomController.reserveRoom);
router.get('/create-room', authenticate, (req, res) => {
    res.render('create_room');
});

router.post('/create-room', authenticate, roomController.createRoom);


// Ensure you have a route to handle the POST request for creating a reservation
router.post('/reservation', reservationController.createReservation);

module.exports = router;
