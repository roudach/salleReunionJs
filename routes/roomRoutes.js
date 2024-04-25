const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const isAdmin = require('../middleware/isAdmin');
const verifyToken = require('../middleware/authenticate');
const reservationController = require('../controllers/ReservationController');
const authenticate = require('../middleware/authenticate');

router.post('/room', roomController.createRoom);
router.get('/rooms', roomController.getAllRooms);
router.get('/reserve-room', roomController.reserveRoom);
router.get('/reservations',  reservationController.getAllReservations);
router.get('/create-room', (req, res) => {
    res.render('create_room');
});
router.post('/reservation', reservationController.createReservation);
router.delete('/room/:roomId', roomController.deleteRoom);
router.post('/create-room', roomController.createRoom);
router.post('/reserve-room', reservationController.createReservation);

router.post('/reservation', reservationController.createReservation);
router.get('/delete',(req, res) => {
    res.render('delete');
});
router.post('/delete',roomController.deleteRoom )

module.exports = router;
