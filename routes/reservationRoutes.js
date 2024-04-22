const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/ReservationController');
const authenticate = require('../middleware/authenticate');
const roomController = require('../controllers/roomController'); 

router.post('/reservation', authenticate, reservationController.createReservation);
router.post('/reserve-room', authenticate, reservationController.createReservation);

router.get('/reserve-room', roomController.reserveRoom);


router.post('/reservation', reservationController.createReservation);

module.exports = router;
