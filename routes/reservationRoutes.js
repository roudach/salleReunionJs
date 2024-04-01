const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

// Route pour afficher toutes les réservations d'un utilisateur
router.get('/reservations', reservationController.getAllReservations);

// Route pour réserver une salle
router.post('/reservations/book', reservationController.bookReservation);

// Route pour modifier une réservation
router.put('/reservations/:reservationId', reservationController.updateReservation);

// Route pour annuler une réservation
router.delete('/reservations/:reservationId', reservationController.cancelReservation);

module.exports = router;
