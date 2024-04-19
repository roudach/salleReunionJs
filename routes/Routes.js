const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController');
const roomController = require('../controllers/roomController');
const reservationController = require('../controllers/ReservationController');
const authenticate = require('../middleware/AuthentificationMiddleware');
const authorizeAdmin = require('../middleware/AuthorizedMiddleware');

// User routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// Room routes
router.post('/rooms', authenticate, authorizeAdmin, roomController.createRoom);
router.get('/rooms', roomController.listRooms);

// Reservation routes
router.post('/reservations', authenticate, reservationController.createReservation);

module.exports = router;
