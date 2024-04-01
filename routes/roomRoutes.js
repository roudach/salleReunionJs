const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

// Route pour afficher toutes les salles disponibles
router.get('/rooms', roomController.getAllRooms);

// Route pour réserver une salle
router.post('/rooms/:roomId/book', roomController.bookRoom);

// Autres routes de gestion des salles

module.exports = router;
