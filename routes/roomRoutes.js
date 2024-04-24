const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const isAdmin = require('../middleware/isAdmin');
const verifyToken = require('../middleware/authenticate');
const reservationController = require('../controllers/ReservationController');
const authenticate = require('../middleware/authenticate');

router.post('/room', isAdmin, roomController.createRoom);
router.get('/rooms', roomController.getAllRooms);
router.get('/reserve-room', verifyToken, roomController.reserveRoom);
router.get('/reservations', verifyToken, reservationController.getAllReservations);
router.get('/create-room', authenticate, (req, res) => {
    res.render('create_room');
});
router.post('/reservation', reservationController.createReservation);
router.delete('/room/:roomId', verifyToken, isAdmin, roomController.deleteRoom);
router.post('/create-room', verifyToken, isAdmin, roomController.createRoom);
router.post('/reserve-room', verifyToken, reservationController.createReservation);

router.post('/reservation', reservationController.createReservation);

module.exports = router;
